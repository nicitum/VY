import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/917411443520?text=' +
  encodeURIComponent(
    'Hello Vishwas & Yashaswini! We would love to attend your wedding. 💛'
  );

export function FloatingButtons() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.7;

    let unlocked = false;
    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          unlocked = true;
          window.removeEventListener('pointerdown', tryPlay);
          window.removeEventListener('touchstart', tryPlay);
          window.removeEventListener('keydown', tryPlay);
        })
        .catch(() => {
          /* autoplay blocked — wait for first interaction */
        });
    };

    // Try immediately; browsers that block autoplay will start it
    // on the visitor's first tap / click / keypress instead.
    tryPlay();
    if (!unlocked) {
      window.addEventListener('pointerdown', tryPlay);
      window.addEventListener('touchstart', tryPlay);
      window.addEventListener('keydown', tryPlay);
    }

    // The "Open Invitation" tap in the Hero is a user gesture,
    // so music started from it is always allowed.
    window.addEventListener('wedding:start-music', tryPlay);

    return () => {
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      window.removeEventListener('wedding:start-music', tryPlay);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bgm.mp3" preload="auto" loop />

      {/* Fixed bottom-right stack — mobile friendly */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-green-400/40 bg-[#25D366] text-white shadow-[0_8px_25px_-5px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <MessageCircle size={22} strokeWidth={1.8} />
        </a>

        {/* Music pause / play */}
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={playing ? 'Pause music' : 'Play music'}
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border text-royal-200 shadow-[0_8px_25px_-5px_rgba(192,136,46,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 ${
            playing
              ? 'border-royal-300/60 bg-ink-900/90'
              : 'border-royal-400/30 bg-ink-900/90'
          }`}
        >
          {playing ? (
            <>
              <Volume2 size={20} strokeWidth={1.6} />
              {/* ripples while playing */}
              <span className="absolute inset-0 animate-ping rounded-full border border-royal-300/40 [animation-duration:2s]" />
            </>
          ) : (
            <VolumeX size={20} strokeWidth={1.6} />
          )}
        </button>
      </div>
    </>
  );
}
