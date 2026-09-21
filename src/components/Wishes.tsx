import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Reveal, SectionLabel } from '@/components/Decorative';

interface Wish {
  name: string;
  message: string;
  attending: string;
  created_at: string;
}

export function Wishes() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attending] = useState('yes');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim() || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    if (!supabase) {
      setSubmitError('Wishes service is not connected yet. Please try again later.');
      setSubmitting(false);
      return;
    }

    const wish: Wish = {
      name: name.trim(),
      message: message.trim(),
      attending,
      created_at: new Date().toISOString(),
    };

    // Save to Supabase backend
    const { error } = await supabase.from('wedding_wishes').insert({
      name: wish.name,
      message: wish.message,
      attending: wish.attending,
    });

    if (error) {
      setSubmitError('Could not save your wish. Please check connection and try again.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
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
            Write a heartfelt message for Vishwas & Yashaswini
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
                  Your blessing has been sent with love. Thank you!
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

                {submitError && (
                  <p className="text-center font-sans text-sm text-maroon-400">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative mx-auto flex items-center gap-3 overflow-hidden rounded-full border border-royal-400/30 px-8 py-3.5 font-sans text-xs uppercase tracking-[0.3em] text-royal-300 transition-all duration-500 hover:border-royal-300 hover:text-royal-100 disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {submitting ? 'Sending...' : 'Send Wishes'}
                    {!submitting && <Send size={14} strokeWidth={1.5} />}
                  </span>
                  <div className="absolute inset-0 bg-royal-500/10 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
