import type { TemplateProps } from '@/types/template';

export default function SidePanel({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#8B5CF6';

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900">
      {/* Sidebar */}
      <aside className="lg:w-80 lg:min-h-screen bg-gray-950 p-8 border-r" style={{ borderColor: accent }}>
        <div className="sticky top-8">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-full aspect-square rounded-lg object-cover mb-6 ring-2 ring-white/10"
            />
          )}
          
          <h1 className="text-2xl font-bold text-white mb-2">{profile.name}</h1>
          <p className="text-gray-400 mb-4">{profile.headline}</p>
          
          {profile.location && (
            <p className="text-sm text-gray-500 mb-6">📍 {profile.location}</p>
          )}

          <div className="h-px bg-gray-800 mb-6" />

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                  <span className="text-sm font-medium">{link.label} →</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-4xl">
          {/* About Section */}
          <section className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>
              About
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">{profile.bio}</p>
          </section>

          {/* Experience Section */}
          {profile.experience.length > 0 && (
            <section className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accent }}>
                Experience
              </h2>
              <div className="space-y-8">
                {profile.experience.map((exp, idx) => (
                  <div key={`${exp.company}-${idx}`} className="pl-6 border-l-2" style={{ borderColor: accent }}>
                    <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                    <p className="font-medium mb-2" style={{ color: accent }}>{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.dates}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {profile.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accent }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium border"
                    style={{ borderColor: accent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
