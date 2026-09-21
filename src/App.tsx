import { Hero } from '@/components/Hero';
import { Invitation } from '@/components/Invitation';
import { Countdown } from '@/components/Countdown';
import { Events } from '@/components/Events';
import { Venue } from '@/components/Venue';
import { Gallery } from '@/components/Gallery';
import { ThankYou } from '@/components/ThankYou';
import { Wishes } from '@/components/Wishes';
import { WishesAdmin } from '@/components/WishesAdmin';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';

const isWishesRoute =
  typeof window !== 'undefined' &&
  (window.location.pathname.replace(/\/$/, '') === '/wishes' ||
    window.location.hash === '#/wishes');

function App() {
  if (isWishesRoute) {
    return (
      <div className="min-h-screen bg-ink-950">
        <WishesAdmin />
      </div>
    );
  }

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
