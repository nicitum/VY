import { Heart } from 'lucide-react';
import { Reveal, SectionLabel, Ornament } from '@/components/Decorative';

export function ThankYou() {
  return (
    <section className="relative overflow-hidden bg-royal-gradient py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-radial-gold" />
        <div className="absolute left-10 top-20 h-2 w-2 rounded-full bg-royal-300/30 animate-float" />
        <div className="absolute right-16 top-40 h-3 w-3 rounded-full bg-royal-400/20 animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-24 left-1/4 h-1.5 w-1.5 rounded-full bg-royal-300/20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <SectionLabel>With Heartfelt Gratitude</SectionLabel>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="mt-8 font-display text-4xl text-gold-gradient sm:text-6xl">
            Thank You
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-6 font-script text-3xl text-cream-200/90 sm:text-4xl">
            Your presence is our greatest gift
          </p>
        </Reveal>

        <Reveal delay={400}>
          <Ornament className="my-10" />
        </Reveal>

        <Reveal delay={500}>
          <div className="rounded-2xl border border-royal-400/15 bg-ink-900/40 p-8 backdrop-blur-sm sm:p-12">
            <p className="mx-auto max-w-2xl font-display text-xl leading-relaxed text-cream-200/80 sm:text-2xl">
              From the bottom of our hearts, thank you for gracing our special
              day with your love, laughter and blessings. Having you beside us
              as we begin this beautiful journey means more to us than words
              can express.
            </p>

            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-royal-400/40" />
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-400/20 text-royal-300/70">
                <Heart size={16} strokeWidth={1.5} fill="currentColor" />
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-royal-400/40" />
            </div>

            <p className="mt-8 font-script text-4xl text-gold-gradient sm:text-5xl">
              Vishwas & Yashaswini
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
