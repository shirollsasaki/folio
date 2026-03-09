'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, StepIndicator } from '@/components/AppShell';
import type { ProfileData } from '@/types';

interface ExperienceItem {
  _key: number;
  title: string;
  company: string;
  dates: string;
}

interface CustomLinkItem {
  _key: number;
  label: string;
  url: string;
}

export default function BuildStep1() {
  const router = useRouter();
  const keyCounter = useRef(2);

  const [linkedinExtractUrl, setLinkedinExtractUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);

  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [skillsRaw, setSkillsRaw] = useState('');

  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    { _key: 0, title: '', company: '', dates: '' },
  ]);

  const [customLinks, setCustomLinks] = useState<CustomLinkItem[]>([
    { _key: 0, label: '', url: '' },
    { _key: 1, label: '', url: '' },
  ]);

  const [errors, setErrors] = useState<{ name?: string; headline?: string; bio?: string }>({});

  async function handleLinkedInExtract(e: React.FormEvent) {
    e.preventDefault();
    if (!linkedinExtractUrl.trim()) {
      setExtractError('Please enter a LinkedIn URL');
      return;
    }

    setIsExtracting(true);
    setExtractError('');

    try {
      const response = await fetch('/folio/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin_url: linkedinExtractUrl.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Extraction failed');
      }

      const extracted = data.profile as ProfileData;

      setName(extracted.name || '');
      setHeadline(extracted.headline || '');
      setBio(extracted.bio || '');
      setLocation(extracted.location || '');
      setAvatarUrl(extracted.avatar_url || '');
      setLinkedinUrl(linkedinExtractUrl.trim());
      setTwitterUrl(extracted.twitter_url || '');
      setInstagramUrl(extracted.instagram_url || '');
      setGithubUrl(extracted.github_url || '');
      setYoutubeUrl(extracted.youtube_url || '');
      setWebsiteUrl(extracted.website_url || '');
      setSkillsRaw(extracted.skills.join(', '));

      if (extracted.experience.length > 0) {
        setExperiences(
          extracted.experience.slice(0, 3).map((exp, idx) => ({
            _key: idx,
            title: exp.title,
            company: exp.company,
            dates: exp.dates,
          }))
        );
        keyCounter.current = extracted.experience.length;
      }

      if (extracted.custom_links.length > 0) {
        setCustomLinks(
          extracted.custom_links.slice(0, 2).map((link, idx) => ({
            _key: idx,
            label: link.label,
            url: link.url,
          }))
        );
      }

      setShowManualForm(true);
    } catch (error) {
      setExtractError(error instanceof Error ? error.message : 'Failed to extract profile');
    } finally {
      setIsExtracting(false);
    }
  }

  function updateExperience(key: number, field: keyof Omit<ExperienceItem, '_key'>, value: string) {
    setExperiences((prev) =>
      prev.map((exp) => (exp._key === key ? { ...exp, [field]: value } : exp))
    );
  }

  function addExperience() {
    if (experiences.length < 3) {
      const newKey = keyCounter.current;
      keyCounter.current += 1;
      setExperiences((prev) => [...prev, { _key: newKey, title: '', company: '', dates: '' }]);
    }
  }

  function updateCustomLink(key: number, field: keyof Omit<CustomLinkItem, '_key'>, value: string) {
    setCustomLinks((prev) =>
      prev.map((link) => (link._key === key ? { ...link, [field]: value } : link))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: { name?: string; headline?: string; bio?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!headline.trim()) newErrors.headline = 'Headline is required.';
    if (!bio.trim()) newErrors.bio = 'Bio is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const profile: ProfileData = {
      name: name.trim(),
      headline: headline.trim(),
      bio: bio.trim(),
      location: location.trim(),
      avatar_url: avatarUrl.trim(),
      linkedin_url: linkedinUrl.trim(),
      twitter_url: twitterUrl.trim() || undefined,
      instagram_url: instagramUrl.trim() || undefined,
      github_url: githubUrl.trim() || undefined,
      youtube_url: youtubeUrl.trim() || undefined,
      website_url: websiteUrl.trim() || undefined,
      experience: experiences
        .filter((e) => e.title || e.company)
        .map((e) => ({ title: e.title, company: e.company, dates: e.dates })),
      skills: skillsRaw.split(',').map((s) => s.trim()).filter(Boolean),
      custom_links: customLinks
        .filter((l) => l.label && l.url)
        .map((l) => ({ label: l.label, url: l.url })),
    };

    sessionStorage.setItem('folio_profile', JSON.stringify(profile));
    router.push('/build/template');
  }

  return (
    <AppShell>
      <div className="app-main-scroll" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', padding: '48px 24px' }}>
          <StepIndicator currentStep={1} />
          
          <span className="tag mb-s">Step 1 of 3</span>
          <h1 className="text-2xl font-medium mb-s">Tell us about yourself</h1>
          <p className="text-secondary mb-l">Import from LinkedIn or fill in manually.</p>

          {!showManualForm ? (
          <div className="mb-l">
            <div className="card mb-m">
              <div className="card-body">
                <span className="tag tag-filled mb-m" style={{ display: 'inline-block' }}>⚡ Quick Import</span>
                <form onSubmit={handleLinkedInExtract}>
                  <div className="mb-m">
                    <label htmlFor="linkedin-extract" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      LinkedIn Profile URL
                    </label>
                    <input
                      id="linkedin-extract"
                      type="url"
                      className="input"
                      value={linkedinExtractUrl}
                      onChange={(e) => setLinkedinExtractUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourname"
                      disabled={isExtracting}
                      style={{ opacity: isExtracting ? 0.6 : 1 }}
                    />
                    {extractError && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{extractError}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isExtracting}
                  >
                    {isExtracting ? 'Extracting profile...' : 'Import from LinkedIn'}
                  </button>
                </form>
              </div>
            </div>

            <div className="text-center mb-m">
              <span className="text-secondary">or</span>
            </div>

            <button
              type="button"
              onClick={() => setShowManualForm(true)}
              className="btn btn-secondary w-full"
            >
              Fill in manually instead
            </button>
          </div>
        ) : (
          <>
            {name && (
              <div className="card mb-l" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt={name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <p className="font-medium">{name}</p>
                  <p className="text-secondary text-sm">{headline}</p>
                </div>
                <span className="tag tag-filled">✓ Imported</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col gap-m mb-l">
                <div>
                  <label htmlFor="name" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    style={{ borderColor: errors.name ? '#ef4444' : undefined }}
                  />
                  {errors.name && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="headline" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Headline *
                  </label>
                  <input
                    id="headline"
                    type="text"
                    className="input"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Senior Product Designer at Acme"
                    style={{ borderColor: errors.headline ? '#ef4444' : undefined }}
                  />
                  {errors.headline && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{errors.headline}</p>}
                </div>

                <div>
                  <label htmlFor="bio" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Bio *
                  </label>
                  <textarea
                    id="bio"
                    className="input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="I'm a designer who loves systems thinking and building products people care about..."
                    rows={4}
                    style={{ resize: 'vertical', lineHeight: '1.6', borderColor: errors.bio ? '#ef4444' : undefined }}
                  />
                  {errors.bio && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{errors.bio}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    className="input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div>
                  <label htmlFor="avatar-url" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Photo URL
                  </label>
                  <input
                    id="avatar-url"
                    type="url"
                    className="input"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px', marginTop: '8px' }}>
                <h3 className="text-lg font-medium mb-m">Experience</h3>
                <div className="flex flex-col gap-m">
                  {experiences.map((exp, roleNum) => (
                    <div key={exp._key} className="card">
                      <div className="card-body">
                        <span className="tag mb-s" style={{ display: 'inline-block' }}>Role {roleNum + 1}</span>
                        <div className="flex flex-col gap-s">
                          <div>
                            <label htmlFor={`exp-title-${exp._key}`} className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Job Title
                            </label>
                            <input
                              id={`exp-title-${exp._key}`}
                              type="text"
                              className="input"
                              value={exp.title}
                              onChange={(e) => updateExperience(exp._key, 'title', e.target.value)}
                              placeholder="Senior Designer"
                            />
                          </div>
                          <div>
                            <label htmlFor={`exp-company-${exp._key}`} className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Company
                            </label>
                            <input
                              id={`exp-company-${exp._key}`}
                              type="text"
                              className="input"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp._key, 'company', e.target.value)}
                              placeholder="Acme Inc."
                            />
                          </div>
                          <div>
                            <label htmlFor={`exp-dates-${exp._key}`} className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Dates
                            </label>
                            <input
                              id={`exp-dates-${exp._key}`}
                              type="text"
                              className="input"
                              value={exp.dates}
                              onChange={(e) => updateExperience(exp._key, 'dates', e.target.value)}
                              placeholder="2022 – Present"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {experiences.length < 3 && (
                    <button type="button" onClick={addExperience} className="btn btn-secondary w-full">
                      + Add experience
                    </button>
                  )}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px', marginTop: '32px' }}>
                <h3 className="text-lg font-medium mb-m">Skills</h3>
                <div>
                  <label htmlFor="skills" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Skills (comma-separated)
                  </label>
                  <input
                    id="skills"
                    type="text"
                    className="input"
                    value={skillsRaw}
                    onChange={(e) => setSkillsRaw(e.target.value)}
                    placeholder="React, TypeScript, Figma, Node.js"
                  />
                  <p className="text-sm text-secondary mt-xs">Separate each skill with a comma.</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px', marginTop: '32px' }}>
                <h3 className="text-lg font-medium mb-m">Social Links</h3>
                <div className="flex flex-col gap-m">
                  <div>
                    <label htmlFor="linkedin-url" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      LinkedIn URL
                    </label>
                    <input id="linkedin-url" type="url" className="input" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/yourname" />
                  </div>

                  <div>
                    <label htmlFor="twitter-url" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Twitter/X URL
                    </label>
                    <input id="twitter-url" type="url" className="input" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="https://x.com/yourname" />
                  </div>

                  <div>
                    <label htmlFor="github-url" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      GitHub URL
                    </label>
                    <input id="github-url" type="url" className="input" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/yourname" />
                  </div>

                  <div>
                    <label htmlFor="instagram-url" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Instagram URL
                    </label>
                    <input id="instagram-url" type="url" className="input" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="https://instagram.com/yourname" />
                  </div>

                  <div>
                    <label htmlFor="youtube-url" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      YouTube URL
                    </label>
                    <input id="youtube-url" type="url" className="input" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/@yourname" />
                  </div>

                  <div>
                    <label htmlFor="website-url" className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Personal Website
                    </label>
                    <input id="website-url" type="url" className="input" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://yourwebsite.com" />
                  </div>

                  {customLinks.map((link, linkNum) => (
                    <div key={link._key} className="card">
                      <div className="card-body">
                        <span className="tag mb-s" style={{ display: 'inline-block' }}>Custom Link {linkNum + 1}</span>
                        <div className="flex flex-col gap-s">
                          <div>
                            <label htmlFor={`link-label-${link._key}`} className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Label
                            </label>
                            <input id={`link-label-${link._key}`} type="text" className="input" value={link.label} onChange={(e) => updateCustomLink(link._key, 'label', e.target.value)} placeholder="GitHub" />
                          </div>
                          <div>
                            <label htmlFor={`link-url-${link._key}`} className="text-sm text-secondary" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              URL
                            </label>
                            <input id={`link-url-${link._key}`} type="url" className="input" value={link.url} onChange={(e) => updateCustomLink(link._key, 'url', e.target.value)} placeholder="https://github.com/yourname" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '48px' }}>
                <button type="submit" className="btn btn-primary btn-large">
                  Next: Choose template →
                </button>
              </div>
            </form>
          </>
        )}
        </div>
      </div>
    </AppShell>
  );
}
