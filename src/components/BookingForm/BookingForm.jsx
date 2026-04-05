import { useState, useEffect, useCallback } from 'react';
import { eventInfo } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './BookingForm.module.scss';
import * as Sentry from '@sentry/react';

const API_URL = '/api';

const initialBoothForm = {
  company: '',
  pic: '',
  email: '',
  phone: '',
  category: '',
  boothSize: '',
  message: '',
};

const initialVisitorForm = {
  name: '',
  whatsapp: '',
  company: '',
  email: '',
  position: '',
};

function makeValidateBooth(t) {
  return (form) => {
    const e = {};
    if (!form.company.trim()) e.company = t.errors.company;
    if (!form.pic.trim()) e.pic = t.errors.pic;
    if (!form.email.trim()) {
      e.email = t.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t.errors.emailInvalid;
    }
    if (!form.phone.trim()) {
      e.phone = t.errors.phoneRequired;
    } else if (!/^[0-9]{8,16}$/.test(form.phone)) {
      e.phone = t.errors.phoneInvalid;
    }
    if (!form.category) e.category = t.errors.category;
    if (!form.boothSize) e.boothSize = t.errors.boothSize;
    return e;
  };
}

function makeValidateVisitor(t) {
  return (form) => {
    const e = {};
    if (!form.name.trim()) e.name = t.errors.name;
    if (!form.whatsapp.trim()) {
      e.whatsapp = t.errors.whatsappRequired;
    } else if (!/^[0-9]{8,16}$/.test(form.whatsapp)) {
      e.whatsapp = t.errors.whatsappInvalid;
    }
    if (!form.company.trim()) e.company = t.errors.company;
    if (!form.email.trim()) {
      e.email = t.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t.errors.emailInvalid;
    }
    return e;
  };
}

/**
 * Redirect to WhatsApp using a method that works across all browsers,
 * including Safari which blocks window.open and popup-like navigations.
 *
 * Strategy:
 * 1. Create a hidden <a> element with target="_blank"
 * 2. Programmatically click it (Safari allows this inside user gesture chains)
 * 3. If that still fails (e.g. popup blocker), fall back to window.location.href
 */
function openWhatsApp(url) {
  // Try creating and clicking a link – works in most browsers including Safari
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Clean up after a short delay
  setTimeout(() => {
    document.body.removeChild(link);
  }, 100);
}

