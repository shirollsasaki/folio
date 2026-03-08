import type { TemplateProps } from '@/types/template';

export default function MinimalCards({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#2563EB';

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
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4"
              style={{ borderColor: accent }}
            />
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name}</h1>
          <p className="text-xl text-gray-600 mb-2">{profile.headline}</p>
          {profile.location && <p className="text-gray-500">📍 {profile.location}</p>}
        </div>

        {/* Bio Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: accent }}>
            About
          </h2>
          <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        </div>

        {/* Experience Cards */}
        {profile.experience.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: accent }}>
              Experience
            </h2>
            <div className="space-y-6">
              {profile.experience.map((exp, idx) => (
                <div key={`${exp.company}-${idx}`} className="border-l-2 pl-4" style={{ borderColor: accent }}>
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.dates}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Card */}
        {profile.skills.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: accent }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${accent}10`, color: accent }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links Card */}
        {socialLinks.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: accent }}>
              Connect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-current transition-colors"
                  style={{ color: accent }}
                >
                  <span className="font-medium">{link.label}</span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
