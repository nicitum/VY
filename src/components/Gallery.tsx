import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES } from '@/data/wedding';
import { Reveal, SectionLabel } from '@/components/Decorative';

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  // Close on Escape, arrows to move, lock scroll while enlarged
  useEffect(() => {
    if (selected === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight')
        setSelected((s) => (s === null ? s : (s + 1) % GALLERY_IMAGES.length));
      if (e.key === 'ArrowLeft')
        setSelected((s) =>
          s === null ? s : (s - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        );
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const active = selected !== null ? GALLERY_IMAGES[selected] : null;

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-radial-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel>Cherished Moments</SectionLabel>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="mt-8 text-center font-display text-4xl text-gold-gradient sm:text-6xl">
            A Glimpse of Our Story
          </h2>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-4 text-center font-sans text-xs uppercase tracking-[0.3em] text-cream-300/40">
            Tap any photo to view
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {GALLERY_IMAGES.map((image, idx) => (
            <Reveal key={idx} delay={300 + idx * 100}>
              <button
                type="button"
                onClick={() => setSelected(idx)}
                className="group relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-xl border border-royal-400/10 transition-all duration-500 hover:border-royal-400/30"
                aria-label={`Enlarge photo ${idx + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-[50%_35%] transition-transform duration-[2000ms] group-hover:scale-110"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ——— Enlarged photo view ——— */}
      {active && selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close photo"
            className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-royal-400/25 bg-ink-950 text-royal-300/70 transition-all duration-300 hover:rotate-90 hover:border-royal-300 hover:text-royal-100"
          >
            <X size={13} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
            }}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-royal-400/25 bg-ink-950/70 text-royal-300 transition-all duration-300 hover:border-royal-300 hover:text-royal-100 sm:left-6"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          <div
            className="relative max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-xl border border-royal-400/25 object-contain shadow-[0_40px_120px_-20px_rgba(192,136,46,0.4)]"
            />
            <div className="mt-3 flex items-center justify-center gap-3">
              <p className="font-sans text-xs tracking-wide text-cream-200/70">
                {active.alt}
              </p>
              <span className="font-sans text-xs text-royal-300/60">
                {selected + 1} / {GALLERY_IMAGES.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected + 1) % GALLERY_IMAGES.length);
            }}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-royal-400/25 bg-ink-950/70 text-royal-300 transition-all duration-300 hover:border-royal-300 hover:text-royal-100 sm:right-6"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </section>
  );
}
