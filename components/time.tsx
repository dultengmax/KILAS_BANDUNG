"use client"
import React, { useEffect, useState } from 'react';

const dayNames = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
];
const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const Times = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (typeof window === 'undefined') {
    return null; // Prevent hydration mismatch by not rendering on the server
  }

  const day = dayNames[now.getDay()];
  const date = now.getDate();
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return (
    <>
      <div className="w-full h-10 bg-blue-950 flex items-center justify-center text-white font-semibold text-xs tracking-wide">
        {`${day}, ${date} ${month} ${year} | ${hours}:${minutes}:${seconds}`}
      </div>
    </>
  );
};

export default Times;