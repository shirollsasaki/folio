import type { TemplateProps } from '@/types/template';

export default function ElegantSerif({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#92400E';

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
    <div className="min-h-screen bg-amber-50" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Elegant Header */}
        <header className="text-center mb-20 pb-12 border-b" style={{ borderColor: accent }}>
          {profile.avatar_url && (
            <div className="mb-8">
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-40 h-40 rounded-full mx-auto object-cover ring-8 ring-white shadow-xl"
              />
            </div>
          )}
          
          <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: accent }} />
          
          <h1 className="text-6xl font-bold mb-6" style={{ color: accent, fontWeight: 700 }}>
            {profile.name}
          </h1>
          
          <p className="text-2xl text-gray-700 italic mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            {profile.headline}
          </p>
          
          {profile.location && (
            <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              {profile.location}
            </p>
          )}
        </header>

        {/* About Section */}
        <section className="mb-16 pb-16 border-b" style={{ borderColor: `${accent}40` }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px" style={{ backgroundColor: accent }} />
            <h2 className="text-sm uppercase tracking-widest" style={{ color: accent, fontFamily: "'Inter', sans-serif" }}>
              About
            </h2>
          </div>
          <p className="text-xl leading-loose text-gray-800">
            {profile.bio}
          </p>
        </section>

        {/* Experience Section */}
        {profile.experience.length > 0 && (
          <section className="mb-16 pb-16 border-b" style={{ borderColor: `${accent}40` }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px" style={{ backgroundColor: accent }} />
              <h2 className="text-sm uppercase tracking-widest" style={{ color: accent, fontFamily: "'Inter', sans-serif" }}>
                Professional Journey
              </h2>
            </div>
            <div className="space-y-10">
              {profile.experience.map((exp, idx) => (
                <article key={`${exp.company}-${idx}`} className="relative pl-8">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: accent, fontFamily: "'Inter', sans-serif" }}>
                    {exp.dates}
                  </div>
                  <h3 className="text-3xl font-bold mb-2" style={{ color: accent }}>
                    {exp.title}
                  </h3>
                  <p className="text-xl text-gray-700 italic">{exp.company}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {profile.skills.length > 0 && (
          <section className="mb-16 pb-16 border-b" style={{ borderColor: `${accent}40` }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px" style={{ backgroundColor: accent }} />
              <h2 className="text-sm uppercase tracking-widest" style={{ color: accent, fontFamily: "'Inter', sans-serif" }}>
                Areas of Expertise
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {profile.skills.map((skill) => (
                <div key={skill} className="flex items-baseline gap-3">
                  <span className="text-2xl" style={{ color: accent }}>·</span>
                  <span className="text-lg text-gray-800">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {socialLinks.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px" style={{ backgroundColor: accent }} />
              <h2 className="text-sm uppercase tracking-widest" style={{ color: accent, fontFamily: "'Inter', sans-serif" }}>
                Get in Touch
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="flex items-center justify-between pb-4 border-b-2 transition-colors" style={{ borderColor: `${accent}40` }}>
                    <span className="text-xl" style={{ color: accent }}>{link.label}</span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform" style={{ color: accent }}>
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Footer Decoration */}
        <div className="mt-20 text-center">
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: accent }} />
        </div>
      </div>
    </div>
  );
}
