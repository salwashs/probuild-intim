// ========================
// TRANSLATIONS
// id = Bahasa Indonesia (default)
// en = English
// ========================

import { eventInfo } from './data';

export const translations = {
  // -----------------------------------------------
  // NAVBAR
  // -----------------------------------------------
  nav: {
    id: {
      links: [
        { label: 'Tentang Kami', href: '/tentang-kami', isRoute: true },
        { label: 'Keunggulan', href: '#why-attend', isRoute: false },
        { label: 'Mitra dan Sponsor', href: '#sponsors', isRoute: false },
        { label: 'Booth', href: '/booth', isRoute: true },
        { label: 'Artikel', href: '/artikel', isRoute: true },
      ],
      cta: 'Registrasi',
    },
    en: {
      links: [
        { label: 'About Us', href: '/tentang-kami', isRoute: true },
        { label: 'Why Attend', href: '#why-attend', isRoute: false },
        { label: 'Partners & Sponsors', href: '#sponsors', isRoute: false },
        { label: 'Booth', href: '/booth', isRoute: true },
        { label: 'Articles', href: '/artikel', isRoute: true },
      ],
      cta: 'Register',
    },
  },

  // -----------------------------------------------
  // HERO
  // -----------------------------------------------
  hero: {
    id: {
      description:
        'Platform pertemuan {exhibitor}+ exhibitor, {targetVisitor} profesional, dan inovator industri konstruksi terbesar se-Indonesia Timur dalam 4 hari transformasi.',
      ctaPrimary: 'Booking Stand',
      ctaOutline: 'Apa itu ProBuild INTIM?',
      countdownLabel: 'Menghitung mundur ke hari H:',
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
    },
    en: {
      description:
        "The meeting platform for {exhibitor}+ exhibitors, {targetVisitor} professionals, and innovators of Eastern Indonesia's largest construction industry in 4 transformative days.",
      ctaPrimary: 'Book a Stand',
      ctaOutline: 'What is ProBuild INTIM?',
      countdownLabel: 'Counting down to the big day:',
      days: 'Days',
      hours: 'Hrs',
      minutes: 'Min',
      seconds: 'Sec',
    },
  },

  // -----------------------------------------------
  // ABOUT (home section)
  // -----------------------------------------------
  about: {
    id: {
      label: 'Tentang Event',
      title: ['Panggung Terbesar', 'Industri Konstruksi', 'Indonesia Timur'],
      accentIndex: 1,
      body1:
        'adalah pameran konstruksi B2B terbesar di Indonesia Timur, mempertemukan {exhibitor}+ exhibitor, {targetVisitor}+ pengunjung profesional, dan 20+ pembicara ahli dari seluruh Indonesia. Fokus pada inovasi infrastruktur, material bangunan, teknologi digital konstruksi (BIM, AI), dan proyek strategis nasional serta pengembangan kawasan timur Indonesia.',
      body2:
        'Target 2026, {targetVisitor}+ pengunjung, didukung Dinas Bina Marga & Bina Konstruksi (DBMBK) Provinsi Sulawesi Selatan, BJKW VI Makassar dan 10+ asosiasi industri.',
      tags: [
        'Konstruksi',
        'Arsitektur',
        'Properti',
        'Interior',
        'Smart Building',
        'Green Construction',
        'Infrastruktur',
      ],
      readMore: 'Selengkapnya',
      highlights: ['Exhibitor Terpilih', 'Target Pengunjung', 'Pembicara Ahli', 'Durasi Event'],
      highlightSuffixes: ['+', '+', '+', ' Hari'],
      floatCard: 'Event Terdekat',
    },
    en: {
      label: 'About the Event',
      title: ["Eastern Indonesia's", 'Biggest Stage', 'In Construction'],
      accentIndex: 1,
      body1:
        'is the largest B2B construction exhibition in Eastern Indonesia, bringing together {exhibitor}+ exhibitors, {targetVisitor}+ professional visitors, and 20+ expert speakers from across Indonesia. Focused on infrastructure innovation, building materials, digital construction technology (BIM, AI), and national strategic projects as well as Eastern Indonesian region development.',
      body2:
        'Target 2026: {targetVisitor}+ visitors, supported by the Directorate of Roads & Construction (DBMBK) South Sulawesi Province, BJKW VI Makassar and 10+ industry associations.',
      tags: [
        'Construction',
        'Architecture',
        'Property',
        'Interior',
        'Smart Building',
        'Green Construction',
        'Infrastructure',
      ],
      readMore: 'Learn More',
      highlights: ['Selected Exhibitors', 'Target Visitors', 'Expert Speakers', 'Event Duration'],
      highlightSuffixes: ['+', '+', '+', ' Days'],
      floatCard: 'Upcoming Event',
    },
  },

  // -----------------------------------------------
  // WHY ATTEND
  // -----------------------------------------------
  whyAttend: {
    id: {
      label: 'Mengapa Hadir',
      title: ['Empat Alasan Kuat', 'untuk Tidak Melewatkan'],
      subtitle:
        'Event yang tidak hanya memajang produk, tetapi membangun ekosistem bisnis konstruksi yang lebih kuat dan terkoneksi.',
      learnMore: 'Pelajari lebih lanjut',
      bottomCta: {
        ready: 'Siap bergabung?',
        sub: 'Ratusan pelaku industri sudah mendaftarkan diri.',
        bookNow: 'Booking Stand Sekarang',
        program: 'Pelajari Program',
      },
      cards: [
        {
          title: 'Exclusive Industry Networking',
          description:
            'ProBuild menghadirkan ruang networking premium yang dirancang untuk mempertemukan Anda dengan mitra bernilai tinggi dalam atmosfer profesional dan berkelas.',
        },
        {
          title: 'Future-Defining Innovation',
          description:
            'Jadilah yang pertama menyaksikan teknologi, material, dan solusi konstruksi generasi terbaru.',
        },
        {
          title: 'High-Value Business Opportunities',
          description:
            'Dengan sistem business matching terkurasi dan akses ke buyer utama, partisipasi Anda bukan hanya eksposur—melainkan investasi untuk pertumbuhan bisnis jangka panjang.',
        },
        {
          title: 'Executive-Level Insight & Forum',
          description:
            'Dapatkan perspektif langsung dari tokoh industri, regulator, dan pemimpin proyek nasional dalam forum diskusi berkelas.',
        },
      ],
    },
    en: {
      label: 'Why Attend',
      title: ['Four Compelling Reasons', 'Not to Miss'],
      subtitle:
        'An event that goes beyond product showcasing — building a stronger and more connected construction business ecosystem.',
      learnMore: 'Learn more',
      bottomCta: {
        ready: 'Ready to join?',
        sub: 'Hundreds of industry players have already registered.',
        bookNow: 'Book a Stand Now',
        program: 'Explore Program',
      },
      cards: [
        {
          title: 'Exclusive Industry Networking',
          description:
            'ProBuild offers a premium networking environment designed to connect you with high-value partners in a professional and distinguished atmosphere.',
        },
        {
          title: 'Future-Defining Innovation',
          description:
            'Be among the first to witness the next generation of construction technology, materials, and solutions.',
        },
        {
          title: 'High-Value Business Opportunities',
          description:
            'With a curated business matching system and access to key buyers, your participation is not just exposure — it is a long-term investment in business growth.',
        },
        {
          title: 'Executive-Level Insight & Forum',
          description:
            'Gain direct perspectives from industry leaders, regulators, and national project managers in premium discussion forums.',
        },
      ],
    },
  },

  // -----------------------------------------------
  // SPONSORS
  // -----------------------------------------------
  sponsors: {
    id: {
      label: 'Mitra dan Sponsor',
      title: 'Didukung Oleh yang',
      accent: 'Terbaik',
      subtitle: 'Mitra strategis yang mendukung kesuksesan ProBuild INTIM 2026.',
      mainHeader: 'Pendukung Utama Nasional',
      secondaryHeader: 'Asosiasi & Mitra Pendukung',
      ctaText: 'Ingin brand Anda tampil di sini?',
      ctaBtn: 'Jadi Sponsor',
    },
    en: {
      label: 'Partners & Sponsors',
      title: 'Supported By the',
      accent: 'Best',
      subtitle: 'Strategic partners supporting the success of ProBuild INTIM 2026.',
      mainHeader: 'National Main Supporter',
      secondaryHeader: 'Associations & Supporting Partners',
      ctaText: 'Want your brand featured here?',
      ctaBtn: 'Become a Sponsor',
    },
  },

  // -----------------------------------------------
  // BOOKING FORM
  // -----------------------------------------------
  bookingForm: {
    id: {
      label: 'Booking Stand / Registrasi Kunjungan',
      title: 'Amankan Posisi',
      accent: 'Strategis',
      titleSuffix: 'Anda Sekarang',
      body: 'ProBuild mempertemukan brand, inovator, dan profesional industri dalam satu ekosistem yang terkurasi. Baik sebagai exhibitor maupun visitor, partisipasi Anda adalah langkah strategis untuk memperluas koneksi dan memperkuat posisi di industri konstruksi dan arsitektur.',
      benefits: [
        { icon: '📍', title: 'Lokasi Strategis', desc: '{location}, {venue}' },
        {
          icon: '🎯',
          title: 'Target Tepat',
          desc: '{targetVisitor}+ pengunjung dari kalangan profesional',
        },
        {
          icon: '🛠️',
          title: 'Fasilitas Booth Lengkap',
          desc: 'Listrik, internet, dan signage digital',
        },
        { icon: '📢', title: 'Promosi Digital', desc: 'Listing di website & media sosial event' },
      ],
      contactHelp: 'Butuh bantuan? Hubungi kami:',
      toggleLabel: 'Silakan pilih jenis pendaftaran Anda di bawah ini',
      toggleBooth: 'Booking Stand',
      toggleVisitor: 'Registrasi Pengunjung',
      boothFormTitle: 'Form Booking Stand',
      boothFormSub: 'Isi data lengkap perusahaan Anda untuk memesan ruang pameran.',
      visitorFormTitle: 'Form Registrasi Pengunjung',
      visitorFormSub: 'Daftarkan diri Anda untuk mengunjungi ProBuild INTIM 2026.',
      fields: {
        company: 'Nama Perusahaan',
        companyPlaceholder: 'PT. Nama Perusahaan Anda',
        pic: 'Nama PIC',
        picPlaceholder: 'Nama lengkap penanggung jawab',
        email: 'Email',
        emailPlaceholder: 'email@perusahaan.com',
        phone: 'Nomor Telepon',
        phonePlaceholder: '+62 812 3456 7890',
        category: 'Jenis Produk / Kategori',
        categoryPlaceholder: '— Pilih kategori —',
        boothSize: 'Ukuran Booth',
        boothSizePlaceholder: '— Pilih ukuran —',
        message: 'Pesan Tambahan',
        messagePlaceholder: 'Kebutuhan khusus, pertanyaan, atau informasi tambahan...',
        name: 'Nama Lengkap',
        namePlaceholder: 'Nama lengkap Anda',
        whatsapp: 'Nomor WhatsApp',
        whatsappPlaceholder: '+62 812 3456 7890',
        position: 'Jabatan (Opsional)',
        positionPlaceholder: 'Jabatan Anda di perusahaan',
      },
      submitBooth: 'Kirim Booking',
      submitVisitor: 'Daftar Sekarang',
      loading: 'Memproses...',
      note: '* Dengan mengirimkan form ini, Anda menyetujui',
      noteLink: 'syarat dan ketentuan',
      noteSuffix: 'event kami.',
      successBoothTitle: 'Data Terkirim!',
      successVisitorTitle: 'Registrasi Terkirim!',
      successBoothBody:
        'Terima kasih! Data booking stand Anda telah dikirim ke WhatsApp kami. Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.',
      successVisitorBody:
        'Terima kasih! Data registrasi Anda telah dikirim ke WhatsApp kami. Kami akan mengirimkan informasi event dan menghubungi Anda segera.',
      successNote: '💬 Jika WhatsApp tidak terbuka otomatis, silakan hubungi kami langsung di',
      successBoothBtn: 'Kirim Booking Lainnya',
      successVisitorBtn: 'Daftar Lagi',
      errors: {
        company: 'Nama perusahaan wajib diisi',
        pic: 'Nama PIC wajib diisi',
        emailRequired: 'Email wajib diisi',
        emailInvalid: 'Format email tidak valid',
        phoneRequired: 'Nomor telepon wajib diisi',
        phoneInvalid: 'Nomor telepon tidak valid',
        category: 'Pilih kategori produk',
        boothSize: 'Pilih ukuran booth',
        name: 'Nama wajib diisi',
        whatsappRequired: 'Nomor WhatsApp wajib diisi',
        whatsappInvalid: 'Nomor WhatsApp tidak valid',
      },
    },
    en: {
      label: 'Stand Booking / Visitor Registration',
      title: 'Secure Your',
      accent: 'Strategic',
      titleSuffix: 'Position Now',
      body: 'ProBuild brings together brands, innovators, and industry professionals in one curated ecosystem. Whether as an exhibitor or visitor, your participation is a strategic step to expand your network and strengthen your position in the construction and architecture industry.',
      benefits: [
        { icon: '📍', title: 'Strategic Location', desc: '{location}, {venue}' },
        { icon: '🎯', title: 'Targeted Audience', desc: '{targetVisitor}+ professional visitors' },
        {
          icon: '🛠️',
          title: 'Complete Booth Facilities',
          desc: 'Electricity, internet, and digital signage',
        },
        { icon: '📢', title: 'Digital Promotion', desc: 'Listed on event website & social media' },
      ],
      contactHelp: 'Need help? Contact us:',
      toggleLabel: 'Please select your registration type below',
      toggleBooth: 'Book a Stand',
      toggleVisitor: 'Visitor Registration',
      boothFormTitle: 'Stand Booking Form',
      boothFormSub: 'Fill in your company details to reserve an exhibition space.',
      visitorFormTitle: 'Visitor Registration Form',
      visitorFormSub: 'Register to visit ProBuild INTIM 2026.',
      fields: {
        company: 'Company Name',
        companyPlaceholder: 'Your Company Name',
        pic: 'PIC Name',
        picPlaceholder: 'Full name of person in charge',
        email: 'Email',
        emailPlaceholder: 'email@company.com',
        phone: 'Phone Number',
        phonePlaceholder: '+62 812 3456 7890',
        category: 'Product Type / Category',
        categoryPlaceholder: '— Select category —',
        boothSize: 'Booth Size',
        boothSizePlaceholder: '— Select size —',
        message: 'Additional Message',
        messagePlaceholder: 'Special requirements, questions, or additional information...',
        name: 'Full Name',
        namePlaceholder: 'Your full name',
        whatsapp: 'WhatsApp Number',
        whatsappPlaceholder: '+62 812 3456 7890',
        position: 'Position (Optional)',
        positionPlaceholder: 'Your position in the company',
      },
      submitBooth: 'Submit Booking',
      submitVisitor: 'Register Now',
      loading: 'Processing...',
      note: '* By submitting this form, you agree to our',
      noteLink: 'terms and conditions',
      noteSuffix: '',
      successBoothTitle: 'Submission Received!',
      successVisitorTitle: 'Registration Submitted!',
      successBoothBody:
        'Thank you! Your stand booking details have been sent to our WhatsApp. Our team will contact you shortly for confirmation.',
      successVisitorBody:
        'Thank you! Your registration details have been sent to our WhatsApp. We will send you event information and get in touch soon.',
      successNote: '💬 If WhatsApp does not open automatically, please contact us directly at',
      successBoothBtn: 'Submit Another Booking',
      successVisitorBtn: 'Register Again',
      errors: {
        company: 'Company name is required',
        pic: 'PIC name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email format',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Invalid phone number',
        category: 'Please select a product category',
        boothSize: 'Please select a booth size',
        name: 'Name is required',
        whatsappRequired: 'WhatsApp number is required',
        whatsappInvalid: 'Invalid WhatsApp number',
      },
    },
  },

  // -----------------------------------------------
  // FOOTER
  // -----------------------------------------------
  footer: {
    id: {
      brandDesc:
        'Pameran konstruksi dan arsitektur terbesar Indonesia Timur. Platform bertemu, berinovasi, dan bertransaksi bagi seluruh ekosistem industri bangunan.',
      upcomingEvent: 'Event Terdekat',
      navTitle: 'Navigasi',
      exhibitorTitle: 'Exhibitor',
      contactTitle: 'Kontak',
      quickLinks: [
        { label: 'Tentang Event', href: '/tentang-kami' },
        { label: 'Keunggulan', href: '#why-attend' },
        { label: 'Sponsor', href: '#sponsors' },
        { label: 'Artikel', href: '/artikel' },
      ],
      exhibitorLinks: [
        { label: 'Booking Stand', href: '/#booking' },
        { label: 'Paket Sponsorship', href: '/booth', scrollTo: 'sponsorship' },
        { label: 'Layout Denah', href: '/booth', scrollTo: 'venue-layout' },
        { label: 'Peraturan Exhibitor', href: '/booth', scrollTo: 'download-documents' },
        { label: 'Jadwal Loading-Unloading', href: '/booth', scrollTo: 'download-documents' },
        {
          label: 'Jadwal Setup Booth - Move In Exhibitor',
          href: '/booth',
          scrollTo: 'download-documents',
        },
      ],
      copyright: '© 2026 ProBuild INTIM. Seluruh hak cipta dilindungi.',
    },
    en: {
      brandDesc:
        "Eastern Indonesia's largest construction and architecture exhibition. A platform to meet, innovate, and transact for the entire building industry ecosystem.",
      upcomingEvent: 'Upcoming Event',
      navTitle: 'Navigation',
      exhibitorTitle: 'Exhibitor',
      contactTitle: 'Contact',
      quickLinks: [
        { label: 'About the Event', href: '/tentang-kami' },
        { label: 'Why Attend', href: '#why-attend' },
        { label: 'Sponsors', href: '#sponsors' },
        { label: 'Articles', href: '/artikel' },
      ],
      exhibitorLinks: [
        { label: 'Book a Stand', href: '/#booking' },
        { label: 'Sponsorship Packages', href: '/booth', scrollTo: 'sponsorship' },
        { label: 'Floor Plan', href: '/booth', scrollTo: 'venue-layout' },
        { label: 'Exhibitor Regulations', href: '/booth', scrollTo: 'download-documents' },
        { label: 'Loading-Unloading Schedule', href: '/booth', scrollTo: 'download-documents' },
        { label: 'Booth Setup - Move In Schedule', href: '/booth', scrollTo: 'download-documents' },
      ],
      copyright: '© 2026 ProBuild INTIM. All rights reserved.',
    },
  },

  // -----------------------------------------------
  // ABOUT PAGE (/tentang-kami)
  // -----------------------------------------------
  aboutPage: {
    id: {
      heroSubtitle:
        'Pameran Konstruksi Terbesar di Indonesia Timur. Makassar sebagai gerbang utama inovasi dan kolaborasi infrastruktur masa depan.',
      heroTitle2: 'Bangun Masa Depan',
      heroTitle3: 'Indonesia Timur',
      statsLabels: ['Exhibitors', 'Visitors', 'Expert Speakers'],
      visionLabel: 'Tentang Kami',
      visionTitle: ['Gerbang Pembangunan', 'Berkelanjutan'],
      visionText1:
        'ProBuild 2026 adalah pameran konstruksi B2B terbesar di Indonesia Timur yang menghadirkan {exhibitor}+ exhibitor, {targetVisitor}+ pengunjung profesional, dan {speakers}+ pembicara ahli dari seluruh Indonesia. Event ini berfokus pada inovasi infrastruktur, material bangunan, teknologi digital konstruksi (BIM & AI), serta proyek strategis nasional dan pengembangan kawasan timur.',
      visionText2:
        'Didukung oleh Dinas Bina Marga & Bina Konstruksi (DBMBK) Sulawesi Selatan dan BJKW VI Makassar, ProBuild INTIM 2026 menargetkan lebih dari {targetVisitor} pengunjung profesional. Diselenggarakan di Makassar sebagai gateway Indonesia Timur, lokasi ini memiliki akses strategis melalui bandara internasional dan pelabuhan utama.',
      visionMission: [
        {
          icon: '🤝',
          title: 'Collaboration',
          description: 'Membangun sinergi antar pelaku industri.',
        },
        {
          icon: '💡',
          title: 'Innovation',
          description: 'Menampilkan teknologi konstruksi terdepan.',
        },
        {
          icon: '📈',
          title: 'Investment',
          description: 'Membuka peluang investasi untuk proyek daerah.',
        },
        {
          icon: '🌱',
          title: 'Green Infra',
          description: 'Fokus pada pembangunan ramah lingkungan.',
        },
      ],
      featuresTitle: 'Fitur Utama Event',
      features: [
        {
          icon: '👥',
          title: 'Business Matching',
          description:
            'Sesi khusus B2B untuk mempertemukan kontraktor dengan supplier material pilihan.',
        },
        {
          icon: '🎤',
          title: 'Conference & Seminar',
          description: 'Berbagi pengetahuan bersama pakar konstruksi nasional dan internasional.',
        },
        {
          icon: '🏗️',
          title: 'Expo & Demo',
          description:
            'Demonstrasi langsung alat berat dan teknologi konstruksi terbaru di lapangan.',
        },
        {
          icon: '⚙️',
          title: 'Digital Integration',
          description: 'Implementasi BIM (Building Information Modeling) dan digitalisasi proyek.',
        },
      ],
      agendaTitle: 'Agenda Acara',
      agenda: [
        {
          day: 'Hari ke 1',
          badge: 'Seremonial',
          icon: '🎉',
          title: 'Pembukaan Menteri PU, Expo + Demo Alat Berat',
          desc: 'Upacara pembukaan resmi oleh Menteri PU dan Gubernur Provinsi, dilanjutkan dengan demo alat berat dan teknologi konstruksi terkini',
        },
        {
          day: 'Hari ke 2',
          badge: 'Seminar',
          icon: '🎤',
          title: 'Konferensi "Inovasi Konstruksi Hijau" (10 Pembicara), Business Matching',
          desc: 'Keynote: Konstruksi Indonesia Timur 2030 - Visi pembangunan infrastruktur kawasan Indonesia Timur, dilanjutkan dengan sesi business matching B2B',
        },
        {
          day: 'Hari ke 3',
          badge: 'Pameran',
          icon: '🏗️',
          title: 'Kompetisi & Fasilitas SKK Gratis oleh BJKW VI',
          desc: 'Pameran terbuka — Hall A & B dengan 200+ booth exhibitor dari seluruh Indonesia, kompetisi inovasi konstruksi, dan fasilitas sertifikasi gratis',
        },
        {
          day: 'Hari ke 4',
          badge: 'Workshop',
          icon: '💻',
          title: 'Deal Signing, Award "Best Innovator Konstruksi Timur"',
          desc: 'Workshop: BIM untuk Proyek Skala Menengah - Praktis dan langsung diterapkan di lapangan, penandatanganan MoU, dan penganugerahan award',
        },
      ],
    },
    en: {
      heroSubtitle:
        "Eastern Indonesia's Largest Construction Exhibition. Makassar as the main gateway for future infrastructure innovation and collaboration.",
      heroTitle2: 'Building the Future of',
      heroTitle3: 'Eastern Indonesia',
      statsLabels: ['Exhibitors', 'Visitors', 'Expert Speakers'],
      visionLabel: 'About Us',
      visionTitle: ['Gateway to Sustainable', 'Development'],
      visionText1:
        'ProBuild 2026 is the largest B2B construction exhibition in Eastern Indonesia, featuring {exhibitor}+ exhibitors, {targetVisitor}+ professional visitors, and {speakers}+ expert speakers from across Indonesia. The event focuses on infrastructure innovation, building materials, digital construction technology (BIM & AI), and national strategic projects and Eastern region development.',
      visionText2:
        'Supported by the Directorate of Roads & Construction (DBMBK) South Sulawesi Province and BJKW VI Makassar, ProBuild INTIM 2026 targets more than {targetVisitor} professional visitors. Held in Makassar as the gateway to Eastern Indonesia, the location has strategic access through international airports and major seaports.',
      visionMission: [
        {
          icon: '🤝',
          title: 'Collaboration',
          description: 'Building synergy among industry players.',
        },
        {
          icon: '💡',
          title: 'Innovation',
          description: 'Showcasing cutting-edge construction technology.',
        },
        {
          icon: '📈',
          title: 'Investment',
          description: 'Opening investment opportunities for regional projects.',
        },
        {
          icon: '🌱',
          title: 'Green Infra',
          description: 'Focus on environmentally friendly construction.',
        },
      ],
      featuresTitle: 'Key Event Features',
      features: [
        {
          icon: '👥',
          title: 'Business Matching',
          description:
            'Special B2B sessions connecting contractors with preferred material suppliers.',
        },
        {
          icon: '🎤',
          title: 'Conference & Seminar',
          description: 'Knowledge sharing with national and international construction experts.',
        },
        {
          icon: '🏗️',
          title: 'Expo & Demo',
          description:
            'Live demonstrations of heavy equipment and the latest construction technology.',
        },
        {
          icon: '⚙️',
          title: 'Digital Integration',
          description:
            'Implementation of BIM (Building Information Modeling) and project digitalization.',
        },
      ],
      agendaTitle: 'Event Agenda',
      agenda: [
        {
          day: 'Day 1',
          badge: 'Ceremonial',
          icon: '🎉',
          title: 'Opening by Minister of Public Works, Expo + Heavy Equipment Demo',
          desc: 'Official opening ceremony by the Minister of Public Works and Provincial Governor, followed by heavy equipment demonstrations and the latest construction technology',
        },
        {
          day: 'Day 2',
          badge: 'Seminar',
          icon: '🎤',
          title: 'Conference "Green Construction Innovation" (10 Speakers), Business Matching',
          desc: 'Keynote: Eastern Indonesia Construction 2030 – Vision of infrastructure development in Eastern Indonesia, followed by B2B business matching sessions',
        },
        {
          day: 'Day 3',
          badge: 'Exhibition',
          icon: '🏗️',
          title: 'Competition & Free SKK Certification by BJKW VI',
          desc: 'Open exhibition — Hall A & B with 200+ exhibitor booths from across Indonesia, construction innovation competition, and free certification facilities',
        },
        {
          day: 'Day 4',
          badge: 'Workshop',
          icon: '💻',
          title: 'Deal Signing, Award "Best Innovator of Eastern Construction"',
          desc: 'Workshop: BIM for Medium-Scale Projects – Practical and directly applied in the field, MoU signings, and award ceremony',
        },
      ],
    },
  },

  // -----------------------------------------------
  // BOOTH PAGE (/booth)
  // -----------------------------------------------
  boothPage: {
    id: {
      heroTitle: 'Venue & Booth',
      heroSubtitle:
        'Pilih lokasi booth strategis Anda untuk eksposur maksimal selama ProBuild INTIM 2026.',
      venueLabel: 'VENUE LAYOUT',
      venueTitle: 'Venue Layout',
      venueSubtitle: 'Denah lokasi pameran ProBuild INTIM 2026',
      zoomHint: 'Klik untuk memperbesar',
      packagesLabel: 'EXHIBITION PACKAGE',
      packagesTitle: 'Pilih Paket Exhibitor',
      packagesSubtitle: 'Sesuaikan dengan target pemasaran dan kebutuhan branding Anda.',
      popularBadge: 'PALING POPULER',
      contactBtn: 'Contact for Pricing',
      sponsorLabel: 'SPONSORSHIP PACKAGE',
      sponsorTitle: 'Paket Sponsorship',
      sponsorSubtitle: 'Perkuat kehadiran brand Anda di industri konstruksi nasional.',
      sponsorColLevel: 'TINGKAT LEVEL',
      sponsorColPrivileges: 'HAK ISTIMEWA (KEY PRIVILEGES)',
      sponsorCta: 'Hubungi Kami untuk Penawaran',
      downloadLabel: 'DOKUMEN PENTING',
      downloadTitle: 'Download Dokumen',
      downloadSubtitle: 'Unduh dokumen penting terkait ProBuild INTIM 2026.',
      docs: [
        {
          title: 'Peraturan Exhibition',
          desc: 'Peraturan dan ketentuan yang harus dipatuhi oleh seluruh exhibitor selama event berlangsung.',
          btn: 'Download PDF',
        },
        {
          title: 'Jadwal Setup Booth',
          desc: 'Jadwal lengkap setup booth dan move-in exhibitor untuk mempersiapkan area pameran Anda.',
          btn: 'Download PDF',
        },
        {
          title: 'Jadwal Loading & Unloading',
          desc: 'Jadwal loading dan unloading booth untuk memastikan kelancaran proses bongkar muat barang.',
          btn: 'Download PDF',
        },
      ],
      packages: [
        {
          tagline: 'Eksisi untuk startup & UKM',
          features: ['Ukuran Booth 9 m²', 'Booth standar, lebar 3kW', 'Logo di website ProBuild'],
        },
        {
          tagline: 'Untuk brand yang berkembang',
          features: ['Ukuran Booth 18 m²', 'Booth custom & Demo area'],
        },
        {
          tagline: 'Dominasi pasar utama',
          features: [
            'Ukuran Booth 36 m²',
            'Booth Pavilion & Sponsorship Seminar',
            'Lokasi VIP strategis & Prioritas Leads',
          ],
        },
      ],
      sponsorPackages: [
        {
          privileges: [
            'Naming rights event utama',
            'Booth strategis berukuran 54m²',
            'Keynote speaker slot di seminar utama',
            'Penempatan logo pada banner utama & materi promo',
          ],
        },
        {
          privileges: [
            'Co-branding seminar sesi pilihan',
            'Booth strategis berukuran 36m²',
            'Logo eksklusif di materi promosi digital',
            'Penyebutan brand oleh MC di setiap sesi',
          ],
        },
        {
          privileges: [
            'Booth berukuran 18m²',
            'Penempatan logo di backdrop utama panggung',
            '10 Tiket VIP untuk tamu undangan',
            'Distribusi brosur di area registrasi',
          ],
        },
        {
          privileges: [
            'Slot iklan di aplikasi ProBuild & LED venue',
            'Sesi interview eksklusif dengan media partner',
            'Akses ke media center & press room',
            'Penyebutan di press release resmi',
          ],
        },
      ],
      waMessageBooth: (name) =>
        `Halo, saya tertarik untuk booking booth di ProBuild INTIM 2026. Saya ingin mengetahui lebih lanjut mengenai Paket ${name} — termasuk ketersediaan lokasi, fasilitas yang didapat, serta proses pendaftarannya. Bisakah Anda membantu saya?`,
      waMessageSponsor: (name) =>
        `Halo, saya tertarik untuk menjadi sponsor di ProBuild INTIM 2026. Saya ingin mengetahui lebih lanjut mengenai Paket Sponsorship ${name} — termasuk hak istimewa, visibilitas brand, dan detail kerja samanya. Bisakah Anda memberikan informasi lebih lanjut?`,
    },
    en: {
      heroTitle: 'Venue & Booth',
      heroSubtitle:
        'Choose your strategic booth location for maximum exposure during ProBuild INTIM 2026.',
      venueLabel: 'VENUE LAYOUT',
      venueTitle: 'Venue Layout',
      venueSubtitle: 'Floor plan of the ProBuild INTIM 2026 exhibition venue',
      zoomHint: 'Click to zoom',
      packagesLabel: 'EXHIBITION PACKAGE',
      packagesTitle: 'Choose Your Exhibitor Package',
      packagesSubtitle: 'Tailored to your marketing goals and branding needs.',
      popularBadge: 'MOST POPULAR',
      contactBtn: 'Contact for Pricing',
      sponsorLabel: 'SPONSORSHIP PACKAGE',
      sponsorTitle: 'Sponsorship Packages',
      sponsorSubtitle: 'Strengthen your brand presence in the national construction industry.',
      sponsorColLevel: 'LEVEL TIER',
      sponsorColPrivileges: 'KEY PRIVILEGES',
      sponsorCta: 'Contact Us for Offer',
      downloadLabel: 'IMPORTANT DOCUMENTS',
      downloadTitle: 'Download Documents',
      downloadSubtitle: 'Download important documents related to ProBuild INTIM 2026.',
      docs: [
        {
          title: 'Exhibition Regulations',
          desc: 'Regulations and terms that all exhibitors must comply with during the event.',
          btn: 'Download PDF',
        },
        {
          title: 'Booth Setup Schedule',
          desc: 'Complete booth setup and exhibitor move-in schedule to prepare your exhibition area.',
          btn: 'Download PDF',
        },
        {
          title: 'Loading & Unloading Schedule',
          desc: 'Booth loading and unloading schedule to ensure a smooth goods handling process.',
          btn: 'Download PDF',
        },
      ],
      packages: [
        {
          tagline: 'Ideal for startups & SMEs',
          features: ['Booth Size 9 m²', 'Standard booth, 3kW power', 'Logo on ProBuild website'],
        },
        {
          tagline: 'For growing brands',
          features: ['Booth Size 18 m²', 'Custom booth & Demo area'],
        },
        {
          tagline: 'Dominate the main market',
          features: [
            'Booth Size 36 m²',
            'Pavilion Booth & Seminar Sponsorship',
            'VIP strategic location & Priority Leads',
          ],
        },
      ],
      sponsorPackages: [
        {
          privileges: [
            'Main event naming rights',
            'Strategic booth 54m²',
            'Keynote speaker slot at main seminar',
            'Logo placement on main banners & promo materials',
          ],
        },
        {
          privileges: [
            'Co-branding selected seminar sessions',
            'Strategic booth 36m²',
            'Exclusive logo on digital promo materials',
            'Brand mention by MC at every session',
          ],
        },
        {
          privileges: [
            'Booth 18m²',
            'Logo placement on main stage backdrop',
            '10 VIP Tickets for invited guests',
            'Brochure distribution at registration area',
          ],
        },
        {
          privileges: [
            'Ad slot on ProBuild app & venue LED',
            'Exclusive interview session with media partner',
            'Access to media center & press room',
            'Mentioned in official press release',
          ],
        },
      ],
      waMessageBooth: (name) =>
        `Hello, I am interested in booking a booth at ProBuild INTIM 2026. I would like to know more about the ${name} Package — including location availability, included facilities, and the registration process. Could you help me?`,
      waMessageSponsor: (name) =>
        `Hello, I am interested in becoming a sponsor at ProBuild INTIM 2026. I would like to know more about the ${name} Sponsorship Package — including privileges, brand visibility, and partnership details. Could you provide more information?`,
    },
  },

  // -----------------------------------------------
  // PARALLAX (home section)
  // -----------------------------------------------
  parallax: {
    id: {
      headline1: 'Jelajahi Inovasi,',
      headline2: 'Perluas Koneksi, dan',
      headlineAccent: 'Peluang Baru',
      body: 'ProBuild menghadirkan ribuan pelaku industri dalam satu ekosistem kolaboratif.\n Dapatkan insight strategis, temukan solusi inovatif, dan bangun koneksi langsung dengan pengambil keputusan proyek nasional.',
      cta: 'Daftar Sebagai Visitor',
      features: [
        { icon: '🤝', text: '100+ Exhibitor' },
        { icon: '👥', text: '15.000+ Pengunjung' },
        { icon: '💡', text: '20+ Pembicara Profesional' },
        { icon: '📍', text: eventInfo.venue },
      ],
    },
    en: {
      headline1: 'Explore Innovation,',
      headline2: 'Your Network, and',
      headlineAccent: 'New Opportunities',
      body: 'ProBuild brings thousands of industry players together in one collaborative ecosystem.\n Gain strategic insights, discover innovative solutions, and build direct connections with national project decision-makers.',
      cta: 'Register as a Visitor',
      features: [
        { icon: '🤝', text: '100+ Exhibitors' },
        { icon: '👥', text: '15,000+ Visitors' },
        { icon: '💡', text: '20+ Professional Speakers' },
        { icon: '📍', text: eventInfo.venue },
      ],
    },
  },

  // -----------------------------------------------
  // PROJECT PREPARATION (home section)
  // -----------------------------------------------
  projectPreparation: {
    id: {
      label: 'Project Preparation',
      titleAccent: 'Strategi',
      titleSuffix: 'di Balik Panggung',
      subtitle:
        'Sebuah event berskala industri tidak dibangun dalam semalam. Ia lahir dari diskusi strategis bersama mitra, koordinasi lintas sektor, dan perencanaan detail yang matang.',
      strong: 'Karena kualitas sebuah expo ditentukan jauh sebelum pintu dibuka.',
    },
    en: {
      label: 'Project Preparation',
      titleAccent: 'The Strategy',
      titleSuffix: 'Behind the Stage',
      subtitle:
        'An industry-scale event is not built overnight. It is born from strategic discussions with partners, cross-sector coordination, and thorough detailed planning.',
      strong: 'Because the quality of an expo is determined long before the doors open.',
    },
  },
};
