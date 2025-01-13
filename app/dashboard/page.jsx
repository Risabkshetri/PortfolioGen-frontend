'use client';
import React, { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
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
  
  if (!userId) {
    redirect("/sign-in");
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Boxes, label: 'Examples', href: '/dashboard/examples' },
    { icon: BookOpen, label: 'Documentation', href: '/dashboard/docs' },
    { icon: FileCode, label: 'Generate', href: '/dashboard/generate-portfolio' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' }
  ];

  const quickActions = [
    { label: 'New Portfolio', description: 'Create a new portfolio from scratch' },
    { label: 'Import Project', description: 'Import from GitHub repository' },
    { label: 'View Templates', description: 'Browse our template collection' }
  ];

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        min-h-screen fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-gray-200 
        transform transition-transform duration-200 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}>
        {/* Brand Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">KshetriAI</span>
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
                className="flex items-center gap-3 px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 group transition-colors"
              >
                <Icon className="w-5 h-5 group-hover:text-blue-600" />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-grow">
              <div className="text-sm font-medium text-gray-900">Your Profile</div>
              <div className="text-xs text-gray-500">Manage your account</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="lg:pl-72">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 fixed right-0 left-0 top-0 lg:left-72 z-30">
          <div className="px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
              <p className="mt-2 text-gray-600">Let's create something amazing today</p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-left group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">{action.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}