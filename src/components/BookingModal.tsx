'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TourDetail } from '@/data/tours';
import { trackEvent } from '@/lib/analytics';
import { BOOKABLE_TOURS, DEPOSIT_PERCENT, getDepositCents } from '@/lib/booking-config';
import { useI18n } from '@/lib/i18n';

const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DAY_NAMES = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
const pad = (value: number) => String(value).padStart(2, '0');
const dateValue = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const formatDate = (date: Date) => date.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });

export function BookingModal({ tour, onClose }: { tour: TourDetail; onClose: () => void }) {
  const { locale } = useI18n();
  const today = useMemo(() => { const value = new Date(); value.setHours(0, 0, 0, 0); return value; }, []);
  const bookingTour = BOOKABLE_TOURS.get(tour.slug);
  const [month, setMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [step, setStep] = useState<1 | 2>(1);
  const [optionId, setOptionId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [people, setPeople] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedOption = bookingTour?.options.find(option => option.id === optionId);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    const escape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', escape);
    return () => {
      document.body.style.position = ''; document.body.style.top = ''; document.body.style.width = '';
      window.scrollTo(0, scrollY); document.removeEventListener('keydown', escape);
    };
  }, [onClose]);

  async function selectDate(date: Date) {
    if (!selectedOption) return;
    setSelectedDate(date); setSelectedTime(''); setSlots([]); setError(null); setStep(2); setLoadingSlots(true);
    try {
      const response = await fetch(`/api/availability?tour=${encodeURIComponent(tour.slug)}&option=${encodeURIComponent(selectedOption.id)}&date=${dateValue(date)}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setSlots(result.slots ?? []);
    } catch {
      setError('Não foi possível consultar os horários. Tente novamente.');
    } finally { setLoadingSlots(false); }
  }

  async function checkout() {
    if (!selectedDate || !selectedOption || !selectedTime) return;
    setSubmitting(true); setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourSlug: tour.slug, optionId, date: dateValue(selectedDate), time: selectedTime,
          people, name: name.trim(), phone: phone.trim(), email: email.trim(), pickupAddress: pickupAddress.trim(), locale }),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error);
      trackEvent('add_payment_info', { tour_slug: tour.slug, tour_name: tour.title, people,
        value: getDepositCents(selectedOption.totalCents) / 100, currency: 'EUR' });
      window.location.assign(result.url);
    } catch (cause) {
      setError(cause instanceof Error && cause.message ? cause.message : 'Não foi possível iniciar o pagamento.');
      setSubmitting(false);
    }
  }

  const days = new Date(month.year, month.month + 1, 0).getDate();
  const firstWeekday = (new Date(month.year, month.month, 1).getDay() + 6) % 7;
  const canGoBack = new Date(month.year, month.month) > new Date(today.getFullYear(), today.getMonth());
  const canSubmit = Boolean(selectedTime && name.trim() && phone.trim() && email.trim() && pickupAddress.trim() && acceptedTerms);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[96dvh] overflow-hidden flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div><p className="font-serif font-semibold text-brand-dark">{tour.title}</p><p className="text-xs text-gray-400">Reserva segura · sinal de 30%</p></div>
          <button onClick={onClose} aria-label="Fechar" className="w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500">✕</button>
        </header>
        <div className="overflow-y-auto px-6 py-5">
          {!bookingTour ? (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
              <h3 className="font-bold text-amber-900">Este passeio é feito sob consulta</h3>
              <p className="text-sm text-amber-800 mt-2">Fale connosco para preparar a proposta e confirmar a disponibilidade.</p>
              <a href="https://wa.me/351910706688" target="_blank" rel="noopener noreferrer" className="inline-flex mt-4 font-bold text-brand-green">Falar no WhatsApp →</a>
            </div>
          ) : step === 1 ? (
            <div>
              <SectionTitle number="1" title="Escolha a duração" />
              <div className="grid sm:grid-cols-2 gap-2 mb-7">
                {bookingTour.options.map(option => <button type="button" key={option.id}
                  onClick={() => { setOptionId(option.id); setSelectedDate(null); }}
                  className={`p-3 rounded-xl border text-left ${optionId === option.id ? 'border-brand-green bg-brand-green/5 text-brand-green' : 'border-gray-200 text-gray-600'}`}>
                  <span className="block text-sm font-bold">{option.label}</span>
                  <span className="block text-xs mt-1">€{option.totalCents / 100} por grupo · sinal €{getDepositCents(option.totalCents) / 100}</span>
                </button>)}
              </div>
              <SectionTitle number="2" title="Escolha a data" />
              <div className="flex items-center justify-between mb-4">
                <button disabled={!canGoBack} onClick={() => setMonth(previous => { const value = new Date(previous.year, previous.month - 1); return { year: value.getFullYear(), month: value.getMonth() }; })} className="w-9 h-9 border rounded-xl disabled:opacity-25">‹</button>
                <strong className="text-sm">{MONTH_NAMES[month.month]} {month.year}</strong>
                <button onClick={() => setMonth(previous => { const value = new Date(previous.year, previous.month + 1); return { year: value.getFullYear(), month: value.getMonth() }; })} className="w-9 h-9 border rounded-xl">›</button>
              </div>
              <div className="grid grid-cols-7">{DAY_NAMES.map(day => <span key={day} className="text-[10px] text-center text-gray-400 py-2">{day}</span>)}</div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstWeekday }).map((_, index) => <span key={`empty-${index}`} />)}
                {Array.from({ length: days }, (_, index) => index + 1).map(day => {
                  const date = new Date(month.year, month.month, day); const disabled = date < today || !selectedOption;
                  return <button key={day} disabled={disabled} onClick={() => selectDate(date)}
                    className="aspect-square rounded-xl text-sm hover:bg-brand-green/10 disabled:text-gray-300 disabled:hover:bg-transparent">{day}</button>;
                })}
              </div>
              {!selectedOption && <p className="text-xs text-amber-700 mt-3">Primeiro escolha a duração.</p>}
            </div>
          ) : (
            <div className="space-y-5">
              <button onClick={() => setStep(1)} className="text-left text-sm text-brand-green font-semibold">← {selectedDate && formatDate(selectedDate)} · {selectedOption?.label}</button>
              <div><p className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Horário disponível</p>
                {loadingSlots ? <p className="text-sm text-gray-500">A consultar disponibilidade…</p> : slots.length ?
                  <div className="grid grid-cols-4 gap-2">{slots.map(slot => <button key={slot} onClick={() => setSelectedTime(slot)} className={`py-2.5 rounded-xl text-sm font-semibold border ${selectedTime === slot ? 'bg-brand-green text-white border-brand-green' : 'border-gray-200'}`}>{slot}</button>)}</div> :
                  !error && <p className="text-sm bg-amber-50 text-amber-800 rounded-xl p-3">Não há horários livres nesta data.</p>}
              </div>
              <div><p className="Label">Pessoas</p><div className="flex items-center gap-5">
                <button onClick={() => setPeople(value => Math.max(1, value - 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 text-xl">−</button><strong className="text-2xl w-6 text-center">{people}</strong>
                <button disabled={people >= bookingTour.maxPeople} onClick={() => setPeople(value => Math.min(bookingTour.maxPeople, value + 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 text-xl disabled:opacity-30">+</button>
              </div><p className="text-xs text-gray-400 mt-2">Máximo {bookingTour.maxPeople}. Grupos maiores: sob consulta.</p></div>
              <Field label="Nome completo" value={name} onChange={setName} placeholder="O seu nome" />
              <Field label="Telefone / WhatsApp com prefixo" value={phone} onChange={setPhone} placeholder="+351 912 345 678" type="tel" />
              <Field label="Email" value={email} onChange={setEmail} placeholder="email@exemplo.com" type="email" />
              <Field label="Local de pick-up" value={pickupAddress} onChange={setPickupAddress} placeholder="Hotel ou morada em Lisboa" />
              {selectedOption && <div className="bg-brand-green/5 rounded-xl p-4 text-sm"><div className="flex justify-between"><span>Preço total</span><strong>€{selectedOption.totalCents / 100}</strong></div><div className="flex justify-between mt-2 text-brand-green"><span>Sinal ({DEPOSIT_PERCENT}%) a pagar agora</span><strong>€{getDepositCents(selectedOption.totalCents) / 100}</strong></div><div className="flex justify-between mt-2 text-gray-500"><span>Restante no dia</span><span>€{(selectedOption.totalCents - getDepositCents(selectedOption.totalCents)) / 100}</span></div></div>}
              <label className="flex gap-3 text-xs text-gray-500 leading-relaxed"><input type="checkbox" checked={acceptedTerms} onChange={event => setAcceptedTerms(event.target.checked)} className="mt-0.5 accent-brand-green" /><span>Concordo com o pagamento do sinal. O sinal é reembolsável se cancelar até 48 horas antes.</span></label>
              {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
            </div>
          )}
        </div>
        {bookingTour && step === 2 && <footer className="px-6 py-4 border-t"><button disabled={!canSubmit || submitting} onClick={checkout} className="w-full bg-brand-red text-white font-bold py-4 rounded-xl disabled:opacity-40">{submitting ? 'A abrir pagamento seguro…' : selectedOption ? `PAGAR SINAL · €${getDepositCents(selectedOption.totalCents) / 100}` : 'CONTINUAR'}</button></footer>}
      </div>
    </div>, document.body,
  );
}

function SectionTitle({ number, title }: { number: string; title: string }) {
  return <div className="flex items-center gap-3 mb-4"><span className="w-7 h-7 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center">{number}</span><strong className="text-sm text-brand-dark">{title}</strong></div>;
}

function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return <label className="block"><span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</span><input type={type} value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30" /></label>;
}
