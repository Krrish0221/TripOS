"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, ChevronDown } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { question: "How does the AI Planner work?", answer: "Our AI Planner uses advanced language models to understand your destination and preferences, generating tailored travel itineraries and highlighting top spots instantly." },
    { question: "Is my travel data saved securely?", answer: "Absolutely. We use industry-standard encryption and secure databases to ensure your personal itinerary and profile information are completely protected." },
    { question: "How do I enable the low-bandwidth Data Saver?", answer: "Simply navigate to the Features page and toggle the 'Data Saver' button at the top. This will disable heavy interactive maps and provide clean, text-based geographic summaries." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate DB push
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      // Reset after 3 seconds
      setTimeout(() => setIsSent(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#131315] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            Whether you need technical support, trip planning advice, or want to discuss a business partnership, our team is here to help.
          </p>
        </div>

        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column: Company Info */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center space-y-10">
            <div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">TripOS Headquarters</h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">The future of travel planning, based in India.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-lg">HQ Location</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium">Ahmedabad, Gujarat, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-2xl group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Direct Email</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium">support@tripos.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Phone Number</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium">+91 98765 00000</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-2xl group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Working Hours</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium">Mon - Fri, 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-10 border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-zinc-900 dark:text-white font-medium placeholder-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-zinc-900 dark:text-white font-medium placeholder-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Travel Inquiry Type</label>
                <div className="relative">
                  <select
                    required
                    defaultValue=""
                    className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-zinc-900 dark:text-white font-medium appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Trip Planning">Trip Planning</option>
                    <option value="Business Partnership">Business Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Message</label>
                <textarea
                  required
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-zinc-900 dark:text-white font-medium resize-none placeholder-zinc-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSent}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${isSent
                  ? "bg-emerald-500 text-white shadow-emerald-500/25 cursor-default"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25 active:scale-[0.98]"
                  }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSent ? (
                  <>
                    <CheckCircle size={22} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Mini FAQ Section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-zinc-500 font-medium mt-2">Quick answers to common inquiries.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-white dark:bg-zinc-900 shadow-md transform scale-[1.01]" : "bg-zinc-50 dark:bg-zinc-950/50 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-bold text-lg text-zinc-900 dark:text-white pr-4">{faq.question}</span>
                    <div className={`p-1 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180 bg-blue-100 dark:bg-blue-900/30 text-blue-600" : ""}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 pb-5 opacity-100 mt-2" : "max-h-0 opacity-0 m-0"}`}
                  >
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <ProtectedRoute>
      <ContactContent />
    </ProtectedRoute>
  );
}
