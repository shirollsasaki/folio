'use client';
import type { TemplateProps } from '@/types';

export default function ForestLink({ profile }: TemplateProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#1a2e1a', color: '#e8f0e8', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        {profile.avatar_url && (
          <img src={profile.avatar_url} alt={profile.name} style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto 20px' }} />
        )}
        <h1 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px' }}>{profile.name}</h1>
        <p style={{ textAlign: 'center', color: '#9ab89a', fontSize: '0.9rem', marginBottom: '8px' }}>{profile.headline}</p>
        <p style={{ textAlign: 'center', color: '#6a8a6a', fontSize: '0.8rem', marginBottom: '32px' }}>{profile.location}</p>

        <p style={{ textAlign: 'center', color: '#b8d0b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '40px' }}>{profile.bio}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {profile.custom_links.map((link) => (
            <a key={link.url} href={link.url} style={{ display: 'block', padding: '14px 20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#e8f0e8', textDecoration: 'none', textAlign: 'center', fontSize: '0.95rem', fontWeight: '500' }}>
              {link.label}
            </a>
          ))}
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} style={{ display: 'block', padding: '14px 20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#e8f0e8', textDecoration: 'none', textAlign: 'center', fontSize: '0.95rem', fontWeight: '500' }}>
              LinkedIn
            </a>
          )}
        </div>

        {profile.experience.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6a8a6a', marginBottom: '16px' }}>Experience</p>
            {profile.experience.map((exp) => (
              <div key={`${exp.company}-${exp.title}`} style={{ marginBottom: '12px', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', textAlign: 'center' }}>
                <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{exp.title}</p>
                <p style={{ color: '#9ab89a', fontSize: '0.8rem' }}>{exp.company} · {exp.dates}</p>
              </div>
            ))}
          </div>
        )}

        {profile.skills.length > 0 && (
          <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {profile.skills.slice(0, 6).map((skill) => (
              <span key={skill} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', fontSize: '0.75rem', color: '#9ab89a' }}>{skill}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
