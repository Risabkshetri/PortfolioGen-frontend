'use client';
import React, { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
import Link from 'next/link';


import { 
  LayoutDashboard, 
  BookOpen, 
  FileCode, 
  Settings, 
  Boxes,
  ChevronRight,
  Zap,
  Menu,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userId } = useAuth();
 
  
  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        redirect("/sign-in");
      }, 1000); // Wait for 1 second before redirecting
    }
  }, [userId]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Boxes, label: 'Examples', href: '/dashboard/examples' },
    { icon: BookOpen, label: 'Documentation', href: '/dashboard/docs' },
    { icon: FileCode, label: 'Generate', href: '/dashboard/generate-portfolio' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' }
  ];

  const quickActions = [
    { label: 'New Portfolio', href:"/dashboard/generate-portfolio",  description: 'Create a new portfolio from scratch' },
    { label: 'Import Project', href:"#", description: 'Import from GitHub repository' },
    { label: 'View Templates', href:"#", description: 'Browse our template collection' }
  ];

  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 dark:from-gray-900 dark:to-gray-800 dark:text-gray-300">
    {/* Mobile Sidebar Overlay */}
    {isSidebarOpen && (
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm dark:bg-gray-950/80 z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Sidebar */}
    <aside className={`min-h-screen fixed top-0 left-0 z-50 h-full w-72 bg-white/80 backdrop-blur-lg border-r border-gray-200 
      dark:bg-gray-800/90 dark:border-gray-700/50 
      transform transition-transform duration-300 ease-in-out flex flex-col
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:z-0`}>
      
      {/* Brand Logo */}
      <div className="p-4 border-b border-gray-200/80 bg-white/90 dark:bg-gray-800/95 dark:border-gray-700/50">
        <div className="flex items-center">
          <Zap className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent
            dark:from-gray-100 dark:to-blue-300">KshetriAI</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-grow p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg
                hover:bg-gray-100 hover:text-gray-900 group transition-all duration-200
                dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200"
            >
              <Icon className="w-5 h-5 group-hover:text-blue-500 transition-colors duration-200
                dark:group-hover:text-blue-400" />
              <span className="font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200/80 p-4 bg-white/90 dark:bg-gray-800/95 dark:border-gray-700/50">
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors
          dark:bg-gray-700/50 dark:hover:bg-gray-700/70">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-grow">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Your Profile</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Manage your account</div>
          </div>
        </div>
      </div>
    </aside>

    {/* Main Content Wrapper */}
    <div className="lg:pl-72">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 fixed right-0 left-0 top-0 lg:left-72 z-30 
        dark:bg-gray-800/90 dark:border-gray-700/50">
        <div className="px-4">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 
                hover:bg-gray-100/80 transition-colors duration-200
                dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 absolute right-0 left-0 top-0 lg:left-72 z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent
              dark:from-gray-100 dark:to-blue-300">Welcome to Your Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Let's create something amazing today</p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <Link
                href={action.href}
                key={index}
                className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm 
                  hover:shadow-md hover:bg-white/90 transition-all duration-200 text-left group
                  dark:bg-gray-800/50 dark:hover:bg-gray-800/70 dark:shadow-gray-900/30"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200
                      dark:text-gray-100 dark:group-hover:text-blue-400">
                      {action.label}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200
                    dark:text-gray-500 dark:group-hover:text-blue-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}