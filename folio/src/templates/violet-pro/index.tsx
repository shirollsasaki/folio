'use client';
import type { TemplateProps } from '@/types';

export default function VioletPro({ profile, accentColor = '#7c3aed' }: TemplateProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#0f0f1a', color: '#e8e8f0', minHeight: '100vh' }}>
      <div style={{ background: `linear-gradient(135deg, ${accentColor}22, transparent)`, padding: '60px 48px 40px', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          {profile.avatar_url && (
            <img src={profile.avatar_url} alt={profile.name} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0, border: `2px solid ${accentColor}44` }} />
          )}
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '700', marginBottom: '8px' }}>{profile.name}</h1>
            <p style={{ color: accentColor, fontSize: '1rem', marginBottom: '6px' }}>{profile.headline}</p>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>{profile.location}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
          <div>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, marginBottom: '16px' }}>About</h2>
              <p style={{ lineHeight: '1.7', color: '#ccc', fontSize: '0.95rem' }}>{profile.bio}</p>
            </section>

            {profile.experience.length > 0 && (
              <section>
                <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, marginBottom: '20px' }}>Experience</h2>
                {profile.experience.map((exp) => (
                  <div key={`${exp.company}-${exp.title}`} style={{ marginBottom: '20px', paddingLeft: '16px', borderLeft: `2px solid ${accentColor}44` }}>
                    <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{exp.title}</p>
                    <p style={{ color: '#888', fontSize: '0.85rem' }}>{exp.company} · {exp.dates}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

          <div>
            {profile.skills.length > 0 && (
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, marginBottom: '16px' }}>Skills</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {profile.skills.map((skill) => (
                    <div key={skill} style={{ padding: '6px 12px', background: 'rgba(124,58,237,0.1)', borderRadius: '4px', fontSize: '0.85rem' }}>{skill}</div>
                  ))}
                </div>
              </section>
            )}

            {profile.custom_links.length > 0 && (
              <section>
                <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, marginBottom: '16px' }}>Links</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {profile.custom_links.map((link) => (
                    <a key={link.url} href={link.url} style={{ color: '#ccc', fontSize: '0.85rem', textDecoration: 'none' }}>→ {link.label}</a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
