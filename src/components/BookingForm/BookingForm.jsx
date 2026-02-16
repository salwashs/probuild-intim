import { useState } from 'react';
import { boothSizes, productCategories } from '../../data';
import styles from './BookingForm.module.scss';

const initialForm = {
  company: '',
  pic: '',
  email: '',
  phone: '',
  category: '',
  boothSize: '',
  message: '',
};

const initialErrors = {};

function validate(form) {
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

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className={`section ${styles.section}`} id="booking">
        <div className="container">
          <div className={styles.success}>
            <div className={styles.success__icon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4 12 14.01l-3-3" />
              </svg>
            </div>
            <h2 className={styles.success__title}>Booking Terkirim!</h2>
            <p className={styles.success__body}>
              Terima kasih <strong>{form.company}</strong>. Tim kami akan menghubungi{' '}
              <strong>{form.pic}</strong> di <strong>{form.email}</strong> dalam 1×24 jam kerja
              untuk konfirmasi booking stand Anda.
            </p>
            <div className={styles.success__detail}>
              <div className={styles.success__row}>
                <span>Ukuran Booth</span>
                <strong>{form.boothSize}</strong>
              </div>
              <div className={styles.success__row}>
                <span>Kategori</span>
                <strong>{form.category}</strong>
              </div>
              <div className={styles.success__row}>
                <span>Event</span>
                <strong>14–17 November 2025, JIExpo</strong>
              </div>
            </div>
            <button
              className={`btn btn--outline-dark`}
              onClick={() => { setSubmitted(false); setForm(initialForm); setTouched({}); }}
            >
              Kirim Booking Lainnya
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.section}`} id="booking">
      <div className="container">
        <div className={styles.grid}>
          {/* Left info */}
          <div className={`${styles.info} reveal-left`}>
            <span className="section__label" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ background: '#E8303A' }} />
              Booking Stand
            </span>
            <h2 className={`section__title ${styles.infoTitle}`}>
              Amankan Posisi<br />
              <span className={styles.accent}>Stand Terbaik</span><br />
              Anda Sekarang
            </h2>
            <p className={styles.infoBody}>
              Kapasitas stand terbatas. Ratusan perusahaan telah memesan tempat mereka. 
              Jangan lewatkan kesempatan emas tampil di hadapan 40.000+ pengunjung profesional.
            </p>

            <div className={styles.benefits}>
              {[
                { icon: '📍', title: 'Lokasi Strategis', desc: 'JIExpo Kemayoran, pusat bisnis Jakarta' },
                { icon: '🎯', title: 'Target Tepat', desc: '40.000+ pengunjung dari kalangan profesional' },
                { icon: '🛠️', title: 'Fasilitas Lengkap', desc: 'Listrik, internet, cleaning service termasuk' },
                { icon: '📢', title: 'Promosi Digital', desc: 'Listing di website & media sosial event' },
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
              <a href="tel:+6221123456">📞 +62 21 1234 5678</a>
              <a href="mailto:info@konstruksiexpo.id">✉️ info@konstruksiexpo.id</a>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formWrap} reveal-right`}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.form__header}>
                <h3>Form Booking Stand</h3>
                <p>Isi data lengkap perusahaan Anda</p>
              </div>

              <div className={styles.form__grid}>
                {/* Company */}
                <div className={`${styles.field} ${errors.company && touched.company ? styles.field__error : ''}`}>
                  <label htmlFor="company">Nama Perusahaan *</label>
                  <input
                    id="company" name="company" type="text"
                    placeholder="PT. Nama Perusahaan Anda"
                    value={form.company} onChange={handleChange} onBlur={handleBlur}
                  />
                  {errors.company && touched.company && <span className={styles.fieldErr}>{errors.company}</span>}
                </div>

                {/* PIC */}
                <div className={`${styles.field} ${errors.pic && touched.pic ? styles.field__error : ''}`}>
                  <label htmlFor="pic">Nama PIC *</label>
                  <input
                    id="pic" name="pic" type="text"
                    placeholder="Nama lengkap penanggung jawab"
                    value={form.pic} onChange={handleChange} onBlur={handleBlur}
                  />
                  {errors.pic && touched.pic && <span className={styles.fieldErr}>{errors.pic}</span>}
                </div>

                {/* Email */}
                <div className={`${styles.field} ${errors.email && touched.email ? styles.field__error : ''}`}>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="email@perusahaan.com"
                    value={form.email} onChange={handleChange} onBlur={handleBlur}
                  />
                  {errors.email && touched.email && <span className={styles.fieldErr}>{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className={`${styles.field} ${errors.phone && touched.phone ? styles.field__error : ''}`}>
                  <label htmlFor="phone">Nomor Telepon *</label>
                  <input
                    id="phone" name="phone" type="tel"
                    placeholder="+62 812 3456 7890"
                    value={form.phone} onChange={handleChange} onBlur={handleBlur}
                  />
                  {errors.phone && touched.phone && <span className={styles.fieldErr}>{errors.phone}</span>}
                </div>

                {/* Category */}
                <div className={`${styles.field} ${errors.category && touched.category ? styles.field__error : ''}`}>
                  <label htmlFor="category">Jenis Produk / Kategori *</label>
                  <select
                    id="category" name="category"
                    value={form.category} onChange={handleChange} onBlur={handleBlur}
                  >
                    <option value="">— Pilih kategori —</option>
                    {productCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.category && touched.category && <span className={styles.fieldErr}>{errors.category}</span>}
                </div>

                {/* Booth Size */}
                <div className={`${styles.field} ${errors.boothSize && touched.boothSize ? styles.field__error : ''}`}>
                  <label htmlFor="boothSize">Ukuran Booth *</label>
                  <select
                    id="boothSize" name="boothSize"
                    value={form.boothSize} onChange={handleChange} onBlur={handleBlur}
                  >
                    <option value="">— Pilih ukuran —</option>
                    {boothSizes.map((b) => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                  {errors.boothSize && touched.boothSize && <span className={styles.fieldErr}>{errors.boothSize}</span>}
                </div>

                {/* Message */}
                <div className={`${styles.field} ${styles.field__full}`}>
                  <label htmlFor="message">Pesan Tambahan</label>
                  <textarea
                    id="message" name="message" rows="4"
                    placeholder="Kebutuhan khusus, pertanyaan, atau informasi tambahan..."
                    value={form.message} onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
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
                    Kirim Booking
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z" />
                    </svg>
                  </>
                )}
              </button>

              <p className={styles.form__note}>
                * Dengan mengirimkan form ini, Anda menyetujui{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>syarat dan ketentuan</a> event kami.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
