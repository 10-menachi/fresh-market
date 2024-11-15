import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import FloatingCTA from '@/components/FloatingCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Products />
      <Services />
      <About />
      <Testimonials />
      <Newsletter />
      <Contact />
      <FloatingCTA />
    </main>
  );
}