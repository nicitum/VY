import { Hero } from '@/components/Hero';
import { Invitation } from '@/components/Invitation';
import { Countdown } from '@/components/Countdown';
import { Events } from '@/components/Events';
import { Venue } from '@/components/Venue';
import { Gallery } from '@/components/Gallery';
import { ThankYou } from '@/components/ThankYou';
import { Wishes } from '@/components/Wishes';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';

function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Hero />
      <Invitation />
      <Countdown />
      <Events />
      <Venue />
      <Gallery />
      <ThankYou />
      <Wishes />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
