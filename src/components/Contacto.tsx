'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { excursionTours, tukTukTours } from '@/data/tours';
import { localizeTour } from '@/lib/tour-i18n';
import { trackEvent } from '@/lib/analytics';

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

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
    <path d="M12 2.16c3.2 0 3.58.02 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.18 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.36-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .59.05.87.13V9.4a6.34 6.34 0 105.47 6.27V8.73a8.16 8.16 0 004.77 1.52V6.82c-.34 0-.67-.04-1-.13z" />
  </svg>
);

const inputClass =
  'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition-colors';

const labelClass = 'block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Contacto() {
  const { locale, messages } = useI18n();
  const t = messages.contactForm;
  const localizedTukTukTours = tukTukTours.map((tour) => localizeTour(tour, locale));
  const localizedExcursions = excursionTours.map((tour) => localizeTour(tour, locale));
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
      trackEvent('generate_lead', {
        form_name: 'contacto',
        tour_slug: form.passeio || undefined,
      });
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
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            {t.title}
          </h2>
          <p className="text-green-100/80 text-base max-w-md mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white/10 rounded-2xl p-6 flex flex-col gap-5">

              <a
                href="https://wa.me/351910706688"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:bg-green-400 transition-colors">
                  <WhatsAppIcon />
                </div>
                <div>
                  <p className="text-xs text-green-200 font-medium uppercase tracking-wide">WhatsApp</p>
                  <p className="text-white font-semibold">+351 910 706 688</p>
                </div>
              </a>

              <div className="border-t border-white/10" />

              <a href="mailto:elrafatravelcrm@gmail.com" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-green-200 shrink-0 group-hover:bg-white/20 transition-colors">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-xs text-green-200 font-medium uppercase tracking-wide">Email</p>
                  <p className="text-white font-semibold">elrafatravelcrm@gmail.com</p>
                </div>
              </a>

              <div className="border-t border-white/10" />

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-green-200 shrink-0">
                  <ClockIcon />
                </div>
                <div>
                  <p className="text-xs text-green-200 font-medium uppercase tracking-wide">{t.hours}</p>
                  <p className="text-white font-semibold">{t.schedule}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href="https://wa.me/351910706688?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20passeios."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              <WhatsAppIcon />
              {t.whatsapp}
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.instagram.com/tuk.rafa/"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-control flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@el_rafa_travel"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-control flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <TikTokIcon />
                TikTok
              </a>
            </div>
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
                <h3 className="font-serif text-2xl text-brand-dark">{t.success}</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  {t.successText}
                </p>
                <button
                  onClick={() => { setFormState('idle'); setForm({ nome: '', email: '', telefone: '', passeio: '', data: '', pessoas: '2', mensagem: '' }); }}
                  className="mt-2 text-brand-green text-sm font-semibold hover:underline"
                >
                  {t.another}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>{t.name} *</label>
                    <input name="nome" required value={form.nome} onChange={handleChange} placeholder={t.namePlaceholder} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t.phone} *</label>
                    <input name="telefone" required value={form.telefone} onChange={handleChange} placeholder="+351 XXX XXX XXX" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="o.seu@email.com" className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>{t.tour}</label>
                    <select name="passeio" value={form.passeio} onChange={handleChange} className={inputClass}>
                      <option value="">{t.selectTour}</option>
                      <optgroup label="Tuk-Tuk">
                        {localizedTukTukTours.map((tour) => (
                          <option key={tour.slug} value={tour.slug}>{tour.title}</option>
                        ))}
                      </optgroup>
                      <optgroup label={t.excursions}>
                        {localizedExcursions.map((tour) => (
                          <option key={tour.slug} value={tour.slug}>{tour.title}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{t.people}</label>
                    <input
                      name="pessoas"
                      type="number"
                      min="1"
                      step="1"
                      required
                      inputMode="numeric"
                      value={form.pessoas}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t.date}</label>
                  <input name="data" type="date" value={form.data} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>{t.message}</label>
                  <textarea name="mensagem" rows={3} value={form.mensagem} onChange={handleChange} placeholder={t.messagePlaceholder} className={`${inputClass} resize-none`} />
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
                      {t.sending}
                    </>
                  ) : (
                    t.send
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  {t.note}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
