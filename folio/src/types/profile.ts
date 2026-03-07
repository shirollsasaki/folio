export interface Experience {
  title: string;
  company: string;
  dates: string;
}

export interface CustomLink {
  label: string;
  url: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  bio: string;
  location: string;
  avatar_url: string;
  linkedin_url: string;
   twitter_url?: string;
   instagram_url?: string;
   github_url?: string;
   youtube_url?: string;
   website_url?: string;
   experience: Experience[];
  skills: string[];
  custom_links: CustomLink[];
}
