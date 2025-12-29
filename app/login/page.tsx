"use client"
import React from "react";
import { motion } from "framer-motion";
import { loginUser } from "@/lib/action/auth";
import { redirect, useRouter } from "next/navigation";

// Validasi email sederhana (regex untuk format email)
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Page = () => {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = React.useState<string>("");

  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validasi frontend sebelum kirim ke server
    if (!email || !password) {
      setStatus("error");
      setMessage("Email dan password wajib diisi.");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Format email tidak valid.");
      return;
    }
    if (password.length < 6) {
      setStatus("error");
      setMessage("Password minimal 6 karakter.");
      return;
    }

    setStatus("loading");
    try {
      const result = await loginUser(formData);

      if (result && result.success === true) {
        setStatus("success");
        setMessage(result.message || "Login berhasil!");
        router.push('/admin')
        // Optionally, you may want to refresh, redirect, etc here
        // For demo, just leave as is
      } else {
        setStatus("error");
        setMessage(result?.message || "Login gagal.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay for darker and colorful effect */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-800/80 via-indigo-900/70 to-indigo-700/70 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/90 rounded-xl shadow-2xl p-8 w-full max-w-md backdrop-blur-md"
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-center text-indigo-700 mb-6 drop-shadow"
        >
          Login to Your Account
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              minLength={6}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
              placeholder="Enter your password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: status === "idle" ? 1.05 : 1 }}
            whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
            type="submit"
            disabled={
              status === "success" || status === "loading"
                ? true
                : false
            }
            className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
              ${
                status === "success"
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : status === "loading"
                  ? "bg-indigo-400 opacity-70 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }
            `}
          >
            {status === "loading" && (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </span>
            )}
            {status === "idle" && "Login"}
            {status === "success" && "Success"}
            {status === "error" && "Login"}
          </motion.button>
        </form>
        {message && (
          <div
            className={`mt-4 text-center font-semibold ${
              status === "success"
                ? "text-green-600"
                : status === "error"
                ? "text-red-600"
                : ""
            }`}
          >
            {message}
          </div>
        )}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-indigo-600 hover:underline"
            tabIndex={-1}
          >
            Forgot password?
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;