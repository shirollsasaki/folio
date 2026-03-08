import type { TemplateProps } from '@/types/template';

export default function NeonTerminal({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#00FF9F';

  const socialLinks = [
    profile.linkedin_url && { label: 'LinkedIn', url: profile.linkedin_url },
    profile.twitter_url && { label: 'Twitter', url: profile.twitter_url },
    profile.github_url && { label: 'GitHub', url: profile.github_url },
    profile.instagram_url && { label: 'Instagram', url: profile.instagram_url },
    profile.youtube_url && { label: 'YouTube', url: profile.youtube_url },
    profile.website_url && { label: 'Website', url: profile.website_url },
    ...profile.custom_links,
  ].filter(Boolean) as { label: string; url: string }[];

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Courier New', monospace" }}>
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,159,0.1) 2px, rgba(0,255,159,0.1) 4px)'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Terminal Header */}
        <div className="border-2 mb-8" style={{ borderColor: accent, boxShadow: `0 0 20px ${accent}40` }}>
          <div className="bg-black p-2 flex items-center gap-2" style={{ borderBottom: `1px solid ${accent}` }}>
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs" style={{ color: accent }}>
              portfolio.exe
            </span>
          </div>
          
          <div className="p-8">
            {profile.avatar_url && (
              <div className="mb-6 border-2 inline-block" style={{ borderColor: accent }}>
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-32 h-32 object-cover"
                  style={{ filter: 'contrast(1.2) saturate(1.5)' }}
                />
              </div>
            )}
            
            <div className="mb-4">
              <span className="text-xs" style={{ color: accent }}>{'> '}</span>
              <span className="text-xs" style={{ color: accent }}>whoami</span>
            </div>
            <h1 className="text-5xl font-bold mb-3 tracking-wider" style={{ color: accent, textShadow: `0 0 10px ${accent}` }}>
              {profile.name.toUpperCase()}
            </h1>
            <p className="text-xl mb-2" style={{ color: accent }}>{profile.headline}</p>
            {profile.location && (
              <p className="text-sm" style={{ color: `${accent}80` }}>
                LOCATION: {profile.location.toUpperCase()}
              </p>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="border-2 mb-8 p-8" style={{ borderColor: accent, boxShadow: `0 0 20px ${accent}40` }}>
          <div className="mb-3">
            <span className="text-xs" style={{ color: accent }}>{'> '}</span>
            <span className="text-xs" style={{ color: accent }}>cat bio.txt</span>
          </div>
          <p className="text-white/90 leading-relaxed">{profile.bio}</p>
        </div>

        {/* Experience */}
        {profile.experience.length > 0 && (
          <div className="border-2 mb-8 p-8" style={{ borderColor: accent, boxShadow: `0 0 20px ${accent}40` }}>
            <div className="mb-6">
              <span className="text-xs" style={{ color: accent }}>{'> '}</span>
              <span className="text-xs" style={{ color: accent }}>ls experience/</span>
            </div>
            <div className="space-y-4">
              {profile.experience.map((exp, idx) => (
                <div key={`${exp.company}-${idx}`} className="pl-6 border-l" style={{ borderColor: accent }}>
                  <div className="text-sm" style={{ color: `${accent}80` }}>[{exp.dates}]</div>
                  <div className="font-bold" style={{ color: accent }}>{exp.title}</div>
                  <div className="text-white/80">{exp.company}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {profile.skills.length > 0 && (
          <div className="border-2 mb-8 p-8" style={{ borderColor: accent, boxShadow: `0 0 20px ${accent}40` }}>
            <div className="mb-6">
              <span className="text-xs" style={{ color: accent }}>{'> '}</span>
              <span className="text-xs" style={{ color: accent }}>cat skills.json</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, idx) => (
                <span
                  key={skill}
                  className="px-4 py-2 border font-bold"
                  style={{ 
                    borderColor: accent, 
                    color: accent,
                    boxShadow: `0 0 10px ${accent}40`
                  }}
                >
                  [{idx}] {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {socialLinks.length > 0 && (
          <div className="border-2 p-8" style={{ borderColor: accent, boxShadow: `0 0 20px ${accent}40` }}>
            <div className="mb-6">
              <span className="text-xs" style={{ color: accent }}>{'> '}</span>
              <span className="text-xs" style={{ color: accent }}>cat links.sh</span>
            </div>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-white/5 p-3 transition-colors"
                >
                  <span style={{ color: accent }}>{'> '}</span>
                  <span className="text-white/60">open </span>
                  <span style={{ color: accent }}>{link.label.toLowerCase().replace(/\s+/g, '_')}</span>
                  <span className="text-white/40 ml-2">→</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
