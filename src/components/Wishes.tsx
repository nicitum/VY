import { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Reveal, SectionLabel, Ornament } from '@/components/Decorative';

const WHATSAPP_NUMBER = '917411443520';
const STORAGE_KEY = 'wedding-wishes-local';

interface Wish {
  name: string;
  message: string;
  attending: string;
  created_at: string;
}

function loadWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Wish[]) : [];
  } catch {
    return [];
  }
}

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attending] = useState('yes');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setWishes(loadWishes());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const wish: Wish = {
      name: name.trim(),
      message: message.trim(),
      attending,
      created_at: new Date().toISOString(),
    };

    // Keep a local wall of blessings on this device
    const updated = [wish, ...loadWishes()].slice(0, 24);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      /* storage unavailable — still send via WhatsApp */
    }
    setWishes(updated);

    // Redirect to WhatsApp with the guest's details prefilled
    const text =
      `Hello Vishwas & Yashaswini! \u{1F49B}\n\n` +
      `Name: ${wish.name}\n` +
      `Wishes: ${wish.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank'
    );

    setSent(true);
    setName('');
    setMessage('');
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-radial-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>Share Your Blessings</SectionLabel>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="mt-8 text-center font-display text-4xl text-gold-gradient sm:text-6xl">
            Leave Your Wishes
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-4 text-center font-sans text-sm text-cream-300/60">
            Write a heartfelt message for Vishwas & Yashaswini — it will open
            in WhatsApp to send to the family
          </p>
        </Reveal>

        {/* Form */}
        <Reveal delay={400}>
          <form
            onSubmit={handleSubmit}
            className="mt-12 rounded-2xl border border-royal-400/15 bg-ink-900/40 p-6 backdrop-blur-sm sm:p-10"
          >
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-green-400">
                  <CheckCircle2 size={32} strokeWidth={1.5} />
                </div>
                <p className="font-display text-2xl text-gold-gradient">
                  Opening WhatsApp with your blessing… thank you!
                </p>
                <p className="font-sans text-sm text-cream-300/50">
                  Just press send in WhatsApp to deliver it with love.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="mb-2 block font-sans text-xs uppercase tracking-[0.2em] text-royal-300/70">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-royal-400/20 bg-ink-950/50 px-4 py-3 font-sans text-sm text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-royal-400/50 focus:bg-ink-950/70"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-sans text-xs uppercase tracking-[0.2em] text-royal-300/70">
                    Your Wishes
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your heartfelt wishes..."
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl border border-royal-400/20 bg-ink-950/50 px-4 py-3 font-sans text-sm text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-royal-400/50 focus:bg-ink-950/70"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative mx-auto flex items-center gap-3 overflow-hidden rounded-full border border-royal-400/30 px-8 py-3.5 font-sans text-xs uppercase tracking-[0.3em] text-royal-300 transition-all duration-500 hover:border-royal-300 hover:text-royal-100"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Send via WhatsApp
                    <Send size={14} strokeWidth={1.5} />
                  </span>
                  <div className="absolute inset-0 bg-royal-500/10 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                </button>
              </div>
            )}
          </form>
        </Reveal>

        {/* Blessings wall (saved on this device) */}
        {wishes.length > 0 && (
          <Reveal delay={500}>
            <div className="mt-16">
              <Ornament className="mb-8" />
              <h3 className="text-center font-display text-2xl text-cream-200/80 sm:text-3xl">
                Blessings from our loved ones
              </h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {wishes.map((wish, idx) => (
                  <div
                    key={`${wish.created_at}-${idx}`}
                    className="group rounded-xl border border-royal-400/10 bg-ink-900/30 p-5 transition-all duration-500 hover:border-royal-400/25 hover:bg-ink-900/50"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg text-gold-gradient">
                        {wish.name}
                      </p>
                    </div>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-cream-200/70">
                      {wish.message}
                    </p>
                    <p className="mt-3 font-sans text-[10px] uppercase tracking-wider text-cream-300/30">
                      {new Date(wish.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
