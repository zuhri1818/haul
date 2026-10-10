import { SesepuhLeluhur, AgendaAcara, TahlilItem, TitipDoaArwah } from '../types.ts';

export const SEJARAH_DESA = {
  judul: "Tanah Kenangan & Peradaban Santri Desa Bangeran Lebak",
  kutipanUtama: "Di tanah yang penuh kenangan, di tengah masyarakat yang menjunjung tinggi nilai-nilai keislaman. Haul Akbar Desa Bangeran Lebak, merawat tradisi, mempererat silaturahmi, dan mengenang jasa para leluhur. Semoga kebersamaan ini membawa keberkahan dan senantiasa dalam rida Allah Subhanahu wa Ta'ala.",
  narasi: [
    "Desa Bangeran Lebak berdiri kokoh di atas pondasi perjuangan para auliya dan sesepuh pendahulu. Dahulu kala, tanah ini merupakan bentangan hutan rindang di tepi lembah yang dialiri mata air jernih. Para cikal bakal desa—yang dipimpin oleh Kyai Ageng Bangeran (Mbah Nur Salim)—membuka lahan ini bukan sekadar untuk tempat bermukim, melainkan sebagai pusat syiar tauhid dan persaudaraan.",
    "Nilai-nilai keislaman menyatu erat dengan urat nadi masyarakat. Dari generasi ke generasi, surau-surau dan pesantren tua di Bangeran Lebak menjadi lentera ilmu. Tradisi gotong royong, saling menghantarkan berkat kenduri, serta menghormati yang lebih sepuh menjadi akhlak yang terus diwariskan.",
    "Haul Akbar ini adalah momentum sakral tahunan. Ini bukan sekadar ritual peringatan kematian, melainkan madrasah rasa syukur. Di sinilah para anak cucu yang merantau ke penjuru negeri pulang melepas rindu, bersimpuh di makam leluhur, membasahi lisan dengan kalimah tahlil, serta memperkokoh tali silaturahmi agar keberkahan tak pernah terputus dari tanah kelahiran tercinta."
  ],
  maknaHaul: [
    {
      poin: "Merawat Tradisi (Ngalap Berkah)",
      deskripsi: "Menjaga amaliyah Ahlussunnah wal Jama'ah: ziarah kubur, tahlil akbar, dan sedekah makanan (ambeng haul) yang telah mengakar ratusan tahun."
    },
    {
      poin: "Mempererat Silaturahmi",
      deskripsi: "Menghubungkan warga yang bermukim di desa dengan sanak saudara perantauan dalam satu majelis cinta dan kekeluargaan."
    },
    {
      poin: "Mengenang Jasa Leluhur (Birrul Walidain)",
      deskripsi: "Bentuk bakti tertinggi kepada para pendahulu dan orang tua yang telah mendahului, menghadiahkan doa dan istighfar tanpa henti."
    },
    {
      poin: "Menjemput Rida Allah Ta'ala",
      deskripsi: "Mengetuk pintu langit agar Desa Bangeran Lebak senantiasa dijauhkan dari marabahaya, makmur gemah ripah loh jinawi."
    }
  ]
};

