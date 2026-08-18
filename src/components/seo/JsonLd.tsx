import { PROFILE, SEO_CONFIG, SOCIAL_LINKS, SKILLS } from '@/data/constants';
import type { Project } from '@/types';

interface JsonLdProps {
  type?: 'home' | 'resume' | 'project';
  project?: Project;
}

/**
 * JSON-LD structured data for Google rich results and Generative Engine Optimization (GEO).
 * Supports Home (Person+WebSite), Resume (ProfilePage), and Case Studies (WebApplication/SoftwareApplication).
 */
export function JsonLd({ type = 'home', project }: JsonLdProps) {
  const sameAsUrls = SOCIAL_LINKS.filter((l) => l.url.startsWith('http')).map((l) => l.url);
  const skillNames = SKILLS.map((s) => s.name);

  // Common Person definition
  const personBase = {
    '@type': 'Person',
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    description: PROFILE.bio,
    url: SEO_CONFIG.siteUrl,
    image: `${SEO_CONFIG.siteUrl}/profile.webp`,
    email: PROFILE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    sameAs: sameAsUrls,
    knowsAbout: skillNames,
  };

  if (type === 'resume') {
    const resumeSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        ...personBase,
        url: `${SEO_CONFIG.siteUrl}/resume`,
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Sinai University',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Arish',
            addressCountry: 'EG',
          },
        },
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeSchema) }}
      />
    );
  }

  if (type === 'project' && project) {
    const projectSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: project.title,
      description: project.description,
      url: `${SEO_CONFIG.siteUrl}/project/${project.slug}`,
      image: `${SEO_CONFIG.siteUrl}${project.image}`,
      applicationCategory: project.category,
      operatingSystem: 'Any modern web browser',
      author: personBase,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: project.features || [],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
    );
  }

  // Home schemas: Person + WebSite
  const personSchema = {
    '@context': 'https://schema.org',
    ...personBase,
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

export default JsonLd;
