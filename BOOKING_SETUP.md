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

Copia el signing secret `whsec_...` en `STRIPE_WEBHOOK_SECRET`.

## 3. Google Calendar

1. Crea un proyecto en Google Cloud y habilita **Google Calendar API**.
2. Crea una cuenta de servicio y una clave JSON.
3. En Google Calendar crea un calendario específico para las reservas.
4. Comparte ese calendario con el email de la cuenta de servicio y permiso **Hacer cambios en eventos**.
5. Añade `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY` en Vercel.

La clave privada debe conservar los saltos de línea como `\n`.

## 4. WhatsApp Cloud API

Añade el token permanente, el Phone Number ID y el número de Rafa en formato internacional sin `+`. Deben aprobarse estas dos plantillas:

### `booking_confirmation`

Parámetros del cuerpo, en este orden:

1. Nombre del cliente
2. Tour
3. Fecha
4. Hora
5. Duración
6. Sinal pagado
7. Importe restante
8. Identificador de reserva

Crear versiones `pt_PT`, `en_US` y `es`.

### `new_paid_booking`

Versión `pt_PT`, con parámetros:

1. Nombre del cliente
2. WhatsApp del cliente
3. Email
4. Tour
5. Fecha
6. Hora
7. Duración
8. Personas
9. Punto de recogida
10. Sinal pagado
11. Importe restante
12. Identificador de reserva

## 5. Prueba antes de producción

Haz una compra con una tarjeta de prueba de Stripe y verifica, en este orden:

1. Stripe muestra el pago del 30%.
2. La página muestra “Reserva confirmada”.
3. El evento aparece en Google Calendar.
4. Cliente y Rafa reciben WhatsApp.
5. Ambos reciben correo.
6. GA4 recibe `purchase` con el ID de reserva y el importe de la seña.

Solo después se cambia `STRIPE_SECRET_KEY` a producción y se crea un webhook de producción nuevo.
