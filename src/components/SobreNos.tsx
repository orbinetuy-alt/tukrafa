const stats = [
  { value: '+500', label: 'Turistas satisfeitos' },
  { value: '5★', label: 'Rating no Google' },
  { value: '8', label: 'Anos de experiência' },
  { value: '100%', label: 'Tours privativos' },
];

const highlights = [
  'Guia certificado pelo Turismo de Portugal',
  'Nascido e criado em Lisboa — conhece cada rua',
  'Fala português, inglês e espanhol',
  'Pick-up gratuito no seu hotel',
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-brand-green shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-brand-green opacity-30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

import Image from 'next/image';

export default function SobreNos() {
  return (
    <section id="sobre" className="bg-brand-beige py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="text-center mb-14">
          <p className="text-brand-green text-xs font-bold tracking-widest uppercase mb-3">
            O seu guia
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark">
            Sobre nós
          </h2>
        </div>

        {/* Main content: photo + bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Photo */}
          <div className="relative">
            {/* Decorative border offset */}
            <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-brand-green/30" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              <Image
                src="/sobrenos.jpg"
                alt="Rafa — guia de Lisboa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-6 -right-4 lg:-right-6 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-green-light rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-dark">Guia Certificado</p>
                <p className="text-xs text-gray-400">Turismo de Portugal</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-6">
            <div>
              <QuoteIcon />
              <h3 className="font-serif text-3xl text-brand-dark mt-2 mb-4">
                Olá, sou o [Nome]!
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nasci e cresci em Lisboa — esta cidade é a minha paixão. Há mais de 8 anos levo turistas de todo o mundo a descobrir os seus bairros históricos, os seus miradouros escondidos e as suas histórias mais fascinantes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Acredito que a melhor forma de conhecer Lisboa é de tuk-tuk: devagar, pelos bairros mais autênticos, sem pressa, com um guia que realmente conhece a cidade. Cada passeio é privado e personalizado — porque cada viajante é único.
              </p>
            </div>

            {/* Highlights */}
            <ul className="flex flex-col gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center shadow-sm"
            >
              <p className="font-serif text-3xl text-brand-green font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
