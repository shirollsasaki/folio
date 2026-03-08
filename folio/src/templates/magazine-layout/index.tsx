import type { TemplateProps } from '@/types/template';

export default function MagazineLayout({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#DC2626';

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
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Magazine Header */}
      <header className="border-b-4 border-black py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: accent }}>
              Professional Portfolio
            </div>
            <h1 className="text-6xl font-bold text-black italic">{profile.name}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b-2 border-gray-300">
          {profile.avatar_url && (
            <div className="md:col-span-1">
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          )}
          <div className="md:col-span-2">
            <div className="h-2 w-20 mb-6" style={{ backgroundColor: accent }} />
            <h2 className="text-4xl font-bold mb-4 text-black">{profile.headline}</h2>
            {profile.location && (
              <p className="text-sm uppercase tracking-wider text-gray-600 mb-6">
                Based in {profile.location}
              </p>
            )}
            <p className="text-xl leading-relaxed text-gray-800 first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Experience Section */}
        {profile.experience.length > 0 && (
          <section className="mb-12 pb-12 border-b-2 border-gray-300">
            <h2 className="text-4xl font-bold mb-8 text-black italic">Career</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.experience.map((exp, idx) => (
                <article key={`${exp.company}-${idx}`} className="border-l-4 pl-6" style={{ borderColor: accent }}>
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>
                    {exp.dates}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-black">{exp.title}</h3>
                  <p className="text-lg text-gray-700 font-semibold">{exp.company}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {profile.skills.length > 0 && (
          <section className="mb-12 pb-12 border-b-2 border-gray-300">
            <h2 className="text-4xl font-bold mb-8 text-black italic">Expertise</h2>
            <div className="columns-2 md:columns-3 gap-6">
              {profile.skills.map((skill) => (
                <div key={skill} className="break-inside-avoid mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="text-lg font-medium text-gray-800">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Connect Section */}
        {socialLinks.length > 0 && (
          <section>
            <h2 className="text-4xl font-bold mb-8 text-black italic">Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black p-6 hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{link.label}</span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black mt-12 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
