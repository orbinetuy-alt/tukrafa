import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const RAFA_EMAIL = process.env.RAFA_EMAIL ?? 'rafa@tukrafa.pt';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'reservas@tukrafa.pt';

interface ReservaPayload {
  tourSlug: string;
  tourTitle: string;
  tourType: 'tuktuk' | 'excursao';
  date: string;   // YYYY-MM-DD
  time: string;   // e.g. "10:00"
  people: number;
  name: string;
  phone: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const body: ReservaPayload = await request.json();
    const { tourTitle, date, time, people, name, phone, email } = body;

    if (!tourTitle || !date || !time || !people || !name || !phone || !email) {
      return NextResponse.json({ error: 'Campos obrigatórios em falta.' }, { status: 400 });
    }

    // Basic email format check
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }

    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Email to Rafa
    await resend.emails.send({
      from: `Rafa Travel <${FROM_EMAIL}>`,
      to: RAFA_EMAIL,
      subject: `🗓 Nova reserva — ${tourTitle}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
          <h2 style="color:#2D6A4F;margin-bottom:24px">Nova solicitação de reserva</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 8px;font-weight:600;color:#555;width:120px">Tour</td>
              <td style="padding:10px 8px">${tourTitle}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 8px;font-weight:600;color:#555">Data</td>
              <td style="padding:10px 8px">${formattedDate}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 8px;font-weight:600;color:#555">Hora</td>
              <td style="padding:10px 8px">${time}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 8px;font-weight:600;color:#555">Pessoas</td>
              <td style="padding:10px 8px">${people}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 8px;font-weight:600;color:#555">Nome</td>
              <td style="padding:10px 8px">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 8px;font-weight:600;color:#555">Telefone</td>
              <td style="padding:10px 8px">${phone}</td>
            </tr>
            <tr>
              <td style="padding:10px 8px;font-weight:600;color:#555">Email</td>
              <td style="padding:10px 8px">${email}</td>
            </tr>
          </table>
          <p style="margin-top:24px;font-size:13px;color:#888">Rafa Travel · tukrafa.pt</p>
        </div>
      `,
    });

    // Confirmation email to client
    await resend.emails.send({
      from: `Rafa Travel <${FROM_EMAIL}>`,
      to: email,
      subject: `Confirmação de pedido — ${tourTitle}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
          <h2 style="color:#2D6A4F">Olá, ${name}!</h2>
          <p style="color:#555;line-height:1.6">
            A sua solicitação de reserva foi recebida com sucesso. Rafa entrará em contacto em breve para confirmar todos os detalhes.
          </p>
          <div style="background:#f7f3ec;border-radius:12px;padding:20px;margin:24px 0">
            <p style="margin:0 0 8px"><strong>Tour:</strong> ${tourTitle}</p>
            <p style="margin:0 0 8px"><strong>Data:</strong> ${formattedDate}</p>
            <p style="margin:0 0 8px"><strong>Hora:</strong> ${time}</p>
            <p style="margin:0"><strong>Pessoas:</strong> ${people}</p>
          </div>
          <p style="font-size:13px;color:#888;margin-top:24px">Obrigado por escolher a Rafa Travel! · tukrafa.pt</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[reserva] error:', err);
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 });
  }
}
