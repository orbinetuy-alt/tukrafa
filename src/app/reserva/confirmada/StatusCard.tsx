import Link from 'next/link';

export function StatusCard({ text, success = false }: { text: string; success?: boolean }) {
  return <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-8 text-center"><div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl ${success ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-100 text-gray-500'}`}>{success ? '✓' : '…'}</div><h1 className="font-serif text-2xl text-brand-dark mt-5">{text}</h1>{success && <><p className="text-gray-500 mt-3">O passeio já está reservado. Enviámos a confirmação por WhatsApp e email, e Rafa também recebeu todos os detalhes.</p><p className="text-sm text-gray-400 mt-4">O sinal é reembolsável em cancelamentos realizados até 48 horas antes.</p></>}<Link href="/" className="inline-flex mt-7 bg-brand-green text-white font-bold px-6 py-3 rounded-xl">Voltar ao início</Link></div>;
}
