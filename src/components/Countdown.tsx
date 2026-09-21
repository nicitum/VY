import { useState, useEffect } from 'react';
import { WEDDING_DATE } from '@/data/wedding';
import { Reveal, SectionLabel } from '@/components/Decorative';

function useCountdown(target: string) {
  const calc = () => {
    const diff = Math.max(0, new Date(target).getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return time;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, '0');
  return (
    <div className="group relative flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-royal-400/20 bg-ink-900/40 backdrop-blur-sm transition-all duration-500 hover:border-royal-400/40 hover:bg-ink-900/60 sm:h-28 sm:w-28">
        <div className="absolute -top-8 -right-8 h-16 w-16 rounded-full bg-royal-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
        <span className="font-display text-3xl text-gold-gradient sm:text-5xl tabular-nums">
          {padded}
        </span>
        <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gold-gradient transition-all duration-700 group-hover:w-full" />
      </div>
      <span className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-cream-300/50 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const time = useCountdown(WEDDING_DATE);

  return (
    <section className="relative overflow-hidden bg-royal-gradient py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-radial-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <SectionLabel>Save the Date</SectionLabel>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="mt-8 font-display text-3xl text-gold-gradient sm:text-5xl">
            Until we say &ldquo;I do&rdquo;
          </h2>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-4 font-sans text-sm uppercase tracking-[0.3em] text-cream-300/50">
            The Celebration Begins In
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-12 flex items-center justify-center gap-4 sm:gap-8">
            <TimeUnit value={time.days} label="Days" />
            <span className="font-display text-2xl text-royal-400/30 sm:text-4xl">:</span>
            <TimeUnit value={time.hours} label="Hours" />
            <span className="font-display text-2xl text-royal-400/30 sm:text-4xl">:</span>
            <TimeUnit value={time.minutes} label="Minutes" />
            <span className="font-display text-2xl text-royal-400/30 sm:text-4xl">:</span>
            <TimeUnit value={time.seconds} label="Seconds" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
