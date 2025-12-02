import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { ArticleCard } from "@/components/article-card"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { RightSidebar } from "@/components/right-sidebar"
import { Zap, Award } from "lucide-react"
import { HeroCarousel } from "@/components/hero-carousel"
import Times from "@/components/time"

const articles = [
	{
		id: "1",
		title: "Wali Kota Bandung Luncurkan Program Perbaikan Infrastruktur Sepanjang 2025",
		slug: "wali-kota-bandung-infrastruktur-2025",
		excerpt:
			"Program besar-besaran perbaikan jalan dan utilitas publik akan dimulai bulan depan dengan anggaran Rp 500 Miliar.",
		featuredImage: "/bandung-city-infrastructure-modernization.jpg",
		category: "Politik",
		author: "Ahmad Rizki",
		publishedAt: "2025-11-28",
		readTime: 6,
		featured: true,
		breaking: true,
	},
	{
		id: "2",
		title: "Persib Bandung Siapkan Strategi Baru Untuk Kejuaraan 2026",
		slug: "persib-bandung-strategi-2026",
		excerpt: "Manajemen Persib mengumumkan penguatan skuad dengan kedatangan 3 pemain asing berkualitas tinggi.",
		featuredImage: "/persib-bandung-soccer-team-training.jpg",
		category: "Olahraga",
		author: "Budi Santoso",
		publishedAt: "2025-11-27",
		readTime: 5,
	},
	{
		id: "3",
		title: "Rekomendasi 7 Kuliner Bandung yang Wajib Dicoba Sebelum Akhir Tahun",
		slug: "kuliner-bandung-rekomendasi-7-tempat",
		excerpt:
			"Dari nasi kuning legendaris hingga bakso premium, inilah tempat-tempat kuliner terbaik di Bandung yang harus ada di list Anda.",
		featuredImage: "/traditional-bandung-food-local-cuisine.jpg",
		category: "Kuliner",
		author: "Siti Nurhaliza",
		publishedAt: "2025-11-26",
		readTime: 7,
	},
	{
		id: "4",
		title: "Startup Teknologi Bandung Raih Pendanaan Seri A Sebesar $2 Juta",
		slug: "startup-bandung-pendanaan-2-juta",
		excerpt:
			"Perusahaan rintisan lokal berhasil mengamankan investasi dari investor ventura internasional untuk ekspansi regional.",
		featuredImage: "/bandung-tech-startup-office-innovation.jpg",
		category: "Teknologi",
		author: "Rani Wijaya",
		publishedAt: "2025-11-25",
		readTime: 5,
	},
	{
		id: "5",
		title: "Festival Seni Bandung 2025 Menyajikan 100+ Pertunjukan Seni Lokal",
		slug: "festival-seni-bandung-2025-100-pertunjukan",
		excerpt:
			"Kolaborasi seniman lokal menghadirkan pameran seni rupa, teater, musik, dan tari dalam satu venue spektakuler.",
		featuredImage: "/bandung-art-festival-cultural-performance.jpg",
		category: "Gaya Hidup",
		author: "Maya Santosa",
		publishedAt: "2025-11-24",
		readTime: 6,
	},
	{
		id: "6",
		title: "DPRD Bandung Setujui Anggaran Pendidikan Tertinggi dalam Sejarah",
		slug: "dprd-bandung-anggaran-pendidikan",
		excerpt:
			"Rencana anggaran 2026 mengalokasikan 30% dari total budget untuk meningkatkan kualitas pendidikan di sekolah-sekolah negeri.",
		featuredImage: "/bandung-school-education-building-classroom.jpg",
		category: "Politik",
		author: "Dewi Kurniawan",
		publishedAt: "2025-11-23",
		readTime: 4,
	},
]

const carouselArticles = articles.slice(0, 5) // Use first 5 for carousel
const editorsPicks = articles.slice(1, 4)
const latestArticles = articles.slice(1)

