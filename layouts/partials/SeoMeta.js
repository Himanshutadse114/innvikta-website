"use client";

import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import { usePathname } from "next/navigation";

const SeoMeta = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const pathname = usePathname() || "";

  // Auto-generate canonical URL if not explicitly provided
  const canonicalUrl = canonical || `${base_url}${pathname === "/" ? "" : pathname}`;

  // Organization Schema (identity validation for LLMs & Search Engines)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base_url}/#organization`,
    "name": "Innvikta",
    "url": base_url,
    "logo": `${base_url}${config.site.logo}`,
    "image": `${base_url}${meta_image}`,
    "description": description || meta_description,
    "sameAs": [
      "https://www.linkedin.com/company/innvikta",
      "https://twitter.com/innvikta",
      "https://facebook.com/innvikta"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": config.contact_info.phone,
      "contactType": "customer service",
      "email": config.contact_info.email
    }
  };

  // Local Business Schema (Local SEO validation)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base_url}/#localbusiness`,
    "name": "Innvikta",
    "image": `${base_url}${meta_image}`,
    "url": base_url,
    "telephone": config.contact_info.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": config.contact_info.location.split(" Syracuse")[0] || "2118 Thornridge Cir.",
      "addressLocality": "Syracuse",
      "addressRegion": "Connecticut",
      "postalCode": "35624",
      "addressCountry": "US"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base_url}/#website`,
    "name": "Innvikta",
    "url": base_url
  };

  // Breadcrumb List Schema
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbElements = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": base_url
    }
  ];
  pathSegments.forEach((segment, index) => {
    const route = "/" + pathSegments.slice(0, index + 1).join("/");
    breadcrumbElements.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      "item": `${base_url}${route}`
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbElements
  };

  // Product / SoftwareApplication Schema (for product/solution pages)
  const isSolutionsPage = pathname.startsWith("/solutions");
  const productSchema = isSolutionsPage ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Innvikta ${title || "Security"}`,
    "operatingSystem": "All",
    "applicationCategory": "SecurityApplication",
    "description": description || meta_description,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  return (
    <>
      {/* title */}
      <title>
        {plainify(meta_title ? meta_title : title ? title : config.site.title)}
      </title>

      {/* canonical url */}
      <link rel="canonical" href={canonicalUrl} />

      {/* noindex robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* meta-description */}
      <meta
        name="description"
        content={plainify(description ? description : meta_description)}
      />

      {/* author from config.json */}
      <meta name="author" content={meta_author} />

      {/* og-title */}
      <meta
        property="og:title"
        content={plainify(
          meta_title ? meta_title : title ? title : config.site.title
        )}
      />

      {/* og-description */}
      <meta
        property="og:description"
        content={plainify(description ? description : meta_description)}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${base_url}/${pathname.replace("/", "")}`}
      />

      {/* twitter-title */}
      <meta
        name="twitter:title"
        content={plainify(
          meta_title ? meta_title : title ? title : config.site.title
        )}
      />

      {/* twitter-description */}
      <meta
        name="twitter:description"
        content={plainify(description ? description : meta_description)}
      />

      {/* og-image */}
      <meta
        property="og:image"
        content={`${base_url}${image ? image : meta_image}`}
      />

      {/* twitter-image */}
      <meta
        name="twitter:image"
        content={`${base_url}${image ? image : meta_image}`}
      />
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD Structured Data Schema Insertion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {pathname !== "/" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
    </>
  );
};

export default SeoMeta;
