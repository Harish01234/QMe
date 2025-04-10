import React from 'react';
import { ArrowRight, CheckCircle, Clipboard, Users } from 'lucide-react';

export default function Homepage() {
  // Colors used in this design:
  // Primary (Dark): #121826
  // Secondary: #4F46E5
  // Accent: #34D399
  // Text/Light: #F9FAFB

  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-500">QMe</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm text-gray-300 hover:text-white">Features</button>
              <button className="px-4 py-2 text-sm text-gray-300 hover:text-white">Pricing</button>
              <button className="px-4 py-2 text-sm text-gray-300 hover:text-white">FAQ</button>
              <button className="px-4 py-2 text-sm bg-indigo-600 rounded-md hover:bg-indigo-700">Sign In</button>
              <button className="px-4 py-2 text-sm bg-emerald-500 rounded-md hover:bg-emerald-600">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Ace Your Next Interview with <span className="text-indigo-500">QMe</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Generate personalized mock interviews tailored to your industry, role, and experience level. Practice, get feedback, and land your dream job.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 bg-indigo-600 rounded-md font-semibold hover:bg-indigo-700 flex items-center">
                Create Interview <ArrowRight className="ml-2" size={18} />
              </button>
              <button className="px-8 py-4 bg-gray-800 rounded-md font-semibold hover:bg-gray-700 flex items-center">
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Mock Interview Preview */}
          <div className="mt-16 bg-gray-800 rounded-xl p-6 max-w-4xl mx-auto border border-gray-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Senior Frontend Developer Interview</h3>
              <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm">Technical</span>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Interviewer:</p>
                <p>Can you explain how React's virtual DOM works and why it's beneficial for performance?</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <p className="text-gray-300 text-sm mb-2">Your Answer:</p>
                <p className="text-gray-400">Click 'Start Interview' to begin recording your answers...</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-emerald-500 rounded-md hover:bg-emerald-600">
                Start Interview
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why Choose QMe?</h2>
            <p className="mt-4 text-lg text-gray-300">
              Our platform offers everything you need to prepare for your interviews
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <CheckCircle className="text-emerald-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Questions</h3>
              <p className="text-gray-300">
                Our AI generates relevant questions tailored to the specific role and industry you're interviewing for.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <Clipboard className="text-emerald-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Detailed Feedback</h3>
              <p className="text-gray-300">
                Receive comprehensive feedback on your answers, including suggestions for improvement.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <Users className="text-emerald-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Peer Review</h3>
              <p className="text-gray-300">
                Share your mock interviews with mentors or peers to get additional insights and advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Success Stories</h2>
            <p className="mt-4 text-lg text-gray-300">
              See how QMe has helped professionals land their dream jobs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-300 mb-4">
                "QMe was instrumental in helping me prepare for my technical interviews. The questions were spot-on, and the feedback helped me identify areas I needed to improve."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="font-semibold">JD</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-sm text-gray-400">Software Engineer at TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-300 mb-4">
                "After practicing with QMe for two weeks, I felt so much more confident going into my interviews. The platform's questions were remarkably similar to what I was asked in the real interview!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="font-semibold">MS</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Michael Smith</p>
                  <p className="text-sm text-gray-400">Product Manager at InnovateCo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to ace your next interview?</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who have used QMe to prepare for their interviews and land their dream jobs.
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-md font-semibold hover:bg-gray-100">
            Get Started for Free
          </button>
          <p className="mt-4 text-indigo-200">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-indigo-500 mb-4">QMe</h3>
              <p className="text-gray-400">
                The ultimate mock interview platform for job seekers.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>FAQ</li>
                <li>Testimonials</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 QMe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}