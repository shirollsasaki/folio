import type { TemplateEntry } from '@/types';
import ImpactReport from '@/templates/impact-report';
import TerminalHacker from '@/templates/terminal-hacker';
import BrutalistGrid from '@/templates/brutalist-grid';
import ForestLink from '@/templates/forest-link';
import VioletPro from '@/templates/violet-pro';
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
];

export function getTemplateBySlug(slug: string): TemplateEntry | undefined {
  return templates.find((t) => t.meta.slug === slug);
}

export function getPremiumTemplates(): TemplateEntry[] {
  return templates.filter((t) => t.meta.isPremium);
}
