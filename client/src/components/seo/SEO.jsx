import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Professional Glass Cleaning Service';
const DEFAULT_PHONE = '+918539842072';
const DEFAULT_URL = 'https://professionalglasscleaningservice.com';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80';

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  robots = 'index, follow',
  schema,
  breadcrumbs,
  service,
  faqs,
}) {
  const routerLocation = useLocation();
  const currentPath = routerLocation.pathname;
  const canonicalUrl = canonical || `${DEFAULT_URL}${currentPath}`;
  const metaTitle = title
    ? `${title}`
    : 'Professional Glass Cleaning Service in Zirakpur | Glass Repair & Cleaning';
  const metaDescription =
    description ||
    'Professional glass cleaning, glass repair, silicone repair, SGPC repairing and water tank cleaning services in Zirakpur, Mohali and Chandigarh. Call 8539842072 for service enquiries.';
  const shareImage = ogImage || DEFAULT_OG_IMAGE;

  // Base LocalBusiness JSON-LD schema (Strictly verified data, no fake reviews/awards)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${DEFAULT_URL}/#localbusiness`,
    name: 'Professional Glass Cleaning Service',
    legalName: 'Professional Glass Cleaning Service',
    url: DEFAULT_URL,
    telephone: DEFAULT_PHONE,
    priceRange: '₹₹',
    image: shareImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Green Enclave',
      addressLocality: 'Zirakpur',
      addressRegion: 'Punjab',
      postalCode: '140603',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.6425,
      longitude: 76.8173,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Zirakpur',
      },
      {
        '@type': 'City',
        name: 'Mohali',
      },
      {
        '@type': 'City',
        name: 'Chandigarh',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Punjab',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    sameAs: [
      'https://wa.me/918539842072',
      'https://www.google.com/maps/search/?api=1&query=Professional+Glass+Cleaning+Green+Enclave+Zirakpur+Punjab+140603',
    ],
  };

  // Breadcrumbs schema
  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: item.name,
            item: item.url ? `${DEFAULT_URL}${item.url}` : undefined,
          })),
        }
      : null;

  // Service schema
  const serviceSchema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.description || service.shortDescription,
        provider: {
          '@id': `${DEFAULT_URL}/#localbusiness`,
        },
        areaServed: ['Zirakpur', 'Mohali', 'Chandigarh', 'Punjab'],
      }
    : null;

  // FAQ Schema
  const faqSchema =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robots} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={shareImage} />

      {/* Geo Location Tags for Local SEO */}
      <meta name="geo.region" content="IN-PB" />
      <meta name="geo.placename" content="Zirakpur, Mohali, Chandigarh" />
      <meta name="geo.position" content="30.6425;76.8173" />
      <meta name="ICBM" content="30.6425, 76.8173" />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {serviceSchema && (
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      )}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
