import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Rocket } from 'lucide-react'

function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm fixed top-0 w-full z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">Portfolio Builder</span>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  </header>
  )
}

export default Header