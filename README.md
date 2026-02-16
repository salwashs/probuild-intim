# 🏗️ KONSTRUKSI EXPO 2025 — Landing Page

Template landing page modern minimalis untuk event pameran konstruksi & arsitektur Indonesia.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# 1. Masuk ke folder project
cd konstruksi-expo

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Build untuk production
npm run build
```

Server akan berjalan di: **http://localhost:5173**

---

## 📁 Struktur Project

```
konstruksi-expo/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar/         # Sticky navbar + mobile menu
│   │   ├── Hero/           # Hero + countdown timer
│   │   ├── About/          # About event + stats
│   │   ├── WhyAttend/      # Cards keunggulan event
│   │   ├── Parallax/       # Parallax scrolling section
│   │   ├── Gallery/        # Photo grid + lightbox
│   │   ├── Sponsors/       # Infinite scroll carousel
│   │   ├── Testimonials/   # Testimonial slider
│   │   ├── News/           # Artikel + detail halaman
│   │   ├── BookingForm/    # Form booking + validasi
│   │   └── Footer/         # Footer lengkap
│   ├── data/
│   │   └── index.js        # Semua data event (ubah di sini)
│   ├── hooks/
│   │   └── useReveal.js    # Scroll animation hook
│   ├── styles/
│   │   ├── _variables.scss # Design tokens (warna, font, dll)
│   │   └── global.scss     # Global styles
│   ├── App.jsx
│   └── main.jsx
├── index.html              # SEO meta tags + Schema.org
├── package.json
└── vite.config.js
```

---

## 🎨 Kustomisasi

### 1. Data & Konten
Edit file `src/data/index.js` untuk mengubah:
- Informasi event (nama, tanggal, venue)
- Statistik event
- Kartu keunggulan
- Galeri foto
- Daftar sponsor
- Testimoni
- Artikel
- Opsi ukuran booth

### 2. Warna & Desain
Edit `src/styles/_variables.scss`:
```scss
$red: #E8303A;      // Warna aksen utama
$blue: #1A5FD6;     // Aksen sekunder  
$green: #2D9C6E;    // Aksen hijau
$yellow: #F5A623;   // Aksen kuning

$font-display: 'Syne', sans-serif;   // Font heading
$font-body: 'DM Sans', sans-serif;   // Font body
```

### 3. Tanggal Countdown
Di `src/data/index.js`, ubah:
```js
targetDate: new Date('2025-11-14T08:00:00'),
```

### 4. SEO Meta Tags
Edit `index.html` untuk menyesuaikan:
- Title & description
- Open Graph image
- Schema.org event data

---

## ✨ Fitur Utama

| Fitur | Detail |
|-------|--------|
| 🎯 Hero Section | Headline animasi + countdown timer real-time |
| 📊 About Section | 2-kolom layout + floating stats |
| 🃏 Why Attend | 4 cards dengan hover effect |
| 🌄 Parallax | CSS-based parallax scrolling |
| 🖼️ Gallery | Grid modern + lightbox viewer |
| 🎠 Sponsor Carousel | Infinite auto-scroll, hover to pause |
| 💬 Testimonials | Slider dengan animasi |
| 📰 News/Artikel | Cards + halaman detail artikel |
| 📝 Booking Form | Validasi real-time + success state |
| 🔝 Navbar | Sticky + transparent-to-solid on scroll |
| 📱 Responsive | Mobile-first, breakpoints di semua ukuran |
| ♿ Accessibility | Aria labels, keyboard navigation |
| 🔍 SEO Ready | Meta tags, Schema.org, canonical |
| ⚡ Performance | Lazy loading, CSS animations, optimized |

---

## 🔧 Teknologi

- **React 18** + Vite
- **SCSS Modules** (CSS Modules + Sass)
- **CSS Custom Properties** (design tokens)
- **IntersectionObserver API** (scroll animations)
- **Google Fonts**: Syne + DM Sans
- **Unsplash** (placeholder images)
- Zero external UI library dependencies

---

## 📝 Catatan Development

1. **Form Submission**: Saat ini menggunakan `setTimeout` simulasi. Integrasikan dengan backend/API sesuai kebutuhan (FormSpree, Netlify Forms, custom endpoint, dll).

2. **Gambar Galeri**: Menggunakan Unsplash placeholder. Ganti dengan foto event nyata di `src/data/index.js`.

3. **Sponsor Logo**: Menggunakan generated placeholder. Ganti dengan file gambar logo sponsor asli.

4. **Analytics**: Tambahkan Google Analytics / GTM di `index.html` untuk tracking pengunjung.

---

## 📦 Build & Deploy

```bash
# Build production
npm run build

# Preview production build lokal
npm run preview
```

Output ada di folder `dist/`. Deploy ke:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop folder `dist/`
- **GitHub Pages**: Configure GitHub Actions
- **cPanel/VPS**: Upload isi `dist/` ke public_html

---

*Template by Konstruksi Expo 2025 · Built with React + Vite + SCSS*