export const LELUHUR_LIST: SesepuhLeluhur[] = [
  {
    id: "leluhur-1",
    nama: "Kyai Ageng Bangeran (Mbah Nur Salim)",
    gelar: "Babat Alas & Perintis Syiar Islam Desa",
    era: "Abad ke-18 Masehi",
    peran: "Pendiri cikal bakal Desa Bangeran Lebak, penyebar dakwah tauhid, dan penggagas sumber mata air berkah sendang desa.",
    kisah: "Beliau dikenal sebagai sosok alim yang zuhud dan memiliki karamah keteduhan hati. Bersama para santri awalnya, beliau menata pemukiman dengan menjadikan musholla panggung kayu jati sebagai poros kehidupan warga, mengajarkan adab bertani yang halal, serta menyatukan berbagai suku yang berdatangan.",
    wasiat: "Ojo lali marang Gusti Allah, podho rukuno sak pepadha, lan rumaten tanah iki kanthi dongo lan kalimah thoyyibah.",
    lokasiMakam: "Kompleks Pesarean Agung Bangeran Lebak (Kubah Utama Sisi Timur)",
    fatihahCount: 1420
  },
  {
    id: "leluhur-2",
    nama: "Nyai Ageng Bangeran (Mbah Dewi Siti Fatimah)",
    gelar: "Ibu Pengayom & Teladan Kesantunan",
    era: "Abad ke-18 Masehi",
    peran: "Penggagas tradisi dapur berkah, pembina akhlak para putri desa, dan perawat lumbung sedekah pangan.",
    kisah: "Sosok wanita shalihah yang membimbing masyarakat dalam kebersihan hati dan rumah tangga islami. Dari tangan dingin beliaulah lahir tradisi memasak nasi tumpeng ambeng gotong royong yang hingga kini menjadi ikon Haul Akbar Desa Bangeran Lebak.",
    wasiat: "Mulyakno tamumu, cukupno piringe tangga teparomu, lan tansah asih marang bocah yatim lan wong apes.",
    lokasiMakam: "Kompleks Pesarean Agung Bangeran Lebak (Sisi Selatan Kubah)",
    fatihahCount: 980
  },
  {
    id: "leluhur-3",
    nama: "Kyai Hasan Basyari (Mbah Guru Hasan)",
    gelar: "Ulama Perintis Madrasah & Kitab Kuning",
    era: "Awal Abad ke-20 Masehi",
    peran: "Pendiri madrasah diniyah tertua di Bangeran Lebak, guru ngaji Al-Qur'an ratusan generasi, pejuang moral kemerdekaan.",
    kisah: "Semasa hidupnya mendedikasikan seluruh waktu untuk mengajar anak-anak mengeja hijaiyah dan menghafal surat-surat pendek. Rumah panggungnya tak pernah sepi dari dengung lantunan ayat suci sejak fajar hingga larut malam.",
    wasiat: "Satu huruf Al-Qur'an sing kok ajarake marang anak-putu bakal dadi pelita padhang nalika jasadmu wis sumimpen ing jero bumi.",
    lokasiMakam: "Kompleks Pesarean Timur Bangeran Lebak",
    fatihahCount: 865
  },
  {
    id: "leluhur-4",
    nama: "Kyai Ahmad Shodiq",
    gelar: "Sesepuh Thariqah & Perekat Ukhuwah",
    era: "Pertengahan Abad ke-20 Masehi",
    peran: "Peneguh majelis shalawat, tahlil keliling desa, dan juru damai masyarakat.",
    kisah: "Dikenal sangat santun dalam bertutur kata. Setiap perselisihan warga diselesaikan beliau dengan mengajak minum wedang jahe bersama di serambi surau sembari membaca shalawat tibbil qulub.",
    wasiat: "Ati sing resik ora gampang nesu. Menawa kepingin tentrem desamu, basahana lambemu klawan shalawat marang Kanjeng Nabi.",
    lokasiMakam: "Kompleks Makam Santri Bangeran Lebak",
    fatihahCount: 740
  },
  {
    id: "leluhur-5",
    nama: "Para Pejuang, Cikal Bakal, & Arwah Jama'ah Desa",
    gelar: "Para Sesepuh, Kepala Desa Sepuh, & Orang Tua Pendahulu",
    era: "Leluhur Lintas Generasi",
    peran: "Petani perintis, perawat musholla, tetua kampung, dan orang tua terdahulu yang menanam pohon kebajikan untuk anak cucu.",
    kisah: "Mereka yang kuburnya terhampar di tanah Bangeran Lebak, yang peluh dan doanya menjadikan desa ini aman, damai, dan penuh barakah seperti hari ini.",
    wasiat: "Terusna lelakon becik, jogo ukhuwah islamiyah, ojo nganti pedhot anggonmu ndongakake bopo-biyung.",
    lokasiMakam: "Pemakaman Umum & Makam Keluarga Bangeran Lebak",
    fatihahCount: 2310
  }
];