export default function BookingForm() {
  const { lang } = useLanguage();
  const t = translations.bookingForm[lang];

  const [formType, setFormType] = useState('booth');
  const [boothForm, setBoothForm] = useState(initialBoothForm);
  const [visitorForm, setVisitorForm] = useState(initialVisitorForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boothSizes, setBoothSizes] = useState([]);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: '',
    title: '',
    message: '',
    whatsappUrl: '',
  });

  const validateBooth = makeValidateBooth(t);
  const validateVisitor = makeValidateVisitor(t);

  const form = formType === 'booth' ? boothForm : visitorForm;
  const setForm = formType === 'booth' ? setBoothForm : setVisitorForm;
  const validate = formType === 'booth' ? validateBooth : validateVisitor;

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && modal.open) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modal.open]);

  const closeModal = useCallback(() => {
    setModal({ open: false, type: '', title: '', message: '', whatsappUrl: '' });
    document.body.style.overflow = 'auto';
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'phone' || name === 'whatsapp') {
      value = value.replace(/\D/g, '');
      e.target.value = value;
    }

    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched(Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    // Build WhatsApp URL
    let phoneNumber = '';
    let message = '';

    if (formType === 'booth') {
      phoneNumber = '6285705852676';
      message = `Halo, saya ingin melakukan booking stand untuk ProBuild INTIM 2026.\n\nBerikut data perusahaan kami:\n\n📋 *Data Perusahaan*\n• Nama Perusahaan: ${boothForm.company}\n• Nama PIC: ${boothForm.pic}\n• Email: ${boothForm.email}\n• Nomor Telepon: ${boothForm.phone}\n\n📦 *Detail Booth*\n• Kategori Produk: ${boothForm.category}\n• Ukuran Booth: ${boothForm.boothSize}${boothForm.message ? `\n\n💬 *Pesan Tambahan*\n${boothForm.message}` : ''}\n\nMohon informasi lebih lanjut mengenai proses booking. Terima kasih.`;
    } else {
      phoneNumber = '62811443577';
      message = `Halo, saya ingin melakukan registrasi kunjungan untuk ProBuild INTIM 2026.\n\nBerikut data saya:\n\n👤 *Data Pengunjung*\n• Nama Lengkap: ${visitorForm.name}\n• Nomor WhatsApp: ${visitorForm.whatsapp}\n• Nama Perusahaan: ${visitorForm.company}\n• Email: ${visitorForm.email}${visitorForm.position ? `\n• Jabatan: ${visitorForm.position}` : ''}\n\nMohon informasi lebih lanjut mengenai event ini. Terima kasih.`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // POST to API
    try {
      let apiEndpoint = '';
      let payload = {};

      if (formType === 'booth') {
        apiEndpoint = `${API_URL}/exhibitors`;
        payload = {
          companyName: boothForm.company,
          picName: boothForm.pic,
          email: boothForm.email,
          phone: boothForm.phone,
          productType: boothForm.category,
          boothTypeId: boothForm.boothSize,
          notes: boothForm.message || '',
        };
      } else {
        apiEndpoint = `${API_URL}/visitors`;
        payload = {
          fullName: visitorForm.name,
          phone: visitorForm.whatsapp,
          company: visitorForm.company,
          position: visitorForm.position || '',
          email: visitorForm.email,
        };
      }

      console.log('🚀 ~ handleSubmit ~ payload:', payload);

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const responseJson = await res.json();
      console.log('🚀 ~ handleSubmit ~ res:', responseJson);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        Sentry.captureException(errorData);
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }

      // API success → open WhatsApp
      setLoading(false);

      // Use the Safari-safe redirect
      openWhatsApp(whatsappUrl);

      // Reset form
      if (formType === 'booth') {
        setBoothForm(initialBoothForm);
      } else {
        setVisitorForm(initialVisitorForm);
      }
      setErrors({});
      setTouched({});
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      // Show error modal with WhatsApp fallback link
      Sentry.captureException(err);
      document.body.style.overflow = 'hidden';
      setModal({
        open: true,
        type: 'error',
        title: t.modalErrorTitle || 'Gagal Mengirim Data',
        message:
          t.modalErrorMessage ||
          'Terjadi kesalahan saat mengirim data. Silakan coba lagi atau hubungi kami melalui WhatsApp.',
        whatsappUrl,
      });
    }
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setErrors({});
    setTouched({});
  };

  const benefits = t.benefits.map((b) => ({
    ...b,
    desc: b.desc
      .replace('{location}', eventInfo.location)
      .replace('{venue}', eventInfo.venue)
      .replace('{targetVisitor}', eventInfo.targetVisitor?.toLocaleString('id-ID')),
  }));

  const getBoothType = async () => {
    const res = await fetch(`${API_URL}/booth-types`);
    if (!res.ok) {
      throw new Error('Failed to fetch booth types');
    }
    const responseJson = await res.json();

    setBoothSizes(responseJson);
  };

  useEffect(() => {
    getBoothType();
  }, []);

  if (submitted) {
    return (
      <section className={`section ${styles.section}`} id='booking'>
        <div className='container'>
          <div className={styles.success}>
            <div className={styles.success__icon}>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                <path d='M22 4 12 14.01l-3-3' />
              </svg>
            </div>
            <h2 className={styles.success__title}>
              {formType === 'booth' ? t.successBoothTitle : t.successVisitorTitle}
            </h2>
            <p className={styles.success__body}>
              {formType === 'booth' ? t.successBoothBody : t.successVisitorBody}
            </p>
            <p className={styles.success__note}>
              {t.successNote}{' '}
              <strong>{formType === 'booth' ? '085705852676' : '0811443577'}</strong>
            </p>
            <button
              className={`btn btn--outline-dark`}
              onClick={() => {
                setSubmitted(false);
                setBoothForm(initialBoothForm);
                setVisitorForm(initialVisitorForm);
                setTouched({});
              }}
            >
              {formType === 'booth' ? t.successBoothBtn : t.successVisitorBtn}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.section}`} id='booking'>
      <div className='container'>
        <div className={styles.grid}>
          {/* Left info */}
          <div className={`${styles.info}`}>
            <span className='section__label' style={{ color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ background: '#E8303A' }} />
              {t.label}
            </span>
            <h2 className={`section__title ${styles.infoTitle}`}>
              {t.title}
              <br />
              <span className={styles.accent}>{t.accent}</span> {t.titleSuffix}
            </h2>
            <p className={styles.infoBody}>{t.body}</p>

            <div className={styles.benefits}>
              {benefits.map((b, i) => (
                <div key={i} className={styles.benefit}>
                  <span className={styles.benefit__icon}>{b.icon}</span>
                  <div>
                    <strong>{b.title}</strong>
                    <span>{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.contact}>
              <span>{t.contactHelp}</span>
              <p className={styles.contact__phone}>
                <a href='https://wa.me/6285705852676' target='_blank' rel='noopener noreferrer'>
                  085705852676
                </a>
                {' / '}
                <a href='https://wa.me/620811443577' target='_blank' rel='noopener noreferrer'>
                  0811443577
                </a>
              </p>
              <a href='mailto:info@prebuildintim.com'>✉️ info@probuildintim.com</a>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formWrap}`}>
            {/* Toggle */}
            <div className={styles.toggle}>
              <p className={styles.toggle__label}>{t.toggleLabel}</p>
              <div className={styles.toggle__buttons}>
                <button
                  type='button'
                  className={`${styles.toggle__button} ${formType === 'booth' ? styles.toggle__button__active : ''}`}
                  onClick={() => handleFormTypeChange('booth')}
                >
                  {t.toggleBooth}
                </button>
                <button
                  type='button'
                  className={`${styles.toggle__button} ${formType === 'visitor' ? styles.toggle__button__active : ''}`}
                  onClick={() => handleFormTypeChange('visitor')}
                >
                  {t.toggleVisitor}
                </button>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {formType === 'booth' ? (
                <>
                  <div className={styles.form__header}>
                    <h3>{t.boothFormTitle}</h3>
                    <p>{t.boothFormSub}</p>
                  </div>

                  <div className={styles.form__grid}>
                    {/* Company */}
                    <div
                      className={`${styles.field} ${errors.company && touched.company ? styles.field__error : ''}`}
                    >
                      <label htmlFor='company'>{t.fields.company} *</label>
                      <input
                        id='company'
                        name='company'
                        type='text'
                        placeholder={t.fields.companyPlaceholder}
                        value={boothForm.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.company && touched.company && (
                        <span className={styles.fieldErr}>{errors.company}</span>
                      )}
                    </div>

                    {/* PIC */}
                    <div
                      className={`${styles.field} ${errors.pic && touched.pic ? styles.field__error : ''}`}
                    >
                      <label htmlFor='pic'>{t.fields.pic} *</label>
                      <input
                        id='pic'
                        name='pic'
                        type='text'
                        placeholder={t.fields.picPlaceholder}
                        value={boothForm.pic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.pic && touched.pic && (
                        <span className={styles.fieldErr}>{errors.pic}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div
                      className={`${styles.field} ${errors.email && touched.email ? styles.field__error : ''}`}
                    >
                      <label htmlFor='email'>{t.fields.email} *</label>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder={t.fields.emailPlaceholder}
                        value={boothForm.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <span className={styles.fieldErr}>{errors.email}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div
                      className={`${styles.field} ${errors.phone && touched.phone ? styles.field__error : ''}`}
                    >
                      <label htmlFor='phone'>{t.fields.phone} *</label>
                      <input
                        id='phone'
                        name='phone'
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        placeholder={t.fields.phonePlaceholder}
                        value={boothForm.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phone && touched.phone && (
                        <span className={styles.fieldErr}>{errors.phone}</span>
                      )}
                    </div>

                    {/* Category */}
                    <div
                      className={`${styles.field} ${errors.category && touched.category ? styles.field__error : ''}`}
                    >
                      <label htmlFor='category'>{t.fields.category} *</label>
                      <select
                        id='category'
                        name='category'
                        value={boothForm.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value=''>{t.fields.categoryPlaceholder}</option>
                        {t.productCategories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.category && touched.category && (
                        <span className={styles.fieldErr}>{errors.category}</span>
                      )}
                    </div>

                    {/* Booth Size */}
                    <div
                      className={`${styles.field} ${errors.boothSize && touched.boothSize ? styles.field__error : ''}`}
                    >
                      <label htmlFor='boothSize'>{t.fields.boothSize} *</label>
                      <select
                        id='boothSize'
                        name='boothSize'
                        value={boothForm.boothSize}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value=''>{t.fields.boothSizePlaceholder}</option>
                        {boothSizes.map((b) => (
                          <option key={b?.id} value={b?.id}>
                            {`${b?.size} m² - ${b?.name}`}
                          </option>
                        ))}
                      </select>
                      {errors.boothSize && touched.boothSize && (
                        <span className={styles.fieldErr}>{errors.boothSize}</span>
                      )}
                    </div>

                    {/* Message */}
                    <div className={`${styles.field} ${styles.field__full}`}>
                      <label htmlFor='message'>{t.fields.message}</label>
                      <textarea
                        id='message'
                        name='message'
                        rows='4'
                        placeholder={t.fields.messagePlaceholder}
                        value={boothForm.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.form__header}>
                    <h3>{t.visitorFormTitle}</h3>
                    <p>{t.visitorFormSub}</p>
                  </div>

                  <div className={styles.form__grid}>
                    {/* Name */}
                    <div
                      className={`${styles.field} ${styles.field__full} ${errors.name && touched.name ? styles.field__error : ''}`}
                    >
                      <label htmlFor='name'>{t.fields.name} *</label>
                      <input
                        id='name'
                        name='name'
                        type='text'
                        placeholder={t.fields.namePlaceholder}
                        value={visitorForm.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.name && touched.name && (
                        <span className={styles.fieldErr}>{errors.name}</span>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div
                      className={`${styles.field} ${errors.whatsapp && touched.whatsapp ? styles.field__error : ''}`}
                    >
                      <label htmlFor='whatsapp'>{t.fields.whatsapp} *</label>
                      <input
                        id='whatsapp'
                        name='whatsapp'
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        placeholder={t.fields.whatsappPlaceholder}
                        value={visitorForm.whatsapp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.whatsapp && touched.whatsapp && (
                        <span className={styles.fieldErr}>{errors.whatsapp}</span>
                      )}
                    </div>

                    {/* Company */}
                    <div
                      className={`${styles.field} ${errors.company && touched.company ? styles.field__error : ''}`}
                    >
                      <label htmlFor='company'>{t.fields.company} *</label>
                      <input
                        id='company'
                        name='company'
                        type='text'
                        placeholder={t.fields.companyPlaceholder}
                        value={visitorForm.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.company && touched.company && (
                        <span className={styles.fieldErr}>{errors.company}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div
                      className={`${styles.field} ${errors.email && touched.email ? styles.field__error : ''}`}
                    >
                      <label htmlFor='email'>{t.fields.email} *</label>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder={t.fields.emailPlaceholder}
                        value={visitorForm.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <span className={styles.fieldErr}>{errors.email}</span>
                      )}
                    </div>

                    {/* Position */}
                    <div className={`${styles.field} ${styles.field__full}`}>
                      <label htmlFor='position'>{t.fields.position}</label>
                      <input
                        id='position'
                        name='position'
                        type='text'
                        placeholder={t.fields.positionPlaceholder}
                        value={visitorForm.position}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type='submit'
                className={`btn btn--primary ${styles.submit} ${loading ? styles.submit__loading : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} />
                    {t.loading}
                  </>
                ) : (
                  <>
                    {formType === 'booth' ? t.submitBooth : t.submitVisitor}
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                      <path d='M22 2 11 13M22 2 15 22 11 13 2 9l20-7z' />
                    </svg>
                  </>
                )}
              </button>

              <p className={styles.form__note}>
                {t.note}{' '}
                <a href='#' onClick={(e) => e.preventDefault()}>
                  {t.noteLink}
                </a>{' '}
                {t.noteSuffix}
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {modal.open && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modal__overlay} />
          <div className={styles.modal__container} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className={styles.modal__close} onClick={closeModal} aria-label='Close modal'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>

            {/* Icon */}
            <div className={styles.modal__icon}>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='12' cy='12' r='10' />
                <line x1='12' y1='8' x2='12' y2='12' />
                <line x1='12' y1='16' x2='12.01' y2='16' />
              </svg>
            </div>

            {/* Content */}
            <h3 className={styles.modal__title}>{modal.title}</h3>
            <p className={styles.modal__message}>{modal.message}</p>

            {/* Actions */}
            <div className={styles.modal__actions}>
              <button
                className={styles.modal__retryBtn}
                onClick={() => {
                  closeModal();
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 2v6h-6' />
                  <path d='M3 12a9 9 0 0 1 15-6.7L21 8' />
                  <path d='M3 22v-6h6' />
                  <path d='M21 12a9 9 0 0 1-15 6.7L3 16' />
                </svg>
                {t.modalRetryBtn || 'Coba Lagi'}
              </button>

              <a
                href={modal.whatsappUrl}
                className={styles.modal__waBtn}
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsApp(modal.whatsappUrl);
                  closeModal();
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                </svg>
                {t.modalWhatsappBtn || 'Kirim via WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
