import { COUPLE_IMAGE } from '@/data/wedding';
import { Reveal, Ornament, SectionLabel } from '@/components/Decorative';

export function Invitation() {
  return (
    <section
      id="invitation"
      className="relative overflow-hidden bg-ink-950 py-24 sm:py-32"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-royal-500/5 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-royal-500/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-radial-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel>Together with our families</SectionLabel>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-royal-400/15">
            <img
              src={COUPLE_IMAGE}
              alt="Bride and groom embracing in romantic wedding portrait"
              className="h-full w-full object-cover transition-transform duration-[3000ms] hover:scale-105"
            />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <Ornament className="mb-8" />
            <p className="mx-auto max-w-2xl font-display text-xl leading-relaxed text-cream-200/80 sm:text-2xl">
                With the blessings of our families and the grace of destiny,
                two hearts come together in a beautiful bond of love and
                togetherness. We invite you to celebrate the beginning of
                our forever journey. Your presence and blessings will make
                our special day even more meaningful.
              </p>
            <Ornament className="mt-8" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
