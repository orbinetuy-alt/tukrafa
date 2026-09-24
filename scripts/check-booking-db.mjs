import nextEnv from '@next/env';
import { neon } from '@neondatabase/serverless';

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  console.error('Falta DATABASE_URL. Conecta Neon en Vercel y descarga las variables locales.');
  process.exitCode = 1;
} else {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const [result] = await sql`
      SELECT
        to_regclass('public.bookings') IS NOT NULL AS table_exists,
        (SELECT count(*)::int FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'bookings') AS column_count
    `;
    if (!result.table_exists || result.column_count < 25) {
      console.error('La conexión funciona, pero falta ejecutar db/schema.sql en Neon.');
      process.exitCode = 1;
    } else {
      console.log('Base de reservas lista: conexión segura y tabla bookings verificada.');
    }
  } catch (error) {
    console.error('No se pudo verificar la base de reservas:', error instanceof Error ? error.message : 'error desconocido');
    process.exitCode = 1;
  }
}
