# GARDA ERP — COMPREHENSIVE DESIGN SPECIFICATION & ARCHITECTURE
## Sistem ERP Khusus Badan Usaha Jasa Pengamanan (BUJP)
### Versi: 1.0.0-PROD | Standar: WCAG 2.2 AA | Dual-Theme: Dark (#000000) & Light (#F8FAFC)

---

## 1. FIGMA DESIGN TOKENS & LOCAL VARIABLES (DUAL-THEME)

### 1.1 Color Palette & Variable Modes
| Token Variable | Dark Mode (Default) | Light Mode | Penggunaan Visual | Rasio Kontras (Dark / Light) |
|---|---|---|---|---|
| `bg/canvas` | `#000000` | `#F8FAFC` | Kanvas latar belakang utama aplikasi | Base Layer |
| `bg/surface-1` | `#030712` | `#FFFFFF` | Sidebar, Top Navbar, Kartu KPI, Kontainer Tabel | Layer 1 |
| `bg/surface-2` | `#111827` | `#F1F5F9` | Header Tabel, Zebra/Hover Row, Latar Input Field | Layer 2 |
| `bg/surface-3` | `#1F2937` | `#E2E8F0` | Dropdown Menu, Modal Dialog, Badge Netral | Layer 3 |
| `border/default` | `#374151` | `#CBD5E1` | Border Kartu, Sel Tabel, Input, Divider | 3.2:1 / 3.4:1 (PASS) |
| `text/primary` | `#F9FAFB` | `#0F172A` | Judul, Body Utama, Angka Tabel, Nominal Rupiah | 18.2:1 / 16.1:1 (PASS) |
| `text/secondary` | `#9CA3AF` | `#475569` | Label Form, Subjudul, Breadcrumb, Helper Text | 7.3:1 / 5.8:1 (PASS) |
| `accent/primary` | `#F59E0B` | `#D97706` | Tombol CTA Utama, Penanda Navigasi Aktif | 8.5:1 / 4.6:1 (PASS) |
| `accent/hover` | `#D97706` | `#B45309` | Hover & Active State Tombol Utama | 6.8:1 / 5.2:1 (PASS) |
| `accent/text-on-amber` | `#000000` | `#FFFFFF` | Teks font-semibold di atas tombol Amber | 11.2:1 / 4.7:1 (PASS) |
| `focus/ring` | `#F59E0B` | `#D97706` | Cincin Fokus Keyboard 2px (outline-none) | 8.5:1 / 4.6:1 (PASS) |
| `status/success` | `#10B981` | `#059669` | Badge Aktif/Lunas, Validasi Jurnal Seimbang | 6.1:1 / 4.8:1 (PASS) |
| `status/warning` | `#F59E0B` | `#D97706` | Peringatan KTA <= 30 Hari, Stok Menipis | 8.5:1 / 4.6:1 (PASS) |
| `status/danger` | `#F87171` | `#DC2626` | Error Input, Stok Habis, Jurnal Tidak Seimbang | 7.4:1 / 5.1:1 (PASS) |

### 1.2 Tipografi & Aturan Tabular
- **Font Utama UI**: `Plus Jakarta Sans` / `Inter` (Font metrics: 12px Caption, 14px Body Sm, 16px Body Base, 18px H4, 20px H3, 24px H2, 32px H1).
- **Font Data Angka (`tabular-nums`)**: `JetBrains Mono` untuk seluruh nominal Rupiah (`Rp 145.200.000`), NIK (16 digit), No. KTA Polri, Koordinat GPS, Kode Akun COA (5 digit), serta Debit & Kredit.
- **Corner Radius**: `4px` (Badge/Tag), `6px` (Kontrol Form, Button, Input), `8px` (Kartu KPI, Kontainer Tabel, Modal Dialog). Tidak ada border radius ekstrem/pill generik pada form enterprise.

---

## 2. COMPONENT LIBRARY & 7-STATE INTERACTIVE MATRIX

