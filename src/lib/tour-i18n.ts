import type { Locale } from './i18n';
import type { TourDetail } from '@/data/tours';

type TourTranslation = Partial<Pick<TourDetail,
  'title' | 'subtitle' | 'description' | 'longDescription' | 'duration' |
  'capacityNote' | 'maxPax' | 'pickup' | 'priceNote' | 'sidebarPriceNote' |
  'priceDisplay' | 'itinerary' | 'included' | 'notIncluded' | 'sidebarFeatures'>>;

const translations: Record<'en' | 'es', Record<string, TourTranslation>> = {
  en: {
    'lisboa-total': {
      title: 'Complete Lisbon by Tuk-Tuk',
      subtitle: 'Alfama · Graça · Chiado · Bairro Alto · Belém',
      description: 'The most complete experience on three wheels, from medieval Lisbon to historic Belém.',
      longDescription: 'Discover everything Lisbon has to offer in one unforgettable experience. Your private guide will take you through the medieval neighborhoods of Alfama and Graça, where you will hear stories of fado and see unique Portuguese tiles. The elegance of Chiado and the energy of Bairro Alto then give way to the historic grandeur of Belém — including a traditional custard tart. A full day to remember forever.',
      duration: '6 hours',
      capacityNote: '1–3 guests · 4+ on request',
      maxPax: 'Up to 3 guests',
      pickup: 'Hotel or agreed meeting point',
      priceNote: 'per group (1–3 guests) · 4+ on request',
      sidebarPriceNote: 'per group · up to 3 guests',
      itinerary: [
        'Hotel pick-up in Lisbon',
        'Alfama — Cathedral, narrow streets and historic tiles',
        'São Jorge Castle — exterior and panoramic views',
        'Graça — viewpoint and National Pantheon',
        'Chiado and Bertrand Bookstore',
        'Bairro Alto',
        'Baixa and Praça do Comércio',
        'LX Factory and views of the 25 de Abril Bridge',
        'Belém — Monument to the Discoveries and Belém Tower',
        'Complimentary custard tart',
        'Return to the hotel',
      ],
      included: ['Private electric tuk-tuk for 6 hours', 'Certified local guide', 'Hotel pick-up and drop-off in Lisbon', 'Complimentary custard tart in Belém', 'Water on board'],
      notIncluded: ['Monument entrance tickets', 'Meals and drinks, except the custard tart', 'Gratuities (optional)'],
      sidebarFeatures: ['100% private electric tuk-tuk', 'Free hotel pick-up in Lisbon', 'Free cancellation up to 48 hours', 'Immediate confirmation'],
    },
    'alfama-graca': {
      title: 'Historic Alfama and Graça', subtitle: 'Cathedral · Saint Anthony · Viewpoints · National Pantheon',
      description: 'A journey through Lisbon’s oldest streets, iconic viewpoints and the historic heart of Alfama and Graça.',
      duration: '90 min / 2 hours', capacityNote: '1–3 guests · 4+ on request', priceDisplay: 'From €120',
      priceNote: '90 min: €120 · 2h: €150 (1–3 guests) · 4+ on request',
    },
    'belem-descobrimentos': {
      title: 'Age of Discoveries Route', subtitle: 'LX Factory · 25 de Abril Bridge · Belém Tower',
      description: 'Explore Portugal’s golden age of navigation, from LX Factory to historic Belém, with a complimentary custard tart.',
      duration: '2 hours', capacityNote: '1–3 guests · 4+ on request', priceNote: 'per group (1–3 guests) · 4+ on request',
    },
    'chiado-poetico': {
      title: 'Romantic and Poetic Chiado', subtitle: 'Chiado · Baixa · Bertrand Bookstore · Avenida da Liberdade',
      description: 'An elegant route through Lisbon’s cultural center, historic bookstores, baroque churches and hidden viewpoints.',
      duration: '90 min / 2 hours', capacityNote: '1–3 guests · 4+ on request', priceDisplay: 'From €120',
      priceNote: '90 min: €120 · 2h: €150 (1–3 guests) · 4+ on request',
    },
    'cascais-cabo-da-roca': {
      title: 'Cascais and Cape Roca', subtitle: 'Coast · Boca do Inferno · Edge of the World',
      description: 'An exclusive coastal journey from Lisbon to Cascais, Cape Roca and the Atlantic landscapes of Azenhas do Mar.',
      duration: '6 hours', capacityNote: '1–3 guests · 4+ on request', priceNote: 'per group (1–3 guests) · 4+ on request',
    },
  },
  es: {
    'lisboa-total': {
      title: 'Lisboa Completa en Tuk-Tuk',
      subtitle: 'Alfama · Graça · Chiado · Bairro Alto · Belém',
      description: 'La experiencia más completa sobre tres ruedas, desde la Lisboa medieval hasta el histórico barrio de Belém.',
      longDescription: 'Descubre todo lo que Lisboa tiene para ofrecer en una experiencia única e inolvidable. Tu guía privado te llevará por los barrios medievales de Alfama y Graça, donde conocerás historias de fado y azulejos únicos. Después, la elegancia de Chiado y el ambiente de Bairro Alto dan paso a la grandeza histórica de Belém, con un pastel de nata incluido. Un día completo para recordar siempre.',
      duration: '6 horas',
      capacityNote: '1–3 personas · 4+ bajo consulta',
      maxPax: 'Hasta 3 personas',
      pickup: 'Hotel o punto acordado',
      priceNote: 'por grupo (1–3 personas) · 4+ bajo consulta',
      sidebarPriceNote: 'por grupo · hasta 3 personas',
      itinerary: [
        'Recogida en el hotel en Lisboa',
        'Alfama — Catedral, callejuelas y azulejos históricos',
        'Castillo de San Jorge — exterior y vistas panorámicas',
        'Graça — mirador y Panteón Nacional',
        'Chiado y Librería Bertrand',
        'Bairro Alto',
        'Baixa y Praça do Comércio',
        'LX Factory y vistas del Puente 25 de Abril',
        'Belém — Monumento a los Descubrimientos y Torre de Belém',
        'Pastel de nata de cortesía',
        'Regreso al hotel',
      ],
      included: ['Tuk-tuk eléctrico privado durante 6 horas', 'Guía local certificado', 'Recogida y regreso al hotel en Lisboa', 'Pastel de nata de cortesía en Belém', 'Agua a bordo'],
      notIncluded: ['Entradas a monumentos', 'Comidas y bebidas, excepto el pastel de nata', 'Propina (opcional)'],
      sidebarFeatures: ['Tuk-tuk eléctrico 100% privado', 'Recogida gratuita en el hotel en Lisboa', 'Cancelación gratuita hasta 48 horas antes', 'Confirmación inmediata'],
    },
    'alfama-graca': {
      title: 'Alfama y Graça Históricas', subtitle: 'Catedral · San Antonio · Miradores · Panteón Nacional',
      description: 'Un viaje por las calles más antiguas de Lisboa, sus miradores emblemáticos y el corazón histórico de Alfama y Graça.',
      duration: '90 min / 2 horas', capacityNote: '1–3 personas · 4+ bajo consulta', priceDisplay: 'Desde €120',
      priceNote: '90 min: €120 · 2h: €150 (1–3 personas) · 4+ bajo consulta',
    },
    'belem-descobrimentos': {
      title: 'Ruta de los Descubrimientos', subtitle: 'LX Factory · Puente 25 de Abril · Torre de Belém',
      description: 'Explora la época dorada de la navegación portuguesa, desde LX Factory hasta el histórico Belém, con pastel de nata incluido.',
      duration: '2 horas', capacityNote: '1–3 personas · 4+ bajo consulta', priceNote: 'por grupo (1–3 personas) · 4+ bajo consulta',
    },
    'chiado-poetico': {
      title: 'Chiado Romántico y Poético', subtitle: 'Chiado · Baixa · Librería Bertrand · Avenida da Liberdade',
      description: 'Un recorrido elegante por el centro cultural de Lisboa, sus librerías históricas, iglesias barrocas y miradores escondidos.',
      duration: '90 min / 2 horas', capacityNote: '1–3 personas · 4+ bajo consulta', priceDisplay: 'Desde €120',
      priceNote: '90 min: €120 · 2h: €150 (1–3 personas) · 4+ bajo consulta',
    },
    'cascais-cabo-da-roca': {
      title: 'Cascais y Cabo da Roca', subtitle: 'Costa · Boca do Inferno · Fin del Mundo',
      description: 'Un recorrido costero exclusivo desde Lisboa hasta Cascais, Cabo da Roca y los paisajes atlánticos de Azenhas do Mar.',
      duration: '6 horas', capacityNote: '1–3 personas · 4+ bajo consulta', priceNote: 'por grupo (1–3 personas) · 4+ bajo consulta',
    },
  },
};

export function localizeTour(tour: TourDetail, locale: Locale): TourDetail {
  if (locale === 'pt') return tour;
  return { ...tour, ...translations[locale][tour.slug] };
}
