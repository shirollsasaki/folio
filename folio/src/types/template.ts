import type { ProfileData } from './profile';

export interface TemplateProps {
  profile: ProfileData;
  accentColor?: string;
}

export interface TemplateMeta {
  name: string;
  slug: string;
  tag: 'light' | 'dark';
  previewImage: string;
  isPremium: boolean;
}

export interface TemplateEntry {
  Component: React.ComponentType<TemplateProps>;
  meta: TemplateMeta;
  defaultProps: { profile: ProfileData };
}
