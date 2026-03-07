import type { TemplateEntry } from '@/types';

export const templates: TemplateEntry[] = [];

export function getTemplateBySlug(slug: string): TemplateEntry | undefined {
  return templates.find((t) => t.meta.slug === slug);
}

export function getPremiumTemplates(): TemplateEntry[] {
  return templates.filter((t) => t.meta.isPremium);
}
