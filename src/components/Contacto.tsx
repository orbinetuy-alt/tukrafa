'use client';

import { useState } from 'react';

const tourOptions = [
  'Lisboa à la Carte',
  'Belém',
  'Half Day',
  'Alfama & Fado',
  'Sintra',
  'Outro / Não sei ainda',
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);

const inputClass =
  'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition-colors';

const labelClass = 'block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Contacto() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    passeio: '',
    data: '',
    pessoas: '2',
    mensagem: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Erro desconhecido');
      }

      setFormState('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.');
      setFormState('error');
    }
  };

  return (
    <section id="contactos" className="bg-brand-green py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-brand-green-light text-xs font-bold tracking-widest uppercase mb-3">
            Fale connosco
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Reserve o seu passeio
          </h2>
          <p className="text-green-100/80 text-base max-w-md mx-auto">
            Envie a sua consulta e entraremos em contacto via WhatsApp para confirmar a reserva.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white/10 rounded-2xl p-6 flex flex-col gap-5">

              <a
                href="https://wa.me/351XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:bg-green-400 transition-colors">
                  <WhatsAppIcon />
                </div>
                <div>
                  <p className="text-xs text-green-200 font-medium uppercase tracking-wide">WhatsApp</p>
                  <p className="text-white font-semibold">+351 XXX XXX XXX</p>
                </div>
              </a>

              <div className="border-t border-white/10" />

              <a href="mailto:info@tukrafa.pt" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-green-200 shrink-0 group-hover:bg-white/20 transition-colors">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-xs text-green-200 font-medium uppercase tracking-wide">Email</p>
                  <p className="text-white font-semibold">info@tukrafa.pt</p>
                </div>
              </a>

              <div className="border-t border-white/10" />

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-green-200 shrink-0">
                  <ClockIcon />
                </div>
                <div>
                  <p className="text-xs text-green-200 font-medium uppercase tracking-wide">Horário</p>
                  <p className="text-white font-semibold">Todos os dias, 8h – 20h</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href="https://wa.me/351XXXXXXXXX?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20passeios."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              <WhatsAppIcon />
              Falar diretamente no WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8">
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-10 text-center">
                <div className="w-16 h-16 bg-brand-green-light rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-brand-dark">Pedido recebido!</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Entraremos em contacto consigo via WhatsApp em breve para confirmar a sua reserva.
                </p>
                <button
                  onClick={() => { setFormState('idle'); setForm({ nome: '', email: '', telefone: '', passeio: '', data: '', pessoas: '2', mensagem: '' }); }}
                  className="mt-2 text-brand-green text-sm font-semibold hover:underline"
                >
                  Fazer outro pedido
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Nome *</label>
                    <input name="nome" required value={form.nome} onChange={handleChange} placeholder="O seu nome" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Telefone / WhatsApp *</label>
                    <input name="telefone" required value={form.telefone} onChange={handleChange} placeholder="+351 XXX XXX XXX" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="o.seu@email.com" className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Passeio</label>
                    <select name="passeio" value={form.passeio} onChange={handleChange} className={inputClass}>
                      <option value="">Selecionar passeio</option>
                      {tourOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Nº de pessoas</label>
                    <select name="pessoas" value={form.pessoas} onChange={handleChange} className={inputClass}>
                      {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'pessoa' : 'pessoas'}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Data preferida</label>
                  <input name="data" type="date" value={form.data} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Mensagem</label>
                  <textarea name="mensagem" rows={3} value={form.mensagem} onChange={handleChange} placeholder="Alguma preferência ou dúvida?" className={`${inputClass} resize-none`} />
                </div>

                {formState === 'error' && (
                  <p className="text-brand-red text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {formState === 'loading' ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      A enviar…
                    </>
                  ) : (
                    'Enviar pedido de reserva'
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Após o envio, entraremos em contacto via WhatsApp para confirmar.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
