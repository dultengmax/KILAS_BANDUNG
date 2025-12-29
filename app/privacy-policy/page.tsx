import Head from "next/head";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Kebijakan Privasi | kilasbandung.id</title>
        <meta
          name="description"
          content="Kebijakan Privasi kilasbandung.id – Penjelasan tentang pengelolaan data pengunjung untuk keamanan, Google AdSense, SEO, dan informasi hukum portal berita Bandung."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kilasbandung.id/privacy-policy" />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-10 bg-white rounded-lg shadow-lg">
        <section className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2 tracking-tight drop-shadow">
            Kebijakan Privasi kilasbandung.id
          </h1>
          <p className="text-lg text-gray-700">
            Kebijakan ini menjelaskan cara kami menjaga dan mengelola privasi pengunjung di <strong>kilasbandung.id</strong>, mendukung operasional, AdSense, dan pengoptimalan mesin pencari (SEO).
          </p>
        </section>

        <div className="my-8">
          {/* Ads placeholder - replace with actual AdSense component or script */}
          <div className="flex justify-center my-4">
            <div
              style={{
                width: 320,
                height: 100,
                background: "#f0f5ff",
                border: "1px dashed #0284c7"
              }}
              className="flex items-center justify-center text-blue-400"
            >
              Iklan Google AdSense
            </div>
          </div>
        </div>

        <ol className="list-decimal pl-6 space-y-10 text-base text-gray-800">
          <li>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Seberapa Penting Privasi Anda?</h2>
            <p className="leading-relaxed">
              <strong>kilasbandung.id</strong> sangat menghargai privasi pengunjung. Kami <span className="font-bold">tidak mengumpulkan cookies internal untuk memprofilkan perilaku pribadi Anda</span>. Platform ini dibangun di atas Next.js yang dioptimalkan untuk kecepatan dan keamanan, tanpa pelacakan data sensitif mandiri dari kami.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Iklan Google AdSense &amp; Cookies Pihak Ketiga</h2>
            <p>
              Demi operasional situs dan menyediakan berita gratis, <b>kilasbandung.id</b> bekerja sama dengan <span className="text-blue-700 font-semibold">Google AdSense</span> untuk menayangkan iklan. Penting untuk diketahui:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Google dan mitra mereka dapat menggunakan cookies untuk menayangkan iklan yang relevan di situs ini.
              </li>
              <li>
                Cookies DART memungkinkan iklan ditampilkan sesuai riwayat kunjungan ke <strong>kilasbandung.id</strong> dan situs lain.
              </li>
              <li>
                Pengunjung dapat <b>menolak penggunaan cookie DART</b> melalui pengaturan Google:{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  Kebijakan Privasi Google
                </a>
                .
              </li>
            </ul>
            <div className="flex justify-center my-4">
              {/* AdSense Inline Placeholder */}
              <div
                style={{
                  width: 728,
                  height: 90,
                  background: "#fff7ed",
                  border: "1px dashed #fdba74"
                }}
                className="flex items-center justify-center text-orange-400"
              >
                Slot Iklan AdSense Responsif
              </div>
            </div>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Optimasi SEO &amp; Pengumpulan Data Standar
            </h2>
            <p>
              Untuk meningkatkan performa situs di mesin pencari serta menjaga keamanan, kami hanya mencatat data umum yang <b>tidak mengidentifikasi pribadi</b>:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <b>Informasi Perangkat:</b> Seperti tipe browser dan sistem operasi, guna memastikan kompatibilitas terbaik.
              </li>
              <li>
                <b>Data Log:</b> Alamat IP (disamarkan), waktu akses, dan halaman yang dibuka, untuk analisis trafik secara agregat &amp; pemantauan server.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Keamanan Data &amp; Website</h2>
            <p>
              Seluruh lalu lintas situs <b>dienkripsi dengan SSL/HTTPS</b> guna melindungi data selama proses pengaksesan <span className="text-blue-500 font-semibold">kilasbandung.id</span> dari pencurian maupun penyalahgunaan pihak ketiga.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Konten Pihak Ketiga</h2>
            <p>
              Beberapa berita dapat menyematkan video YouTube, posting Instagram, Tweet/X, dan lainnya. <span className="italic">Konten ini mengikuti kebijakan privasi platform masing-masing</span> dan bisa mengumpulkan data Anda secara terpisah.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Hak Pengguna</h2>
            <p>Anda memiliki hak untuk:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Mengakses semua konten situs secara anonim tanpa pendaftaran.</li>
              <li>
                Menolak, menghapus, atau membatasi penggunaan cookies melalui pengaturan browser Anda kapan saja.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Kontak Redaksi &amp; Informasi</h2>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p>
                Untuk pertanyaan tentang kebijakan privasi atau ingin menyampaikan masukan, silakan hubungi:
              </p>
              <div className="mt-2 space-y-1">
                <div>
                  <strong>Email: </strong>
                  <a
                    href="mailto:redaksi@kilasbandung.id"
                    className="text-blue-700 underline"
                  >
                    redaksi@kilasbandung.id
                  </a>
                </div>
                <div>
                  <strong>Alamat:</strong> Kota Bandung, Jawa Barat, Indonesia
                </div>
              </div>
            </div>
          </li>
        </ol>
        <div className="my-10">
          {/* Ads placeholder bawah */}
          <div
            style={{
              width: "100%",
              minHeight: 90,
              maxWidth: 970,
              margin: "0 auto",
              background: "#fdf6b2",
              border: "1px dashed #facc15",
            }}
            className="flex items-center justify-center text-yellow-500"
          >
            Area Iklan AdSense
          </div>
        </div>
        <section className="mt-12 text-center text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} <b>kilasbandung.id</b> &mdash; Portal Berita Bandung. Kebijakan privasi ini terakhir diperbarui pada Juni 2024.
          </p>
        </section>
      </main>
    </>
  );
}