export const AGENDA_HAUL: AgendaAcara[] = [
  {
    id: "agenda-1",
    tanggal: "Kamis Legi",
    waktu: "05.30 - 16.00 WIB",
    namaAcara: "Khotmil Qur'an Bil Ghoib 30 Juz",
    tempat: "Masjid Jami' Baiturrahim & Kubah Makam Leluhur",
    deskripsi: "Lantunan 30 juz Al-Qur'an bil ghoib secara serentak oleh para hafidz-hafidzah dan santri se-Kecamatan, mendoakan keselamatan seluruh warga desa.",
    pengisiAcara: "Jam'iyyatul Qurra' wal Huffadz & Santri Sepuh",
    kategori: "quran"
  },
  {
    id: "agenda-2",
    tanggal: "Jumat Pahing",
    waktu: "06.30 - 11.00 WIB",
    namaAcara: "Ziarah Akbar, Tabur Bunga, & Tahlil Jama'i",
    tempat: "Kompleks Pesarean Agung Desa Bangeran Lebak",
    deskripsi: "Prosesi ziarah akbar seluruh warga mukim dan perantau, dipimpin sesepuh desa untuk menghadiahkan tahlil dan doa arwah bersama.",
    pengisiAcara: "Imam Tahlil: KH. Munawwir & KH. Manshur",
    kategori: "ziarah"
  },
  {
    id: "agenda-3",
    tanggal: "Jumat Pahing",
    waktu: "13.30 - 17.30 WIB",
    namaAcara: "Dapur Berkah & Distribusi 2.000 Ambeng Haul",
    tempat: "Halaman Dapur Umum Balai Desa Bangeran Lebak",
    deskripsi: "Tradisi gotong royong memasak nasi berkat ambeng haul khas Bangeran Lebak, disajikan untuk para jamaah, tamu kehormatan, dan warga.",
    pengisiAcara: "Ibu-Ibu Muslimat & Pemuda Ansor Bangeran Lebak",
    kategori: "dapur"
  },
  {
    id: "agenda-4",
    tanggal: "Jumat Malam Sabtu Pon",
    waktu: "18.30 - 20.00 WIB",
    namaAcara: "Kirab Obor Santri & Silaturahmi Akbar Perantau",
    tempat: "Rute Mengelilingi Jalan Utama Desa Bangeran Lebak",
    deskripsi: "Pawai obor bambu lambang syiar cahaya kebaikan dipadukan dengan temu kangen silaturahmi perantau yang kembali ke tanah kelahiran.",
    pengisiAcara: "Keluarga Besar Perantau & Santri TPQ/Madrasah",
    kategori: "pawai"
  },
  {
    id: "agenda-5",
    tanggal: "Jumat Malam Sabtu Pon",
    waktu: "20.00 - Selesai WIB",
    namaAcara: "Puncak Haul Akbar: Pengajian Umum & Shalawat Kebangsaan",
    tempat: "Panggung Utama Lapangan Desa Bangeran Lebak",
    deskripsi: "Mau'idhoh Hasanah oleh para Habaib & Alim Ulama, pembacaan Manakib para sesepuh, gema shalawat hadrah, dan doa bersama untuk keutuhan negeri.",
    pengisiAcara: "Para Habaib, Masyayikh, Hadrah Al-Muqorrobin & Forkopimda",
    kategori: "pengajian"
  }
];

