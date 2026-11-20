// Shape of everything Kerney can edit in Sanity. The Sanity loader (src/lib/content.ts)
// returns exactly this, so components never touch GROQ or Sanity types directly.

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, from the hotspot set in Sanity. */
  position?: string;
};

export type Business = {
  name: string;
  phone: string;
  city: string;
  region: string;
  /** Counties served, e.g. "Stokes". Shown as "Stokes County". */
  counties: string[];
  utilityText: string;
  footerTagline: string;
  footerBlurb: string;
  facebookUrl: string;
};

export type Hero = {
  eyebrow: string;
  headline: string;
  intro: string;
  introShort: string;
  checks: string[];
  photo: Photo;
};

export type ProblemTile = { title: string; detail: string; service: string };
export type WarningSign = { title: string; detail: string };

export type Service = {
  id: string;
  title: string;
  summary: string;
  summaryShort: string;
  photo: Photo;
};

export type BeforeAfter = {
  heading: string;
  intro: string;
  before: Photo;
  after: Photo;
};

export type Step = { title: string; detail: string; detailShort: string };

export type About = {
  heading: string;
  body: string;
  values: string[];
  photo: Photo;
};

export type Review = { quote: string; source: string; detail: string };

export type SiteContent = {
  business: Business;
  hero: Hero;
  problemTiles: ProblemTile[];
  warningSigns: WarningSign[];
  services: Service[];
  beforeAfter: BeforeAfter;
  steps: Step[];
  /** Gallery photos. The first is shown tall in the middle column on desktop. */
  gallery: Photo[];
  galleryTags: string;
  about: About;
  reviews: Review[];
};
