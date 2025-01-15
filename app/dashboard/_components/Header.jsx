'use client'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Rocket } from 'lucide-react'
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();
  if (pathname === '/dashboard') return null 

  return (
    <header className="border-b bg-white/50 backdrop-blur-sm fixed top-0 w-full z-50 dark:bg-gray-800 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-500" />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Builder</span>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  </header>
  )
}

export default Header