export const TAHLIL_DATA: TahlilItem[] = [
  {
    id: "tahlil-1",
    judul: "1. Hadrah / Tawassul Fatihah untuk Baginda Nabi & Para Leluhur",
    arab: "إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَآلِهِ وَصَحْبِهِ وَأَزْوَاجِهِ وَذُرِّيَّاتِهِ أَجْمَعِينَ، ثُمَّ إِلَى أَرْوَاحِ جَمِيعِ آبَائِنَا وَأُمَّهَاتِنَا، وَخُصُوصًا إِلَى أَرْوَاحِ سَلَفِنَا الصَّالِحِينَ وَمُؤَسِّسِي قَرْيَةِ بَانْجِيرَانْ لِيبَاكْ: الْكِيَاهِي أَكِنْجْ بَانْجِيرَانْ، وَنْيَائِي أَكِنْجْ بَانْجِيرَانْ، وَالْكِيَاهِي حَسَن بَصْرِي، وَجَمِيعِ أَهْلِ الْقُبُورِ مِنْ هَذِهِ الْقَرْيَةِ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ...",
    latin: "Ilaa hadhratin Nabiyyil Musthafa Muhammadin shallallahu 'alaihi wa sallama wa aalihii wa shahbihii wa azwaajihii wa dzurriyyatihii ajma'iin, tsumma ilaa arwaahi jamii'i aabaa-inaa wa ummahaatinaa, wa khushuushan ilaa arwaahi salafinas shaalihiin wa mu'assisi qaryati Bangeran Lebak: Al-Kiyahi Ageng Bangeran, wa Nya'i Ageng Bangeran, wal Kiyahi Hasan Bashri, wa jamii'i ahlil qubuuri min haadzihil qaryati, syai-un lillaahi lahumul Faatihah...",
    arti: "Ditujukan ke hadirat Nabi pilihan Muhammad SAW beserta keluarga, sahabat, para istri, dan keturunannya. Kemudian kepada ruh-ruh segenap ayah kami, ibu kami, dan terkhusus kepada ruh para sesepuh yang sholeh serta para pendiri Desa Bangeran Lebak: Kyai Ageng Bangeran, Nyai Ageng Bangeran, Kyai Hasan Basyari, dan seluruh ahli kubur dari desa ini, karena Allah, bagi mereka Al-Fatihah..."
  },
  {
    id: "tahlil-2",
    judul: "2. Surat Al-Ikhlas (3x)",
    arab: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ هُوَ اللّٰهُ اَحَدٌ، اَللّٰهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُوْلَدْ، وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ.",
    latin: "Bismillaahir-rahmaanir-rahiim. Qul huwallaahu ahad, Allaahush-shamad, Lam yalid wa lam yuulad, Wa lam yakun lahu kufuwan ahad.",
    arti: "Katakanlah (Muhammad): Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tiada beranak dan tiada pula diperanakkan. Dan tidak ada seorang pun yang setara dengan Dia.",
    jumlahBacaan: "Dibaca 3 kali"
  },
  {
    id: "tahlil-3",
    judul: "3. Tahlil & Tasbih Dzikir Akbar",
    arab: "لَا إِلٰهَ إِلَّا اللّٰهُ (١٠٠× / ٣٣×)\nسُبْحَانَ اللّٰهِ وَبِحَمْدِهِ سُبْحَانَ اللّٰهِ الْعَظِيمِ (٣٣×)\nيَا حَيُّ يَا قَيُّومُ لَا إِلٰهَ إِلَّا أَنْتَ",
    latin: "Laa ilaaha illallaah (33x atau 100x)\nSubhaanallaahi wa bihamdihii subhaanallaahil 'azhiim (33x)\nYaa Hayyu yaa Qayyuum laa ilaaha illaa Anta",
    arti: "Tiada Tuhan selain Allah. Maha Suci Allah dengan segala puji-Nya, Maha Suci Allah Yang Maha Agung. Wahai Dzat Yang Maha Hidup, Maha Berdiri Sendiri, tiada Tuhan selain Engkau.",
    jumlahBacaan: "33x atau 100x"
  },
  {
    id: "tahlil-4",
    judul: "4. Doa Khusus Haul & Arwah Jama'ah Desa Bangeran Lebak",
    arab: "اَللّٰهُمَّ تَقَبَّلْ وَأَوْصِلْ ثَوَابَ مَا قَرَأْنَاهُ مِنَ الْقُرْآنِ الْعَظِيمِ وَمَا هَلَّلْنَا وَمَا سَبَّحْنَا هَدِيَّةً وَاصِلَةً وَرَحْمَةً نَازِلَةً وَبَرَكَةً شَامِلَةً إِلَى حَضْرَةِ حَبِيبِنَا وَشَفِيعِنَا رَسُولِ اللّٰهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ وَالِدِينَا وَأَجْدَادِنَا وَمَشَايِخِنَا، وَخُصُوصًا إِلَى أَرْوَاحِ الْمَغْفُورِ لَهُمْ سَلَفِ وَأَهْلِ قَرْيَةِ بَانْجِيرَانْ لِيبَاكْ، اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ، وَاجْعَلْ قُبُورَهُمْ رَوْضَةً مِنْ رِيَاضِ الْجَنَّةِ، وَلَا تَجْعَلْ قُبُورَهُمْ حُفْرَةً مِنْ حُفَرِ النِّيرَانِ. اللّٰهُمَّ بَارِكْ فِي أَهْلِ هَذِهِ الْقَرْيَةِ جَمْعًا وَأَلِّفْ بَيْنَ قُلُوبِهِمْ فِي الْخَيْرِ وَالسَّلَامَةِ.",
    latin: "Allaahumma taqabbal wa aushil tsawaaba maa qara'naahu minal Qur'aanil 'azhiim wa maa hallalnaa wa maa sabbahnaa hadiyyatan waashilatan wa rahmatan naazilatan wa barakatan syaamilatan ilaa hadhrati habiibinaa wa syafii'inaa Rasuulillaahi shallallaahu 'alaihi wa sallam, tsumma ilaa arwaahi waalidiinaa wa ajdaadinaa wa masyaayikhinaa, wa khushuushan ilaa arwaahil maghfuuri lahum salafi wa ahli qaryati Bangeran Lebak, Allaahummaghfir lahum warhamhum wa 'aafihim wa'fu 'anhum, waj'al qubuurahum raudhatan min riyaadhil jannah, wa laa taj'al qubuurahum hufratan min hufarin niiraan. Allaahumma baarik fii ahli haadzihil qaryati jam'an wa allif baina quluubihim fil khairi was salaamah.",
    arti: "Ya Allah, terimalah dan sampaikanlah pahala ayat-ayat Al-Qur'an yang telah kami baca, tahlil kami, serta tasbih kami sebagai hadiah yang sampai, rahmat yang turun, dan berkah yang menyeluruh ke hadirat kekasih kami Nabi Muhammad SAW. Kemudian kepada arwah orang tua kami, kakek-nenek kami, para guru kami, dan terkhusus kepada arwah para sesepuh serta segenap ahli kubur Desa Bangeran Lebak. Ya Allah, ampunilah mereka, rahmatilah mereka, maafkanlah kesalahan mereka, jadikanlah kubur mereka taman dari taman-taman surga, dan jangan jadikan kubur mereka lubang dari lubang api neraka. Ya Allah, berkahilah seluruh warga desa ini, dan satukanlah hati mereka dalam kebaikan dan keselamatan."
  }
];

