import type { TemplateProps } from '@/types/template';

export default function TimelineFlow({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#EC4899';

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-20">
          {profile.avatar_url && (
            <div className="relative inline-block mb-6">
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
              />
              <div 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white"
                style={{ backgroundColor: accent }}
              />
            </div>
          )}
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{profile.name}</h1>
          <p className="text-xl text-gray-600 mb-2">{profile.headline}</p>
          {profile.location && <p className="text-gray-500">📍 {profile.location}</p>}
        </header>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div 
            className="absolute left-8 top-0 bottom-0 w-1"
            style={{ backgroundColor: `${accent}30` }}
          />

          {/* About */}
          <div className="relative pl-20 pb-16">
            <div 
              className="absolute left-5 top-2 w-7 h-7 rounded-full border-4 border-white shadow-md"
              style={{ backgroundColor: accent }}
            />
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          </div>

          {/* Experience Timeline */}
          {profile.experience.map((exp, idx) => (
            <div key={`${exp.company}-${idx}`} className="relative pl-20 pb-16">
              <div 
                className="absolute left-5 top-2 w-7 h-7 rounded-full border-4 border-white shadow-md"
                style={{ backgroundColor: accent }}
              />
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: accent }}>
                  {exp.dates}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                <p className="text-lg font-medium text-gray-600">{exp.company}</p>
              </div>
            </div>
          ))}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="relative pl-20 pb-16">
              <div 
                className="absolute left-5 top-2 w-7 h-7 rounded-full border-4 border-white shadow-md"
                style={{ backgroundColor: accent }}
              />
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Connect */}
          {socialLinks.length > 0 && (
            <div className="relative pl-20">
              <div 
                className="absolute left-5 top-2 w-7 h-7 rounded-full border-4 border-white shadow-md"
                style={{ backgroundColor: accent }}
              />
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>
                  Connect
                </h2>
                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <span className="font-semibold text-gray-900">{link.label}</span>
                      <span className="text-xl" style={{ color: accent }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
