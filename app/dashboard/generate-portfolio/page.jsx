import PortfolioForm from '@/components/PortfolioForm';
import { Sparkles } from 'lucide-react';
import React from 'react';

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Create Your Professional Portfolio
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Dream Portfolio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase your skills, projects, and achievements with our intuitive portfolio builder. 
            Create a professional portfolio that stands out in minutes.
          </p>
        </div>
        {/* Form Section */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <PortfolioForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;