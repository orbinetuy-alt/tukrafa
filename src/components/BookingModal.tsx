'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { TourDetail } from '@/data/tours';

const TIME_SLOTS = [
  '9:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
];

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const DAY_NAMES = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}
function formatDateShort(date: Date) {
  return date.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}
function formatDateLong(date: Date) {
  return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
}
function padDate(n: number) { return String(n).padStart(2, '0'); }

interface BookingModalProps { tour: TourDetail; onClose: () => void; }

export function BookingModal({ tour, onClose }: BookingModalProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [calMonth, setCalMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [step, setStep] = useState<1 | 2 | 'success'>(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [people, setPeople] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // iOS Safari ignores overflow:hidden on body — use position:fixed trick
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  const daysInMonth = getDaysInMonth(calMonth.year, calMonth.month);
  const firstDay = getFirstDayOfWeek(calMonth.year, calMonth.month);
  const canGoPrev = new Date(calMonth.year, calMonth.month) > new Date(today.getFullYear(), today.getMonth());

  const pricingNote =
    tour.type === 'tuktuk' && people >= 4 ? '* 4+ pessoas: preço sob consulta'
    : tour.type === 'excursao' && people > 8 ? '* 8+ pessoas: preço sob consulta'
    : `${tour.priceDisplay} por grupo`;

  const canSubmit = Boolean(selectedTime && name.trim() && phone.trim() && email.trim());

  function pickDate(date: Date) {
    setSelectedDate(date);
    setStep(2);
  }

  async function handleSubmit() {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourSlug: tour.slug,
          tourTitle: tour.title,
          tourType: tour.type,
          date: `${selectedDate.getFullYear()}-${padDate(selectedDate.getMonth() + 1)}-${padDate(selectedDate.getDate())}`,
          time: selectedTime,
          people,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error();
      setConfirmationEmailSent(result.confirmationEmailSent !== false);
      setStep('success');
    } catch {
      setError('Ocorreu um erro. Por favor tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  const modal = (
    <div className="fixed inset-0 z-[9999] isolate flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 z-0 bg-black/50" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 pointer-events-auto bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[96dvh] sm:max-h-[92vh] overflow-hidden">

        {/* Sticky header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0 border-b border-gray-100">
          <p className="font-serif text-base font-semibold text-brand-dark truncate pr-4">{tour.title}</p>
          <button onClick={onClose} aria-label="Fechar" className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto overscroll-contain flex-1 min-h-0">

          {/* ────── STEP 1: Calendar ────── */}
          {step === 1 && (
            <div className="px-6 py-5">
              {/* Step label */}
              <div className="flex items-start gap-3 mb-6">
                <span className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <p className="font-semibold text-brand-dark text-sm">Escolha a data</p>
                  {selectedDate && (
                    <p className="text-xs text-gray-400 mt-0.5">✓ {formatDateLong(selectedDate)}</p>
                  )}
                </div>
              </div>

              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCalMonth(p => { const d = new Date(p.year, p.month - 1); return { year: d.getFullYear(), month: d.getMonth() }; })}
                  disabled={!canGoPrev}
                  className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <p className="text-sm font-bold text-brand-dark">{MONTH_NAMES[calMonth.month]} {calMonth.year}</p>
                <button
                  onClick={() => setCalMonth(p => { const d = new Date(p.year, p.month + 1); return { year: d.getFullYear(), month: d.getMonth() }; })}
                  className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 mb-1">
                {DAY_NAMES.map(d => (
                  <p key={d} className="text-center text-[10px] font-semibold text-gray-400 tracking-wide py-1">{d}</p>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(calMonth.year, calMonth.month, day);
                  const disabled = date < today;
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const isToday = date.toDateString() === today.toDateString();
                  return (
                    <button
                      key={day}
                      disabled={disabled}
                      onClick={() => pickDate(date)}
                      className={[
                        'aspect-square w-full flex items-center justify-center text-sm rounded-xl font-medium transition-all',
                        disabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer',
                        isSelected ? 'bg-brand-green text-white shadow-sm font-bold' : '',
                        isToday && !isSelected ? 'ring-2 ring-brand-green text-brand-green font-bold' : '',
                        !disabled && !isSelected ? 'hover:bg-brand-green/10 hover:text-brand-green' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ────── STEP 2: Details ────── */}
          {step === 2 && selectedDate && (
            <div className="px-6 py-5 space-y-6">

              {/* Step 1 collapsed */}
              <button onClick={() => setStep(1)} className="flex items-start gap-3 w-full text-left group">
                <span className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-400">Escolha a data</p>
                  <p className="text-sm font-semibold text-brand-dark capitalize group-hover:text-brand-green transition-colors">{formatDateShort(selectedDate)}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-green ml-auto mt-1 transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>

              <div className="border-t border-gray-100" />

              {/* Step 2 label */}
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">2</span>
                <p className="font-semibold text-brand-dark text-sm mt-0.5">Escolha o horário e os detalhes</p>
              </div>

              {/* Time slots */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Horário</p>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={[
                        'py-2.5 rounded-xl text-sm font-semibold border transition-all',
                        selectedTime === slot
                          ? 'bg-brand-green text-white border-brand-green'
                          : 'border-gray-200 text-gray-600 hover:border-brand-green hover:text-brand-green bg-white',
                      ].join(' ')}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* People */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pessoas</p>
                <div className="flex items-center gap-5">
                  <button onClick={() => setPeople(p => Math.max(1, p - 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-green hover:text-brand-green transition-colors text-xl font-medium leading-none">−</button>
                  <span className="text-3xl font-bold text-brand-dark w-8 text-center tabular-nums">{people}</span>
                  <button onClick={() => setPeople(p => p + 1)} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-green hover:text-brand-green transition-colors text-xl font-medium leading-none">+</button>
                </div>
                <p className="text-xs text-gray-400 mt-2">{pricingNote}</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome completo</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="O seu nome" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Telefone / WhatsApp</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+351 912 345 678" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@exemplo.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors" />
              </div>

              {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
            </div>
          )}

          {/* ────── SUCCESS ────── */}
          {step === 'success' && (
            <div className="px-6 py-16 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-brand-green/10 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-3">Pedido enviado!</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                A sua solicitação de reserva foi recebida. Rafa entrará em contacto em breve para confirmar os detalhes.
              </p>
              <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {confirmationEmailSent
                  ? 'Verifique o seu email para a confirmação'
                  : 'A reserva chegou ao Rafa, mas a confirmação por email não pôde ser enviada.'}
              </p>
            </div>
          )}

        </div>

        {/* Footer CTA */}
        {step === 2 && (
          <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-white">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm tracking-wider transition-colors"
            >
              {submitting ? 'A enviar…' : 'RESERVAR AGORA'}
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-white">
            <button onClick={onClose} className="w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:border-brand-green hover:text-brand-green transition-colors text-sm">Fechar</button>
          </div>
        )}

      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
