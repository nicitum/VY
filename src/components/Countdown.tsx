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
    <div className="group relative flex min-w-0 flex-col items-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-royal-400/20 bg-ink-900/40 backdrop-blur-sm transition-all duration-500 hover:border-royal-400/40 hover:bg-ink-900/60 min-[400px]:h-20 min-[400px]:w-20 sm:h-28 sm:w-28 sm:rounded-2xl">
        <div className="absolute -top-8 -right-8 h-16 w-16 rounded-full bg-royal-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
        <span className="font-display text-2xl text-gold-gradient tabular-nums min-[400px]:text-3xl sm:text-5xl">
          {padded}
        </span>
        <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gold-gradient transition-all duration-700 group-hover:w-full" />
      </div>
      <span className="mt-2.5 font-sans text-[9px] uppercase tracking-[0.2em] text-cream-300/50 min-[400px]:text-[10px] sm:mt-4 sm:text-xs sm:tracking-[0.3em]">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="hidden select-none pt-[18px] font-display text-2xl leading-none text-royal-400/30 min-[420px]:block sm:pt-[28px] sm:text-4xl"
    >
      :
    </span>
  );
}

export function Countdown() {
  const time = useCountdown(WEDDING_DATE);

  return (
    <section className="relative overflow-hidden bg-royal-gradient py-16 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 bg-radial-gold sm:h-[600px] sm:w-[600px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center min-[400px]:px-6">
        <Reveal>
          <SectionLabel>Save the Date</SectionLabel>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="mt-6 font-display text-[28px] leading-tight text-gold-gradient min-[400px]:text-3xl sm:mt-8 sm:text-5xl">
            Until we say &ldquo;I do&rdquo;
          </h2>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.22em] text-cream-300/50 sm:mt-4 sm:text-sm sm:tracking-[0.3em]">
            The Celebration Begins In
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-8 flex items-start justify-center gap-2 min-[400px]:gap-2.5 sm:mt-12 sm:gap-8">
            <TimeUnit value={time.days} label="Days" />
            <Separator />
            <TimeUnit value={time.hours} label="Hours" />
            <Separator />
            <TimeUnit value={time.minutes} label="Minutes" />
            <Separator />
            <TimeUnit value={time.seconds} label="Seconds" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
