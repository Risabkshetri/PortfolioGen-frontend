import React from 'react';
import { ArrowRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const PortfolioGuide = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How to Create Your Portfolio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Follow these simple steps to create your professional portfolio
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-6 space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                1
              </span>
              Sign Up
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Start by creating an account using a valid email address. This will be used to save and manage your portfolio.
            </p>
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg mt-2">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Pro tip: Use your professional email address for better credibility
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-6 space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                2
              </span>
              Navigate to Generate
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Once logged in, click on the "Generate" button in the navigation menu to start creating your portfolio.
            </p>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-purple-500 pl-6 space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                3
              </span>
              Fill the Portfolio Form
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Complete all required fields in the form. Include your professional information, skills, projects, and any other relevant details.
            </p>
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-orange-500 pl-6 space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                4
              </span>
              Review Example & Complete
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Check out our example portfolio page to understand the expected level of detail. Make sure your portfolio matches similar quality and depth of information.
            </p>
          </div>
          <div className="mt-16 text-center">
          <a 
            href="https://manmohanbio.netlify.app/" 
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Example
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-6">
            <a href="https://www.linkedin.com/in/risab-kshetri" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://x.com/risab_kshetri" className="text-gray-600 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        {/* CTA */}
        <div className="mt-12 text-center">
          <a 
            href="https://www.linkedin.com/in/risab-kshetri" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Connect on LinkedIn
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        </div>
    </div>
  );
};

export default PortfolioGuide;