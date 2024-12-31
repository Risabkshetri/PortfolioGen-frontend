'use client';
import React from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  
  if(isDashboard){
    return null;
  }
  const NavItems = () => (
    <>
      <Link href="/" className="hover:text-gray-500 transition-colors">
        Home
      </Link>
      <Link href="/about" className="hover:text-gray-500 transition-colors">
        About
      </Link>
      <Link href="/contact" className="hover:text-gray-500 transition-colors">
        Contact
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 px-4 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">PortfolioGen.</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <div className="flex items-center space-x-6">
            <NavItems />
          </div>
        </div>

        {/* Right side items */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="mr-2"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Link href="/sign-in">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-6">
                <NavItems />
                <div className="flex flex-col space-y-2 mt-4">
                  <Link href="/sign-in">
                    <Button className="w-full" variant="ghost">
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;