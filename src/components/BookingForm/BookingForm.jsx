import { useState } from 'react';
import { boothSizes, eventInfo, productCategories } from '../../data';
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

const initialErrors = {};

function validateBooth(form) {
  const e = {};
  if (!form.company.trim()) e.company = 'Nama perusahaan wajib diisi';
  if (!form.pic.trim()) e.pic = 'Nama PIC wajib diisi';
  if (!form.email.trim()) {
    e.email = 'Email wajib diisi';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = 'Format email tidak valid';
  }
  if (!form.phone.trim()) {
    e.phone = 'Nomor telepon wajib diisi';
  } else if (!/^[0-9+\-\s()]{8,16}$/.test(form.phone)) {
    e.phone = 'Nomor telepon tidak valid';
  }
  if (!form.category) e.category = 'Pilih kategori produk';
  if (!form.boothSize) e.boothSize = 'Pilih ukuran booth';
  return e;
}

function validateVisitor(form) {
  const e = {};
  if (!form.name.trim()) e.name = 'Nama wajib diisi';
  if (!form.whatsapp.trim()) {
    e.whatsapp = 'Nomor WhatsApp wajib diisi';
  } else if (!/^[0-9+\-\s()]{8,16}$/.test(form.whatsapp)) {
    e.whatsapp = 'Nomor WhatsApp tidak valid';
  }
  if (!form.company.trim()) e.company = 'Nama perusahaan wajib diisi';
  if (!form.email.trim()) {
    e.email = 'Email wajib diisi';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = 'Format email tidak valid';
  }
  return e;
}

