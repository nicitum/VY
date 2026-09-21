import { useState, useEffect } from 'react';
import { HERO_IMAGE } from '@/data/wedding';
import { Ornament } from '@/components/Decorative';

export function Hero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const el = document.getElementById('hero-bg');
      if (el) {
        el.style.transform = `translateY(${scrollY * 0.4}px)`;
        el.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sealed entry: no scrolling, nothing below reachable,
  // until the guest taps "Open Invitation".
  useEffect(() => {
    if (!open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open ]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        id="hero-bg"
        className="absolute inset-0 z-0 transition-opacity duration-300"
      >
        <img
          src={HERO_IMAGE}
          alt="Vishwas and Yashaswini in traditional wedding attire"
          className="animate-hero-zoom h-full w-full object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/40 to-ink-950" />
      </div>

      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-10 top-20 h-2 w-2 rounded-full bg-royal-300/30 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute right-20 top-32 h-3 w-3 rounded-full bg-royal-400/20 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/4 top-1/3 h-1.5 w-1.5 rounded-full bg-royal-300/20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div
        className={`relative z-20 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-[1800ms] ${
          open ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <p className="font-sans text-xs uppercase tracking-[0.5em] text-royal-300/80 mb-8 animate-fade-in-up">
          Wedding Invitation
        </p>

        <div className="animate-scale-in">
          <h1 className="font-script text-5xl text-cream-100 sm:text-7xl md:text-8xl">
            Vishwas
          </h1>
          <p className="my-2 font-display text-2xl italic text-royal-300/80 sm:text-3xl">
            &
          </p>
          <h1 className="font-script text-5xl text-cream-100 sm:text-7xl md:text-8xl">
            Yashaswini
          </h1>
        </div>

        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
          <Ornament />
        </div>

        <p className="mt-6 font-sans text-sm uppercase tracking-[0.3em] text-cream-300/60 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
          Tumkur, Karnataka
        </p>

        <button
          onClick={() => {
            setOpen(true);
            // Guest's tap = browser gesture, so music starts reliably here.
            window.dispatchEvent(new Event('wedding:start-music'));
            setTimeout(() => {
              document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
            }, 800);
          }}
          className="mt-12 group relative overflow-hidden rounded-full border border-royal-400/30 px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-royal-300 transition-all duration-500 hover:border-royal-300 hover:text-royal-100 animate-fade-in-up"
          style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="relative z-10">Open Invitation</span>
          <div className="absolute inset-0 bg-royal-500/10 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
        </button>
      </div>

      {/* Entry hint — scrolling stays locked until Open Invitation */}
      <div className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transition-opacity duration-700 ${
        open ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream-300/40">
            Tap to open
          </span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="text-royal-300/50 animate-bounce">
            <path d="M8 2 L8 18 M3 13 L8 18 L13 13" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Opened state overlay */}
      <div
        className={`absolute inset-0 z-30 flex items-center justify-center bg-ink-950 transition-all duration-[1800ms] ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`text-center transition-all duration-1000 ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <p className="font-script text-4xl text-gold-gradient sm:text-6xl">With Love & Blessings</p>
        </div>
      </div>
    </section>
  );
}
