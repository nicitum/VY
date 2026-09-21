import { Reveal, Ornament } from '@/components/Decorative';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 bg-radial-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <Ornament className="mb-8" />
        </Reveal>

        <Reveal delay={100}>
          <p className="font-script text-3xl text-gold-gradient sm:text-4xl">
            With Love, Always
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 font-display text-2xl text-cream-200/80 sm:text-3xl">
            Vishwas & Yashaswini
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-royal-400/40" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-400/20 text-royal-300/60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-royal-400/40" />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-8 font-sans text-xs uppercase tracking-[0.3em] text-cream-300/30">
            Made with love for our special day
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
