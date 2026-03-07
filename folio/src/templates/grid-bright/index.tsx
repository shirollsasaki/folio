'use client';
import type { TemplateProps } from '@/types';

export default function GridBright({ profile, accentColor = '#f59e0b' }: TemplateProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#ffffff', color: '#111', minHeight: '100vh' }}>
      <div style={{ background: accentColor, padding: '48px', color: '#111' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '24px', alignItems: 'center' }}>
          {profile.avatar_url && (
            <img src={profile.avatar_url} alt={profile.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(0,0,0,0.2)' }} />
          )}
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '4px' }}>{profile.name}</h1>
            <p style={{ fontSize: '1rem', opacity: 0.8 }}>{profile.headline} · {profile.location}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          <div style={{ gridColumn: 'span 2', padding: '32px', background: '#f9f9f9', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>About</h2>
            <p style={{ lineHeight: '1.7', color: '#333' }}>{profile.bio}</p>
          </div>

          <div style={{ padding: '32px', background: '#f9f9f9', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>Links</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {profile.custom_links.map((link) => (
                <a key={link.url} href={link.url} style={{ color: '#111', fontSize: '0.9rem', fontWeight: '500', textDecoration: 'none', padding: '8px 12px', background: accentColor + '33', borderRadius: '6px' }}>{link.label}</a>
              ))}
            </div>
          </div>
        </div>

        {profile.experience.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '20px' }}>Experience</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {profile.experience.map((exp) => (
                <div key={`${exp.company}-${exp.title}`} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', borderLeft: `4px solid ${accentColor}` }}>
                  <p style={{ fontWeight: '600', marginBottom: '4px' }}>{exp.title}</p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>{exp.company}</p>
                  <p style={{ color: '#999', fontSize: '0.8rem' }}>{exp.dates}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {profile.skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '16px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {profile.skills.map((skill) => (
                <span key={skill} style={{ padding: '6px 14px', background: accentColor + '22', border: `1px solid ${accentColor}44`, borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
