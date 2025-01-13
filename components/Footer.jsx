'use client';

import { Facebook, Linkedin, Twitter } from 'lucide-react';
import React from 'react';
import { usePathname } from 'next/navigation';

function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  if(isDashboard){
    return null;
    }
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ];
  return (
    <footer className="w-full fixed bottom-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-4">
            <img 
              src="images/logo.png" 
              alt="Logo" 
              className="h-9 w-9 object-contain"
            />
            <p className="text-sm">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transform transition-transform duration-200 hover:-translate-y-1 hover:text-blue-400"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;