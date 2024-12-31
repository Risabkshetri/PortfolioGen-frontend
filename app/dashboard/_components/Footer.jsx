import React from 'react'

function Footer() {
  return (
    <footer className="bg-white border-t">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Portfolio Builder. Made with ❤️ for developers.
      </div>
    </div>
  </footer>
    )
}

export default Footer