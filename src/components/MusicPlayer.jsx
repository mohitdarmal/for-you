import { useEffect, useRef, useState } from 'react';

const SONG_BG =
  '/songs/Aaj Se Teri - Lyrical _ Padman _ Akshay Kumar & Radhika Apte _ Arijit Singh _ Amit Trivedi.mp3';

// Module-level singleton — survives React StrictMode double-invoke
let _audio = null;
function getAudio() {
  if (!_audio) {
    _audio = new Audio(SONG_BG);
    _audio.loop = true;
    _audio.volume = 0.55;
  }
  return _audio;
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const removeListenerRef = useRef(null);

  useEffect(() => {
    const bg = getAudio();

    const removeListeners = () => {
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
    };

    const startOnInteraction = () => {
      removeListeners(); // prevent double-fire with togglePlay
      bg.play().then(() => setPlaying(true)).catch(() => {});
    };

    removeListenerRef.current = removeListeners;

    bg.play().then(() => setPlaying(true)).catch(() => {
      document.addEventListener('click', startOnInteraction);
      document.addEventListener('keydown', startOnInteraction);
      document.addEventListener('touchstart', startOnInteraction, { passive: true });
    });

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    const bg = getAudio();
    // Remove auto-start listener so it doesn't fight with manual control
    if (removeListenerRef.current) removeListenerRef.current();

    if (playing) {
      bg.pause();
      setPlaying(false);
    } else {
      bg.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <button
        onClick={togglePlay}
        title={playing ? 'Pause music' : 'Play music'}
        className="w-11 h-11 flex items-center justify-center rounded-full text-base transition-all duration-300 hover:scale-110"
        style={{
          background: 'rgba(0,21,34,0.85)',
          border: '1px solid rgba(251,82,72,0.45)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {playing ? '⏸' : '▶'}
      </button>

      {/* Now Playing */}
      <div
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
        style={{
          background: 'rgba(0,21,34,0.82)',
          border: '1px solid rgba(251,82,72,0.2)',
          backdropFilter: 'blur(12px)',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: "'Lato', sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        <span className="flex gap-0.5 items-end shrink-0" style={{ height: '14px' }}>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                width: '3px',
                borderRadius: '2px',
                background: '#FB5248',
                animation: playing
                  ? `eq${i} ${0.5 + i * 0.15}s ease-in-out infinite alternate`
                  : 'none',
                height: `${4 + i * 3}px`,
              }}
            />
          ))}
        </span>
        <span>Aaj Se Teri</span>
      </div>

      <style>{`
        @keyframes eq1 { 0%{height:4px}  100%{height:12px} }
        @keyframes eq2 { 0%{height:8px}  100%{height:4px}  }
        @keyframes eq3 { 0%{height:5px}  100%{height:14px} }
      `}</style>
    </div>
  );
}
