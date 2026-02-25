import { useState } from 'react';
import { boothSizes, eventInfo, productCategories } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './BookingForm.module.scss';

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
    } else if (!/^[0-9+\-\s()]{8,16}$/.test(form.phone)) {
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
    } else if (!/^[0-9+\-\s()]{8,16}$/.test(form.whatsapp)) {
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

  const validateBooth = makeValidateBooth(t);
  const validateVisitor = makeValidateVisitor(t);

  const form = formType === 'booth' ? boothForm : visitorForm;
  const setForm = formType === 'booth' ? setBoothForm : setVisitorForm;
  const validate = formType === 'booth' ? validateBooth : validateVisitor;

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    await new Promise((r) => setTimeout(r, 500));

    const newWindow = window.open(whatsappUrl, 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }

    setLoading(false);

    if (formType === 'booth') {
      setBoothForm(initialBoothForm);
    } else {
      setVisitorForm(initialVisitorForm);
    }
    setErrors({});
    setTouched({});
    setSubmitted(true);
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
                        type='tel'
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
                        {productCategories.map((c) => (
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
                          <option key={b.value} value={b.value}>
                            {b.label}
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
                        type='tel'
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
    </section>
  );
}
