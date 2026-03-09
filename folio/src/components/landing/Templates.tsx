'use client';

import { useState, useEffect } from 'react';
import { templates } from '@/lib/templates';

type ThumbnailConfig = {
  bg: string;
  fg: string;
  accent: string;
  dim: string;
  style: 'minimal' | 'bold-dark' | 'gradient' | 'brutalist' | 'serif' | 'grid' | 'split' | 'card' | 'timeline' | 'terminal' | 'link-bio' | 'report';
  border?: string;
};

const thumbConfigs: Record<string, ThumbnailConfig> = {
  'minimal-pro':        { bg: '#FFFFFF', fg: '#111111', accent: '#0066FF', dim: '#666', style: 'minimal' },
  'bold-contrast':      { bg: '#000000', fg: '#FFFFFF', accent: '#FF0055', dim: '#888', style: 'bold-dark' },
  'gradient-modern':    { bg: '#6366F1', fg: '#FFFFFF', accent: '#F0ABFC', dim: 'rgba(255,255,255,0.7)', style: 'gradient' },
  'neo-brutalist':      { bg: '#FFFFFF', fg: '#000000', accent: '#FFDD00', dim: '#333', style: 'brutalist', border: '#000000' },
  'elegant-serif':      { bg: '#FAF8F5', fg: '#2C2C2C', accent: '#8B7355', dim: '#888', style: 'serif' },
  'creative-grid':      { bg: '#FFFFFF', fg: '#111111', accent: '#FF6B35', dim: '#666', style: 'grid' },
  'split-layout':       { bg: '#8B5CF6', fg: '#FFFFFF', accent: '#C4B5FD', dim: 'rgba(255,255,255,0.65)', style: 'split' },
  'card-stack':         { bg: '#F5F5F5', fg: '#111111', accent: '#EF4444', dim: '#777', style: 'card' },
  'timeline-vertical':  { bg: '#0D1117', fg: '#E6EDF3', accent: '#10B981', dim: '#8B949E', style: 'timeline' },
  'minimal-dark':       { bg: '#0A0A0A', fg: '#E5E5E5', accent: '#06B6D4', dim: '#737373', style: 'minimal' },
  'brutalist-grid':     { bg: '#FFFFFF', fg: '#000000', accent: '#00A651', dim: '#444', style: 'brutalist', border: '#000000' },
  'impact-report':      { bg: '#FFFFFF', fg: '#111111', accent: '#0055FF', dim: '#666', style: 'report' },
  'forest-link':        { bg: '#1C3A0F', fg: '#E8F5E9', accent: '#81C784', dim: '#A5D6A7', style: 'link-bio' },
  'terminal-hacker':    { bg: '#000000', fg: '#00FF41', accent: '#00FF41', dim: '#00AA2A', style: 'terminal' },
  'violet-pro':         { bg: '#1E0A3C', fg: '#F3E8FF', accent: '#A855F7', dim: '#9CA3AF', style: 'serif' },
};

