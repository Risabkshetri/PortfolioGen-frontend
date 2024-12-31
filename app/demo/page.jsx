'use client';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
// For now, we only need one template since backend has one template
const TEMPLATES = [
  {
    id: 'default',
    name: 'Default',
    preview: 'Professional portfolio template'
  }
];

const res = await axios.get('http://localhost:5000/api/portfolio'); 
const data = res.data;

const MOCK_PORTFOLIOS = data;

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [selectedPortfolio, setSelectedPortfolio] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError('');
      setStatus('Generating portfolio...');

      const portfolio = MOCK_PORTFOLIOS[selectedPortfolio];
      
      // Simplify the data structure to match what the template expects
      const data = {
        name: portfolio.name,
        tagline: portfolio.tagline,
        location: portfolio.location,
        about: portfolio.about,
        skills: portfolio.skills,
        aboutSkill: portfolio.aboutSkill,
        yearofexperience: portfolio.yearOfExperience,
        aboutImgurl: portfolio.aboutImgUrl,
        projects: portfolio.projects,
        facebookUrl: portfolio.socialLinks.facebook,
        twitterUrl: portfolio.socialLinks.twitter,
        instaUrl: portfolio.socialLinks.instagram
      };
      const response = await fetch('/api/generate-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate portfolio');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-${data.name.toLowerCase().replace(/\s+/g, '-')}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
      setStatus('Portfolio generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setStatus('');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStatus('');
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Portfolio Generator</h1>
        <p className="text-gray-600">Generate a professional portfolio website in seconds</p>
      </div>

      <div className="space-y-6">
        {/* Template selection can be hidden if you only have one template */}
        {TEMPLATES.length > 1 && (
          <div className="space-y-2">
            <label className="block font-medium">Select Template</label>
            <div className="grid grid-cols-3 gap-4">
              {TEMPLATES.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedTemplate === template.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-sm text-gray-600">{template.preview}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="block font-medium">Select Sample Data</label>
          <div className="space-y-2">
            {MOCK_PORTFOLIOS.map((portfolio, index) => (
              <button
                key={index}
                onClick={() => setSelectedPortfolio(index)}
                className={`w-full p-4 border rounded-lg text-left transition-colors ${
                  selectedPortfolio === index 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{portfolio.name}</div>
                <div className="text-sm text-gray-600">{portfolio.tagline}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {portfolio.projects.length} projects
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{loading ? 'Generating...' : 'Generate Portfolio'}</span>
          </button>
          
          {status && (
            <div className="text-center text-sm text-green-500">
              {status}
            </div>
          )}
          
          {error && (
            <div className="text-center text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}