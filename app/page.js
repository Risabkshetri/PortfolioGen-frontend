'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const [isloading, setIsLoading] = useState(false);


  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      setIsLoading(true);
      setIsLoading(true);
      router.push("/dashboard");
    }
  }, [isLoaded, userId, router]);


  if (!isLoaded || isloading) {
    return (
      <div className="flex justify-center items-center h-screen pb-10">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-purple-500"></div>
      </div>
    )
  }

  const handleClick = () => {
    router.push("/sign-up");
  }

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
      title: "Professional Templates",
      description: "Choose from our curated collection of modern portfolio designs"
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Quick Setup",
      description: "Get your portfolio up and running in minutes, not hours"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "Secure & Reliable",
      description: "Your portfolio is hosted on reliable, secure infrastructure"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 pb-10">
    <main className="flex-grow">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Your Professional Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
            Stand out with a stunning portfolio website built in seconds
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleClick} 
              className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleClick} 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 font-semibold py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
            >
              View Examples
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4 p-2 inline-block bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}