function TemplateThumbnail({ slug }: { slug: string }) {
  const cfg = thumbConfigs[slug] ?? { bg: '#F5F5F5', fg: '#111', accent: '#888', dim: '#999', style: 'minimal' as const };
  const mono = "'DM Mono', 'Courier New', monospace";
  const sans = "system-ui, -apple-system, sans-serif";

  const Bar = ({ w, h = 8, color, radius = 4 }: { w: string; h?: number; color: string; radius?: number }) => (
    <div style={{ width: w, height: h, background: color, borderRadius: radius, flexShrink: 0 }} />
  );

  if (cfg.style === 'terminal') {
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, padding: '18px 16px', fontFamily: mono, overflow: 'hidden' }}>
        <div style={{ color: cfg.dim, fontSize: '8px', marginBottom: '10px' }}>alex@portfolio:~$</div>
        <div style={{ color: cfg.accent, fontSize: '11px', fontWeight: 700, marginBottom: '4px', lineHeight: 1.4 }}>Alex Rivera</div>
        <div style={{ color: cfg.dim, fontSize: '7.5px', marginBottom: '12px' }}>Senior Product Designer</div>
        <div style={{ color: cfg.dim, fontSize: '7px', marginBottom: '6px' }}>$ whoami</div>
        <div style={{ color: cfg.fg, fontSize: '7.5px', lineHeight: 1.6, marginBottom: '10px', opacity: 0.8 }}>I design intuitive interfaces that help millions create together.</div>
        <div style={{ color: cfg.dim, fontSize: '7px', marginBottom: '6px' }}>$ ls experience/</div>
        <div style={{ color: cfg.accent, fontSize: '7px', lineHeight: 1.8 }}>figma/ stripe/ google/<br/>dribbble/ behance/</div>
        <div style={{ marginTop: '10px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {['design', 'figma', 'ux', 'systems'].map(s => (
            <span key={s} style={{ background: 'rgba(0,255,65,0.1)', border: `1px solid ${cfg.accent}`, color: cfg.accent, padding: '2px 6px', borderRadius: '3px', fontSize: '6.5px', fontFamily: mono }}>{s}</span>
          ))}
        </div>
      </div>
    );
  }

  if (cfg.style === 'bold-dark') {
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, overflow: 'hidden' }}>
        <div style={{ background: cfg.accent, padding: '16px', marginBottom: '0' }}>
          <div style={{ fontFamily: sans, fontSize: '13px', fontWeight: 900, color: cfg.fg, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Alex<br />Rivera</div>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontFamily: sans, fontSize: '8px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Designer</div>
          <Bar w="70%" color={`${cfg.accent}30`} h={1} radius={0} />
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {['Figma — 2021 – Now', 'Stripe — 2019 – 2021'].map(e => (
              <div key={e} style={{ fontFamily: sans, fontSize: '7.5px', color: cfg.dim }}>{e}</div>
            ))}
          </div>
          <div style={{ marginTop: '10px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['Product Design', 'Systems', 'UX'].map(s => (
              <span key={s} style={{ border: `1px solid ${cfg.accent}`, color: cfg.accent, padding: '2px 6px', borderRadius: '2px', fontSize: '6.5px', fontFamily: sans }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cfg.style === 'gradient') {
    return (
      <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${cfg.bg} 0%, #EC4899 100%)`, padding: '16px', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: '10px', padding: '14px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ fontFamily: sans, fontSize: '12px', fontWeight: 700, color: cfg.fg, marginBottom: '4px' }}>Alex Rivera</div>
          <div style={{ fontFamily: sans, fontSize: '7.5px', color: cfg.dim }}>Senior Product Designer at Figma</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ fontFamily: sans, fontSize: '7px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Experience</div>
            {['Figma', 'Stripe'].map(c => <div key={c} style={{ fontSize: '7px', color: cfg.dim, marginBottom: '3px', fontFamily: sans }}>{c}</div>)}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ fontFamily: sans, fontSize: '7px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
              {['Design', 'Figma', 'UX', 'Proto'].map(s => (
                <span key={s} style={{ background: 'rgba(255,255,255,0.2)', color: cfg.fg, padding: '2px 5px', borderRadius: '10px', fontSize: '6px', fontFamily: sans }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cfg.style === 'brutalist') {
    const bw = cfg.border ?? '#000000';
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, padding: '14px', fontFamily: mono, overflow: 'hidden' }}>
        <div style={{ border: `3px solid ${bw}`, boxShadow: `5px 5px 0 ${bw}`, padding: '10px', marginBottom: '10px' }}>
          <div style={{ fontSize: '12px', fontWeight: 900, color: cfg.fg, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>ALEX<br />RIVERA</div>
          <div style={{ fontSize: '7px', color: cfg.accent, fontWeight: 700, marginTop: '4px', textTransform: 'uppercase' }}>PRODUCT DESIGNER</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ border: `2px solid ${bw}`, padding: '8px' }}>
            <div style={{ fontSize: '6px', textTransform: 'uppercase', color: cfg.accent, marginBottom: '5px', fontWeight: 700 }}>EXP</div>
            {['FIGMA', 'STRIPE'].map(c => <div key={c} style={{ fontSize: '6.5px', color: cfg.fg, marginBottom: '2px' }}>{c}</div>)}
          </div>
          <div style={{ border: `2px solid ${bw}`, padding: '8px', background: cfg.accent }}>
            <div style={{ fontSize: '6px', textTransform: 'uppercase', color: cfg.fg === '#000000' ? '#000' : '#fff', marginBottom: '5px', fontWeight: 700 }}>SKILLS</div>
            {['DESIGN', 'FIGMA', 'UX'].map(s => <div key={s} style={{ fontSize: '6.5px', color: cfg.fg === '#000000' ? '#000' : '#fff', marginBottom: '2px' }}>{s}</div>)}
          </div>
        </div>
      </div>
    );
  }

  if (cfg.style === 'serif') {
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, padding: '18px 16px', overflow: 'hidden' }}>
        <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '14px', fontWeight: 700, color: cfg.fg, letterSpacing: '-0.01em', marginBottom: '4px', lineHeight: 1.2 }}>Alex Rivera</div>
        <div style={{ fontFamily: sans, fontSize: '7.5px', color: cfg.accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Senior Product Designer</div>
        <div style={{ height: '1px', background: cfg.accent, marginBottom: '12px', opacity: 0.4 }} />
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '7.5px', color: cfg.dim, lineHeight: 1.7, marginBottom: '12px' }}>I design intuitive interfaces that help millions of people create together.</div>
        <div style={{ height: '1px', background: cfg.accent, marginBottom: '10px', opacity: 0.2 }} />
        <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Experience</div>
        {['Figma · 2021–Now', 'Stripe · 2019–21'].map(e => (
          <div key={e} style={{ fontFamily: 'Georgia, serif', fontSize: '7.5px', color: cfg.dim, marginBottom: '4px' }}>{e}</div>
        ))}
      </div>
    );
  }

  if (cfg.style === 'grid') {
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, padding: '14px', overflow: 'hidden' }}>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontFamily: sans, fontSize: '13px', fontWeight: 800, color: cfg.fg, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Alex<br />Rivera</div>
          <div style={{ fontFamily: sans, fontSize: '7.5px', color: cfg.accent, fontWeight: 600, marginTop: '4px' }}>Product Designer</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '6px' }}>
          <div style={{ background: cfg.accent, borderRadius: '8px', padding: '10px', aspectRatio: '1' }}>
            <div style={{ fontFamily: sans, fontSize: '7px', color: '#fff', fontWeight: 700, textTransform: 'uppercase' }}>Figma</div>
            <div style={{ fontFamily: sans, fontSize: '6px', color: 'rgba(255,255,255,0.8)', marginTop: '3px' }}>2021–Now</div>
          </div>
          <div style={{ background: '#F5F5F5', borderRadius: '8px', padding: '10px', aspectRatio: '1' }}>
            <div style={{ fontFamily: sans, fontSize: '7px', color: cfg.fg, fontWeight: 700, textTransform: 'uppercase' }}>Stripe</div>
            <div style={{ fontFamily: sans, fontSize: '6px', color: cfg.dim, marginTop: '3px' }}>2019–21</div>
          </div>
        </div>
        <div style={{ background: '#F9F9F9', borderRadius: '8px', padding: '8px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
            {['Design', 'Figma', 'UX', 'Proto', 'Systems'].map(s => (
              <span key={s} style={{ background: `${cfg.accent}15`, color: cfg.accent, padding: '2px 6px', borderRadius: '100px', fontSize: '6px', fontFamily: sans, fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cfg.style === 'split') {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '40%', background: cfg.bg, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: cfg.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff', fontFamily: sans, fontWeight: 700 }}>A</div>
          <div style={{ fontFamily: sans, fontSize: '8.5px', fontWeight: 700, color: cfg.fg, lineHeight: 1.2 }}>Alex Rivera</div>
          <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.dim, lineHeight: 1.5 }}>Senior Product Designer at Figma</div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          {['LinkedIn', 'GitHub', 'Dribbble'].map(l => (
            <div key={l} style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.accent }}>{l} →</div>
          ))}
        </div>
        <div style={{ flex: 1, background: '#FFFFFF', padding: '14px', overflow: 'hidden' }}>
          <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.bg, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', fontWeight: 700 }}>About</div>
          <div style={{ fontFamily: sans, fontSize: '7px', color: '#666', lineHeight: 1.6, marginBottom: '10px' }}>Design systems & interfaces that help millions create.</div>
          <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.bg, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', fontWeight: 700 }}>Experience</div>
          {['Figma · 2021+', 'Stripe · 2019'].map(e => (
            <div key={e} style={{ fontFamily: sans, fontSize: '7px', color: '#444', marginBottom: '4px' }}>{e}</div>
          ))}
        </div>
      </div>
    );
  }

  if (cfg.style === 'timeline') {
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, padding: '14px 12px', overflow: 'hidden' }}>
        <div style={{ fontFamily: sans, fontSize: '11px', fontWeight: 700, color: cfg.fg, marginBottom: '3px' }}>Alex Rivera</div>
        <div style={{ fontFamily: sans, fontSize: '7px', color: cfg.accent, marginBottom: '12px' }}>Product Designer</div>
        <div style={{ position: 'relative', paddingLeft: '14px' }}>
          <div style={{ position: 'absolute', left: '5px', top: 0, bottom: 0, width: '2px', background: `${cfg.accent}40` }} />
          {[
            { label: 'Figma', sub: '2021–Now', active: true },
            { label: 'Stripe', sub: '2019–21', active: false },
            { label: 'Google', sub: '2017–19', active: false },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-11px', top: '3px', width: '8px', height: '8px', borderRadius: '50%', background: item.active ? cfg.accent : `${cfg.accent}40`, border: `2px solid ${cfg.bg}` }} />
              <div style={{ fontFamily: sans, fontSize: '7.5px', fontWeight: 600, color: cfg.fg }}>{item.label}</div>
              <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.dim }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cfg.style === 'link-bio') {
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, padding: '18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: cfg.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: cfg.bg, fontFamily: sans, fontWeight: 700, marginBottom: '8px' }}>A</div>
        <div style={{ fontFamily: sans, fontSize: '9px', fontWeight: 700, color: cfg.fg, marginBottom: '3px' }}>Alex Rivera</div>
        <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.dim, marginBottom: '14px', textAlign: 'center' }}>Product Designer · San Francisco</div>
        {[
          { label: '🔗  LinkedIn', bg: `${cfg.accent}20` },
          { label: '🐙  GitHub', bg: `${cfg.accent}15` },
          { label: '🎨  Dribbble', bg: `${cfg.accent}10` },
          { label: '🌐  Website', bg: `${cfg.accent}08` },
        ].map(link => (
          <div key={link.label} style={{ width: '100%', background: link.bg, border: `1px solid ${cfg.accent}40`, borderRadius: '8px', padding: '7px 10px', marginBottom: '5px', fontFamily: sans, fontSize: '7px', color: cfg.fg, textAlign: 'center' }}>
            {link.label}
          </div>
        ))}
      </div>
    );
  }

  if (cfg.style === 'report') {
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, overflow: 'hidden' }}>
        <div style={{ background: cfg.accent, padding: '12px 14px', marginBottom: '10px' }}>
          <div style={{ fontFamily: sans, fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Alex Rivera</div>
          <div style={{ fontFamily: sans, fontSize: '6.5px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Senior Product Designer at Figma</div>
        </div>
        <div style={{ padding: '0 14px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            {[['8', 'Years'], ['25+', 'Projects'], ['5', 'Skills']].map(([v, l]) => (
              <div key={l} style={{ flex: 1, background: `${cfg.accent}08`, border: `1px solid ${cfg.accent}20`, borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                <div style={{ fontFamily: sans, fontSize: '10px', fontWeight: 700, color: cfg.accent }}>{v}</div>
                <div style={{ fontFamily: sans, fontSize: '5.5px', color: cfg.dim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '5px', fontWeight: 600 }}>Experience</div>
          {['Figma · Lead Designer · 2021+', 'Stripe · Designer · 2019'].map(e => (
            <div key={e} style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.dim, marginBottom: '4px', paddingLeft: '6px', borderLeft: `2px solid ${cfg.accent}` }}>{e}</div>
          ))}
        </div>
      </div>
    );
  }

  if (cfg.style === 'card') {
    return (
      <div style={{ width: '100%', height: '100%', background: cfg.bg, padding: '12px', overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '14px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', marginBottom: '8px', position: 'relative', top: '0' }}>
          <div style={{ fontFamily: sans, fontSize: '10px', fontWeight: 700, color: cfg.fg, marginBottom: '3px' }}>Alex Rivera</div>
          <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.dim, marginBottom: '6px' }}>Senior Product Designer at Figma</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['Design', 'UX', 'Figma'].map(s => (
              <span key={s} style={{ background: `${cfg.accent}15`, color: cfg.accent, padding: '2px 6px', borderRadius: '100px', fontSize: '6px', fontFamily: sans }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', opacity: 0.85, marginBottom: '6px' }}>
          <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px', fontWeight: 600 }}>Experience</div>
          {['Figma · 2021–Now', 'Stripe · 2019–21'].map(e => (
            <div key={e} style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.dim, marginBottom: '3px' }}>{e}</div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', opacity: 0.65 }}>
          <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Skills</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', background: cfg.bg, padding: '18px 16px', overflow: 'hidden' }}>
      <div style={{ fontFamily: sans, fontSize: '14px', fontWeight: 300, color: cfg.fg, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '6px' }}>Alex Rivera</div>
      <div style={{ fontFamily: sans, fontSize: '8px', color: cfg.dim, marginBottom: '16px' }}>Senior Product Designer at Figma</div>
      <div style={{ height: '1px', background: cfg.accent, marginBottom: '14px', opacity: 0.3 }} />
      <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', fontWeight: 600 }}>About</div>
      <div style={{ fontFamily: sans, fontSize: '7px', color: cfg.dim, lineHeight: 1.65, marginBottom: '12px' }}>Design systems & interfaces that help millions create together.</div>
      <div style={{ fontFamily: sans, fontSize: '6.5px', color: cfg.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', fontWeight: 600 }}>Experience</div>
      {['Figma — 2021 – Present', 'Stripe — 2019 – 2021'].map(e => (
        <div key={e} style={{ fontFamily: sans, fontSize: '7px', color: cfg.dim, marginBottom: '4px' }}>{e}</div>
      ))}
    </div>
  );
}

function PreviewModal({ slug, name, onClose }: { slug: string; name: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${name}`}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'modal-in 0.2s ease' }}
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'default' }}
      />
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-slide {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-frame-wrap {
          animation: modal-slide 0.25s ease forwards;
        }
      `}</style>

      <div className="modal-frame-wrap" style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', height: 'min(88vh, 760px)', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
          borderRadius: '12px 12px 0 0',
          border: '1px solid rgba(255,255,255,0.12)',
          borderBottom: 'none',
          padding: '12px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button type="button" onClick={onClose} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57', border: 'none', cursor: 'pointer' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-dm-sans, system-ui)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
              {name}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="/folio/sign-up"
              style={{
                fontFamily: 'var(--font-dm-sans, system-ui)',
                background: 'var(--gold, #E8956A)',
                color: '#fff',
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Use this template →
            </a>
            <button
              type="button"
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'var(--font-dm-sans, system-ui)' }}
            >
              ✕ Close
            </button>
          </div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: '0 0 12px 12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', borderTop: 'none' }}>
          <iframe
            src={`/folio/preview/${slug}`}
            title={name}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="same-origin"
          />
        </div>
      </div>
    </div>
  );
}

export function Templates() {
  const [activePreview, setActivePreview] = useState<{ slug: string; name: string } | null>(null);

  return (
    <section id="templates" style={{ padding: '120px 0', backgroundColor: 'var(--bg)' }}>
      <style>{`
        .templates-deck { scrollbar-width: none; }
        .templates-deck::-webkit-scrollbar { display: none; }
        .template-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        .template-card:hover { transform: translateY(-8px); box-shadow: 0 28px 60px rgba(0,0,0,0.13) !important; }
        .template-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.22s ease;
          border-radius: 24px 24px 0 0;
        }
        .template-card:hover .template-overlay { opacity: 1; }
        .template-overlay-btn {
          font-family: var(--font-dm-sans, system-ui);
          font-size: 0.85rem; font-weight: 600;
          color: #FFFFFF;
          background: var(--gold, #E8956A);
          padding: 10px 24px; border-radius: 100px;
          letter-spacing: 0.01em;
          transform: translateY(6px);
          transition: transform 0.22s ease;
        }
        .template-card:hover .template-overlay-btn { transform: translateY(0); }
      `}</style>

      <div style={{ textAlign: 'center', padding: '0 48px', marginBottom: '64px' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
          Templates
        </p>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 14px' }}>
          {templates.length} stunning templates
        </h2>
        <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
          Click any template to preview it live. Pick the one that feels like you.
        </p>
      </div>

      <div className="templates-deck" style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '0 48px 32px' }}>
        {templates.map((entry) => (
          <button
            key={entry.meta.slug}
            type="button"
            className="template-card"
            aria-label={`Preview ${entry.meta.name} template`}
            onClick={() => setActivePreview({ slug: entry.meta.slug, name: entry.meta.name })}
            style={{ flexShrink: 0, width: 240, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', backgroundColor: 'var(--bg)', overflow: 'hidden', border: '1px solid var(--border)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ width: 240, height: 320, overflow: 'hidden', borderRadius: '20px 20px 0 0', position: 'relative' }}>
              <TemplateThumbnail slug={entry.meta.slug} />
              <div className="template-overlay">
                <span className="template-overlay-btn">Preview →</span>
              </div>
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--cream)', margin: 0 }}>
                {entry.meta.name}
              </p>
              <span style={{
                fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', letterSpacing: '0.08em',
                color: entry.meta.tag === 'dark' ? 'var(--gold)' : 'var(--cream-dim)',
                border: `1px solid ${entry.meta.tag === 'dark' ? 'var(--border-gold)' : 'var(--border)'}`,
                padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase',
              }}>
                {entry.meta.tag}
              </span>
            </div>
          </button>
        ))}
      </div>

      {activePreview && (
        <PreviewModal
          slug={activePreview.slug}
          name={activePreview.name}
          onClose={() => setActivePreview(null)}
        />
      )}
    </section>
  );
}
