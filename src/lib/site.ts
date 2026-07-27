export const siteConfig = {
  name: 'Rafa Travel',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.elrafatravel.com',
  description:
    'Tours privados em Lisboa e Portugal com guia local. Passeios de tuk-tuk elétrico, excursões personalizadas e recolha no hotel.',
  phone: '+351910706688',
  email: 'elrafatravelcrm@gmail.com',
  instagram: 'https://www.instagram.com/tuk.rafa/',
  tiktok: 'https://www.tiktok.com/@el_rafa_travel',
} as const;