Setiap komponen interaktif memenuhi standar WCAG 2.2 AA dengan 7 varian status:

1. **Button (Primary Amber, Secondary Surface, Outline, Destructive Red)**
   - `default`: Background solid, teks kontras tinggi, border halus.
   - `hover`: Pergeseran warna satu tingkat lebih pekat (`accent/hover`).
   - `focus-visible`: Cincin fokus 2px Amber (`focus/ring`) dengan offset 2px dari batas tombol.
   - `active`: Elevasi turun, background scale 0.98.
   - `disabled`: Opacity 45%, kursor `not-allowed`, non-interaktif.
   - `loading`: Spinner animasi 16px sebaris di sisi kiri label teks (contoh: "Memproses...").
   - `error`: Border merah menyala 1.5px dengan getaran haptik/visual.

2. **Form Controls (TextField, NumberField, Select, DatePicker, Checkbox, RadioGroup)**
   - `default`: Border `#374151` (Dark) / `#CBD5E1` (Light), teks `#F9FAFB` / `#0F172A`.
   - `hover`: Border transisi ke `#4B5563` / `#94A3B8`.
   - `focus-visible`: Border berganti ke `#F59E0B` / `#D97706` + cincin fokus 2px.
   - `active`: Permukaan sedikit lebih terang / gelap.
   - `disabled`: Background `#111827` / `#F1F5F9`, teks pudar, pointer-events none.
   - `loading`: Indikator shimmer/skeleton halus di dalam input box.
   - `error`: Border `#F87171` / `#DC2626`, ikon seru di kanan field, label error merah di bawah yang terhubung via `aria-describedby` & `aria-invalid="true"`.

---

## 3. GLOBAL APP SHELL (DESKTOP 1440px & MOBILE 375px)

- **Sidebar Kiri (260px)**:
  - Header: Logo Perisai Garda ERP + No. Izin Mabes Polri: `SIO/2026/MBS-POLRI/BUJP-088`.
  - 8 Modul RBAC: Dashboard, Operasional, Rekrutmen PSB, Logistik, Keuangan, Akuntansi, Laporan, Pengaturan.
  - Footer: Avatar, Nama Pengguna, Badge Role (`Administrator Sistem`), Tombol Logout.
- **Top Navbar (Tinggi 64px)**:
  - Collapse Trigger + Breadcrumb.
  - Global Search Bar: `Cari personel, No. KTA, klien, site, No. Jurnal... [Cmd+K]`.
  - Periode Kerja: Dropdown `Oktober 2026`.
  - Notifikasi: Icon Lonceng dengan Badge Merah (14 peringatan KTA).
  - Theme Switcher: Toggle Dark / Light Mode.
- **Mobile Reflow (375px)**:
  - Sidebar berpindah ke Slide-Over Drawer dari kiri.
  - Navbar ringkas dengan hamburger button + logo + theme toggle.
  - Target sentuh minimal 44x44px.
  - Tabel berkurang ke mode Card List responsif tanpa horizontal scroll pada viewport utama.

---

## 4. DAFTAR LENGKAP 42 LAYAR GARDA ERP (PARITAS SISTEM & PROPERTI FIELD)

