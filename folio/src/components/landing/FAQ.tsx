'use client';

import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does the LinkedIn sync work?',
      answer:
        'You connect your LinkedIn account once. We import your profile data and keep it synced. When you update LinkedIn, your site updates within minutes.',
    },
    {
      question: 'Can I use my own domain?',
      answer:
        'Yes. Custom domains are available on the Pro plan. We handle SSL certificates and DNS configuration automatically.',
    },
    {
      question: 'Do I need to know how to code?',
      answer:
        'No. The entire setup is point-and-click. You can be live in under 10 minutes without writing a single line of code.',
    },
    {
      question: 'What if I update my LinkedIn?',
      answer:
        'Your Folio site syncs automatically. Changes appear within minutes. You never need to manually update your site.',
    },
    {
      question: 'Can I customize the design?',
      answer:
        'You can choose from our minimal templates and adjust colors. We prioritize clean, professional layouts that work for everyone.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer:
        'You keep full export access. Download your site as static HTML anytime. Your data is yours.',
    },
    {
      question: 'Is there a free tier?',
      answer:
        'Yes. The free tier includes a folio.site subdomain, auto-sync, and SSL. Upgrade to Pro when you want a custom domain.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section"
      style={{
        backgroundColor: 'var(--bg-primary)',
      }}
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <div
          style={{
            maxWidth: 'var(--container-md)',
            margin: '0 auto',
          }}
        >
          {/* Section Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'var(--space-16)',
            }}
          >
            <h2
              id="faq-heading"
              className="heading-2"
              style={{
                marginBottom: 'var(--space-4)',
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            {faqs.map((faq, index) => (
              <article
                key={index}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-base)',
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-6)',
                    backgroundColor: openIndex === index ? 'var(--bg-secondary)' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                    transition: 'background-color var(--transition-fast)',
                  }}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  onMouseEnter={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <h3
                    className="heading-3"
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {faq.question}
                  </h3>
                  <span
                    style={{
                      fontSize: 'var(--text-2xl)',
                      color: 'var(--accent-primary)',
                      transition: 'transform var(--transition-base)',
                      transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height var(--transition-slow)',
                  }}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p
                    className="body-base"
                    style={{
                      padding: 'var(--space-6)',
                      paddingTop: 0,
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
