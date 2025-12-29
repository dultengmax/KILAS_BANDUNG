import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <main className="flex flex-col min-h-[80vh] items-center justify-center bg-linear-to-br from-slate-50 to-blue-50 py-16 px-4">
        <div className="flex flex-col items-center gap-4 bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center gap-2 text-amber-500">
            <AlertTriangle className="w-8 h-8" />
            <span className="font-extrabold text-6xl tracking-tighter text-blue-700">404</span>
          </div>
          <h1 className="text-2xl md:text-3xl mb-2 font-bold text-blue-800 text-center">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-500 text-center max-w-md">
            Maaf, halaman yang Anda cari tidak tersedia.<br />
            Bisa jadi sudah dihapus, dipindahkan, atau alamatnya salah tulis.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-white bg-linear-to-r from-blue-600 to-blue-400 px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
