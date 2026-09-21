import { useState, useEffect } from 'react';
import {
  Music,
  Church,
  Sparkles,
  MapPin,
  X,
  CalendarDays,
  Clock,
  BookOpen,
  Heart,
} from 'lucide-react';
import { EVENTS } from '@/data/wedding';
import { Reveal, SectionLabel, CornerOrnament, Ornament } from '@/components/Decorative';

const iconMap: Record<string, typeof Music> = {
  music: Music,
  rings: Church,
  haldi: Sparkles,
};

export function Events() {
  const [selected, setSelected] = useState<number | null>(null);

  // Close on Escape + lock body scroll while the royal book is open
  useEffect(() => {
    if (selected === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const active = selected !== null ? EVENTS[selected] : null;
  const ActiveIcon = active ? iconMap[active.icon] || Music : Music;

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-royal-500/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-royal-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Wedding Festivities</SectionLabel>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="mt-8 text-center font-display text-4xl text-gold-gradient sm:text-6xl">
            Join Us for Our Celebration
          </h2>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-4 text-center font-sans text-xs uppercase tracking-[0.3em] text-cream-300/40">
            Tap a card to open the invitation
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {EVENTS.map((event, idx) => {
            const Icon = iconMap[event.icon] || Music;
            return (
              <Reveal key={event.title} delay={300 + idx * 200}>
                <button
                  type="button"
                  onClick={() => setSelected(idx)}
                  className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-royal-400/20 bg-ink-900/40 p-8 text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-royal-400/50 hover:bg-ink-900/60 hover:shadow-[0_20px_60px_-15px_rgba(192,136,46,0.35)] sm:p-10"
                >
                  <CornerOrnament className="absolute left-0 top-0" />
                  <CornerOrnament className="absolute right-0 top-0 rotate-90" />
                  <CornerOrnament className="absolute bottom-0 right-0 rotate-180" />
                  <CornerOrnament className="absolute bottom-0 left-0 -rotate-90" />

                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-royal-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-royal-400/30 text-royal-300 transition-all duration-500 group-hover:border-royal-300 group-hover:scale-110">
                      <Icon size={28} strokeWidth={1.2} />
                    </div>

                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-royal-300/70">
                      {event.date}
                    </p>

                    <h3 className="mt-4 font-display text-3xl text-gold-gradient sm:text-4xl">
                      {event.title}
                    </h3>

                    <div className="my-4 h-px w-16 bg-gradient-to-r from-transparent via-royal-400 to-transparent" />

                    <p className="font-display text-xl tracking-wide text-cream-200/90">
                      {event.time}
                    </p>

                    {'venue' in event && event.venue && (
                      <p className="mt-3 flex items-center justify-center gap-1.5 font-sans text-xs tracking-wide text-royal-300/70">
                        <MapPin size={13} strokeWidth={1.5} />
                        {event.venue as string}
                      </p>
                    )}

                    <p className="mt-5 line-clamp-2 max-w-xs font-sans text-sm leading-relaxed text-cream-300/60">
                      {event.description}
                    </p>

                    <span className="mt-6 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.25em] text-royal-300/60 transition-colors duration-300 group-hover:text-royal-200">
                      <BookOpen size={14} strokeWidth={1.5} />
                      Open Invitation
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gold-gradient transition-all duration-700 group-hover:w-full" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ——— Royal Book Popup ——— */}
      {active && (
        <div
          className="animate-overlay-fade fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} invitation`}
        >
          <div
            className="animate-scale-in relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-royal-400/40 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 p-1.5 shadow-[0_40px_120px_-20px_rgba(192,136,46,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner royal page — open-book spread */}
            <div className="relative rounded-xl border border-royal-400/25 bg-ink-950/90 px-6 py-8 sm:px-8">
              <CornerOrnament className="absolute left-1 top-1" />
              <CornerOrnament className="absolute right-1 top-1 rotate-90" />
              <CornerOrnament className="absolute bottom-1 right-1 rotate-180" />
              <CornerOrnament className="absolute bottom-1 left-1 -rotate-90" />

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close invitation"
                className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-royal-400/25 bg-ink-950 text-royal-300/70 transition-all duration-300 hover:rotate-90 hover:border-royal-300 hover:text-royal-100"
              >
                <X size={13} strokeWidth={1.5} />
              </button>

              <div className="grid gap-8 sm:grid-cols-2 sm:gap-0">
                {/* Left page — emblem + title */}
                <div className="flex flex-col items-center justify-center px-2 text-center sm:border-r sm:border-royal-400/20 sm:pr-8">
                  <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-royal-300/60">
                    With Divine Blessings
                  </p>

                  <div className="mt-5 flex h-20 w-20 items-center justify-center rounded-full border border-royal-400/40 bg-royal-500/10 text-royal-300 shadow-[0_0_40px_-8px_rgba(192,136,46,0.5)]">
                    <ActiveIcon size={34} strokeWidth={1.2} />
                  </div>

                  <h3 className="mt-5 font-display text-4xl text-gold-gradient sm:text-5xl">
                    {active.title}
                  </h3>

                  <Ornament className="mb-2 mt-6" />

                  <p className="font-display text-base italic leading-relaxed text-cream-200/75">
                    &ldquo;{active.description}&rdquo;
                  </p>
                </div>

                {/* Right page — details */}
                <div className="flex flex-col justify-center px-2 text-center sm:-ml-px sm:border-l sm:border-royal-400/20 sm:pl-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 rounded-xl border border-royal-400/15 bg-ink-900/50 px-5 py-3.5 text-left">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-royal-400/25 text-royal-300">
                        <CalendarDays size={17} strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="block font-sans text-[10px] uppercase tracking-[0.25em] text-cream-300/40">
                          Date
                        </span>
                        <span className="block font-display text-lg text-cream-100">
                          {active.date}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-royal-400/15 bg-ink-900/50 px-5 py-3.5 text-left">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-royal-400/25 text-royal-300">
                        <Clock size={17} strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="block font-sans text-[10px] uppercase tracking-[0.25em] text-cream-300/40">
                          Time
                        </span>
                        <span className="block font-display text-lg text-cream-100">
                          {active.time}
                        </span>
                      </span>
                    </div>

                    {'venue' in active && active.venue && (
                      <div className="flex items-center gap-4 rounded-xl border border-royal-400/15 bg-ink-900/50 px-5 py-3.5 text-left">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-royal-400/25 text-royal-300">
                          <MapPin size={17} strokeWidth={1.5} />
                        </span>
                        <span>
                          <span className="block font-sans text-[10px] uppercase tracking-[0.25em] text-cream-300/40">
                            Venue
                          </span>
                          <span className="block font-display text-lg text-cream-100">
                            {active.venue as string}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.3em] text-royal-300/60">
                    <Heart size={13} strokeWidth={1.5} fill="currentColor" />
                    We await your presence
                    <Heart size={13} strokeWidth={1.5} fill="currentColor" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="group relative mx-auto mt-6 flex items-center gap-3 overflow-hidden rounded-full border border-royal-400/30 px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-royal-300 transition-all duration-500 hover:border-royal-300 hover:text-royal-100"
                  >
                    <span className="relative z-10">Close</span>
                    <span className="absolute inset-0 translate-y-full bg-royal-500/10 transition-transform duration-500 group-hover:translate-y-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
