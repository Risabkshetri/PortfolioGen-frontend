'use client';
import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';
import VisuallyHidden from '@/components/ui/visually-hidden';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  if (isDashboard) {
    return null;
  }

  const handleNavItemClick = () => {
    setIsOpen(false);
  };

  const NavItems = () => (
    <>
      <Link 
        href="/" 
        onClick={handleNavItemClick}
        className={`transition-colors hover:text-primary ${
          pathname === '/' ? 'text-primary font-medium' : 'text-muted-foreground'
        }`}
      >
        Home
      </Link>
      <Link 
        href="/about" 
        onClick={handleNavItemClick}
        className={`transition-colors hover:text-primary ${
          pathname === '/about' ? 'text-primary font-medium' : 'text-muted-foreground'
        }`}
      >
        About
      </Link>
      <Link 
        href="/contact" 
        onClick={handleNavItemClick}
        className={`transition-colors hover:text-primary ${
          pathname === '/contact' ? 'text-primary font-medium' : 'text-muted-foreground'
        }`}
      >
        Contact
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">PortfolioGen.</span>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <div className="flex items-center space-x-6">
            <NavItems />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="mr-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 transition-transform hover:rotate-12" />
            ) : (
              <Moon className="h-5 w-5 transition-transform hover:-rotate-12" />
            )}
          </Button>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <Link href="/sign-in">
              <Button 
                variant="ghost"
                className="hover:bg-accent hover:text-accent-foreground"
              >
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign up
              </Button>
            </Link>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-accent hover:text-accent-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-64 border-l border-border bg-background"
            >
              <VisuallyHidden>
                <h2>Navigation Menu</h2>
              </VisuallyHidden>
              <div className="flex flex-col space-y-4 mt-6">
                <NavItems />
                <div className="flex flex-col space-y-2 mt-4">
                  <Link href="/sign-in" onClick={handleNavItemClick}>
                    <Button 
                      className="w-full hover:bg-accent hover:text-accent-foreground" 
                      variant="ghost"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={handleNavItemClick}>
                    <Button 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
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