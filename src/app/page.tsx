import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Passeios from '@/components/Passeios';
import Reviews from '@/components/Reviews';
import SobreNos from '@/components/SobreNos';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Passeios />
        <Reviews />
        <SobreNos />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
