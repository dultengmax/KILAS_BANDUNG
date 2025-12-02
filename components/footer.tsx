import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-gradient-to-br from-amber-600 to-orange-600 rounded p-1 w-8 h-8 flex items-center justify-center text-sm">
                K
              </span>
              Kilas Bandung
            </h3>
            <p className="text-gray-400 text-sm">
              Portal berita digital terpercaya untuk menghadirkan informasi terkini dari Kota Bandung.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4">Kategori</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/kategori/politik" className="hover:text-white transition">
                  Politik
                </Link>
              </li>
              <li>
                <Link href="/kategori/olahraga" className="hover:text-white transition">
                  Olahraga
                </Link>
              </li>
              <li>
                <Link href="/kategori/kuliner" className="hover:text-white transition">
                  Kuliner
                </Link>
              </li>
              <li>
                <Link href="/kategori/teknologi" className="hover:text-white transition">
                  Teknologi
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/tentang" className="hover:text-white transition">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/kebijakan" className="hover:text-white transition">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat" className="hover:text-white transition">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-amber-500" />
                <span>info@kilasbandung.com</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-amber-500" />
                <span>+62 274 XXXX XXXX</span>
              </li>
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-500" />
                <span>Bandung, Jawa Barat</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>&copy; 2025 Kilas Bandung. Semua hak dilindungi.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
