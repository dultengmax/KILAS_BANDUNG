import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 to-orange-600 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kilas Bandung</h1>
          <p className="text-lg md:text-xl opacity-90">
            Portal berita digital terpercaya yang menghadirkan informasi terkini dari Kota Bandung
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <h2>Misi Kami</h2>
          <p>
            Kilas Bandung berkomitmen untuk memberikan informasi berita yang akurat, terpercaya, dan relevan kepada
            seluruh masyarakat Bandung dan diaspora Bandung di seluruh dunia.
          </p>

          <h2>Visi Kami</h2>
          <p>
            Menjadi portal berita digital pilihan utama yang menjadi jembatan komunikasi antara masyarakat Bandung
            dengan informasi berita berkualitas tinggi.
          </p>

          <h2>Nilai-Nilai Kami</h2>
          <ul>
            <li>
              <strong>Akurasi:</strong> Setiap berita diverifikasi dan diteliti dengan seksama sebelum dipublikasikan
            </li>
            <li>
              <strong>Keterpercayaan:</strong> Kami menjunjung tinggi etika jurnalisme dan transparansi
            </li>
            <li>
              <strong>Kecepatan:</strong> Memberikan informasi terkini dengan cepat dan tepat waktu
            </li>
            <li>
              <strong>Keberagaman:</strong> Menghadirkan berita dari berbagai kategori untuk memenuhi kebutuhan
              informasi yang beragam
            </li>
          </ul>

          <h2>Tim Kami</h2>
          <p>
            Tim Kilas Bandung terdiri dari jurnalis profesional, editor berpengalaman, dan desainer berbakat yang
            berdedikasi untuk menghadirkan konten berita berkualitas tinggi setiap harinya.
          </p>

          <h2>Hubungi Kami</h2>
          <p>
            Kami terbuka untuk masukan, kritik, dan saran dari pembaca setia kami. Jangan ragu untuk menghubungi kami
            melalui berbagai saluran komunikasi yang tersedia.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
