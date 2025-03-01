# 🌌 Rick and Morty Explorer

<div align="center">
  <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Rick Sanchez" width="150" style="border-radius: 50%; border: 3px solid #6d28d9;" />
  <img src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="Morty Smith" width="150" style="border-radius: 50%; border: 3px solid #6d28d9;" />

  <p align="center">
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" /></a>
    <a href="https://tanstack.com/query/latest"><img src="https://img.shields.io/badge/React_Query-4-FF4154?style=for-the-badge&logo=react-query" alt="React Query" /></a>
    <a href="https://github.com/pmndrs/zustand"><img src="https://img.shields.io/badge/Zustand-4-brown?style=for-the-badge" alt="Zustand" /></a>
  </p>
</div>

## 📖 Proje Hakkında

Modern bir web uygulaması ile Rick and Morty evrenindeki karakterleri keşfedin. Bu proje, Next.js 15, TypeScript, Tailwind CSS, React Query, Zustand ve diğer modern teknolojileri kullanarak geliştirilmiştir.

<div align="center">
  <img src="https://github.com/user-attachments/assets/9537e6f5-67eb-40a7-a405-5891c26040bc" alt="Rick and Morty Explorer Screenshot" width="80%" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />
</div>

## ✨ Özellikler

| 🚀 Özellik                   | 📝 Açıklama                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| **API Entegrasyonu**         | Rick and Morty API ile entegrasyon                               |
| **Gelişmiş Filtreleme**      | Status ve gender filtrelerini kullanarak karakterleri süzün      |
| **URL Tabanlı Filtreler**    | Filtreler URL query parametreleri üzerinden yönetilir            |
| **Server-Side Rendering**    | Sayfa değiştikçe yeni veriler SSR ile getirilir                  |
| **Modern UI**                | shadcn/ui bileşenleri ile temiz ve modern bir arayüz             |
| **3D Animasyonlar**          | Framer Motion ile etkileyici 3D kart animasyonları               |
| **Mobil Uyumlu**             | Tüm ekran boyutlarına uygun responsive tasarım                   |
| **Durum Yönetimi**           | Zustand ile global state yönetimi                                |
| **Optimize API Çağrıları**   | React Query ile optimize edilmiş API çağrıları                   |
| **URL Yönetimi**             | nuqs ile URL query parametrelerinin yönetimi                     |
| **Toast Bildirimleri**       | Kullanıcı etkileşimleri için bildirimler                         |
| **Favoriler Sistemi**        | Karakterleri favorilere ekleme ve yönetme                        |
| **Detaylı Karakter Bilgisi** | Her karakter için detaylı bilgi modalı                           |
| **Kod Kalitesi**             | ESLint, Prettier, Husky ve Lint-Staged ile kod kalitesi kontrolü |

## 🛠️ Teknolojiler

<div align="center">
  <table>
    <tr>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
        <br>Next.js 15
      </td>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
        <br>TypeScript
      </td>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
        <br>Tailwind
      </td>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
        <br>React
      </td>
      <td align="center" width="96">
        <img src="https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png" width="48" height="48" alt="Framer Motion" />
        <br>Framer
      </td>
    </tr>
  </table>
</div>

- **Next.js 15**: App Router yapısı ile modern bir React framework'ü
- **TypeScript**: Tip güvenliği için
- **Tailwind CSS**: Stil ve responsive tasarım için
- **shadcn/ui**: Yüksek kaliteli UI bileşenleri
- **Zustand**: Basit ve etkili state yönetimi
- **React Query**: Veri getirme ve önbelleğe alma
- **nuqs**: URL query parametrelerini yönetmek için
- **Framer Motion**: Animasyonlar için
- **ESLint & Prettier**: Kod kalitesi ve formatı için
- **Husky & Lint-Staged**: Commit öncesi kod kontrolü

## 🚀 Başlangıç

### Gereksinimler

- Node.js 18.0.0 veya üstü
- Bun veya npm

### Kurulum

1. Repoyu klonlayın:

   ```bash
   git clone https://github.com/yourusername/rick-and-morty.git
   cd rick-and-morty
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   bun install
   # veya
   npm install
   ```

3. Geliştirme sunucusunu başlatın:

   ```bash
   bun dev
   # veya
   npm run dev
   ```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
rick-and-morty/
├── .husky/                # Husky git hooks
├── public/                # Statik dosyalar
├── src/
│   ├── app/               # Next.js app router
│   ├── components/        # React bileşenleri
│   │   ├── ui/            # shadcn/ui bileşenleri
│   │   └── ...            # Özel bileşenler
│   ├── constants/         # Sabit değerler
│   ├── helpers/           # Yardımcı fonksiyonlar
│   ├── hooks/             # Custom React hooks
│   ├── providers/         # Context sağlayıcıları
│   ├── services/          # API servisleri
│   ├── store/             # Zustand store'ları
│   └── types/             # TypeScript tipleri
├── .eslintrc.json         # ESLint yapılandırması
├── .prettierrc            # Prettier yapılandırması
├── next.config.js         # Next.js yapılandırması
├── package.json           # Proje bağımlılıkları
├── tailwind.config.js     # Tailwind CSS yapılandırması
└── tsconfig.json          # TypeScript yapılandırması
```

## 🔍 Uygulama Özellikleri

### 🎨 Karakter Kartları

- 3D etkileşimli kartlar
- Hover efektleri ve animasyonlar
- Karakter durumu ve türü için renk kodlaması
- Favori ekleme/çıkarma özelliği

### 🔎 Filtreleme Sistemi

- Status filtreleme (Alive, Dead, Unknown)
- Gender filtreleme (Male, Female, Genderless, Unknown)
- URL tabanlı filtreler
- Sayfalama desteği

### 💾 Veri Yönetimi

- Server-Side Rendering ile veri getirme
- React Query ile client-side önbelleğe alma
- Zustand ile global state yönetimi
- URL query parametreleri ile durum senkronizasyonu

### 🎭 Kullanıcı Deneyimi

- Toast bildirimleri
- Yükleme durumları
- Hata yönetimi
- Sayfa değişiminde otomatik kaydırma

## 📱 Ekran Görüntüleri

<div align="center">
  <img src="https://github.com/user-attachments/assets/2222c7db-6dc9-4565-b680-6b312c4051ae" alt="Ana Sayfa" width="45%" style="border-radius: 5px; margin-right: 10px;" />
  <img src="https://github.com/user-attachments/assets/0bc33372-fa10-4d3d-8bdb-bf8ed137b9b5" alt="Karakter Detayı" width="45%" style="border-radius: 5px;" />
</div>

## 📄 Lisans

MIT

## 📞 İletişim

Mücahit Taşan - [@mucahittasan](https://github.com/mucahittasan)

Proje Linki: [https://github.com/mucahittasan/rick-and-morty](https://github.com/mucahittasan/rick-and-morty)
