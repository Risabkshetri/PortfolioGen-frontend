'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Input from '@/components/Input';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });

      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 py-12 px-4 sm:px-6 lg:px-8 pb-10 border-r-gray-300 pb-24">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg dark:shadow-lg dark:shadow-gray-900">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-gray-400">We'd love to hear from you</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* For textarea, we should update the Input component to handle this case */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="4"
                className="flex w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm ring-offset-gray-700 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-white font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2
                ${isSubmitting
                  ? 'bg-blue-500/70 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-500/90 transform hover:-translate-y-0.5'
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            {status.type && (
              <div className={`flex items-center gap-2 p-4 rounded-lg transition-all duration-300 ease-in-out ${status.type === 'success'
                  ? 'bg-green-500/30 text-green-400 dark:bg-green-500/30 dark:text-green-400'
                  : 'bg-red-500/30 text-red-400 dark:bg-red-500/30 dark:text-red-400'
                }`}>
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{status.message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}