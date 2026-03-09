import { forwardRef, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* Floating heart that drifts upward */
const FloatingHeart = forwardRef(function FloatingHeart({ style }, ref) {
  return (
    <span
      ref={ref}
      className="absolute select-none pointer-events-none"
      style={{ fontSize: style.size, left: style.left, top: style.top, opacity: 0, color: style.color }}
    >
      {style.symbol}
    </span>
  );
});

const HEARTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: `${Math.random() * 22 + 10}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  color: ['#FB5248', '#FFC945', '#FFB3B0', 'rgba(255,255,255,0.5)'][i % 4],
  symbol: ['♥', '❤', '✦', '♡', '✿'][i % 5],
  delay: Math.random() * 4,
  duration: Math.random() * 5 + 6,
}));

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const gateRef = useRef(null);
  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const heartIconRef = useRef(null);
  const heartRefs = useRef([]);

  /* Animate floating hearts */
  useEffect(() => {
    heartRefs.current.forEach((el, i) => {
      if (!el) return;
      const h = HEARTS[i];
      gsap.set(el, { y: 60, opacity: 0 });
      gsap.to(el, {
        y: -120,
        opacity: gsap.utils.random(0.15, 0.45),
        duration: h.duration,
        delay: h.delay,
        repeat: -1,
        yoyo: false,
        ease: 'none',
        onRepeat: () => gsap.set(el, { y: 60, opacity: 0 }),
      });
    });
  }, []);

  /* Card entrance */
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { scale: 0.82, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.5)', delay: 0.3 }
    );
    /* Heartbeat on icon */
    gsap.to(heartIconRef.current, {
      scale: 1.15,
      duration: 0.65,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.toLowerCase().replace(/\s/g, '') === 'iloveyou') {
      /* Correct — fade the whole gate out then notify parent */
      gsap.to(gateRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: onUnlock,
      });
    } else {
      /* Wrong — shake + error */
      setError(true);
      setShake(true);
      gsap.fromTo(
        cardRef.current,
        { x: -14 },
        {
          x: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
          onComplete: () => setShake(false),
        }
      );
      if (inputRef.current) {
        gsap.fromTo(inputRef.current, { borderColor: '#FF0000' }, { borderColor: 'rgba(251,82,72,0.5)', duration: 1.2 });
      }
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      ref={gateRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #000d18 0%, #001830 40%, #002040 70%, #000d18 100%)',
      }}
    >
      {/* Floating hearts background */}
      {HEARTS.map((h, i) => (
        <FloatingHeart
          key={h.id}
          style={h}
          ref={el => (heartRefs.current[i] = el)}
        />
      ))}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(193,18,31,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-md mx-4 rounded-3xl px-8 py-10 md:px-12 md:py-14"
        style={{
          background: 'linear-gradient(160deg, rgba(0,24,42,0.97) 0%, rgba(0,36,58,0.97) 60%, rgba(30,5,8,0.97) 100%)',
          border: '1px solid rgba(251,82,72,0.25)',
          boxShadow: '0 0 60px rgba(193,18,31,0.2), 0 24px 80px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(24px)',
          opacity: 0,
        }}
      >
        {/* Top decorative line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #FB5248, transparent)' }}
        />

        {/* Heart icon */}
        <div className="flex justify-center mb-6">
          <span
            ref={heartIconRef}
            className="inline-block text-5xl select-none"
            style={{ filter: 'drop-shadow(0 0 16px rgba(251,82,72,0.6))' }}
          >
            💝
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-center font-bold leading-tight mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
            background: 'linear-gradient(135deg, #ffffff 30%, #FFB3B0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Please say the three magical words
        </h1>
        <p
          className="text-center text-white/35 text-sm mb-8 tracking-wide"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          to open this for you ✨
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={e => { setValue(e.target.value); setError(false); }}
              placeholder="Type here..."
              autoComplete="off"
              className="w-full rounded-2xl px-5 py-4 text-center text-white text-lg tracking-[0.2em] outline-none transition-all duration-300"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${error ? 'rgba(255,60,60,0.7)' : 'rgba(251,82,72,0.3)'}`,
                boxShadow: error
                  ? '0 0 20px rgba(255,60,60,0.2)'
                  : '0 0 0px transparent',
                caretColor: '#FB5248',
              }}
              onFocus={e => {
                e.target.style.border = '1.5px solid rgba(251,82,72,0.8)';
                e.target.style.boxShadow = '0 0 24px rgba(251,82,72,0.18)';
              }}
              onBlur={e => {
                e.target.style.border = `1.5px solid ${error ? 'rgba(255,60,60,0.7)' : 'rgba(251,82,72,0.3)'}`;
                e.target.style.boxShadow = '0 0 0px transparent';
              }}
            />
          </div>

          {/* Error text */}
          <p
            className="text-center text-sm transition-all duration-300"
            style={{
              fontFamily: "'Lato', sans-serif",
              color: '#FF6B6B',
              opacity: error ? 1 : 0,
              height: '20px',
            }}
          >
            Hmm, that doesn't sound right... 🥺
          </p>

          <button
            type="submit"
            className="w-full rounded-2xl py-4 font-bold text-white text-base tracking-wider transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              fontFamily: "'Lato', sans-serif",
              background: 'linear-gradient(135deg, #C1121F, #FB5248)',
              boxShadow: '0 8px 30px rgba(193,18,31,0.45)',
            }}
          >
            Open ♥
          </button>
        </form>

        {/* Bottom hint */}
        <p
          className="text-center text-white/20 text-xs mt-6 tracking-widest uppercase"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Only you know the answer
        </p>

        {/* Bottom decorative line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(251,82,72,0.4), transparent)' }}
        />
      </div>
    </div>
  );
}
