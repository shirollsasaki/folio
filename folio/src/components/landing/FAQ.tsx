"use client";

import { useState } from 'react';

const faqs = [
  {
    question: 'How does LinkedIn import work?',
    answer: 'Simply paste your LinkedIn profile URL and we\'ll automatically extract your work experience, education, skills, and summary. You can edit everything after import.',
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Yes! Pro users can connect custom domains. We\'ll guide you through the DNS setup process — it takes about 5 minutes.',
  },
  {
    question: 'What if I want to change templates later?',
    answer: 'You can switch templates anytime with one click. All your content stays the same, just the design changes.',
  },
  {
    question: 'How fast is deployment really?',
    answer: 'Under 10 seconds. We use edge deployment so your site is live globally almost instantly.',
  },
  {
    question: 'Can I cancel my Pro subscription?',
    answer: 'Absolutely. Cancel anytime, no questions asked. You\'ll keep Pro features until the end of your billing period.',
  },
  {
    question: 'Do I need any technical skills?',
    answer: 'Not at all! If you can use LinkedIn, you can use Folio. Everything is point-and-click, no coding required.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" style={{ padding: '120px 48px', backgroundColor: 'var(--bg)' }}>
      <style>{`
        .faq-item {
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .faq-item:hover { border-color: var(--border-gold); }
        .faq-btn {
          width: 100%;
          padding: 22px 28px;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          cursor: pointer;
          gap: 16px;
        }
        .faq-btn:hover { background: var(--bg2); }
        .faq-chevron {
          font-size: 1.1rem;
          color: var(--cream-dim);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-answer {
          padding: 0 28px 22px;
          font-family: var(--font-dm-sans);
          color: var(--cream-dim);
          line-height: 1.7;
          font-size: 0.95rem;
        }
      `}</style>

      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            FAQ
          </p>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Questions? We&apos;ve got answers.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                type="button"
                className="faq-btn"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 600, color: 'var(--cream)', fontSize: '1rem' }}>
                  {faq.question}
                </span>
                <span className={`faq-chevron${openIndex === index ? ' open' : ''}`}>▾</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', marginBottom: '12px', fontSize: '0.95rem' }}>
            Still have questions?
          </p>
          <a href="mailto:support@folio.app" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--gold)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
            Get in touch with our team →
          </a>
        </div>
      </div>
    </section>
  );
}
