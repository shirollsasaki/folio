import type { TemplateEntry } from '@/types';

// Original templates
import ImpactReport from '@/templates/impact-report';
import TerminalHacker from '@/templates/terminal-hacker';
import BrutalistGrid from '@/templates/brutalist-grid';
import ForestLink from '@/templates/forest-link';
import VioletPro from '@/templates/violet-pro';

// New immersive 3D templates
import CityBuilder from '@/templates/city-builder';
import SpaceJourney from '@/templates/space-journey';
import ParticleUniverse from '@/templates/particle-universe';
import FloatingIslands from '@/templates/floating-islands';
import ScrollDepth from '@/templates/scroll-depth';
import PhysicsPlayground from '@/templates/physics-playground';
import GameWorld from '@/templates/game-world';
import ShaderArt from '@/templates/shader-art';
import Terminal3D from '@/templates/terminal-3d';
import VRMuseum from '@/templates/vr-museum';

import { createMockProfile } from '@/test/mocks/profile';

const mockProfile = createMockProfile();

export const templates: TemplateEntry[] = [
  // Immersive 3D Templates (Premium)
  {
    Component: CityBuilder,
    meta: {
      name: 'City Builder',
      slug: 'city-builder',
      tag: 'dark',
      previewImage: '/previews/city-builder.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: SpaceJourney,
    meta: {
      name: 'Space Journey',
      slug: 'space-journey',
      tag: 'dark',
      previewImage: '/previews/space-journey.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: ParticleUniverse,
    meta: {
      name: 'Particle Universe',
      slug: 'particle-universe',
      tag: 'dark',
      previewImage: '/previews/particle-universe.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: FloatingIslands,
    meta: {
      name: 'Floating Islands',
      slug: 'floating-islands',
      tag: 'light',
      previewImage: '/previews/floating-islands.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: ScrollDepth,
    meta: {
      name: 'Scroll Depth',
      slug: 'scroll-depth',
      tag: 'dark',
      previewImage: '/previews/scroll-depth.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: PhysicsPlayground,
    meta: {
      name: 'Physics Playground',
      slug: 'physics-playground',
      tag: 'dark',
      previewImage: '/previews/physics-playground.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: GameWorld,
    meta: {
      name: 'Game World',
      slug: 'game-world',
      tag: 'dark',
      previewImage: '/previews/game-world.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: ShaderArt,
    meta: {
      name: 'Shader Art',
      slug: 'shader-art',
      tag: 'dark',
      previewImage: '/previews/shader-art.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: Terminal3D,
    meta: {
      name: 'Terminal 3D',
      slug: 'terminal-3d',
      tag: 'dark',
      previewImage: '/previews/terminal-3d.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },
  {
    Component: VRMuseum,
    meta: {
      name: 'VR Museum',
      slug: 'vr-museum',
      tag: 'dark',
      previewImage: '/previews/vr-museum.png',
      isPremium: true,
    },
    defaultProps: { profile: mockProfile },
  },

  // Original templates
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
