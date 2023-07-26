export interface IHead {
  version: string;
  canonical: string | '';
  title: string;
  description: string;
  keywords: string;
  scripts?: string;
  robots: string;
}
