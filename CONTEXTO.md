# Contexto del Proyecto — Sitio Web de Turismo en Portugal

## Empresa
- **Nombre:** Rafa Travel
- **Logo:** `public/logo.png` (fondo blanco, ilustración circular)

## Stack
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS v4
- **Backend:** API Routes de Next.js + Resend (emails)
- **Hosting:** Por definir

## Objetivo
Sitio web para empresa de turismo en Portugal orientado a **conseguir reservas** y vender.  
Flujo de reserva: cliente abre modal → elige fecha → elige hora, personas y datos → envío → email automático a Rafa + confirmación al cliente.  
**Sin** login de clientes, **sin** panel de admin.

## Referencia visual
- [LisbonTuk4U](https://lisbontuk4u.com/index.html) — misma estructura, distinto contenido y colores

## Colores de la empresa
- **Verde:** `#2D6A4F` (provisional — pendiente hex exacto)
- **Beige:** `#F7F3EC` (provisional)
- **Rojo:** `#C0392B` (provisional)
- Todos definidos en `src/app/globals.css` dentro del bloque `@theme inline`

## Tipografía
- **Serif (títulos):** Playfair Display — variable CSS `--font-playfair`
- **Sans-serif (cuerpo):** Inter — variable CSS `--font-inter`
- Configurado en `src/app/layout.tsx`

## Idiomas
- Pendiente de decisión (la referencia tiene PT / EN / ES / IT / FR)

---

## Lo que está hecho ✅

| Archivo | Descripción |
|---|---|
| `src/app/globals.css` | Colores brand + fonts (Tailwind v4 `@theme`) |
| `src/app/layout.tsx` | Fonts Playfair + Inter, metadata |
| `src/app/page.tsx` | Composición de todas las secciones |
| `src/components/Navbar.tsx` | Logo + nav links; usa `usePathname` para que los links funcionen desde cualquier página (`/#seccion`) |
| `src/components/Hero.tsx` | Badge, headline serif, subtext, CTAs, social proof, image card con badges flotantes |
| `src/components/Passeios.tsx` | Sección de tours con tabs Tuk-Tuk / Excursões; botón "Reservar agora" abre `BookingModal` |
| `src/components/BookingModal.tsx` | Modal de reserva multi-step: paso 1 calendario, paso 2 hora+personas+datos, pantalla de éxito. Usa `createPortal` para evitar problemas de z-index. |
| `src/components/BookingButton.tsx` | Wrapper client para usar `BookingModal` desde la página de detalle (server component) |
| `src/components/Reviews.tsx` | Avaliações Google: fetcha de `/api/reviews`, rating global, cards con avatar/iniciales/estrellas |
| `src/components/SobreNos.tsx` | Foto guía placeholder + bio, highlights con checkmarks, 4 stats |
| `src/components/Contacto.tsx` | Formulario de contacto + info + CTA WhatsApp |
| `src/components/Footer.tsx` | Dark, 4 columnas, redes sociales, links externos, copyright |
| `src/app/passeios/[slug]/page.tsx` | Página de detalle de tour: hero, galería thumbnails, acordeones, sidebar con `BookingButton` |
| `src/app/api/reviews/route.ts` | GET — Google Places API + fallback placeholder; cachea 1h |
| `src/app/api/contacto/route.ts` | POST — estructura lista, backend pendiente |
| `src/app/api/reserva/route.ts` | POST — recibe reserva, envía email a Rafa + confirmación al cliente vía **Resend** |
| `.env.local.example` | `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`, `RESEND_API_KEY`, `RAFA_EMAIL`, `FROM_EMAIL` |

### Navbar — links actuales
`Passeios` · `Reviews` · `Sobre Nós` · `Contactos`

### BookingModal — flujo
1. Click "Reservar agora" (en card de Passeios o sidebar de detalle) → abre modal via `createPortal`
2. **Paso 1:** Calendario (bloquea fechas pasadas, navegación mes a mes). Al tocar un día avanza al paso 2.
3. **Paso 2:** Fecha seleccionada (clicable para volver), grid de horarios 9:00–19:00, contador de personas con nota de precio según tipo de tour, nombre + teléfono + email
4. **Éxito:** Pantalla de confirmación. Se envían dos emails: uno a Rafa con todos los datos, otro al cliente como confirmación.

### Tours en `src/data/tours.ts`
- Dos arrays: `tukTukTours` y `excursionTours`
- Cada tour tiene `type: 'tuktuk' | 'excursao'`
- Precios: tuk-tuk 1–3 pax normal, 4+ sob consulta; excursión 1–8 pax normal, 8+ sob consulta

---

## Lo que falta construir ⏳

1. **Features strip** — 4 iconos con beneficios (guía certificado, privado, pick-up hotel, cancelación gratis)
2. **Galería** — grid de fotos con labels
3. **FAQ** — acordeón de preguntas frecuentes
4. **Chatbot** — pendiente de definir tipo e integración

---

## Pendiente de datos reales del cliente
- Número de WhatsApp (actualmente `+351 XXXXXXXXX` en Contacto y Footer)
- Email (actualmente `info@tukrafa.pt`)
- Foto y nombre del guía (SobreNos)
- Fotos de los tours (Passeios y páginas de detalle)
- URLs de redes sociales (Footer)
- Links reales de TripAdvisor, GetYourGuide, Google Reviews
- `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`
- `RESEND_API_KEY`, `RAFA_EMAIL`, `FROM_EMAIL` (ver `.env.local.example`)
- Colores definitivos del cliente

---

## Backend
- `POST /api/reserva` — **listo**: Resend envía email a Rafa + confirmación al cliente
- `GET /api/reviews` — listo con Google Places API + fallback placeholder
- `POST /api/contacto` — estructura lista, falta conectar backend (DB + notificación)
- Stack DB por decidir (Supabase, PlanetScale, etc.) si se necesita persistencia
