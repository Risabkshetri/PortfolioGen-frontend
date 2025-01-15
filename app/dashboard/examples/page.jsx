import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Users, Code } from 'lucide-react';

const ExamplesPage = () => {
  const examples = [
    {
      title: "Minimalist Developer Portfolio",
      description: "Clean and modern design focused on showcasing code projects",
      category: "Developer",
      stars: 245,
      users: 1.2+'k',
      image: "/api/placeholder/600/400",
      link: "/templates/minimalist-dev"
    },
    {
      title: "Creative Designer Showcase",
      description: "Visual-heavy layout perfect for designers and artists",
      category: "Designer",
      stars: 189,
      users: 956,
      image: "/api/placeholder/600/400",
      link: "/templates/designer"
    },
    {
      title: "Professional Business Portfolio",
      description: "Corporate style template for business professionals",
      category: "Business",
      stars: 167,
      users: 834,
      image: "/api/placeholder/600/400",
      link: "/templates/business"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-10 dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio Examples
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Explore our collection of professionally designed portfolio templates. 
            Find inspiration and start building your perfect portfolio today.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b bg-white dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500">
              All Templates
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md">
              Developer
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md">
              Designer
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md">
              Business
            </button>
          </div>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <img
                src={example.image}
                alt={example.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {example.category}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">{example.stars}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">{example.users}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {example.description}
                </p>
                <Link 
                  href={example.link}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-medium"
                >
                  View Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to build your portfolio?
          </h2>
          <p className="text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
            Choose a template and customize it to match your personal brand. 
            Start building your professional presence today.
          </p>
          <Link 
            href="/templates/create"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-blue-600 hover:bg-blue-50 dark:hover:bg-blue-700"
          >
            Start Building
            <Code className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;