export default function BookingForm() {
  const [formType, setFormType] = useState('booth'); // 'booth' or 'visitor'
  const [boothForm, setBoothForm] = useState(initialBoothForm);
  const [visitorForm, setVisitorForm] = useState(initialVisitorForm);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setTouched((t) => ({ ...t, [name]: true }));
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

    // Prepare WhatsApp message and phone number
    let phoneNumber = '';
    let message = '';

    if (formType === 'booth') {
      phoneNumber = '6285705852676';
      message = `Halo, saya ingin melakukan booking stand untuk ProBuild INTIM 2026.

Berikut data perusahaan kami:

📋 *Data Perusahaan*
• Nama Perusahaan: ${boothForm.company}
• Nama PIC: ${boothForm.pic}
• Email: ${boothForm.email}
• Nomor Telepon: ${boothForm.phone}

📦 *Detail Booth*
• Kategori Produk: ${boothForm.category}
• Ukuran Booth: ${boothForm.boothSize}${boothForm.message ? `\n\n💬 *Pesan Tambahan*\n${boothForm.message}` : ''}

Mohon informasi lebih lanjut mengenai proses booking. Terima kasih.`;
    } else {
      phoneNumber = '62811443577';
      message = `Halo, saya ingin melakukan registrasi kunjungan untuk ProBuild INTIM 2026.

Berikut data saya:

👤 *Data Pengunjung*
• Nama Lengkap: ${visitorForm.name}
• Nomor WhatsApp: ${visitorForm.whatsapp}
• Nama Perusahaan: ${visitorForm.company}
• Email: ${visitorForm.email}${visitorForm.position ? `\n• Jabatan: ${visitorForm.position}` : ''}

Mohon informasi lebih lanjut mengenai event ini. Terima kasih.`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Small delay for loading state
    await new Promise((r) => setTimeout(r, 500));

    // Open WhatsApp in new tab (Safari/iOS compatible)
    // Using window.open with async approach for Safari compatibility
    const newWindow = window.open(whatsappUrl, 'noopener,noreferrer');

    // Fallback for Safari if popup blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // If popup blocked, try direct navigation
      window.location.href = whatsappUrl;
    }

    setLoading(false);

    // Reset form after sending
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
              {formType === 'booth' ? 'Data Terkirim!' : 'Registrasi Terkirim!'}
            </h2>
            <p className={styles.success__body}>
              {formType === 'booth' ? (
                <>
                  Terima kasih! Data booking stand Anda telah dikirim ke WhatsApp kami. Tim kami
                  akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
                </>
              ) : (
                <>
                  Terima kasih! Data registrasi Anda telah dikirim ke WhatsApp kami. Kami akan
                  mengirimkan informasi event dan menghubungi Anda segera.
                </>
              )}
            </p>
            <p className={styles.success__note}>
              💬 Jika WhatsApp tidak terbuka otomatis, silakan hubungi kami langsung di{' '}
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
              {formType === 'booth' ? 'Kirim Booking Lainnya' : 'Daftar Lagi'}
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
              Booking Stand / Registrasi Kunjungan
            </span>
            <h2 className={`section__title ${styles.infoTitle}`}>
              Amankan Posisi
              <br />
              <span className={styles.accent}>Strategis</span> Anda Sekarang
            </h2>
            <p className={styles.infoBody}>
              ProBuild mempertemukan brand, inovator, dan profesional industri dalam satu ekosistem
              yang terkurasi. Baik sebagai exhibitor maupun visitor, partisipasi Anda adalah langkah
              strategis untuk memperluas koneksi dan memperkuat posisi di industri konstruksi dan
              arsitektur.
            </p>

            <div className={styles.benefits}>
              {[
                {
                  icon: '📍',
                  title: 'Lokasi Strategis',
                  desc: `${eventInfo.location}, ${eventInfo.venue}`,
                },
                {
                  icon: '🎯',
                  title: 'Target Tepat',
                  desc: `${eventInfo.targetVisitor?.toLocaleString('id-ID')}+ pengunjung dari kalangan profesional`,
                },
                {
                  icon: '🛠️',
                  title: 'Fasilitas Booth Lengkap',
                  desc: 'Listrik, internet, dan signage digital',
                },
                {
                  icon: '📢',
                  title: 'Promosi Digital',
                  desc: 'Listing di website & media sosial event',
                },
              ].map((b, i) => (
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
              <span>Butuh bantuan? Hubungi kami:</span>
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
              <p className={styles.toggle__label}>
                Silakan pilih jenis pendaftaran Anda di bawah ini
              </p>
              <div className={styles.toggle__buttons}>
                <button
                  type='button'
                  className={`${styles.toggle__button} ${formType === 'booth' ? styles.toggle__button__active : ''}`}
                  onClick={() => handleFormTypeChange('booth')}
                >
                  Booking Stand
                </button>
                <button
                  type='button'
                  className={`${styles.toggle__button} ${formType === 'visitor' ? styles.toggle__button__active : ''}`}
                  onClick={() => handleFormTypeChange('visitor')}
                >
                  Registrasi Pengunjung
                </button>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {formType === 'booth' ? (
                <>
                  <div className={styles.form__header}>
                    <h3>Form Booking Stand</h3>
                    <p>Isi data lengkap perusahaan Anda untuk memesan ruang pameran.</p>
                  </div>

                  <div className={styles.form__grid}>
                    {/* Company */}
                    <div
                      className={`${styles.field} ${errors.company && touched.company ? styles.field__error : ''}`}
                    >
                      <label htmlFor='company'>Nama Perusahaan *</label>
                      <input
                        id='company'
                        name='company'
                        type='text'
                        placeholder='PT. Nama Perusahaan Anda'
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
                      <label htmlFor='pic'>Nama PIC *</label>
                      <input
                        id='pic'
                        name='pic'
                        type='text'
                        placeholder='Nama lengkap penanggung jawab'
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
                      <label htmlFor='email'>Email *</label>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='email@perusahaan.com'
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
                      <label htmlFor='phone'>Nomor Telepon *</label>
                      <input
                        id='phone'
                        name='phone'
                        type='tel'
                        placeholder='+62 812 3456 7890'
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
                      <label htmlFor='category'>Jenis Produk / Kategori *</label>
                      <select
                        id='category'
                        name='category'
                        value={boothForm.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value=''>— Pilih kategori —</option>
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
                      <label htmlFor='boothSize'>Ukuran Booth *</label>
                      <select
                        id='boothSize'
                        name='boothSize'
                        value={boothForm.boothSize}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value=''>— Pilih ukuran —</option>
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
                      <label htmlFor='message'>Pesan Tambahan</label>
                      <textarea
                        id='message'
                        name='message'
                        rows='4'
                        placeholder='Kebutuhan khusus, pertanyaan, atau informasi tambahan...'
                        value={boothForm.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.form__header}>
                    <h3>Form Registrasi Pengunjung</h3>
                    <p>Daftarkan diri Anda untuk mengunjungi ProBuild INTIM 2026.</p>
                  </div>

                  <div className={styles.form__grid}>
                    {/* Name */}
                    <div
                      className={`${styles.field} ${styles.field__full} ${errors.name && touched.name ? styles.field__error : ''}`}
                    >
                      <label htmlFor='name'>Nama Lengkap *</label>
                      <input
                        id='name'
                        name='name'
                        type='text'
                        placeholder='Nama lengkap Anda'
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
                      <label htmlFor='whatsapp'>Nomor WhatsApp *</label>
                      <input
                        id='whatsapp'
                        name='whatsapp'
                        type='tel'
                        placeholder='+62 812 3456 7890'
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
                      <label htmlFor='company'>Nama Perusahaan *</label>
                      <input
                        id='company'
                        name='company'
                        type='text'
                        placeholder='PT. Nama Perusahaan Anda'
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
                      <label htmlFor='email'>Email *</label>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='email@perusahaan.com'
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
                      <label htmlFor='position'>Jabatan (Opsional)</label>
                      <input
                        id='position'
                        name='position'
                        type='text'
                        placeholder='Jabatan Anda di perusahaan'
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
                    Memproses...
                  </>
                ) : (
                  <>
                    {formType === 'booth' ? 'Kirim Booking' : 'Daftar Sekarang'}
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                      <path d='M22 2 11 13M22 2 15 22 11 13 2 9l20-7z' />
                    </svg>
                  </>
                )}
              </button>

              <p className={styles.form__note}>
                * Dengan mengirimkan form ini, Anda menyetujui{' '}
                <a href='#' onClick={(e) => e.preventDefault()}>
                  syarat dan ketentuan
                </a>{' '}
                event kami.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
