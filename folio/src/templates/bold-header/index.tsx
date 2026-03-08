import type { TemplateProps } from '@/types/template';

export default function BoldHeader({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#F59E0B';

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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="px-6 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white/20"
              />
            )}
            <div>
              <h1 className="text-6xl font-black mb-3" style={{ color: accent }}>
                {profile.name}
              </h1>
              <p className="text-2xl text-gray-300 font-light">{profile.headline}</p>
              {profile.location && <p className="text-gray-400 mt-2">📍 {profile.location}</p>}
            </div>
          </div>
          
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">{profile.bio}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Experience Section */}
        {profile.experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: accent }}>
              EXPERIENCE
            </h2>
            <div className="space-y-8">
              {profile.experience.map((exp, idx) => (
                <div key={`${exp.company}-${idx}`} className="border-l-4 pl-6 py-2" style={{ borderColor: accent }}>
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="text-lg" style={{ color: accent }}>{exp.company}</p>
                  <p className="text-gray-400 mt-1">{exp.dates}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {profile.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: accent }}>
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-6 py-3 rounded-none font-bold text-gray-900 text-sm uppercase tracking-wider"
                  style={{ backgroundColor: accent }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Connect Section */}
        {socialLinks.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8" style={{ color: accent }}>
              CONNECT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-between group"
                >
                  <span className="font-bold text-lg">{link.label}</span>
                  <span className="text-2xl group-hover:translate-x-2 transition-transform" style={{ color: accent }}>
                    →
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
