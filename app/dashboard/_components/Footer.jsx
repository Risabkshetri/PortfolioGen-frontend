'use client'
import React from 'react'
import { usePathname } from 'next/navigation';

function Footer() {
  const pathname = usePathname();
  if (pathname === '/dashboard') return null 
  return (
    <footer className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center text-gray-500 text-sm dark:text-gray-400">
        © {new Date().getFullYear()} Portfolio Builder. Made with ❤️ for students.
      </div>
    </div>
  </footer>
    )
}

export default Footer