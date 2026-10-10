export interface SesepuhLeluhur {
  id: string;
  nama: string;
  gelar: string;
  era: string;
  peran: string;
  kisah: string;
  wasiat: string;
  lokasiMakam: string;
  fatihahCount: number;
}

export interface AgendaAcara {
  id: string;
  waktu: string;
  tanggal: string;
  namaAcara: string;
  tempat: string;
  deskripsi: string;
  pengisiAcara?: string;
  kategori: 'quran' | 'ziarah' | 'pawai' | 'dapur' | 'pengajian';
}

export interface TahlilItem {
  id: string;
  judul: string;
  arab: string;
  latin: string;
  arti: string;
  fadhilah?: string;
  jumlahBacaan?: string;
}

export interface TitipDoaArwah {
  id: string;
  pengirim: string;
  asal: string; // e.g., "Bangeran Lebak RT 03" atau "Perantauan Surabaya"
  namaArwah: string[]; // e.g. ["Alm. Bapak H. Suparman", "Almh. Ibu Hj. Masitoh"]
  doaKhusus: string;
  waktu: string;
  fatihahHadiahCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'khadim';
  text: string;
  audioBase64?: string;
  timestamp: string;
}
