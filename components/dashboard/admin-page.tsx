"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Users, Eye, LogOut, Plus, Edit2, Trash2 } from "lucide-react"
import DialogUser, { DeleteDialogArticle, DeleteDialogUser, EditDialogUser } from "@/components/dashboard/dialog-user"
import DialogCategory, { DialogDeleteCategory, DialogEditCategory } from "./dialog-category"
import { Button } from "../ui/button"
import MediaList from "./media"
import ProfileContent from "./profilecontent"

export default function AdminDashboard({
    users,category,article
}:{
    users:any,category:any,article:any
}) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)

  const stats = [
    {
      label: "Total Artikel",
      value: `${article.length}`,
      icon: FileText,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total Views",
      value: "45.2K",
      icon: Eye,
      color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
    },
    {
      label: "Total Pembaca",
      value: "12.4K",
      icon: Users,
      color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Admin Users",
      value: `${users.length}`,
      icon: Users,
      color: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
    },
  ]


  const adminUsers = [
    { id: 1, name: "Admin Master", email: "admin@kilasbandung.com", role: "Super Admin", status: "active" },
    { id: 2, name: "Editor Politik", email: "editor.politik@kilasbandung.com", role: "Editor", status: "active" },
    { id: 3, name: "Editor Olahraga", email: "editor.olahraga@kilasbandung.com", role: "Editor", status: "active" },
    { id: 4, name: "Editor Kuliner", email: "editor.kuliner@kilasbandung.com", role: "Editor", status: "active" },
    { id: 5, name: "Moderator", email: "moderator@kilasbandung.com", role: "Moderator", status: "inactive" },
  ]


  

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-lg p-2 w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Admin</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Kilas Bandung Portal</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition"
            onClick={() => {
              // Hapus cookie auth_token
              document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // Redirect ke halaman login
              window.location.href = "/login";
            }}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "articles", label: "Kelola Artikel" },
            { id: "categories", label: "Kelola Kategori" },
            { id: "media", label: "Kelola Assets" },
            { id: "users", label: "Kelola Admin" },
            { id: "profile", label: "profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-slate-600 dark:text-slate-400 font-medium text-sm">{stat.label}</h3>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Recent Articles & Categories Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Articles */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Artikel Terbaru</h2>
                  <Link
                    href="/admin/artikel/baru"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                  >
                    + Tambah
                  </Link>
                </div>

                <div className="space-y-3">
                  {article.slice(0, 4).map((article:any) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white line-clamp-1 text-sm">
                          {article.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {article.category} • {article.date}
                        </p>
                      </div>
                      <span
                        className={`ml-3 inline-block px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                          article.status === "published"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : article.status === "draft"
                              ? "bg-slate-100 text-slate-700 dark:bg-slate-600 dark:text-slate-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {article.status === "published"
                          ? "Dipublikasikan"
                          : article.status === "draft"
                            ? "Draft"
                            : "Terjadwal"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Quick View */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kategori</h2>
                  <button className="text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {category.map((cat:any) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                    >
                      <span className="font-medium text-slate-900 dark:text-white text-sm">{cat.name}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${cat.color}`}>{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Management Tab */}
        {activeTab === "articles" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kelola Artikel</h2>
              <Link
                href="/admin/artikel/baru"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Buat Artikel Baru
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Judul
                    </th>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Kategori
                    </th>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Penulis
                    </th>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Tanggal
                    </th>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {article.map((article:any) => (
                    <tr
                      key={article.id}
                      className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-slate-900 dark:text-white line-clamp-1 text-sm">
                          {article.title}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">{article.category}</td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">{article.author}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            article.status === "published"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : article.status === "draft"
                                ? "bg-slate-100 text-slate-700 dark:bg-slate-600 dark:text-slate-300"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          }`}
                        >
                          {article.status === "published"
                            ? "Dipublikasikan"
                            : article.status === "draft"
                              ? "Draft"
                              : "Terjadwal"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">{article.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/artikel/edit/${article.id}`}  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
                            <Edit2 className="w-4 h-4" />
                          </Link >
<DeleteDialogArticle id={article.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Management Tab */}
        {activeTab === "categories" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kelola Kategori</h2>
              <DialogCategory/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.map((cat:any) => (
                <div
                  key={cat.id}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{cat.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{cat.count}</span> artikel
                      </p>
                      {/* Daftar Subkategori */}
                      {cat.subCategory && cat.subCategory.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">Subkategori:</h4>
                          <ul className="ml-4 list-disc text-slate-700 dark:text-slate-300 text-sm space-y-1">
                            {cat.subCategory.map((sub: any,index:number) => (
                              <li key={index} className="flex items-center justify-between">
                                <span>{sub}</span>

                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">

                      <DialogEditCategory category={cat} />
<DialogDeleteCategory categoryId={cat.id}  />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Users Management Tab */}
        {activeTab === "media" && (
<MediaList/>
        )}
        {/* Admin Users Management Tab */}
        {activeTab === "users" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kelola Admin</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Total {adminUsers.length} admin users</p>
              </div>
  <DialogUser/>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Nama
                    </th>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Email
                    </th>
                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Role
                    </th>

                    <th className="text-left py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user:any) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{user.name}</p>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          {user.role}
                        </span>
                      </td>
      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
<EditDialogUser id={user.id} />
<DeleteDialogUser id={user.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "profile" && (
<ProfileContent/>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {/* {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Konfirmasi Hapus</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Apakah Anda yakin ingin menghapus artikel ini?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                Batal
              </button>
              <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">Hapus</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}
