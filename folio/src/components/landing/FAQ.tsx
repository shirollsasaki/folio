"use client";

import { useState } from 'react';

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
    }
  ];

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-8">
                  {faq.question}
                </span>
                <svg 
                  className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
