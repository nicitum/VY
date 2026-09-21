import { useState, useEffect } from 'react';
import { RefreshCw, Trash2, Lock, Heart, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Ornament } from '@/components/Decorative';

const PASSCODE =
  (import.meta.env.VITE_WISHES_PASSCODE as string | undefined) || 'vy2026';

interface Wish {
  id: string;
  name: string;
  message: string;
  attending: string;
  created_at: string;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function WishesAdmin() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('wishes-admin') === '1'
  );
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function fetchWishes() {
    setLoading(true);
    setError(null);
    if (!supabase) {
      setError('Supabase is not connected — add the env keys and redeploy.');
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('wedding_wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError('Could not load wishes: ' + error.message);
    } else {
      setWishes((data as Wish[]) || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (unlocked) fetchWishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete wish from "${name}"?`)) return;
    if (!supabase) {
      alert('Supabase is not connected — add the env keys and redeploy.');
      return;
    }
    setDeleting(id);
    const { error } = await supabase.from('wedding_wishes').delete().eq('id', id);
    if (error) {
      alert('Delete failed: ' + error.message);
    } else {
      setWishes((prev) => prev.filter((w) => w.id !== id));
    }
    setDeleting(null);
  }

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (code === PASSCODE) {
      sessionStorage.setItem('wishes-admin', '1');
      setUnlocked(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  }

  // ——— Passcode gate ———
  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6">
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-sm rounded-2xl border border-royal-400/20 bg-ink-900/50 p-8 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-royal-400/30 text-royal-300">
            <Lock size={22} strokeWidth={1.5} />
          </div>
          <h1 className="mt-5 font-display text-3xl text-gold-gradient">
            Family Only
          </h1>
          <p className="mt-2 font-sans text-sm text-cream-300/60">
            Enter the passcode to view all wishes
          </p>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Passcode"
            className="mt-6 w-full rounded-xl border border-royal-400/20 bg-ink-950/60 px-4 py-3 text-center font-sans text-sm text-cream-100 placeholder-cream-300/30 outline-none focus:border-royal-400/50"
          />
          {codeError && (
            <p className="mt-3 font-sans text-sm text-maroon-400">
              Wrong passcode, try again.
            </p>
          )}
          <button
            type="submit"
            className="mt-5 w-full rounded-full border border-royal-400/30 px-6 py-3 font-sans text-xs uppercase tracking-[0.3em] text-royal-300 transition-all duration-300 hover:border-royal-300 hover:text-royal-100"
          >
            Unlock
          </button>
          <a
            href="/"
            className="mt-4 inline-block font-sans text-xs text-cream-300/40 hover:text-cream-200"
          >
            ← Back to invitation
          </a>
        </form>
      </div>
    );
  }

  // ——— Backend data view ———
  return (
    <div className="min-h-screen bg-ink-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Ornament className="mb-6" />
          <h1 className="font-display text-4xl text-gold-gradient sm:text-5xl">
            All Wishes
          </h1>
          <p className="mt-3 font-sans text-sm text-cream-300/60">
            Live from Supabase backend ·{' '}
            <span className="text-royal-300">{wishes.length} blessing(s)</span>
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={fetchWishes}
              disabled={loading}
              className="flex items-center gap-2 rounded-full border border-royal-400/30 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-royal-300 transition-all duration-300 hover:border-royal-300 hover:text-royal-100 disabled:opacity-50"
            >
              <RefreshCw size={14} strokeWidth={1.5} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            <a
              href="/"
              className="flex items-center gap-2 rounded-full border border-royal-400/20 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-cream-300/60 transition-all duration-300 hover:border-royal-400/40 hover:text-cream-200"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Invitation
            </a>
          </div>
        </div>

        {error && (
          <p className="mt-8 rounded-xl border border-maroon-500/30 bg-maroon-500/10 p-4 text-center font-sans text-sm text-maroon-300">
            {error}
          </p>
        )}

        {!loading && !error && wishes.length === 0 && (
          <p className="mt-12 text-center font-display text-2xl text-cream-300/50">
            No wishes yet — share the invitation!
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="rounded-xl border border-royal-400/15 bg-ink-900/40 p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-display text-xl text-gold-gradient">
                    <Heart size={15} strokeWidth={1.5} fill="currentColor" className="text-royal-400" />
                    {wish.name}
                  </p>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-wider text-cream-300/35">
                    {formatDate(wish.created_at)} ·{' '}
                    {wish.attending === 'yes' ? 'Attending' : "Can't attend"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(wish.id, wish.name)}
                  disabled={deleting === wish.id}
                  aria-label={`Delete wish from ${wish.name}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon-500/25 text-maroon-300/70 transition-all duration-300 hover:border-maroon-400 hover:text-maroon-300 disabled:opacity-50"
                >
                  <Trash2 size={15} strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-cream-200/80">
                {wish.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
