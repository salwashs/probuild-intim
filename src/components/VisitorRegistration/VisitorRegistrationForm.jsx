import { useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { eventInfo } from '../../data';
import { submitVisitorRsvp, mapApiErrors, VisitorRsvpError } from '../../services/visitorRegistrationApi';
import styles from './VisitorRegistrationForm.module.scss';

const EVENT_ROLES = [
  'pembuka_sambutan',
  'narasumber',
  'peninjau_stand',
  'tamu_undangan',
  'lainnya',
];
const SPECIAL_NEEDS = ['kursi_roda', 'akses_prioritas', 'meja_khusus', 'penerjemah', 'tidak_ada'];
const ATTENDANCE_OPTIONS = ['hadir', 'diwakilkan', 'berhalangan'];
const MAX_PARTY = 10;

const initialForm = {
  fullName: '',
  position: '',
  institution: '',
  institutionAddress: '',
  identityNumber: '',
  whatsapp: '',
  email: '',
  partySize: '',
  groupMembers: [],
  attendanceStatus: '',
  delegateName: '',
  delegatePosition: '',
  eventRoles: [],
  eventRolesOther: '',
  specialNeeds: [],
  notes: '',
  termsAccepted: false,
};

function buildGroupMembers(count) {
  const n = Math.max(0, Number(count) - 1);
  return Array.from({ length: n }, () => ({ name: '', position: '' }));
}

function validate(form, t) {
  const e = {};
  const req = (key, val) => {
    if (!String(val || '').trim()) e[key] = t.errors.required;
  };

  if (!form.fullName.trim()) {
    e.fullName = t.errors.required;
  } else if (form.fullName.trim().length < 3) {
    e.fullName = t.errors.minLength.replace('{min}', '3');
  }

  if (!form.position.trim()) {
    e.position = t.errors.required;
  } else if (form.position.trim().length < 2) {
    e.position = t.errors.minLength.replace('{min}', '2');
  }

  if (!form.institution.trim()) {
    e.institution = t.errors.required;
  } else if (form.institution.trim().length < 2) {
    e.institution = t.errors.minLength.replace('{min}', '2');
  }

  if (!form.institutionAddress.trim()) {
    e.institutionAddress = t.errors.required;
  } else if (form.institutionAddress.trim().length < 5) {
    e.institutionAddress = t.errors.minLength.replace('{min}', '5');
  }

  if (!form.identityNumber.trim()) {
    e.identityNumber = t.errors.required;
  } else if (!/^\d{16}$/.test(form.identityNumber)) {
    e.identityNumber = t.errors.ktpInvalid;
  }

  if (!form.whatsapp.trim()) {
    e.whatsapp = t.errors.required;
  } else if (!/^[0-9]{8,16}$/.test(form.whatsapp)) {
    e.whatsapp = t.errors.whatsappInvalid;
  }

  if (!form.email.trim()) {
    e.email = t.errors.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = t.errors.emailInvalid;
  }

  if (!form.partySize) e.partySize = t.errors.partySize;
  if (!form.attendanceStatus) e.attendanceStatus = t.errors.attendance;
  if (form.eventRoles.length === 0) e.eventRoles = t.errors.eventRoles;
  if (form.eventRoles.includes('lainnya') && !form.eventRolesOther.trim()) {
    e.eventRolesOther = t.errors.eventRolesOther;
  }
  if (form.specialNeeds.length === 0) e.specialNeeds = t.errors.specialNeeds;
  if (!form.termsAccepted) e.termsAccepted = t.errors.terms;

  if (form.notes.length > 2000) e.notes = t.errors.notesMax;

  if (form.attendanceStatus === 'diwakilkan') {
    req('delegateName', form.delegateName);
    req('delegatePosition', form.delegatePosition);
  }

  if (Number(form.partySize) > 1) {
    form.groupMembers.forEach((m, i) => {
      if (!m.name.trim()) e[`groupMember_name_${i}`] = t.errors.groupMemberName;
      if (!m.position.trim()) e[`groupMember_position_${i}`] = t.errors.groupMemberPosition;
    });
  }

  return e;
}

export default function VisitorRegistrationForm() {
  const { lang } = useLanguage();
  const t = translations.visitorRegistration[lang];
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    type: 'error',
    title: '',
    message: '',
    registrationId: '',
  });

  const closeModal = useCallback(() => {
    setModal({ open: false, type: 'error', title: '', message: '', registrationId: '' });
  }, []);

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
  }, []);

  const setField = (name, value) => {
    setForm((f) => {
      const next = { ...f, [name]: value };
      if (name === 'partySize') {
        next.groupMembers = buildGroupMembers(value);
      }
      return next;
    });
    if (touched[name]) {
      setErrors((prev) => {
        const next = { ...prev, ...validate({ ...form, [name]: value }, t) };
        delete next[name];
        return next;
      });
    }
  };

  const setGroupMember = (index, field, value) => {
    setForm((f) => {
      const groupMembers = [...f.groupMembers];
      groupMembers[index] = { ...groupMembers[index], [field]: value };
      return { ...f, groupMembers };
    });
  };

  const toggleArray = (name, value) => {
    setForm((f) => {
      const arr = f[name];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...f, [name]: next };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form, t);
    setErrors(errs);
    setTouched(
      Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), { termsAccepted: true })
    );
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        fullName: form.fullName.trim(),
        position: form.position.trim(),
        institution: form.institution.trim(),
        institutionAddress: form.institutionAddress.trim(),
        identityNumber: form.identityNumber.trim(),
        whatsapp: form.whatsapp.trim(),
        email: form.email.trim(),
        partySize: Number(form.partySize),
        groupMembers:
          Number(form.partySize) > 1
            ? form.groupMembers.map((m) => ({
                name: m.name.trim(),
                position: m.position.trim(),
              }))
            : [],
        attendanceStatus: form.attendanceStatus,
        delegateName:
          form.attendanceStatus === 'diwakilkan' ? form.delegateName.trim() : null,
        delegatePosition:
          form.attendanceStatus === 'diwakilkan' ? form.delegatePosition.trim() : null,
        eventRoles: form.eventRoles,
        eventRolesOther: form.eventRoles.includes('lainnya')
          ? form.eventRolesOther.trim()
          : null,
        specialNeeds: form.specialNeeds,
        notes: form.notes.trim() || '',
        termsAccepted: true,
        language: lang,
        submittedAt: new Date().toISOString(),
      };

      const data = await submitVisitorRsvp(payload);
      resetForm();
      setModal({
        open: true,
        type: 'success',
        title: t.successTitle,
        message: data.message || t.successBody,
        registrationId: data.registrationId || '',
      });
    } catch (err) {
      if (err instanceof VisitorRsvpError && err.errors) {
        setErrors((prev) => ({ ...prev, ...mapApiErrors(err.errors) }));
      }

      const message =
        err instanceof VisitorRsvpError && err.status === 409
          ? err.message || t.errors.conflict
          : err.message || t.modalErrorMessage;

      setModal({
        open: true,
        type: 'error',
        title: t.modalErrorTitle,
        message,
        registrationId: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const waUrl = `https://wa.me/${eventInfo.committeePhone.replace(/\D/g, '')}`;

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Section 2 */}
        <div className={styles.section}>
          <h3 className={styles.section__title}>{t.section2Title}</h3>
          <p className={styles.section__sub}>{t.section2Sub}</p>
          <div className={styles.grid}>
            <Field
              label={`${t.fields.fullName} *`}
              error={errors.fullName}
              full
            >
              <input
                type='text'
                value={form.fullName}
                placeholder={t.fields.fullNamePlaceholder}
                onChange={(e) => setField('fullName', e.target.value)}
              />
            </Field>
            <Field label={`${t.fields.position} *`} error={errors.position}>
              <input
                type='text'
                value={form.position}
                placeholder={t.fields.positionPlaceholder}
                onChange={(e) => setField('position', e.target.value)}
              />
            </Field>
            <Field label={`${t.fields.institution} *`} error={errors.institution}>
              <input
                type='text'
                value={form.institution}
                placeholder={t.fields.institutionPlaceholder}
                onChange={(e) => setField('institution', e.target.value)}
              />
            </Field>
            <Field
              label={`${t.fields.institutionAddress} *`}
              error={errors.institutionAddress}
              full
            >
              <input
                type='text'
                value={form.institutionAddress}
                placeholder={t.fields.institutionAddressPlaceholder}
                onChange={(e) => setField('institutionAddress', e.target.value)}
              />
            </Field>
            <Field label={`${t.fields.identityNumber} *`} error={errors.identityNumber}>
              <input
                type='text'
                inputMode='numeric'
                maxLength={16}
                value={form.identityNumber}
                placeholder={t.fields.identityNumberPlaceholder}
                onChange={(e) =>
                  setField('identityNumber', e.target.value.replace(/\D/g, ''))
                }
              />
            </Field>
            <Field label={`${t.fields.whatsapp} *`} error={errors.whatsapp}>
              <input
                type='text'
                inputMode='numeric'
                value={form.whatsapp}
                placeholder={t.fields.whatsappPlaceholder}
                onChange={(e) => setField('whatsapp', e.target.value.replace(/\D/g, ''))}
              />
            </Field>
            <Field label={`${t.fields.email} *`} error={errors.email}>
              <input
                type='email'
                value={form.email}
                placeholder={t.fields.emailPlaceholder}
                onChange={(e) => setField('email', e.target.value)}
              />
            </Field>
            <Field label={`${t.fields.partySize} *`} error={errors.partySize}>
              <select
                value={form.partySize}
                onChange={(e) => setField('partySize', e.target.value)}
              >
                <option value=''>{t.fields.partySizePlaceholder}</option>
                {Array.from({ length: MAX_PARTY }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {lang === 'id' ? 'orang' : 'people'}
                  </option>
                ))}
              </select>
              <span className={styles.hint}>{t.fields.partySizeHint}</span>
            </Field>
          </div>

          {Number(form.partySize) > 1 &&
            form.groupMembers.map((member, i) => (
              <div key={i} className={styles.groupBlock}>
                <p className={styles.groupBlock__label}>
                  {lang === 'id' ? `Anggota rombongan ${i + 1}` : `Group member ${i + 1}`}
                </p>
                <div className={styles.grid}>
                  <Field
                    label={`${t.fields.groupMemberName} *`}
                    error={errors[`groupMember_name_${i}`]}
                  >
                    <input
                      type='text'
                      value={member.name}
                      onChange={(e) => setGroupMember(i, 'name', e.target.value)}
                    />
                  </Field>
                  <Field
                    label={`${t.fields.groupMemberPosition} *`}
                    error={errors[`groupMember_position_${i}`]}
                  >
                    <input
                      type='text'
                      value={member.position}
                      onChange={(e) => setGroupMember(i, 'position', e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            ))}
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <h3 className={styles.section__title}>{t.section3Title}</h3>
          {errors.attendanceStatus && (
            <span className={styles.sectionErr}>{errors.attendanceStatus}</span>
          )}
          <div className={styles.radioGroup}>
            {ATTENDANCE_OPTIONS.map((opt) => (
              <label key={opt} className={styles.radio}>
                <input
                  type='radio'
                  name='attendanceStatus'
                  value={opt}
                  checked={form.attendanceStatus === opt}
                  onChange={() => setField('attendanceStatus', opt)}
                />
                <span>{t.attendance[opt]}</span>
              </label>
            ))}
          </div>

          {form.attendanceStatus === 'diwakilkan' && (
            <div className={styles.grid}>
              <Field label={`${t.fields.delegateName} *`} error={errors.delegateName}>
                <input
                  type='text'
                  value={form.delegateName}
                  placeholder={t.fields.delegateNamePlaceholder}
                  onChange={(e) => setField('delegateName', e.target.value)}
                />
              </Field>
              <Field label={`${t.fields.delegatePosition} *`} error={errors.delegatePosition}>
                <input
                  type='text'
                  value={form.delegatePosition}
                  placeholder={t.fields.delegatePositionPlaceholder}
                  onChange={(e) => setField('delegatePosition', e.target.value)}
                />
              </Field>
            </div>
          )}
        </div>

        {/* Section 4 */}
        <div className={styles.section}>
          <h3 className={styles.section__title}>{t.section4Title}</h3>
          <p className={styles.checkLabel}>
            {lang === 'id' ? 'Rencana peran dalam acara' : 'Planned role at the event'} *
          </p>
          {errors.eventRoles && <span className={styles.sectionErr}>{errors.eventRoles}</span>}
          <div className={styles.checkGroup}>
            {EVENT_ROLES.map((role) => (
              <label key={role} className={styles.check}>
                <input
                  type='checkbox'
                  checked={form.eventRoles.includes(role)}
                  onChange={() => toggleArray('eventRoles', role)}
                />
                <span>{t.eventRoles[role]}</span>
              </label>
            ))}
          </div>
          {form.eventRoles.includes('lainnya') && (
            <Field
              label={`${t.fields.eventRolesOther} *`}
              error={errors.eventRolesOther}
              full
            >
              <input
                type='text'
                value={form.eventRolesOther}
                placeholder={t.fields.eventRolesOtherPlaceholder}
                onChange={(e) => setField('eventRolesOther', e.target.value)}
              />
            </Field>
          )}

          <p className={styles.checkLabel}>
            {lang === 'id' ? 'Kebutuhan khusus' : 'Special requirements'} *
          </p>
          {errors.specialNeeds && (
            <span className={styles.sectionErr}>{errors.specialNeeds}</span>
          )}
          <div className={styles.checkGroup}>
            {SPECIAL_NEEDS.map((need) => (
              <label key={need} className={styles.check}>
                <input
                  type='checkbox'
                  checked={form.specialNeeds.includes(need)}
                  onChange={() => toggleArray('specialNeeds', need)}
                />
                <span>{t.specialNeeds[need]}</span>
              </label>
            ))}
          </div>

          <Field label={t.fields.notes} error={errors.notes} full>
            <textarea
              rows={4}
              value={form.notes}
              placeholder={t.fields.notesPlaceholder}
              onChange={(e) => setField('notes', e.target.value)}
            />
          </Field>
        </div>

        {/* Section 6 */}
        <div className={styles.section}>
          <h3 className={styles.section__title}>{t.section6Title}</h3>
          <label className={styles.terms}>
            <input
              type='checkbox'
              checked={form.termsAccepted}
              onChange={(e) => setField('termsAccepted', e.target.checked)}
            />
            <span>{t.termsLabel}</span>
          </label>
          {errors.termsAccepted && (
            <span className={styles.sectionErr}>{errors.termsAccepted}</span>
          )}

          <button
            type='submit'
            className={`btn btn--primary ${styles.submit}`}
            disabled={loading}
          >
            {loading ? t.loading : t.submit}
          </button>
        </div>
      </form>

      {modal.open && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modal__overlay} />
          <div
            className={`${styles.modal__box} ${modal.type === 'success' ? styles.modal__boxSuccess : styles.modal__boxError}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`${styles.modal__icon} ${modal.type === 'success' ? styles.modal__iconSuccess : styles.modal__iconError}`}
            >
              {modal.type === 'success' ? (
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                  <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                  <path d='M22 4 12 14.01l-3-3' />
                </svg>
              ) : (
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <circle cx='12' cy='12' r='10' />
                  <line x1='12' y1='8' x2='12' y2='12' />
                  <line x1='12' y1='16' x2='12.01' y2='16' />
                </svg>
              )}
            </div>
            <h4>{modal.title}</h4>
            <p>{modal.message}</p>
            {modal.type === 'success' && modal.registrationId && (
              <p className={styles.modal__registrationId}>
                {t.successRegistrationId} <strong>{modal.registrationId}</strong>
              </p>
            )}
            <div className={styles.modal__actions}>
              {modal.type === 'success' ? (
                <button type='button' className={styles.modal__ok} onClick={closeModal}>
                  {t.modalSuccessBtn}
                </button>
              ) : (
                <>
                  <button type='button' className={styles.modal__retry} onClick={closeModal}>
                    {t.modalRetryBtn}
                  </button>
                  <a
                    href={waUrl}
                    className={styles.modal__wa}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t.modalWhatsappBtn}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, error, full, children }) {
  return (
    <div className={`${styles.field} ${full ? styles.field__full : ''} ${error ? styles.field__error : ''}`}>
      <label>{label}</label>
      {children}
      {error && <span className={styles.fieldErr}>{error}</span>}
    </div>
  );
}
