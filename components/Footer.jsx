'use client';

import { Facebook, Linkedin, Twitter } from 'lucide-react';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  
  if (isDashboard) {
    return null;
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ];

  return (
    <footer className="w-full fixed bottom-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://res.cloudinary.com/deht0dsks/image/upload/v1736830213/sub-logo1_fckuaf.jpg"
              alt="Logo" 
              className="h-9 w-9 object-contain rounded-md"
            />
            <p className="text-sm text-muted-foreground">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground hover:text-primary transform transition-all duration-200 hover:-translate-y-1"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


