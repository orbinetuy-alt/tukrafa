import type { MetadataRoute } from 'next';
import { allTours, tourImages } from '@/data/tours';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const tourPages: MetadataRoute.Sitemap = allTours.map((tour) => ({
    url: `${siteConfig.url}/passeios/${tour.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
    images: [`${siteConfig.url}${encodeURI(tourImages[tour.slug])}`],
  }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${siteConfig.url}/hero.jpg`],
    },
    ...tourPages,
  ];
}
