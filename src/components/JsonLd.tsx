import { PROFILE, SEO_CONFIG, SOCIAL_LINKS, SKILLS } from '@/lib/constants';

/**
 * JSON-LD structured data for Google rich results.
 * Renders Person + WebSite schema.
 */
export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    description: SEO_CONFIG.siteDescription,
    url: SEO_CONFIG.siteUrl,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
    email: PROFILE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    sameAs: SOCIAL_LINKS.filter((l) => l.url.startsWith('http')).map((l) => l.url),
    knowsAbout: SKILLS.map((s) => s.name),
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.siteDescription,
    author: {
      '@type': 'Person',
      name: PROFILE.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
