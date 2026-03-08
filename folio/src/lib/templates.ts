import type { TemplateEntry } from '@/types';
import ImpactReport from '@/templates/impact-report';
import TerminalHacker from '@/templates/terminal-hacker';
import BrutalistGrid from '@/templates/brutalist-grid';
import ForestLink from '@/templates/forest-link';
import VioletPro from '@/templates/violet-pro';
import MinimalCards from '@/templates/minimal-cards';
import BoldHeader from '@/templates/bold-header';
import GridShowcase from '@/templates/grid-showcase';
import SidePanel from '@/templates/side-panel';
import TimelineFlow from '@/templates/timeline-flow';
import SplitScreen from '@/templates/split-screen';
import MagazineLayout from '@/templates/magazine-layout';
import CompactMinimal from '@/templates/compact-minimal';
import NeonTerminal from '@/templates/neon-terminal';
import ElegantSerif from '@/templates/elegant-serif';
import { createMockProfile } from '@/test/mocks/profile';

const mockProfile = createMockProfile();

export const templates: TemplateEntry[] = [
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
  {
    Component: MinimalCards,
    meta: {
      name: 'Minimal Cards',
      slug: 'minimal-cards',
      tag: 'light',
      previewImage: '/previews/minimal-cards.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: BoldHeader,
    meta: {
      name: 'Bold Header',
      slug: 'bold-header',
      tag: 'dark',
      previewImage: '/previews/bold-header.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: GridShowcase,
    meta: {
      name: 'Grid Showcase',
      slug: 'grid-showcase',
      tag: 'light',
      previewImage: '/previews/grid-showcase.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: SidePanel,
    meta: {
      name: 'Side Panel',
      slug: 'side-panel',
      tag: 'dark',
      previewImage: '/previews/side-panel.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: TimelineFlow,
    meta: {
      name: 'Timeline Flow',
      slug: 'timeline-flow',
      tag: 'light',
      previewImage: '/previews/timeline-flow.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: SplitScreen,
    meta: {
      name: 'Split Screen',
      slug: 'split-screen',
      tag: 'dark',
      previewImage: '/previews/split-screen.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: MagazineLayout,
    meta: {
      name: 'Magazine Layout',
      slug: 'magazine-layout',
      tag: 'light',
      previewImage: '/previews/magazine-layout.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: CompactMinimal,
    meta: {
      name: 'Compact Minimal',
      slug: 'compact-minimal',
      tag: 'light',
      previewImage: '/previews/compact-minimal.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: NeonTerminal,
    meta: {
      name: 'Neon Terminal',
      slug: 'neon-terminal',
      tag: 'dark',
      previewImage: '/previews/neon-terminal.png',
      isPremium: false,
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
      isPremium: false,
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
