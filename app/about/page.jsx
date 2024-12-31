'use client';

import { Zap, Code, Bot, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();
  const stats = [
    { number: '1000+', label: 'Portfolios Generated' },
    { number: '50+', label: 'Templates Available' },
    { number: '100%', label: 'Satisfaction Rate' }
  ];

const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: 'Instant Generation',
      description: 'Create your portfolio in seconds with our AI-powered platform'
    },
    {
      icon: <Code className="w-6 h-6 text-blue-500" />,
      title: 'Clean Code',
      description: 'Get production-ready, optimized code that you can run locally'
    },
    {
      icon: <Bot className="w-6 h-6 text-blue-500" />,
      title: 'AI Integration',
      description: 'Smart content suggestions and layout optimization'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revolutionizing Portfolio Creation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              KshetriAI is transforming how developers showcase their work through instant, 
              AI-powered portfolio generation.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://github.com/kshetriai" 
                 className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                Born from the vision of making portfolio creation accessible to everyone, 
                KshetriAI was founded with a simple mission: to help developers showcase 
                their work professionally without spending hours on design and development.
              </p>
              <p className="mb-4">
                Our platform combines the power of AI with modern web technologies to 
                generate beautiful, responsive portfolios that truly represent your 
                professional journey. What sets us apart is the ability to not just 
                create, but provide you with clean, optimized code that you can run 
                and modify on your own system.
              </p>
              <p>
                Today, we're proud to serve developers worldwide, helping them create 
                stunning portfolios that make a lasting impression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4 p-2 inline-block bg-blue-50 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Portfolio?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who have already transformed their online presence
          </p>
          <button onClick={() => router.push('/sign-in')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}