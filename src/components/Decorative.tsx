import { useEffect, useRef, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-royal-400/50" />
      <svg
        width="30"
        height="60"
        viewBox="0 0 30 60"
        fill="none"
        className="text-royal-400"
      >
        <path d="M15 0 L15 60" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <path
          d="M15 8 C 8 14, 8 24, 15 28 C 22 24, 22 14, 15 8 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M15 28 C 8 34, 8 44, 15 52 C 22 44, 22 34, 15 28 Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-royal-400/50" />
    </div>
  );
}

export function CornerOrnament({ className = '' }: { className?: string }) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 40 40"
      fill="none"
      className={`text-royal-400/30 ${className}`}
    >
      <path d="M0 0 L40 0 M0 0 L0 40 M0 0 L20 20" stroke="currentColor" strokeWidth="0.5" />
      <path
        d="M20 4 C 14 8, 14 14, 20 16 C 26 14, 26 8, 20 4 Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M20 16 C 14 20, 14 26, 20 32 C 26 26, 26 20, 20 16 Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Ornament />
      <p className="font-sans text-xs uppercase tracking-[0.4em] text-royal-300/70">
        {children}
      </p>
    </div>
  );
}
