// components/SearchBar.tsx
'use client';

import { Param } from '@prisma/client/runtime/library';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce'; // Import library

export default function SearchBar() {
    const [data,setdata] = useState()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Fungsi ini hanya akan dieksekusi setelah user berhenti mengetik selama 300ms
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    // Melakukan update URL tanpa reload halaman penuh
    replace(`${pathname}?${params.toString()}`);
  }, 300); // Jeda 300 milidetik

  return (
    <div className="relative flex flex-1 mt-1 shrink-0 mb-2">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </div>
      <input
        className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm outline-blue-500 placeholder:text-gray-500"
        placeholder="Cari artikel atau berita..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}