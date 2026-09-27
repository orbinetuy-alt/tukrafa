# Configuración del sistema de reservas

El código está preparado para trabajar primero con Stripe en modo de prueba. No publiques claves dentro del repositorio: todas deben añadirse en Vercel > Project Settings > Environment Variables.

## 1. Base de datos

1. En Vercel abre **Storage / Marketplace** e instala **Neon** en el proyecto `tukrafa`.
2. Neon añadirá `DATABASE_URL` al proyecto.
3. Abre el SQL Editor de Neon y ejecuta [`db/schema.sql`](db/schema.sql).

La base mantiene un bloqueo de 35 minutos durante el pago y evita que dos clientes reserven el único vehículo en horarios solapados. También aplica un margen de 30 minutos entre recorridos.

## 2. Stripe

Añade `STRIPE_SECRET_KEY` con una clave `sk_test_...`. En Stripe Developers > Webhooks crea un endpoint:

`https://www.elrafatravel.com/api/stripe/webhook`

Eventos requeridos:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`

Copia el signing secret `whsec_...` en `STRIPE_WEBHOOK_SECRET`. El secreto del
webhook de prueba no sirve en producción: cada endpoint tiene uno diferente.

## 3. Google Calendar

1. Crea un proyecto en Google Cloud y habilita **Google Calendar API**.
2. Crea una cuenta de servicio y una clave JSON.
3. En Google Calendar crea un calendario específico para las reservas.
4. Comparte ese calendario con el email de la cuenta de servicio y permiso **Hacer cambios en eventos**.
5. Añade `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY` en Vercel.

La clave privada debe conservar los saltos de línea como `\n`.

## 4. WhatsApp con ManyChat

La cuenta de WhatsApp que envía los mensajes sigue siendo la conectada a
ManyChat. El ID de la cuenta de WhatsApp Business no se usa directamente en el
código.

1. En ManyChat crea una automatización publicada que envíe la plantilla de
   confirmación ya aprobada.
2. La plantilla debe usar estos campos personalizados: `booking_tour`,
   `booking_date`, `booking_time`, `booking_duration`, `booking_deposit`,
   `booking_balance` y `booking_code`. El nombre del cliente usa el campo de
   sistema `Nombre`.
3. Copia el `flow_ns` desde la URL de esa automatización.
4. En Vercel añade, tanto a Preview como a Production:
   - `MANYCHAT_API_TOKEN`: token de **Settings > API**.
   - `MANYCHAT_BOOKING_FLOW_NS`: identificador de la automatización publicada.

Para avisar también a Rafa, crea una segunda automatización y añade
`MANYCHAT_RAFA_FLOW_NS`, `RAFA_WHATSAPP_NUMBER` (formato internacional sin `+`)
y, opcionalmente, `RAFA_NOTIFICATION_EMAIL`.

ManyChat crea o localiza el contacto, carga los datos de la reserva en los
campos personalizados y dispara la automatización. La plantilla es necesaria
para poder iniciar la conversación fuera de la ventana de 24 horas.

## 5. Prueba antes de producción

Haz una compra con una tarjeta de prueba de Stripe y verifica, en este orden:

1. Stripe muestra el pago del 30%.
2. La página muestra “Reserva confirmada”.
3. El evento aparece en Google Calendar.
4. Cliente y Rafa reciben WhatsApp.
5. Ambos reciben correo.
6. GA4 recibe `purchase` con el ID de reserva y el importe de la seña.

## 6. Pase a producción

1. En Stripe cambia al modo activo y completa cualquier requisito pendiente de
   activación de la cuenta.
2. Crea un **nuevo** endpoint activo en
   `https://www.elrafatravel.com/api/stripe/webhook` con los cuatro eventos del
   apartado 2.
3. En Vercel configura para **Production**:
   - `STRIPE_SECRET_KEY=sk_live_...`
   - `STRIPE_WEBHOOK_SECRET=whsec_...` del endpoint activo.
   - las tres variables de ManyChat indicadas arriba (o las dos del cliente si
     todavía no se habilita el aviso interno a Rafa).
4. Conserva las claves `sk_test_...` y el webhook de prueba únicamente en
   **Preview**.
5. Despliega a producción y realiza una compra real de importe controlado. No
   uses números de tarjeta de prueba en modo activo.
6. Comprueba el pago, la reserva en Neon, Google Calendar, el WhatsApp del
   cliente, la notificación a Rafa y el correo. Después reembolsa la compra de
   control desde Stripe si corresponde.
