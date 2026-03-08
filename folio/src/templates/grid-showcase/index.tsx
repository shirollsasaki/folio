import type { TemplateProps } from '@/types/template';

export default function GridShowcase({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#10B981';

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
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="border-b-2" style={{ borderColor: accent }}>
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center gap-6">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.headline}</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bio Card */}
          <div className="col-span-full lg:col-span-2 border-2 p-8" style={{ borderColor: accent }}>
            <div className="w-12 h-1 mb-4" style={{ backgroundColor: accent }} />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">About Me</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{profile.bio}</p>
            {profile.location && (
              <p className="text-gray-600 mt-4 font-medium">📍 {profile.location}</p>
            )}
          </div>

          {/* Stats Card */}
          <div className="border-2 p-8 flex flex-col justify-center" style={{ borderColor: accent }}>
            <div className="space-y-4">
              <div>
                <div className="text-5xl font-bold" style={{ color: accent }}>{profile.experience.length}</div>
                <div className="text-gray-600 uppercase text-sm tracking-wider">Roles</div>
              </div>
              <div>
                <div className="text-5xl font-bold" style={{ color: accent }}>{profile.skills.length}</div>
                <div className="text-gray-600 uppercase text-sm tracking-wider">Skills</div>
              </div>
              <div>
                <div className="text-5xl font-bold" style={{ color: accent }}>{socialLinks.length}</div>
                <div className="text-gray-600 uppercase text-sm tracking-wider">Links</div>
              </div>
            </div>
          </div>

          {/* Experience Cards */}
          {profile.experience.map((exp, idx) => (
            <div key={`${exp.company}-${idx}`} className="border-2 p-6 hover:shadow-lg transition-shadow" style={{ borderColor: accent }}>
              <div className="w-8 h-1 mb-3" style={{ backgroundColor: accent }} />
              <h3 className="font-bold text-lg mb-1 text-gray-900">{exp.title}</h3>
              <p className="font-semibold mb-2" style={{ color: accent }}>{exp.company}</p>
              <p className="text-sm text-gray-600">{exp.dates}</p>
            </div>
          ))}

          {/* Skills Card */}
          {profile.skills.length > 0 && (
            <div className="col-span-full border-2 p-8" style={{ borderColor: accent }}>
              <div className="w-12 h-1 mb-4" style={{ backgroundColor: accent }} />
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {profile.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-3 text-center font-semibold text-sm border-2"
                    style={{ borderColor: accent, color: accent }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 p-6 hover:bg-gray-50 transition-colors group"
              style={{ borderColor: accent }}
            >
              <div className="w-8 h-1 mb-3" style={{ backgroundColor: accent }} />
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">{link.label}</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform" style={{ color: accent }}>
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
