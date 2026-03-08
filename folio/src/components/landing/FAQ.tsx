"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does LinkedIn import work?",
      answer: "Simply paste your LinkedIn profile URL and we'll automatically extract your work experience, education, skills, and summary. You can edit everything after import."
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes! Pro users can connect custom domains. We'll guide you through the DNS setup process - it takes about 5 minutes."
    },
    {
      question: "What if I want to change templates later?",
      answer: "You can switch templates anytime with one click. All your content stays the same, just the design changes."
    },
    {
      question: "How fast is deployment really?",
      answer: "Under 10 seconds. We use edge deployment so your site is live globally almost instantly."
    },
    {
      question: "Can I cancel my Pro subscription?",
      answer: "Absolutely. Cancel anytime, no questions asked. You'll keep Pro features until the end of your billing period."
    },
    {
      question: "Do I need any technical skills?",
      answer: "Not at all! If you can use LinkedIn, you can use Folio. Everything is point-and-click, no coding required."
    }
  ];

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Questions?{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border-2 border-slate-200 hover:border-blue-200 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 md:px-8 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors group"
              >
                <span className="font-bold text-slate-900 pr-8 text-lg">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-all flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 md:px-8 pb-6 text-slate-600 leading-relaxed text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Still have questions?
          </p>
          <a 
            href="mailto:support@folio.app" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            Get in touch with our team →
          </a>
        </div>
      </div>
    </section>
  );
}
