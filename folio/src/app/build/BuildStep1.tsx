'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
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

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--cream)',
  fontSize: '1rem',
  outline: 'none',
  fontFamily: 'var(--font-dm-sans)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  color: 'var(--cream-dim)',
  marginBottom: '8px',
  fontFamily: 'var(--font-dm-mono)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
};

const sectionDivider: React.CSSProperties = {
  borderTop: '1px solid var(--border)',
  paddingTop: '32px',
  marginTop: '8px',
};

const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-dm-mono)',
  fontSize: '0.7rem',
  color: 'var(--gold)',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  marginBottom: '20px',
};

const errorBubble: React.CSSProperties = {
  color: '#ef4444',
  fontSize: '0.8rem',
  marginTop: '6px',
  fontFamily: 'var(--font-dm-sans)',
};

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
      const response = await fetch('/api/extract', {
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        color: 'var(--cream)',
        overflowY: 'auto',
        padding: '48px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            style={{
              width: '32px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: step === 1 ? 'var(--gold)' : 'var(--border)',
            }}
          />
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '600px' }}>
        <p
          style={{
            color: 'var(--gold)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontFamily: 'var(--font-dm-mono)',
          }}
        >
          Step 1 of 3
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '2.25rem',
            marginBottom: '12px',
            lineHeight: '1.2',
          }}
        >
          Tell us about yourself
        </h1>
        <p
          style={{
            color: 'var(--cream-dim)',
            marginBottom: '44px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          Import from LinkedIn or fill in manually.
        </p>

        {!showManualForm ? (
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '24px',
              }}
            >
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-dm-mono)',
                }}
              >
                ⚡ Quick Import
              </p>
              <form onSubmit={handleLinkedInExtract}>
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="linkedin-extract" style={labelStyle}>
                    LinkedIn Profile URL
                  </label>
                  <input
                    id="linkedin-extract"
                    type="url"
                    value={linkedinExtractUrl}
                    onChange={(e) => setLinkedinExtractUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourname"
                    disabled={isExtracting}
                    style={{
                      ...inputStyle,
                      opacity: isExtracting ? 0.6 : 1,
                      cursor: isExtracting ? 'not-allowed' : 'text',
                    }}
                  />
                  {extractError && <p style={errorBubble}>{extractError}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isExtracting}
                  style={{ width: '100%' }}
                >
                  {isExtracting ? 'Extracting profile...' : 'Import from LinkedIn'}
                </Button>
              </form>
            </div>

            <div style={{ textAlign: 'center', margin: '24px 0' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--cream-dim)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                or
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowManualForm(true)}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'transparent',
                border: '1px dashed var(--border-gold)',
                borderRadius: '8px',
                color: 'var(--gold)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-dm-mono)',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(201,168,76,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
            >
              Fill in manually instead
            </button>
          </div>
        ) : (
          <>
            {name && (
              <div
                style={{
                  backgroundColor: 'rgba(201,168,76,0.1)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt={name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--cream)',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--cream-dim)',
                      margin: 0,
                    }}
                  >
                    {headline}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-dm-mono)',
                  }}
                >
                  ✓ Imported
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>
                    Name <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    style={{
                      ...inputStyle,
                      borderColor: errors.name ? 'rgba(239,68,68,0.5)' : 'var(--border)',
                    }}
                  />
                  {errors.name && <p style={errorBubble}>{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="headline" style={labelStyle}>
                    Headline <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  <input
                    id="headline"
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Senior Product Designer at Acme"
                    style={{
                      ...inputStyle,
                      borderColor: errors.headline ? 'rgba(239,68,68,0.5)' : 'var(--border)',
                    }}
                  />
                  {errors.headline && <p style={errorBubble}>{errors.headline}</p>}
                </div>

                <div>
                  <label htmlFor="bio" style={labelStyle}>
                    Bio <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="I'm a designer who loves systems thinking and building products people care about..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      lineHeight: '1.6',
                      borderColor: errors.bio ? 'rgba(239,68,68,0.5)' : 'var(--border)',
                    }}
                  />
                  {errors.bio && <p style={errorBubble}>{errors.bio}</p>}
                </div>

                <div>
                  <label htmlFor="location" style={labelStyle}>
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Francisco, CA"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="avatar-url" style={labelStyle}>
                    Photo URL
                  </label>
                  <input
                    id="avatar-url"
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={sectionDivider}>
                <p style={sectionHeading}>Experience</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {experiences.map((exp, roleNum) => (
                    <div
                      key={exp._key}
                      style={{
                        backgroundColor: 'var(--bg3)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-dm-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--cream-dim)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Role {roleNum + 1}
                      </p>
                      <div>
                        <label htmlFor={`exp-title-${exp._key}`} style={labelStyle}>
                          Job Title
                        </label>
                        <input
                          id={`exp-title-${exp._key}`}
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp._key, 'title', e.target.value)}
                          placeholder="Senior Designer"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor={`exp-company-${exp._key}`} style={labelStyle}>
                          Company
                        </label>
                        <input
                          id={`exp-company-${exp._key}`}
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp._key, 'company', e.target.value)}
                          placeholder="Acme Inc."
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor={`exp-dates-${exp._key}`} style={labelStyle}>
                          Dates
                        </label>
                        <input
                          id={`exp-dates-${exp._key}`}
                          type="text"
                          value={exp.dates}
                          onChange={(e) => updateExperience(exp._key, 'dates', e.target.value)}
                          placeholder="2022 – Present"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  ))}

                  {experiences.length < 3 && (
                    <button
                      type="button"
                      onClick={addExperience}
                      style={{
                        background: 'none',
                        border: '1px dashed var(--border-gold)',
                        borderRadius: '8px',
                        color: 'var(--gold)',
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        padding: '12px',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'border-color 0.2s, background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(201,168,76,0.05)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                      }}
                    >
                      + Add experience
                    </button>
                  )}
                </div>
              </div>

              <div style={{ ...sectionDivider, marginTop: '32px' }}>
                <p style={sectionHeading}>Skills</p>
                <div>
                  <label htmlFor="skills" style={labelStyle}>
                    Skills (comma-separated)
                  </label>
                  <input
                    id="skills"
                    type="text"
                    value={skillsRaw}
                    onChange={(e) => setSkillsRaw(e.target.value)}
                    placeholder="React, TypeScript, Figma, Node.js"
                    style={inputStyle}
                  />
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--cream-dim)',
                      marginTop: '8px',
                      fontFamily: 'var(--font-dm-sans)',
                      opacity: 0.7,
                    }}
                  >
                    Separate each skill with a comma.
                  </p>
                </div>
              </div>

              <div style={{ ...sectionDivider, marginTop: '32px' }}>
                <p style={sectionHeading}>Social Links</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label htmlFor="linkedin-url" style={labelStyle}>
                      LinkedIn URL
                    </label>
                    <input
                      id="linkedin-url"
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourname"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="twitter-url" style={labelStyle}>
                      Twitter/X URL
                    </label>
                    <input
                      id="twitter-url"
                      type="url"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      placeholder="https://x.com/yourname"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="github-url" style={labelStyle}>
                      GitHub URL
                    </label>
                    <input
                      id="github-url"
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/yourname"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="instagram-url" style={labelStyle}>
                      Instagram URL
                    </label>
                    <input
                      id="instagram-url"
                      type="url"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="https://instagram.com/yourname"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="youtube-url" style={labelStyle}>
                      YouTube URL
                    </label>
                    <input
                      id="youtube-url"
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/@yourname"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="website-url" style={labelStyle}>
                      Personal Website
                    </label>
                    <input
                      id="website-url"
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      style={inputStyle}
                    />
                  </div>

                  {customLinks.map((link, linkNum) => (
                    <div
                      key={link._key}
                      style={{
                        backgroundColor: 'var(--bg3)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-dm-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--cream-dim)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Custom Link {linkNum + 1}
                      </p>
                      <div>
                        <label htmlFor={`link-label-${link._key}`} style={labelStyle}>
                          Label
                        </label>
                        <input
                          id={`link-label-${link._key}`}
                          type="text"
                          value={link.label}
                          onChange={(e) => updateCustomLink(link._key, 'label', e.target.value)}
                          placeholder="GitHub"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor={`link-url-${link._key}`} style={labelStyle}>
                          URL
                        </label>
                        <input
                          id={`link-url-${link._key}`}
                          type="url"
                          value={link.url}
                          onChange={(e) => updateCustomLink(link._key, 'url', e.target.value)}
                          placeholder="https://github.com/yourname"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '48px' }}>
                <Button type="submit" variant="primary" size="lg">
                  Next: Choose template →
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
