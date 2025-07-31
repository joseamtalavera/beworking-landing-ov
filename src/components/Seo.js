import Head from 'next/head';

/**
 * Reusable SEO component for setting meta tags and social sharing info.
 * Usage: <Seo title="..." description="..." image="..." url="..." canonical="..." />
 */
export default function Seo({
  title = 'BeWorking - Coworking & Office Spaces',
  description = 'Flexible coworking and office solutions in [Location]. Join BeWorking today!',
  image = '/BeWorking.JPG',
  url = 'https://beworking.com',
  canonical = 'https://beworking.com', // Default canonical to homepage if not provided
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={canonical} />
      {/* Add more tags as needed */}
    </Head>
  );
}
