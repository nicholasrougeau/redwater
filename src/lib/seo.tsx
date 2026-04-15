import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://redwaterrev.com';
const DEFAULT_OG = '/og-default.png';

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Redwater Revenue',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    'AI automation agency building custom operating systems for coaches, lawyers, consultants, and agencies.',
  sameAs: [] as string[],
};

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export const SEO = ({ title, description, path, ogImage, jsonLd }: SEOProps) => {
  const canonical = `${SITE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const structured = jsonLd ?? organizationJsonLd;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={absoluteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      <script type="application/ld+json">{JSON.stringify(structured)}</script>
    </Helmet>
  );
};
