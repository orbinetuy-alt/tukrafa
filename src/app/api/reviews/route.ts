import { NextResponse } from 'next/server';

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url: string;
}

export interface ReviewsData {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

// ─── Placeholder data (used while API credentials are not configured) ─────────
const PLACEHOLDER: ReviewsData = {
  rating: 4.9,
  user_ratings_total: 127,
  reviews: [
    {
      author_name: 'Sophie Martin',
      rating: 5,
      text: 'Uma experiência incrível! O guia foi super simpático e conhecedor. Vimos os pontos mais bonitos de Lisboa de uma forma muito especial. Recomendo a toda a gente!',
      time: 1718000000,
      profile_photo_url: '',
    },
    {
      author_name: 'Carlos Rodríguez',
      rating: 5,
      text: 'Absolutamente fantástico. El tuk-tuk es cómodo y el recorrido por Alfama fue mágico. El guía nos contó historias que no encontrarías en ninguna guía turística.',
      time: 1717000000,
      profile_photo_url: '',
    },
    {
      author_name: 'Luca Bianchi',
      rating: 5,
      text: 'Esperienza fantastica! Abbiamo visitato Belém e il centro storico in modo molto originale. Il tour privato vale ogni centesimo. Torneremo sicuramente!',
      time: 1716000000,
      profile_photo_url: '',
    },
    {
      author_name: 'Emma Johnson',
      rating: 5,
      text: 'Best tour in Lisbon! We did the Half Day tour and it was perfect. Our guide knew every corner of the city. The pick-up at the hotel made everything so easy.',
      time: 1715000000,
      profile_photo_url: '',
    },
    {
      author_name: 'Ana Ferreira',
      rating: 5,
      text: 'Que passeio maravilhoso! Fizemos o tour da Lisboa à la Carte e personalizámos o percurso ao nosso gosto. O guia foi excecional, muito profissional e divertido.',
      time: 1714000000,
      profile_photo_url: '',
    },
  ],
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Return placeholder data if credentials are not configured yet
  if (!apiKey || !placeId) {
    return NextResponse.json(PLACEHOLDER);
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', placeId);
    url.searchParams.set('fields', 'rating,user_ratings_total,reviews');
    url.searchParams.set('reviews_sort', 'most_relevant');
    url.searchParams.set('language', 'pt');
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Google Places API error: ${res.status}`);
    }

    const data = await res.json();

    if (data.status !== 'OK') {
      throw new Error(`Google Places API status: ${data.status}`);
    }

    const result: ReviewsData = {
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      reviews: data.result.reviews ?? [],
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error('[reviews] Failed to fetch from Google Places API:', err);
    // Fall back to placeholder so the page never breaks
    return NextResponse.json(PLACEHOLDER);
  }
}
