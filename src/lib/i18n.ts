'use client';

import { useSyncExternalStore } from 'react';

export type Locale = 'pt' | 'en' | 'es';

const STORAGE_KEY = 'rafa-travel-locale';
const EVENT_NAME = 'rafa-travel-locale-change';

export const locales: Locale[] = ['pt', 'en', 'es'];

const messages = {
  pt: {
    nav: { tours: 'Passeios', reviews: 'Reviews', about: 'Sobre Nós', contact: 'Contactos' },
    hero: {
      badge: 'Guia certificado · Tours privados',
      title: 'Descubra Portugal com quem vive a cidade.',
      subtitle: 'Tours privados pelos bairros históricos, paisagens únicas e segredos locais — recolha incluída no seu hotel.',
      book: 'Reservar agora →',
      whatsapp: 'Falar no WhatsApp',
      travelers: '+500 viajantes felizes',
      photo: 'Foto do Passeio',
      certified: 'Guia certificado',
      from: 'Desde',
      privateTour: '/ tour privado',
    },
    tours: {
      eyebrow: 'Os Nossos Passeios',
      title: 'Descubra Lisboa a bordo de um tuk-tuk',
      subtitle: 'Tours 100% privativos · grupos pequenos · pick-up no hotel incluído · guia certificado.',
      excursions: 'Excursões',
      book: 'Reservar agora',
      more: 'Saber Mais',
      categories: { historical: 'Histórico', coast: 'Costa', cultural: 'Cultural' },
    },
    reviews: { eyebrow: 'O que dizem os nossos clientes', title: 'Avaliações Google', count: 'avaliações', loading: 'A carregar avaliações…', all: 'Ver todas as avaliações no Google', month: 'Este mês', ago: 'Há', months: 'meses', year: 'ano', years: 'anos' },
    about: {
      eyebrow: 'O seu guia', title: 'Sobre nós', certified: 'Guia Certificado', tourism: 'Turismo de Portugal',
      hello: 'Olá, sou o Rafa!',
      bio1: 'Com uma trajetória de mais de 13 anos desenvolvendo pessoas em gigantes mundiais como Microsoft, Samsung e LG, trouxe para o turismo em Portugal aquilo que considero essencial: a sensibilidade humana e a excelência no atendimento.',
      bio2: 'Mais do que um passeio de tuk-tuk pelas ruas históricas, ofereço uma experiência personalizada. Cada detalhe é pensado para que você e a sua família vivam momentos únicos, leves e memoráveis, no seu próprio ritmo e com todo o respeito que a sua viagem merece.',
      closing: 'Conforto, histórias marcantes e memórias inesquecíveis. Seja muito bem-vindo a Portugal!',
      highlights: ['Atendimento humano e personalizado', 'Experiência ao seu ritmo e pensada para a sua família', 'Conforto e cuidado em cada detalhe', 'Momentos únicos e memórias inesquecíveis'],
      stats: ['Turistas satisfeitos', 'Rating no Google', 'Anos desenvolvendo pessoas', 'Tours privativos'],
    },
    contactForm: {
      eyebrow: 'Fale connosco', title: 'Reserve o seu passeio', subtitle: 'Envie a sua consulta e entraremos em contacto via WhatsApp para confirmar a reserva.',
      hours: 'Horário', schedule: 'Todos os dias, 8h – 20h', whatsapp: 'Falar diretamente no WhatsApp',
      name: 'Nome', namePlaceholder: 'O seu nome', phone: 'Telefone / WhatsApp', tour: 'Passeio', selectTour: 'Selecionar passeio', excursions: 'Excursões',
      people: 'Nº de pessoas', person: 'pessoa', peoplePlural: 'pessoas', date: 'Data preferida', message: 'Mensagem',
      messagePlaceholder: 'Alguma preferência ou dúvida?', send: 'Enviar pedido de reserva', sending: 'A enviar…',
      note: 'Após o envio, entraremos em contacto via WhatsApp para confirmar.', success: 'Pedido recebido!',
      successText: 'Entraremos em contacto consigo via WhatsApp em breve para confirmar a sua reserva.', another: 'Fazer outro pedido',
    },
    footer: {
      description: 'Tours privados em tuk-tuk pela Lisboa mais autêntica. Pick-up no hotel incluído.',
      tours: 'Passeios',
      explore: 'Explorar',
      contact: 'Contactos',
      findUs: 'Encontre-nos em',
      allRights: 'Todos os direitos reservados.',
      privacy: 'Política de Privacidade',
      terms: 'Termos e Condições',
    },
    detail: {
      home: 'Início', tours: 'Passeios', from: 'A partir de', quote: 'Sob consulta',
      safe: 'Reserva segura · Sem compromisso', related: 'Outros passeios que vai adorar',
      route: 'Percurso', customRoute: 'Roteiro à medida', how: 'Como funciona',
      duration: 'Escolha a duração', canInclude: 'Pode incluir', yourChoice: 'à sua escolha',
      included: 'O que está incluído', notIncluded: 'O que não está incluído',
      book: 'RESERVE O TOUR AGORA',
    },
  },
  en: {
    nav: { tours: 'Tours', reviews: 'Reviews', about: 'About Us', contact: 'Contact' },
    hero: {
      badge: 'Certified guide · Private tours',
      title: 'Discover Portugal with someone who knows it by heart.',
      subtitle: 'Private tours through historic neighborhoods, unique landscapes and local secrets — hotel pick-up included.',
      book: 'Book now →',
      whatsapp: 'Chat on WhatsApp',
      travelers: '+500 happy travelers',
      photo: 'Tour photo',
      certified: 'Certified guide',
      from: 'From',
      privateTour: '/ private tour',
    },
    tours: {
      eyebrow: 'Our Tours',
      title: 'Discover Lisbon aboard a tuk-tuk',
      subtitle: '100% private tours · small groups · hotel pick-up included · certified guide.',
      excursions: 'Day Trips',
      book: 'Book now',
      more: 'Learn More',
      categories: { historical: 'Historical', coast: 'Coast', cultural: 'Cultural' },
    },
    reviews: { eyebrow: 'What our guests say', title: 'Google Reviews', count: 'reviews', loading: 'Loading reviews…', all: 'See all reviews on Google', month: 'This month', ago: '', months: 'months ago', year: 'year ago', years: 'years ago' },
    about: {
      eyebrow: 'Your guide', title: 'About us', certified: 'Certified Guide', tourism: 'Tourism of Portugal',
      hello: 'Hello, I’m Rafa!',
      bio1: 'After more than 13 years developing people at global companies such as Microsoft, Samsung and LG, I brought to tourism in Portugal what I consider essential: human sensitivity and excellence in service.',
      bio2: 'More than a tuk-tuk ride through historic streets, I offer a personalized experience. Every detail is designed so that you and your family can enjoy unique, relaxed and memorable moments, at your own pace and with all the respect your journey deserves.',
      closing: 'Comfort, remarkable stories and unforgettable memories. Welcome to Portugal!',
      highlights: ['Warm and personalized service', 'An experience at your pace, designed for your family', 'Comfort and care in every detail', 'Unique moments and unforgettable memories'],
      stats: ['Happy travelers', 'Google rating', 'Years developing people', 'Private tours'],
    },
    contactForm: {
      eyebrow: 'Get in touch', title: 'Book your tour', subtitle: 'Send your request and we will contact you on WhatsApp to confirm your booking.',
      hours: 'Hours', schedule: 'Every day, 8am–8pm', whatsapp: 'Chat directly on WhatsApp',
      name: 'Name', namePlaceholder: 'Your name', phone: 'Phone / WhatsApp', tour: 'Tour', selectTour: 'Select a tour', excursions: 'Day Trips',
      people: 'Number of guests', person: 'guest', peoplePlural: 'guests', date: 'Preferred date', message: 'Message',
      messagePlaceholder: 'Any preferences or questions?', send: 'Send booking request', sending: 'Sending…',
      note: 'After submitting, we will contact you on WhatsApp to confirm.', success: 'Request received!',
      successText: 'We will contact you on WhatsApp shortly to confirm your booking.', another: 'Send another request',
    },
    footer: {
      description: 'Private tuk-tuk tours through the most authentic Lisbon. Hotel pick-up included.',
      tours: 'Tours',
      explore: 'Explore',
      contact: 'Contact',
      findUs: 'Find us on',
      allRights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms and Conditions',
    },
    detail: {
      home: 'Home', tours: 'Tours', from: 'From', quote: 'Price on request',
      safe: 'Secure booking · No commitment', related: 'More tours you will love',
      route: 'Itinerary', customRoute: 'Tailor-made route', how: 'How it works',
      duration: 'Choose the duration', canInclude: 'May include', yourChoice: 'your choice',
      included: 'What is included', notIncluded: 'What is not included',
      book: 'BOOK THIS TOUR NOW',
    },
  },
  es: {
    nav: { tours: 'Tours', reviews: 'Reseñas', about: 'Sobre Nosotros', contact: 'Contacto' },
    hero: {
      badge: 'Guía certificado · Tours privados',
      title: 'Descubre Portugal con quien vive la ciudad.',
      subtitle: 'Tours privados por barrios históricos, paisajes únicos y secretos locales — recogida en el hotel incluida.',
      book: 'Reservar ahora →',
      whatsapp: 'Hablar por WhatsApp',
      travelers: '+500 viajeros felices',
      photo: 'Foto del tour',
      certified: 'Guía certificado',
      from: 'Desde',
      privateTour: '/ tour privado',
    },
    tours: {
      eyebrow: 'Nuestros Tours',
      title: 'Descubre Lisboa a bordo de un tuk-tuk',
      subtitle: 'Tours 100% privados · grupos pequeños · recogida en el hotel incluida · guía certificado.',
      excursions: 'Excursiones',
      book: 'Reservar ahora',
      more: 'Saber Más',
      categories: { historical: 'Histórico', coast: 'Costa', cultural: 'Cultural' },
    },
    reviews: { eyebrow: 'Lo que dicen nuestros clientes', title: 'Reseñas de Google', count: 'reseñas', loading: 'Cargando reseñas…', all: 'Ver todas las reseñas en Google', month: 'Este mes', ago: 'Hace', months: 'meses', year: 'año', years: 'años' },
    about: {
      eyebrow: 'Tu guía', title: 'Sobre nosotros', certified: 'Guía Certificado', tourism: 'Turismo de Portugal',
      hello: '¡Hola, soy Rafa!',
      bio1: 'Después de más de 13 años desarrollando personas en compañías globales como Microsoft, Samsung y LG, llevé al turismo en Portugal lo que considero esencial: la sensibilidad humana y la excelencia en la atención.',
      bio2: 'Más que un paseo en tuk-tuk por calles históricas, ofrezco una experiencia personalizada. Cada detalle está pensado para que tú y tu familia viváis momentos únicos, tranquilos y memorables, a vuestro propio ritmo y con todo el respeto que vuestro viaje merece.',
      closing: 'Comodidad, historias emocionantes y recuerdos inolvidables. ¡Bienvenido a Portugal!',
      highlights: ['Atención humana y personalizada', 'Una experiencia a tu ritmo y pensada para tu familia', 'Comodidad y cuidado en cada detalle', 'Momentos únicos y recuerdos inolvidables'],
      stats: ['Viajeros satisfechos', 'Valoración en Google', 'Años desarrollando personas', 'Tours privados'],
    },
    contactForm: {
      eyebrow: 'Hablemos', title: 'Reserva tu tour', subtitle: 'Envía tu consulta y contactaremos contigo por WhatsApp para confirmar la reserva.',
      hours: 'Horario', schedule: 'Todos los días, 8h–20h', whatsapp: 'Hablar directamente por WhatsApp',
      name: 'Nombre', namePlaceholder: 'Tu nombre', phone: 'Teléfono / WhatsApp', tour: 'Tour', selectTour: 'Seleccionar tour', excursions: 'Excursiones',
      people: 'N.º de personas', person: 'persona', peoplePlural: 'personas', date: 'Fecha preferida', message: 'Mensaje',
      messagePlaceholder: '¿Alguna preferencia o pregunta?', send: 'Enviar solicitud de reserva', sending: 'Enviando…',
      note: 'Después del envío, contactaremos contigo por WhatsApp para confirmar.', success: '¡Solicitud recibida!',
      successText: 'Contactaremos contigo por WhatsApp muy pronto para confirmar la reserva.', another: 'Enviar otra solicitud',
    },
    footer: {
      description: 'Tours privados en tuk-tuk por la Lisboa más auténtica. Recogida en el hotel incluida.',
      tours: 'Tours',
      explore: 'Explorar',
      contact: 'Contacto',
      findUs: 'Encuéntranos en',
      allRights: 'Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos y Condiciones',
    },
    detail: {
      home: 'Inicio', tours: 'Tours', from: 'Desde', quote: 'Consultar precio',
      safe: 'Reserva segura · Sin compromiso', related: 'Otros tours que te encantarán',
      route: 'Recorrido', customRoute: 'Ruta a medida', how: 'Cómo funciona',
      duration: 'Elige la duración', canInclude: 'Puede incluir', yourChoice: 'a tu elección',
      included: 'Qué está incluido', notIncluded: 'Qué no está incluido',
      book: 'RESERVA EL TOUR AHORA',
    },
  },
} as const;

function getLocaleSnapshot(): Locale {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return locales.includes(value as Locale) ? value as Locale : 'pt';
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener('storage', callback);
  };
}

export function setLocale(locale: Locale) {
  window.localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useI18n() {
  const locale = useSyncExternalStore(subscribe, getLocaleSnapshot, () => 'pt' as Locale);
  return { locale, messages: messages[locale], setLocale };
}
