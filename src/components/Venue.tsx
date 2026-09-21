import { MapPin, ExternalLink } from 'lucide-react';
import { VENUE_IMAGE, VENUE_MAP_URL } from '@/data/wedding';
import { Reveal, SectionLabel } from '@/components/Decorative';

export function Venue() {
  return (
    <section className="relative overflow-hidden bg-royal-gradient py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel>The Venue</SectionLabel>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="mt-8 text-center font-display text-4xl text-gold-gradient sm:text-6xl">
            Shri Bavi Katte Kalyana Mantapa
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-4 text-center font-sans text-sm uppercase tracking-[0.3em] text-cream-300/50">
            Tumkur, Karnataka
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-royal-400/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
            <div className="relative group">
              <div className="relative h-[320px] w-full overflow-hidden sm:h-[460px]">
                <div className="animate-venue-zoom h-full w-full">
                  <video
                    className="h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={VENUE_IMAGE}
                  >
                    <source src="/venue.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]" />

              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-2 text-royal-300">
                    <MapPin size={18} strokeWidth={1.5} />
                    <span className="font-sans text-sm tracking-wide text-cream-200/80">
                      Shri Bavi Katte Kalyana Mantapa, Tumkur, Karnataka, India
                    </span>
                  </div>
                  <a
                    href={VENUE_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 rounded-full border border-royal-400/30 px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-royal-300 transition-all duration-500 hover:border-royal-300 hover:text-royal-100"
                  >
                    View on Map
                    <ExternalLink size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl leading-relaxed text-cream-200/70 sm:text-2xl">
            A beautiful setting for the beginning of our forever. We look forward
            to welcoming you to this sacred space where our new journey begins.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
