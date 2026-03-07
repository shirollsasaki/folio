import type { TemplateEntry } from '@/types';
import IvoryEditorial from '@/templates/ivory-editorial';
import NoirMinimal from '@/templates/noir-minimal';
import ForestLink from '@/templates/forest-link';
import VioletPro from '@/templates/violet-pro';
import GridBright from '@/templates/grid-bright';
import { createMockProfile } from '@/test/mocks/profile';

const mockProfile = createMockProfile();

export const templates: TemplateEntry[] = [
  {
    Component: IvoryEditorial,
    meta: {
      name: 'Ivory Editorial',
      slug: 'ivory-editorial',
      tag: 'light',
      previewImage: '/previews/ivory-editorial.png',
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: NoirMinimal,
    meta: {
      name: 'Noir Minimal',
      slug: 'noir-minimal',
      tag: 'dark',
      previewImage: '/previews/noir-minimal.png',
      isPremium: false,
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
      isPremium: false,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: VioletPro,
    meta: {
      name: 'Violet Pro',
      slug: 'violet-pro',
      tag: 'dark',
      previewImage: '/previews/violet-pro.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: GridBright,
    meta: {
      name: 'Grid Bright',
      slug: 'grid-bright',
      tag: 'light',
      previewImage: '/previews/grid-bright.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
];

export function getTemplateBySlug(slug: string): TemplateEntry | undefined {
  return templates.find((t) => t.meta.slug === slug);
}

export function getFreeTemplates(): TemplateEntry[] {
  return templates.filter((t) => !t.meta.isPremium);
}

export function getPremiumTemplates(): TemplateEntry[] {
  return templates.filter((t) => t.meta.isPremium);
}
