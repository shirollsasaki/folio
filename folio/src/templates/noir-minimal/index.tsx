'use client';
import type { TemplateProps } from '@/types';

export default function NoirMinimal({ profile }: TemplateProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#0a0a0a', color: '#f0f0f0', minHeight: '100vh', padding: '80px 48px', maxWidth: '720px', margin: '0 auto' }}>
      <header style={{ marginBottom: '64px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '300', letterSpacing: '-0.03em', marginBottom: '12px' }}>{profile.name}</h1>
        <p style={{ fontSize: '1rem', color: '#888', marginBottom: '4px' }}>{profile.headline}</p>
        <p style={{ fontSize: '0.85rem', color: '#555' }}>{profile.location}</p>
      </header>

      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#ccc' }}>{profile.bio}</p>
      </section>

      {profile.experience.length > 0 && (
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '24px' }}>Work</p>
          {profile.experience.map((exp) => (
            <div key={`${exp.company}-${exp.title}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #1a1a1a' }}>
              <div>
                <p style={{ fontWeight: '500', fontSize: '0.95rem' }}>{exp.title}</p>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>{exp.company}</p>
              </div>
              <p style={{ color: '#555', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{exp.dates}</p>
            </div>
          ))}
        </section>
      )}

      {profile.skills.length > 0 && (
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>Skills</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profile.skills.map((skill) => (
              <span key={skill} style={{ padding: '4px 10px', border: '1px solid #333', fontSize: '0.8rem', color: '#aaa' }}>{skill}</span>
            ))}
          </div>
        </section>
      )}

      {profile.custom_links.length > 0 && (
        <section>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>Links</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {profile.custom_links.map((link) => (
              <a key={link.url} href={link.url} style={{ color: '#f0f0f0', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#555' }}>→</span> {link.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