export default function HomePage() {
	return (
		<main className="min-h-screen bg-background dark:bg-background smooth-transition">
			<Times />
			<Header />

			{/* Animated Carousel Component */}
			<HeroCarousel articles={carouselArticles} autoScrollInterval={5000} />

			{/* Main Content */}
			<div className="md:w-4/5  mx-auto px-5 py-12 lg:py-16 flex justify-center">
				<div className="grid grid-cols-1 mx-auto lg:grid-cols-3 gap-8 w-full max-w-7xl">
					{/* Main Content - 2/3 width */}
					<div className="lg:col-span-2">
						{/* Editors Pick Section */}
						<section className="mb-16 pb-16 border-b border-border dark:border-border">
							<div className="flex items-center gap-3 mb-8">
								<div className="w-1 h-8 bg-linear-to-b from-primary to-secondary rounded-full" />
								<h2 className="text-3xl font-bold text-foreground">Terbaru</h2>
								<Award className="w-6 h-6 text-primary dark:text-secondary" />
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{editorsPicks.map((article, idx) => (
									<Link
										key={article.id}
										href={`/artikel/${article.slug}`}
										className="group flex flex-col bg-card dark:bg-card hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border border-border dark:border-border hover:border-primary/50 dark:hover:border-secondary/50 smooth-transition"
									>
										{/* Image Container */}
										<div className="relative h-40 md:h-48 overflow-hidden bg-muted dark:bg-muted">
											<Image
												src={article.featuredImage || "/placeholder.svg"}
												alt={article.title}
												fill
												className="object-cover group-hover:scale-110 transition-transform duration-500"
												sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
											/>
											{/* Index badge */}
											<div className="absolute top-3 left-3 bg-primary dark:bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
												{idx + 1}
											</div>
										</div>

										{/* Content */}
										<div className="flex-1 p-4 flex flex-col">
											<span className="text-xs font-bold text-primary dark:text-secondary mb-2 uppercase">
												{article.category}
											</span>
											<h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
												{article.title}
											</h3>
											<p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
												{article.excerpt}
											</p>
											<div className="flex justify-between items-center text-xs text-muted-foreground">
												<span>{article.author}</span>
												<span>{article.readTime} menit baca</span>
											</div>
										</div>
									</Link>
								))}
							</div>
						</section>

						{/* Categories Section */}
						<section className="mb-16 pb-16 border-b border-border dark:border-border">
							<h2 className="text-2xl font-bold mb-8 text-foreground">
								Jelajahi Kategori
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
								{[
									{
										name: "Politik Bandung",
										slug: "politik",
										icon: "🏛️",
										color:
											"bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
									},
									{
										name: "Olahraga",
										slug: "olahraga",
										icon: "⚽",
										color:
											"bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300",
									},
									{
										name: "Kuliner",
										slug: "kuliner",
										icon: "🍲",
										color:
											"bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300",
									},
									{
										name: "Teknologi",
										slug: "teknologi",
										icon: "💻",
										color:
											"bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
									},
									{
										name: "Gaya Hidup",
										slug: "gaya-hidup",
										icon: "✨",
										color:
											"bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300",
									},
								].map((cat) => (
									<Link
										key={cat.slug}
										href={`/kategori/${cat.slug}`}
										className={`group p-4 rounded-lg border border-border dark:border-border hover:border-primary dark:hover:border-secondary hover:shadow-md dark:hover:shadow-lg transition-all duration-300 smooth-transition text-center ${cat.color}`}
									>
										<div className="text-3xl mb-2 group-hover:scale-125 transition-transform">
											{cat.icon}
										</div>
										<h3 className="font-bold text-sm">{cat.name}</h3>
									</Link>
								))}
							</div>
						</section>

						{/* Latest Articles Grid */}
						<section className="mb-16">
							<h2 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3">
								<div className="w-1 h-8 bg-linear-to-b from-primary to-secondary rounded-full" />
								Berita Terkini
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{latestArticles.map((article) => (
									<ArticleCard key={article.id} {...article} />
								))}
							</div>
							<div className="mt-10 text-center">
								<button className="border-2 border-primary text-primary dark:text-secondary dark:border-secondary hover:bg-primary dark:hover:bg-secondary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg smooth-transition">
									Muat Berita Lainnya
								</button>
							</div>
						</section>

						{/* Newsletter */}
						<Newsletter />
					</div>

					{/* Right Sidebar */}
					<RightSidebar
						trendingArticles={articles.slice(0, 5).map((a) => ({
							id: a.id,
							title: a.title,
							slug: a.slug,
							publishedAt: a.publishedAt,
						}))}
					/>
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</main>
	)
}
