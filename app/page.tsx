import Image from "next/image"
import Link from "next/link"
import { Header, RunningNewsTicker } from "@/components/header"
import { ArticleCard } from "@/components/article-card"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { RightSidebar } from "@/components/right-sidebar"
import { Zap, Award } from "lucide-react"
import { HeroCarousel } from "@/components/hero-carousel"
import Times from "@/components/time"
import { getArticles } from "@/lib/action/article"
import { getCategories } from "@/lib/action/kategory"
import { Suspense } from "react"



export default async function HomePage() {
	const dataArticle = await getArticles()
	const categoryName = await getCategories()
	const latestArticles = dataArticle?.articles?.slice(1)

	const news = dataArticle?.articles?.slice(0, 6)
	const sideHeroes = dataArticle?.articles?.slice(0, 3)
	return (
		<main className="min-h-screen bg-background dark:bg-background smooth-transition">
			<Times />
			<Header  />
			<RunningNewsTicker dataArticle={dataArticle}/>
			{/* Running Text for News */}

			{/* Animated Carousel Component */}
			<section className="w-full md:w-3/4 mx-auto justify-center gap-2 grid grid-cols-1 md:grid-cols-4 md:mt-3">
				<div className="col-span-3">
					<HeroCarousel category={categoryName} articles={dataArticle.articles} autoScrollInterval={5000} />
				</div>
				<Suspense
					fallback={
						<div className="md:grid grid-cols-1 hidden gap-1">
							{Array.from({ length: 3 }).map((_, idx) => (
								<div
									key={idx}
									className="flex flex-col h-64 bg-muted rounded-lg animate-pulse overflow-hidden border border-border"
								>
									<div className="relative flex-1 bg-gray-200 dark:bg-gray-700" />
									<div className="p-4">
										<div className="h-4 w-3/4 mb-2 bg-gray-300 dark:bg-gray-600 rounded" />
										<div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
									</div>
								</div>
							))}
						</div>
					}
				>
					<div className="md:grid grid-cols-1 hidden gap-1">
						{sideHeroes?.map((article: any, idx: number) => (
							<Link
								key={article.id}
								href={`/artikel/${article.slug}`}
								className="group flex flex-col bg-card dark:bg-card hover:shadow-lg dark:hover:shadow-xl transition-all duration-300  overflow-hidden border border-border dark:border-border hover:border-primary/50 dark:hover:border-secondary/50 smooth-transition"
							>
								{/* Image Container */}
								<div className="relative h-full md:h-full overflow-hidden bg-muted dark:bg-muted">
									<Image
										src={article.featuredImage || "/placeholder.svg"}
										alt={article.title}
										fill
										className="object-cover group-hover:scale-110 transition-transform duration-500"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
									{/* Gradient Overlay: darken bottom */}
									<div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/75 pointer-events-none" />
									{/* Index badge */}
									<div className="absolute top-3 left-3 bg-primary dark:bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
										{idx + 1}
									</div>
									<div className="absolute w-full space-y-2 gap-2 bottom-3 left-3 right-3">
										<h3
											className="text-lg truncate font-semibold text-white mb-3 line-clamp-2 "
											title={article.title}
										>
											{article.title}
										</h3>
										<span className="text-xs mt-2 text-white absolute bottom-0 text">
											{new Date(article.publishedAt).toLocaleDateString("id-ID")}
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				</Suspense>
			</section>

			{/* Main Content */}
			<div className="md:w-4/5  mx-auto px-5 py-12 lg:py-16 flex justify-center">
				<div className="grid grid-cols-1 mx-auto lg:grid-cols-3 gap-8 w-full max-w-7xl">
					{/* Main Content - 2/3 width */}
					<div className="lg:col-span-2">
						{/* Editors Pick Section */}
						<section className="mb-16 pb-16 border-b border-border dark:border-border">
							<div className="flex flex-row sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mb-8 p-3 sm:p-5 rounded-2xl bg-linear-to-r from-blue-600 via-blue-400 to-sky-400 dark:bg-linear-to-br dark:from-blue-900 dark:via-blue-700 dark:to-blue-500 shadow-lg">
								<div className="w-2 h-8 sm:w-1 sm:h-10 rounded-full bg-linear-to-b from-amber-400 via-orange-500 to-pink-500 shadow-md" />
								<h2 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow tracking-wide">
									Berita Terbaru
								</h2>
							</div>

							<Suspense fallback={
								<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
									{Array.from({ length: 6 }).map((_, idx) => (
										<div
											key={idx}
											className="animate-pulse flex flex-col bg-card dark:bg-card rounded-lg overflow-hidden border border-border dark:border-border"
										>
											<div className="relative h-40 md:h-48 bg-muted dark:bg-muted" />
											<div className="flex-1 p-4 flex flex-col">
												<div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
												<div className="h-5 w-full bg-gray-300 dark:bg-gray-600 rounded mb-2" />
												<div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
												<div className="flex justify-between">
													<div className="h-3 w-14 bg-gray-100 dark:bg-gray-800 rounded" />
													<div className="h-3 w-12 bg-gray-100 dark:bg-gray-800 rounded" />
												</div>
											</div>
										</div>
									))}
								</div>
							}>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-5">
									{news?.map((article: any, idx: number) => (
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
											</div>
											{/* Content */}
											<div className="flex-1 p-4 flex flex-col">
												<span className="text-xs font-bold text-primary dark:text-secondary mb-2 uppercase">
													{categoryName.find((item:any)=>item.id === Number(article.category[0]))?.name}
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
							</Suspense>
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
						<Suspense
							fallback={
								<section className="mb-16">
									<h2 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3">
										<div className="w-1 h-8 bg-linear-to-b from-primary to-secondary rounded-full" />
										PRSSNI
									</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{[...Array(4)].map((_, idx) => (
											<div
												key={idx}
												className="animate-pulse rounded-lg h-40 bg-muted border border-border"
											/>
										))}
									</div>
									<div className="mt-10 text-center">
										<div className="inline-block w-40 h-12 bg-muted animate-pulse rounded-lg" />
									</div>
								</section>
							}
						>
							<section className="mb-16">
								<h2 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3">
									<div className="w-1 h-8 bg-linear-to-b from-primary to-secondary rounded-full" />
									PRSSNI
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{latestArticles?.map((article:any) => (
										<ArticleCard key={article.id} data={article} />
									))}
								</div>
								<div className="mt-10 text-center">
									<button className="border-2 border-primary text-primary dark:text-secondary dark:border-secondary hover:bg-primary dark:hover:bg-secondary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg smooth-transition">
										Muat Berita Lainnya
									</button>
								</div>
							</section>
						</Suspense>

						{/* Newsletter */}
						<Newsletter />
					</div>

					{/* Right Sidebar */}
					<RightSidebar
						trendingArticles={dataArticle?.articles?.slice(0, 5).map((a:any) => ({
							id: a.id,
							title: a.title,
							slug: a.slug,
							publishedAt: a.publishedAt,
						}))}
					/>
				</div>
			</div>

			<Footer />
		</main>
	)
}
