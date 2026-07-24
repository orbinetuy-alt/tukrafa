import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getTourBySlug } from '@/data/tours';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = 'elrafatravelcrm@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'reservas@tukrafa.pt';

export interface ContactoPayload {
  nome: string;
  email: string;
  telefone: string;
  passeio: string;
  data: string;
  pessoas: string;
  mensagem: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
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

    if (!body.email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }

    const people = Number(body.pessoas);
    if (!Number.isInteger(people) || people < 1) {
      return NextResponse.json({ error: 'Número de pessoas inválido.' }, { status: 400 });
    }

    const tour = body.passeio ? getTourBySlug(body.passeio) : undefined;
    const tourName = tour?.title ?? 'Não selecionado';
    const safe = {
      nome: escapeHtml(body.nome.trim()),
      email: escapeHtml(body.email.trim()),
      telefone: escapeHtml(body.telefone.trim()),
      passeio: escapeHtml(tourName),
      data: escapeHtml(body.data?.trim() || 'Não indicada'),
      pessoas: escapeHtml(String(people)),
      mensagem: escapeHtml(body.mensagem?.trim() || 'Sem mensagem'),
    };

    const { error } = await resend.emails.send({
      from: `Rafa Travel <${FROM_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: body.email.trim(),
      subject: `Nova consulta — ${tourName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a2332">
          <h2 style="color:#2D6A4F">Nova consulta pelo site</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:9px;border-bottom:1px solid #eee;font-weight:bold">Nome</td><td style="padding:9px;border-bottom:1px solid #eee">${safe.nome}</td></tr>
            <tr><td style="padding:9px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:9px;border-bottom:1px solid #eee">${safe.email}</td></tr>
            <tr><td style="padding:9px;border-bottom:1px solid #eee;font-weight:bold">Telefone</td><td style="padding:9px;border-bottom:1px solid #eee">${safe.telefone}</td></tr>
            <tr><td style="padding:9px;border-bottom:1px solid #eee;font-weight:bold">Passeio</td><td style="padding:9px;border-bottom:1px solid #eee">${safe.passeio}</td></tr>
            <tr><td style="padding:9px;border-bottom:1px solid #eee;font-weight:bold">Pessoas</td><td style="padding:9px;border-bottom:1px solid #eee">${safe.pessoas}</td></tr>
            <tr><td style="padding:9px;border-bottom:1px solid #eee;font-weight:bold">Data</td><td style="padding:9px;border-bottom:1px solid #eee">${safe.data}</td></tr>
            <tr><td style="padding:9px;font-weight:bold;vertical-align:top">Mensagem</td><td style="padding:9px;white-space:pre-wrap">${safe.mensagem}</td></tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error('[contacto] Resend error:', error);
      return NextResponse.json({ error: 'Erro ao enviar. Tente novamente.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[contacto] error:', error);
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    );
  }
}
