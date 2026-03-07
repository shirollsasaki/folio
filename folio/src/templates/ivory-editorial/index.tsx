'use client';
import type { TemplateProps } from '@/types';

export default function IvoryEditorial({ profile }: TemplateProps) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#faf9f6', color: '#1a1a1a', minHeight: '100vh', padding: '60px 40px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '32px', marginBottom: '48px' }}>
        {profile.avatar_url && (
          <img src={profile.avatar_url} alt={profile.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px' }} />
        )}
        <h1 style={{ fontSize: '3rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '8px' }}>{profile.name}</h1>
        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '8px' }}>{profile.headline}</p>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>{profile.location}</p>
      </header>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', color: '#888' }}>About</h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#333' }}>{profile.bio}</p>
      </section>

      {profile.experience.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px', color: '#888' }}>Experience</h2>
          {profile.experience.map((exp) => (
            <div key={`${exp.company}-${exp.title}`} style={{ marginBottom: '20px', paddingLeft: '16px', borderLeft: '2px solid #e0e0e0' }}>
              <p style={{ fontWeight: '600', fontSize: '1rem' }}>{exp.title}</p>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>{exp.company} · {exp.dates}</p>
            </div>
          ))}
        </section>
      )}

      {profile.skills.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', color: '#888' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profile.skills.map((skill) => (
              <span key={skill} style={{ padding: '4px 12px', border: '1px solid #ccc', fontSize: '0.85rem', borderRadius: '2px' }}>{skill}</span>
            ))}
          </div>
        </section>
      )}

      {profile.custom_links.length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', color: '#888' }}>Links</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {profile.custom_links.map((link) => (
              <a key={link.url} href={link.url} style={{ color: '#1a1a1a', textDecoration: 'underline', fontSize: '0.9rem' }}>{link.label}</a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