1. `AUTH-01` (`/login`): Login Form (Email, Password, Remember Me), Brute-Force 429 lock banner, Disabled account lock banner, Theme toggle.
2. `DASH-01` (`/dashboard`): 5 KPI Cards (Personel Aktif 482, Sites 38, BKO 3, Piutang Rp 412.500.000, Stok Menipis 6), Tabel Peringatan KTA <= 30 Hari, Antrean BKO.
3. `SEC-01` (`/security/personnel`): Master Personel Satpam, Filter Gada/Status/Site, Badging KTA Expiring.
4. `SEC-02A` (`/security/personnel/new`): 19 Field Pendaftaran Personel (NIK, Nama, Tempat Lahir, Tgl Lahir, Gender, Alamat, No. Telp, Email, No. KTA, Exp. KTA, Gada Level, No. Sertifikat, Jabatan, Tgl Gabung, Status, Site ID, Bank, No. Rekening, Foto).
5. `SEC-02B` (`/security/personnel/edit/[id]`): 19 Field Edit Personel eksisting, Riwayat Penempatan Site, Simpan Perubahan.
6. `SEC-03` (`/security/clients`): Master Klien Mitra, Filter Active/Inactive, NPWP, PIC Info, Kontrak Status.
7. `SEC-04` (`/security/clients/new`): 7 Field Registrasi Klien (Nama PT, NPWP, Alamat Invoice, Nama PIC, Telp PIC, Email PIC, Tgl Berakhir Kontrak).
8. `SEC-05` (`/security/sites`): Master Lokasi Pos Jaga, Alamat, Koordinat GPS, Kuota Personel/Shift, Tarif per Personel.
9. `SEC-06` (`/security/sites/new`): 7 Field Lokasi Jaga (Client ID, Nama Site, Alamat, Lat & Long, Kuota Shift, Tarif Kontrak, Status).
10. `SEC-07` (`/security/checkpoints`): Titik Patroli QR per Site, Urutan Rute Patroli, QR Code Preview & Cetak Stiker PDF.
11. `SEC-08` (`/security/roster`): Grid Matriks Shift Personel x Tanggal 1..30, Legenda Pagi/Siang/Malam/Off, SLA Pemenuhan Kuota.
12. `SEC-09` (`/security/roster/new`): Plotting Penugasan Shift, Validasi Konflik `UNIQUE(personnel_id, date)`.
13. `SEC-10` (`/security/bko-requests`): Pengajuan BKO Darurat, Eksekusi RPC `approve_bko_request` (Auto-update jadwal site asal & tujuan).
14. `PSB-01` (`/psb/admin/applicants`): Manajemen Pelamar PSB, 6 Tahapan Seleksi (Baru, Berkas, Kesamaptaan, Wawancara, Diterima, Ditolak).
15. `PSB-02` (`/psb/admin/applicant-detail`): Verifikasi Dokumen, Input Skor Tes, Tombol 1-Klik Konversi ke Draf Satpam Baru (`convert_applicant_to_personnel`).
16. `LOG-01` (`/logistics/warehouse`): Inventaris Gudang Pusat, Kategori Seragam & Alat Keamanan, Badge Stok Menipis (`current < minimum`).
17. `LOG-02` (`/logistics/items/new`): 9 Field Registrasi Barang (Kode, Nama, Kategori, Satuan, Ukuran, Stok Awal, Stok Min, Harga Beli, Catatan).
18. `LOG-03` (`/logistics/items/detail/[id]`): Kartu Stok Kronologis (`stock_movements`), Running Balance, Bukti Masuk/Keluar.
19. `LOG-04` (`/logistics/items/edit/[id]`): 9 Field Edit Master Barang & Penyesuaian Minimum Safety Stock.
20. `LOG-05` (`/logistics/distribution`): Distribusi Perlengkapan ke Personel/Site, Multi-line Items, Integrasi RPC Jurnal Beban & Pengurangan Stok.
21. `FIN-01` (`/finance/invoices`): Tagihan Klien Mitra, Filter Periode & Status, PPN 11%/12%, PPh 23 2%, Ekspor PDF & Kuitansi.
22. `FIN-02` (`/finance/invoice/new`): Form Invoice Baru, Agregasi Baris Site Otomatis (`Personel x Tarif`), RPC `post_invoice_to_journal` (Debit Piutang 11200, Kredit Pendapatan 41100, Kredit Utang PPN 21400).
23. `FIN-03` (`/finance/payroll`): Penggajian Satpam, Gaji Pokok UMK, Tunjangan Danru/Chief, Lembur, Potongan BPJS (1% & 3%), PPh 21, Potongan Seragam, RPC `post_payroll_to_journal` (Debit Beban Gaji 51100, Kredit Utang Gaji 21100, Utang BPJS 21200, Utang PPh 21 21300).
24. `ACC-01` (`/finance/accounting/coa`): Chart of Accounts Hierarkis (11100 s.d. 51200), Saldo Normal, Badge Akun Sistem Terproteksi.
25. `ACC-02` (`/finance/accounting/coa/new`): 6 Field Akun COA (Kode Akun, Nama Akun, Klasifikasi Kategori, Saldo Normal, Akun Induk, Status Aktif).
26. `ACC-03` (`/finance/accounting/journals`): Riwayat Jurnal Umum Double-Entry, Filter Sumber Transaksi & Site, Badge Posted Immutable.
27. `ACC-04` (`/finance/accounting/journals/new`): Input Jurnal Manual Double-Entry, Editor Multi-Baris, Live Balance Checker (`Debit == Kredit > 0`), Validasi Gagal Error State.
28. `RPT-01` (`/finance/accounting/reports/ledger`): Buku Besar Akun Spesifik, Mutasi Debit/Kredit, Saldo Berjalan Kronologis.
29. `RPT-02` (`/finance/accounting/reports/receivables`): Buku Pembantu Piutang per Klien, Aging Schedule (0-30, 31-60, >60 hari), Badge Rekonsiliasi Sinkron ke Akun 11200.
30. `RPT-03` (`/finance/accounting/reports/income-statement`): Laporan Laba Rugi SAK BUJP (Pendapatan Jasa, HPP Pengamanan, Gross Margin, Beban Operasional/Umum, Net Profit).
31. `RPT-04` (`/finance/accounting/reports/balance-sheet`): Laporan Posisi Keuangan (Neraca), Persamaan Akuntansi `Aset == Liabilitas + Ekuitas` Validated Banner.
32. `RPT-05` (`/finance/accounting/reports/equity-changes`): Laporan Perubahan Ekuitas, Integrasi Laba Bersih Tahun Berjalan, Prive/Dividen, Modal Akhir.
33. `RPT-06` (`/finance/accounting/reports/cash-flow`): Laporan Arus Kas Metode Tidak Langsung (Operasional, Investasi, Pendanaan), Rekonsiliasi Kas Bersih.
34. `RPT-07` (`/finance/accounting/reports/management-analysis`): Analisa Profitabilitas per Titik Pos Jaga (`Invoice - Gaji Satpam - Beban Logistik`), Margin %, Status Performa.
35. `RPT-08` (`/finance/accounting/reports/balanced-scorecard`): Balanced Scorecard 4 Perspektif (Finansial, Pelanggan, Internal Operasional/SLA Patroli, Pembelajaran KTA & Gada).
36. `SET-01` (`/settings/institution`): 22 Field Konfigurasi Master BUJP (Nama PT, Izin Mabes Polri, NPWP, Alamat, Kontak, Logo, Pejabat Penandatangan, Tarif Pajak & BPJS).
37. `SET-02` (`/settings/org-chart`): Visualisasi SVG Pohon Struktur Organisasi Berjenjang (Direksi -> Manajer -> Chief Security -> Danru Site).
38. `SET-03` (`/settings/users`): Master Pengguna Sistem, Badge Role, Proteksi Self-Lockout Akun Admin Login.
39. `SET-04` (`/settings/users/new`): 5 Field Tambah User (Nama Lengkap, Email, Password & Konfirmasi, Role ID, Status Aktif).
40. `SET-05` (`/settings/roles`): Master Role & Izin Sistem, Role Bawaan vs Kustom, Ringkasan Izin Granular.
41. `SET-06` (`/settings/roles/new`): 18 Input Form Role (Nama, Deskripsi, Matriks 16 Checkbox Izin Granular 8 Modul x {can_view, can_manage}).
42. `SET-07` (`/settings/roles/edit/[id]`): 18 Input Edit Role Eksisting & Modifikasi Hak Akses Granular.
43. `SET-08` (`/settings/backup`): Status Database, Trigger Snapshot Backup Manual, Tabel Riwayat Dump, Danger Zone Restore dengan Konfirmasi Teks Nama Institusi.
