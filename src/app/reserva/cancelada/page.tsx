import Link from 'next/link';

export default function CancelledBookingPage() {
  return <main className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-5"><div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-8 text-center"><div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-2xl">!</div><h1 className="font-serif text-2xl text-brand-dark mt-5">Pagamento não concluído</h1><p className="text-gray-500 mt-3">A reserva ainda não foi confirmada e nenhum valor foi cobrado. Pode voltar e escolher novamente o passeio.</p><Link href="/" className="inline-flex mt-7 bg-brand-green text-white font-bold px-6 py-3 rounded-xl">Voltar aos passeios</Link></div></main>;
}
