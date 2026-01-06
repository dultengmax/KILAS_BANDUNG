// entry.js
require('dotenv').config(); // MEMBACA FILE .ENV
const path = require('path');

// Opsional: Log untuk memastikan ENV terbaca (lihat di stderr.log)
console.log("DB_URL Check:", process.env.DATABASE_URL ? "Tersedia" : "Tidak terbaca");

// Mengatur port agar sesuai dengan yang diminta cPanel
process.env.PORT = process.env.PORT || 3000;

// Menjalankan server asli Next.js dari folder standalone
require('./core/server.js');