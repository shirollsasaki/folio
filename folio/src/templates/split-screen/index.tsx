import type { TemplateProps } from '@/types/template';

export default function SplitScreen({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#06B6D4';

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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div 
        className="lg:w-1/2 min-h-screen p-12 flex items-center justify-center"
        style={{ backgroundColor: accent }}
      >
        <div className="max-w-lg">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-48 h-48 rounded-2xl object-cover mb-8 shadow-2xl"
            />
          )}
          <h1 className="text-6xl font-black text-white mb-4 leading-tight">
            {profile.name}
          </h1>
          <p className="text-2xl text-white/90 mb-4">{profile.headline}</p>
          {profile.location && (
            <p className="text-white/70 text-lg">📍 {profile.location}</p>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:w-1/2 min-h-screen bg-gray-900 p-12 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          {/* About */}
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              About
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">{profile.bio}</p>
          </section>

          {/* Experience */}
          {profile.experience.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                Experience
              </h2>
              <div className="space-y-6">
                {profile.experience.map((exp, idx) => (
                  <div key={`${exp.company}-${idx}`}>
                    <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                    <p className="font-semibold" style={{ color: accent }}>{exp.company}</p>
                    <p className="text-sm text-gray-500 mt-1">{exp.dates}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Connect */}
          {socialLinks.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                Connect
              </h2>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{link.label}</span>
                      <span className="text-xl group-hover:translate-x-2 transition-transform" style={{ color: accent }}>
                        →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
