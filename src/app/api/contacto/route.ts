import { NextResponse } from 'next/server';

export interface ContactoPayload {
  nome: string;
  email: string;
  telefone: string;
  passeio: string;
  data: string;
  pessoas: string;
  mensagem: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactoPayload = await request.json();

    // Basic server-side validation
    if (!body.nome?.trim() || !body.email?.trim() || !body.telefone?.trim()) {
      return NextResponse.json(
        { error: 'Campos obrigatórios em falta.' },
        { status: 400 }
      );
    }

    // ─── TODO: connect backend here ──────────────────────────────────────────
    // Options:
    //   1. Save to database (Supabase, PlanetScale, etc.)
    //   2. Send WhatsApp via Twilio / Meta Cloud API
    //   3. Send email via Resend / Nodemailer
    //
    // Example payload ready to forward:
    console.log('[contacto] New inquiry:', body);
    // ─────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    );
  }
}
