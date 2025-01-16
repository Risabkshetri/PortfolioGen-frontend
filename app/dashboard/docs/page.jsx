'use client';

import {
  FileText,
  Coffee,
  Rocket,
  Wrench,
  Shield,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function DocumentationPage() {

  const headerSections = [
    { title: "Platform Overview", link: "/dashboard" },
    { title: "API Reference", link: "#" },
    { title: "Examples", link: "./examples" }
  ];

  const docSections = [
    {
      title: 'Getting Started',
      icon: Rocket,
      articles: [
        { title: 'Quick Start Guide', href: '#', timeToRead: '5 min' },
        { title: 'Installation', href: '#', timeToRead: '3 min' },
        { title: 'Basic Concepts', href: '#', timeToRead: '7 min' }
      ]
    },
    {
      title: 'Core Features',
      icon: Wrench,
      articles: [
        { title: 'Portfolio Generation', href: '#', timeToRead: '6 min' },
        { title: 'Customization Options', href: '#', timeToRead: '8 min' },
        { title: 'Template System', href: '#', timeToRead: '5 min' }
      ]
    },
    {
      title: 'Advanced Usage',
      icon: Shield,
      articles: [
        { title: 'Custom Components', href: '#', timeToRead: '10 min' },
        { title: 'API Integration', href: '#', timeToRead: '12 min' },
        { title: 'Performance Optimization', href: '#', timeToRead: '8 min' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-24 dark:bg-gray-900 dark:text-white">
      {/* Documentation Header */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">Documentation</h1>
          <p className="text-lg text-gray-600 mb-8 dark:text-gray-400">
            Everything you need to know about creating your portfolio
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {headerSections.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-xl 
                        shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-700 dark:text-white"
            >
              <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
              <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-200" />
            </Link>
          ))}
        </div>

        {/* Documentation Sections */}
        <div className="space-y-12">
          {docSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-700">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-200" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.articles.map((article, index) => (
                    <a
                      key={index}
                      href={article.href}
                      className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md 
                              transition-all duration-200 border border-gray-100 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-200" />
                        <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Coffee className="w-4 h-4 mr-1" />
                          {article.timeToRead}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 
                                  transition-colors mb-2 dark:text-white dark:group-hover:text-blue-200">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Learn more about {article.title.toLowerCase()} and how to implement it effectively.
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-16 p-6 bg-blue-50 rounded-xl text-center dark:bg-blue-700 dark:text-white">
          <h2 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Need More Help?</h2>
          <p className="text-gray-600 mb-4 dark:text-gray-400">
            Can't find what you're looking for? Get in touch with our support team.
          </p>
          <button className="inline-flex items-center justify-center px-6 py-3 
                          border border-transparent text-base font-medium rounded-lg 
                          text-white bg-blue-600 hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}