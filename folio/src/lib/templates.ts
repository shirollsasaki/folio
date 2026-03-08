import type { TemplateEntry } from '@/types';

// Original working templates
import ImpactReport from '@/templates/impact-report';
import TerminalHacker from '@/templates/terminal-hacker';
import BrutalistGrid from '@/templates/brutalist-grid';
import ForestLink from '@/templates/forest-link';
import VioletPro from '@/templates/violet-pro';

// New working templates (replacing broken 3D ones)
import MinimalPro from '@/templates/minimal-pro';
import BoldContrast from '@/templates/bold-contrast';
import GradientModern from '@/templates/gradient-modern';
import NeoBrutalist from '@/templates/neo-brutalist';
import ElegantSerif from '@/templates/elegant-serif';
import CreativeGrid from '@/templates/creative-grid';
import TimelineVertical from '@/templates/timeline-vertical';
import SplitLayout from '@/templates/split-layout';
import CardStack from '@/templates/card-stack';
import MinimalDark from '@/templates/minimal-dark';

import { createMockProfile } from '@/test/mocks/profile';

const mockProfile = createMockProfile();

export const templates: TemplateEntry[] = [
  // New working templates
  {
    Component: MinimalPro,
    meta: {
      name: 'Minimal Pro',
      slug: 'minimal-pro',
      tag: 'light',
      previewImage: '/previews/minimal-pro.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: BoldContrast,
    meta: {
      name: 'Bold Contrast',
      slug: 'bold-contrast',
      tag: 'dark',
      previewImage: '/previews/bold-contrast.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: GradientModern,
    meta: {
      name: 'Gradient Modern',
      slug: 'gradient-modern',
      tag: 'light',
      previewImage: '/previews/gradient-modern.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: NeoBrutalist,
    meta: {
      name: 'Neo Brutalist',
      slug: 'neo-brutalist',
      tag: 'light',
      previewImage: '/previews/neo-brutalist.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: ElegantSerif,
    meta: {
      name: 'Elegant Serif',
      slug: 'elegant-serif',
      tag: 'light',
      previewImage: '/previews/elegant-serif.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: CreativeGrid,
    meta: {
      name: 'Creative Grid',
      slug: 'creative-grid',
      tag: 'light',
      previewImage: '/previews/creative-grid.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: TimelineVertical,
    meta: {
      name: 'Timeline Vertical',
      slug: 'timeline-vertical',
      tag: 'dark',
      previewImage: '/previews/timeline-vertical.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: SplitLayout,
    meta: {
      name: 'Split Layout',
      slug: 'split-layout',
      tag: 'light',
      previewImage: '/previews/split-layout.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: CardStack,
    meta: {
      name: 'Card Stack',
      slug: 'card-stack',
      tag: 'light',
      previewImage: '/previews/card-stack.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: MinimalDark,
    meta: {
      name: 'Minimal Dark',
      slug: 'minimal-dark',
      tag: 'dark',
      previewImage: '/previews/minimal-dark.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },

  // Original working templates
  {
    Component: ImpactReport,
    meta: {
      name: 'Impact Report',
      slug: 'impact-report',
      tag: 'light',
      previewImage: '/previews/impact-report.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: TerminalHacker,
    meta: {
      name: 'Terminal Hacker',
      slug: 'terminal-hacker',
      tag: 'dark',
      previewImage: '/previews/terminal-hacker.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: BrutalistGrid,
    meta: {
      name: 'Brutalist Grid',
      slug: 'brutalist-grid',
      tag: 'light',
      previewImage: '/previews/brutalist-grid.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: ForestLink,
    meta: {
      name: 'Forest Link',
      slug: 'forest-link',
      tag: 'dark',
      previewImage: '/previews/forest-link.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: VioletPro,
    meta: {
      name: 'Violet Pro',
      slug: 'violet-pro',
      tag: 'light',
      previewImage: '/previews/violet-pro.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
];

export function getTemplateBySlug(slug: string): TemplateEntry | undefined {
  return templates.find((t) => t.meta.slug === slug);
}

export function getPremiumTemplates(): TemplateEntry[] {
  return templates.filter((t) => t.meta.isPremium);
}