export const INITIAL_TITIP_DOA: TitipDoaArwah[] = [
  {
    id: "doa-1",
    pengirim: "Haji Ahmad Zuhri & Keluarga",
    asal: "Dusun Bangeran Lebak Barat (RT 02)",
    namaArwah: [
      "Alm. Kyai Nur Salim",
      "Almh. Hj. Aminah binti Hasan",
      "Alm. Bapak H. Suparman"
    ],
    doaKhusus: "Mugi sedoyo amal ibadah pinaringan ridho saking Gusti Allah, dipun paringi jembar kubure, lan pinanggih ing suwargo firdaus. Aamiin.",
    waktu: "10 menit yang lalu",
    fatihahHadiahCount: 42
  },
  {
    id: "doa-2",
    pengirim: "Keluarga Perantau Bangeran di Surabaya",
    asal: "Perantauan Surabaya (Warga Asli RT 04)",
    namaArwah: [
      "Alm. Mbah Marto Pawiro",
      "Almh. Simbah Nyai Kasinah",
      "Alm. Mas Teguh Widodo"
    ],
    doaKhusus: "Senajan tebih saking kampung halaman, manah kawulo tansah nyawiji ing donga kagem para leluhur Bangeran Lebak. Mugi tansah pinaringan berkah.",
    waktu: "35 menit yang lalu",
    fatihahHadiahCount: 29
  },
  {
    id: "doa-3",
    pengirim: "Ustadz M. Ridwan Effendi",
    asal: "Dusun Krajan Bangeran Lebak",
    namaArwah: [
      "Alm. Kyai Hasan Basyari",
      "Alm. Ustadz Syamsul Hadi",
      "Para Guru Ngaji & Pejuang Madrasah Diniyah"
    ],
    doaKhusus: "Jazakumullah khairan katsiran atas setiap huruf ilmu tauhid dan ngaji yang telah diwariskan kepada anak cucu di desa kami.",
    waktu: "1 jam yang lalu",
    fatihahHadiahCount: 56
  },
  {
    id: "doa-4",
    pengirim: "Siti Rahmawati & Sedulur Perantau Jakarta",
    asal: "Perantauan Jabodetabek",
    namaArwah: [
      "Alm. Bapak H. Suharjo",
      "Almh. Ibu Siti Maimunah",
      "Alm. Dhimas Prasetyo"
    ],
    doaKhusus: "Semoga haul akbar ini mempererat paseduluran kita semua dan mengharumkan nama para leluhur yang telah berpulang.",
    waktu: "2 jam yang lalu",
    fatihahHadiahCount: 38
  }
];

