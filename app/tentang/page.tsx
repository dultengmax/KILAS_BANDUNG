import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllAboutUs } from "@/lib/action/profile"

export default async function TentangPage() {
  const about = await getAllAboutUs()
  const data = about && Array.isArray(about.data) && about.data.length > 0 ? about.data[0] : null
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section
        className="relative text-white py-12 md:py-20"
        style={{
          background:
            "linear-gradient(to bottom right, #f59e42cc 35%, #ea5808cc 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-amber-600/80 to-orange-600/60 z-0 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang {data?.title}</h1>
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
{data?.misi}
          </p>

          <h2>Visi Kami</h2>
          <p>
  {data?.visi}
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
            melalui berbagai saluran komunikasi yang tersedia:
          </p>
          <ul className="flex flex-wrap gap-4 mt-6 mb-2">
            <li>
              <a
                href={`${data?.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E1306C] hover:bg-[#ffb4e2] text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <span role="img" aria-label="Instagram">📸</span> Instagram
              </a>
            </li>
            <li>
              <a
                href={`${data?.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#c6eaff] text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <span role="img" aria-label="Twitter">🐦</span> Twitter
              </a>
            </li>
            <li>
              <a
                href={`${data?.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2867B2] hover:bg-[#b4d1ff] text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <span role="img" aria-label="LinkedIn">💼</span> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  )
}
