import type { TemplateProps } from '@/types/template';

export default function CompactMinimal({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#0F172A';

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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Compact Card */}
        <div className="bg-white border border-gray-200 p-12">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1" style={{ color: accent }}>
                {profile.name}
              </h1>
              <p className="text-gray-600 mb-1">{profile.headline}</p>
              {profile.location && (
                <p className="text-sm text-gray-500">{profile.location}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </div>

          {/* Experience */}
          {profile.experience.length > 0 && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                Experience
              </h2>
              <div className="space-y-4">
                {profile.experience.map((exp, idx) => (
                  <div key={`${exp.company}-${idx}`}>
                    <div className="font-semibold" style={{ color: accent }}>
                      {exp.title} · {exp.company}
                    </div>
                    <div className="text-sm text-gray-500">{exp.dates}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm text-gray-700"
                  >
                    {skill}
                    {skill !== profile.skills[profile.skills.length - 1] && ' ·'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {socialLinks.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                Links
              </h2>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                    style={{ color: accent }}
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Powered by Folio
          </p>
        </div>
      </div>
    </div>
  );
}