export const ADAB_ZIARAH = [
  {
    nomor: "01",
    judul: "Bersuci & Berwudhu",
    deskripsi: "Disunnahkan dalam keadaan suci dari hadats kecil dan besar sebelum melangkahkan kaki ke area pesarean leluhur."
  },
  {
    nomor: "02",
    judul: "Mengucapkan Salam Ahlul Kubur",
    deskripsi: "Membaca salam saat memasuki gerbang makam: 'Assalamu'alaikum daara qaumin mu'miniin, wa innaa insyaa-Allaahu bikum laahiquun'."
  },
  {
    nomor: "03",
    judul: "Menjaga Ketenangan & Khusyuk",
    deskripsi: "Tidak melangkahi atau menduduki nisan, menjaga tutur kata, tidak tertawa terbahak-bahak, dan merenungkan akhirat."
  },
  {
    nomor: "04",
    judul: "Menghadap Kiblat Saat Berdoa",
    deskripsi: "Saat membaca tahlil atau doa, menghadap ke arah kiblat atau membelakangi kiblat menghadap wajah mayit dengan penuh ketulusan."
  },
  {
    nomor: "05",
    judul: "Sedekah Bunga & Air Ziarah",
    deskripsi: "Meletakkan pelepah hijau/bunga segar yang senantiasa bertasbih kepada Allah untuk meringankan beban ahli kubur."
  }
];

export const INFO_LOKASI = {
  namaTempat: "Kompleks Pesarean Agung & Masjid Jami' Bangeran Lebak",
  alamat: "Jl. Kyai Ageng Bangeran No. 01, Desa Bangeran Lebak",
  fasilitas: [
    { nama: "Area Tenda Tamu & Jamaah", detail: "Kapasitas 3.500 jamaah (area pria & wanita dipisah nyaman)" },
    { nama: "Dapur Berkah Ambeng Haul", detail: "Pos penyerahan beras dan gotong royong tumpeng di balai desa" },
    { nama: "Posko Medis & Ambulans", detail: "Didukung petugas kesehatan puskesmas & relawan Banser Husada" },
    { nama: "Area Parkir Terpadu", detail: "Lapangan Desa & Lapangan Madrasah (roda 2 & roda 4 tertata aman)" },
    { nama: "Tempat Wudhu & Toilet Ramah Lansia", detail: "Tersedia di 4 titik sekitar makam dan serambi masjid" }
  ],
  kontakPanitia: {
    ketua: "H. Mustofa S.Pd.I (0812-3456-7890)",
    sekretariat: "Gus Syamsuddin (0857-1234-5678)",
    layananArwah: "Ustadz H. Khoirul Umam"
  }
};
