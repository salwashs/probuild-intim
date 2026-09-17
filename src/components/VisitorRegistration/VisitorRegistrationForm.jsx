import { useState, useCallback, useEffect } from 'react';
import QRCode from 'qrcode';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { eventInfo } from '../../data';
import { submitVisitorRsvp, mapApiErrors, VisitorRsvpError } from '../../services/visitorRegistrationApi';
import styles from './VisitorRegistrationForm.module.scss';

const initialForm = {
  email: '',
  fullName: '',
  whatsapp: '',
  institutionType: '', // 'umum' | 'instansi'
  institution: '',
  position: '',
  termsAccepted: false,
};

function validate(form, t) {
  const e = {};

  if (!form.email.trim()) {
    e.email = t.errors.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    e.email = t.errors.emailInvalid;
  }

  if (!form.fullName.trim()) {
    e.fullName = t.errors.required;
  } else if (form.fullName.trim().length < 3) {
    e.fullName = t.errors.minLength.replace('{min}', '3');
  }

  if (!form.whatsapp.trim()) {
    e.whatsapp = t.errors.required;
  } else if (!/^[0-9]{8,16}$/.test(form.whatsapp.trim())) {
    e.whatsapp = t.errors.whatsappInvalid;
  }

  if (!form.institutionType) {
    e.institutionType = t.errors.institutionType;
  } else if (form.institutionType === 'instansi') {
    if (!form.institution.trim()) {
      e.institution = t.errors.required;
    } else if (form.institution.trim().length < 2) {
      e.institution = t.errors.minLength.replace('{min}', '2');
    }
  }

  if (form.position.trim() && form.position.trim().length < 2) {
    e.position = t.errors.minLength.replace('{min}', '2');
  }

  if (!form.termsAccepted) e.termsAccepted = t.errors.terms;

  return e;
}

export default function VisitorRegistrationForm() {
  const { lang } = useLanguage();
  const t = translations.visitorRegistration[lang];
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [modal, setModal] = useState({
    open: false,
    type: 'error',
    title: '',
    message: '',
    registrationId: '',
  });

  useEffect(() => {
    let cancelled = false;

    async function buildQr() {
      if (!modal.open || modal.type !== 'success' || !modal.registrationId) {
        setQrDataUrl('');
        return;
      }
      try {
        const url = await QRCode.toDataURL(modal.registrationId, {
          width: 220,
          margin: 2,
          errorCorrectionLevel: 'M',
        });
        if (!cancelled) setQrDataUrl(url);
      } catch {
        if (!cancelled) setQrDataUrl('');
      }
    }

    buildQr();
    return () => {
      cancelled = true;
    };
  }, [modal.open, modal.type, modal.registrationId]);

  const closeModal = useCallback(() => {
    setModal({ open: false, type: 'error', title: '', message: '', registrationId: '' });
    setQrDataUrl('');
  }, []);

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
  }, []);

  const setField = (name, value) => {
    setForm((f) => {
      const next = { ...f, [name]: value };
      if (name === 'institutionType' && value === 'umum') {
        next.institution = '';
      }
      return next;
    });
    if (touched[name] || (name === 'institutionType' && touched.institution)) {
      setErrors((prev) => {
        const merged = { ...form, [name]: value };
        if (name === 'institutionType' && value === 'umum') merged.institution = '';
        const nextErrs = validate(merged, t);
        const cleaned = { ...prev };
        delete cleaned[name];
        if (name === 'institutionType') delete cleaned.institution;
        if (nextErrs[name]) cleaned[name] = nextErrs[name];
        if (name === 'institutionType' && nextErrs.institution) {
          cleaned.institution = nextErrs.institution;
        }
        return cleaned;
      });
    }
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
        email: form.email.trim(),
        fullName: form.fullName.trim(),
        whatsapp: form.whatsapp.trim(),
        institution:
          form.institutionType === 'umum' ? 'umum' : form.institution.trim(),
        ...(form.position.trim() ? { position: form.position.trim() } : {}),
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
          : err instanceof VisitorRsvpError && err.status === 404
            ? err.message || t.errors.eventNotFound
            : err instanceof VisitorRsvpError && err.status === 0
              ? t.errors.networkError
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
        <div className={styles.section}>
          <h3 className={styles.section__title}>{t.section2Title}</h3>
          <p className={styles.section__sub}>{t.section2Sub}</p>
          <div className={styles.grid}>
            <Field label={`${t.fields.email} *`} error={errors.email} full>
              <input
                type='email'
                autoComplete='email'
                value={form.email}
                placeholder={t.fields.emailPlaceholder}
                onChange={(e) => setField('email', e.target.value)}
              />
            </Field>
            <Field label={`${t.fields.fullName} *`} error={errors.fullName} full>
              <input
                type='text'
                autoComplete='name'
                value={form.fullName}
                placeholder={t.fields.fullNamePlaceholder}
                onChange={(e) => setField('fullName', e.target.value)}
              />
            </Field>
            <Field label={`${t.fields.whatsapp} *`} error={errors.whatsapp} full>
              <input
                type='text'
                inputMode='numeric'
                autoComplete='tel'
                value={form.whatsapp}
                placeholder={t.fields.whatsappPlaceholder}
                onChange={(e) => setField('whatsapp', e.target.value.replace(/\D/g, ''))}
              />
            </Field>
          </div>

          <p className={styles.checkLabel}>{t.fields.institutionType} *</p>
          {errors.institutionType && (
            <span className={styles.sectionErr}>{errors.institutionType}</span>
          )}
          <div className={styles.radioGroup}>
            <label className={styles.radio}>
              <input
                type='radio'
                name='institutionType'
                value='instansi'
                checked={form.institutionType === 'instansi'}
                onChange={() => setField('institutionType', 'instansi')}
              />
              <span>{t.institutionTypes.instansi}</span>
            </label>
            <label className={styles.radio}>
              <input
                type='radio'
                name='institutionType'
                value='umum'
                checked={form.institutionType === 'umum'}
                onChange={() => setField('institutionType', 'umum')}
              />
              <span>{t.institutionTypes.umum}</span>
            </label>
          </div>

          <div className={styles.grid}>
            {form.institutionType === 'instansi' && (
              <Field
                label={`${t.fields.institution} *`}
                error={errors.institution}
                full
              >
                <input
                  type='text'
                  autoComplete='organization'
                  value={form.institution}
                  placeholder={t.fields.institutionPlaceholder}
                  onChange={(e) => setField('institution', e.target.value)}
                />
              </Field>
            )}
            <Field
              label={`${t.fields.position} ${t.fields.optional}`}
              error={errors.position}
              full
            >
              <input
                type='text'
                autoComplete='organization-title'
                value={form.position}
                placeholder={t.fields.positionPlaceholder}
                onChange={(e) => setField('position', e.target.value)}
              />
            </Field>
          </div>
        </div>

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
              <>
                <p className={styles.modal__registrationId}>
                  {t.successRegistrationId} <strong>{modal.registrationId}</strong>
                </p>
                {qrDataUrl && (
                  <div className={styles.modal__qr}>
                    <img src={qrDataUrl} alt={`QR ${modal.registrationId}`} />
                    <p>{t.successQrHint}</p>
                  </div>
                )}
              </>
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
