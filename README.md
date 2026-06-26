# 🌐 RizkyFeb Interactive Portfolio

Sebuah portfolio digital interaktif modern dan premium yang dirancang menggunakan teknologi web terbaru. Project ini menggabungkan performa web yang responsif dengan pengalaman visual 3D interaktif yang memanjakan mata.

---

## 🚀 Fitur Utama

- **✨ 3D Lanyard & Badge Simulation**: Kartu identitas 3D realistis yang menggantung secara dinamis pada tali (lanyard), mendukung interaksi *drag-and-drop* dengan simulasi fisika penuh (gravitasi, massa, inersia).
- **📱 Responsive & Premium Layout**: Grid layout adaptif yang rapi untuk menampilkan profil, pengalaman, skill, dan informasi kontak di semua ukuran layar (Mobile, Tablet, Desktop).
- **💫 Smooth Micro-Animations**: Animasi transisi yang halus menggunakan Framer Motion serta *smooth scroll* global menggunakan Lenis.
- **🎨 Glassmorphism & Modern Palette**: Desain estetik premium dengan perpaduan warna gelap, aksen modern, efek grain, serta border berpendar halus.

---

## 🛠️ Tech Stack

Project ini dibangun dengan ekosistem modern berkinerja tinggi:

### **Core Stack**
- **Framework**: [Next.js 14](https://nextjs.org/) (React Framework) dengan struktur folder `/src` dan App Router.
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) untuk mengetik kode dengan aman (*type-safe*).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) untuk utility-first styling yang responsif.

### **3D & Physics Engine**
- **[Three.js](https://threejs.org/)**: Library utama grafis 3D berbasis WebGL.
- **[@react-three/fiber](https://r3f.docs.pmnd.rs/)**: React renderer untuk Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei)**: Kumpulan helper siap pakai untuk pencahayaan (`Environment`, `Lightformer`) dan shader tekstur.
- **[@react-three/rapier](https://github.com/pmndrs/react-three-rapier)**: Integrasi *Rapier Physics Engine* untuk menghitung gravitasi, sendi tali (*rope joints*), dan tabrakan fisik pada Lanyard secara real-time.
- **[meshline](https://github.com/spite/meshline)**: Digunakan untuk merender tali lanyard agar fleksibel dan halus dalam ruang 3D.

### **State & Animations**
- **[Framer Motion](https://www.framer.com/motion/)**: Manajemen animasi komponen masuk (*entrance transitions*), hover, dan scroll-triggered animations.
- **[Zustand](https://github.com/pmndrs/zustand)**: Manajemen state global yang ringan untuk mengatur state aplikasi.
- **[Lenis](https://lenis.darkroom.engineering/)**: Library *smooth scrolling* untuk pengalaman navigasi halaman yang nyaman.
- **[@tanstack/react-query](https://tanstack.com/query/latest)**: Untuk penanganan caching, sinkronisasi, dan manajemen request data asynchronous.

---

## 📂 Struktur Folder Penting

```bash
src/
├── app/                  # Routing & struktur halaman utama Next.js
├── components/           # Reusable UI Components
│   ├── lanyard-3d.tsx    # Canvas 3D & logika simulasi fisik tali lanyard
│   ├── resume-contact.tsx# Layout halaman kontak (Email, Social, Lanyard Grid)
│   ├── experience-skills.tsx # Halaman daftar pengalaman kerja & skill
│   └── footer.tsx / navbar.tsx # Komponen navigasi & footer global
├── lib/                  # Helper utilities (clsx, tailwind-merge, dll)
├── styles/               # File CSS global & konfigurasi tema
└── types/                # Definisi Type/Interface TypeScript
```

---

## 🎯 Detail Implementasi 3D Lanyard

Tali dan kartu identitas pada bagian kontak dirancang dengan simulasi fisika aktif:
1. **Rope Joint (Sendi Tali)**: Tali lanyard dibuat dari beberapa segmen `RigidBody` (ditandai dengan `j1`, `j2`, `j3` di `lanyard-3d.tsx`) yang terhubung menggunakan `useRopeJoint` dan diproyeksikan menggunakan `CatmullRomCurve3`.
2. **Card Physics**: Kartu identitas menggunakan `CuboidCollider` dinamis. Saat ditekan (*PointerDown*), statusnya berubah menjadi kinematik (`kinematicPosition`) agar dapat ditarik oleh pointer mouse atau sentuhan layar pengguna. Saat dilepas (*PointerUp*), kartu kembali menjadi objek dinamis yang terpengaruh gaya gravitasi bumi.
3. **Texture Mapping**: Tekstur depan (`frontImage`) dan belakang (`backImage`) dipetakan secara presisi pada koordinat UV model 3D (`/card.glb`) melalui HTML Canvas generator internal untuk memastikan kualitas gambar tetap tajam dan fit.

---

## 💻 Cara Menjalankan Project Secara Lokal

Pastikan Anda telah menginstal **Node.js (versi >= 18)** dan package manager **pnpm**.

### 1. Clone & Masuk ke Folder Project
```bash
git clone <repository-url>
cd rizkyfeb
```

### 2. Instalasi Dependency
```bash
pnpm install
```

### 3. Jalankan Server Development
```bash
pnpm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

### 4. Build untuk Produksi
Untuk memastikan aplikasi siap dideploy dengan performa terbaik:
```bash
pnpm run build
pnpm start
```

---

## 📝 Konfigurasi Tambahan

- **Prettier & ESLint**: Project ini telah dilengkapi dengan Prettier Tailwind plugin (`prettier-plugin-tailwindcss`) dan pengurutan import (`@trivago/prettier-plugin-sort-imports`) untuk menjaga kerapian kode secara otomatis.
- **Responsive Camera**: Sensor deteksi mobile di `lanyard-3d.tsx` secara otomatis menurunkan resolusi DPR dan menyesuaikan interaksi agar tetap lancar di perangkat mobile tanpa mengalami lag FPS.
