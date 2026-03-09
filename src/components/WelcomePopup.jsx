import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* The full poem — split into lines, each line into words */
const LINES = [
  'Darmal parivaar ki hone wali Raani…',
  'Raajmata Reena Mishra ji ki laadli beti…',
  '',
  'Woh jiske ek muskaan par dil dhadakna bhool jaaye,',
  'Jiski ek jhalak par duniya use apna crush maan baithe.',
  '',
  'Masoomiyat aisi jaise subah ki pehli kiran,',
  'Aur khubsurti aisi ki chand bhi sharma kar baadalon ke peeche chhup jaaye.',
  '',
  'Cuteness ki woh devi,',
  'Jiski adaayein dil ko apne jaadu mein baandh leti hain,',
  'Jiski aankhon mein ek alag hi kahaani hai,',
  'Aur jiske chehre ki chamak se mehfil roshan ho jaaye.',
  '',
  'Sundarta se bhi badhkar sundar,',
  'Aur pyaar se bhari ek pyaari si duniya…',
  '',
  '✨ Woh hai… Srishti Mishra.',
];

const IMAGE_URL = 'https://lh3.googleusercontent.com/d/1QzS4sFmp3JXtptW1-oggaoCshqdc0IrE';

/* Beating heart floating in background */
function Heart({ style }) {
  return (
    <span
      className="absolute select-none pointer-events-none"
      style={style}
    >
      ♥
    </span>
  );
}

const BG_HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  fontSize: `${14 + (i % 4) * 8}px`,
  color: ['rgba(251,82,72,0.25)', 'rgba(255,185,185,0.18)', 'rgba(255,201,69,0.2)'][i % 3],
  left: `${(i * 8.3) % 100}%`,
  top: `${(i * 13 + 5) % 95}%`,
  animationDelay: `${i * 0.4}s`,
  animation: `floatHeart ${4 + (i % 3)}s ease-in-out infinite alternate`,
}));

export default function WelcomePopup({ onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const cursorRef = useRef(null);
  const [showImage, setShowImage] = useState(false);

  /* Type the poem word by word */
  useEffect(() => {
    const fullText = LINES.join('\n');
    const words = fullText.split(/(\s+)/); // preserve spaces/newlines
    let current = '';
    const el = textRef.current;
    if (!el) return;

    // Blinking cursor
    const cursorTl = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.45,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= words.length) {
        clearInterval(interval);
        cursorTl.kill();
        gsap.set(cursorRef.current, { opacity: 0 });
        // Show image
        setTimeout(() => {
          setShowImage(true);
        }, 300);
        return;
      }
      current += words[idx];
      // Render with line breaks preserved
      el.innerHTML = current
        .split('\n')
        .map(line => `<span>${line || '&nbsp;'}</span>`)
        .join('<br/>');
      idx++;
    }, 38); // ~38ms per word/token = fast typing feel

    return () => {
      clearInterval(interval);
      cursorTl.kill();
    };
  }, []);

  /* Fade in image once showImage flips */
  useEffect(() => {
    if (showImage && imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.88, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)' }
      );
    }
  }, [showImage]);

  /* Card entrance */
  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      cardRef.current,
      { scale: 0.78, opacity: 0, y: 48 },
      { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.6)', delay: 0.15 }
    );
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <>
      {/* Keyframes for floating hearts */}
      <style>{`
        @keyframes floatHeart {
          0%   { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-18px) scale(1.12); }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.18); }
        }
        @keyframes slowBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.15; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 8, 18, 0.88)',
          backdropFilter: 'blur(6px)',
          opacity: 0,
        }}
        onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
      >
        {/* Background floating hearts */}
        {BG_HEARTS.map(h => (
          <Heart key={h.id} style={h} />
        ))}

        {/* Card */}
        <div
          ref={cardRef}
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(0,18,34,0.98) 0%, rgba(0,30,52,0.98) 55%, rgba(35,6,10,0.98) 100%)',
            border: '1px solid rgba(251,82,72,0.3)',
            boxShadow: '0 0 80px rgba(193,18,31,0.25), 0 32px 100px rgba(0,0,0,0.8)',
            opacity: 0,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #FB5248 50%, transparent 100%)' }}
          />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white transition-colors duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', fontSize: '16px' }}
          >
            ✕
          </button>

          {/* Header */}
          <div className="pt-10 pb-4 px-12 text-center">
            {/* Animated hearts row */}
            <div className="flex justify-center gap-3 mb-3">
              {['♥', '❤', '♥'].map((h, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: i === 1 ? '28px' : '18px',
                    color: i === 1 ? '#FB5248' : 'rgba(251,82,72,0.5)',
                    animation: `heartPulse ${1.2 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                    display: 'inline-block',
                    filter: i === 1 ? 'drop-shadow(0 0 10px rgba(251,82,72,0.7))' : 'none',
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #FB5248 0%, #FFC945 60%, #FFB3B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'slowBlink 1.4s cubic-bezier(0.45, 0, 0.55, 1) infinite',
                display: 'inline-block',
              }}
            >
              Happy Birthday My Queen 👑
            </p>
          </div>

          {/* Poem text */}
          <div className="px-12 pb-2">
            <div
              className="rounded-2xl p-7"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(251,82,72,0.1)',
              }}
            >
              {/* Opening quote */}
              <span
                className="block text-4xl leading-none mb-1 select-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: 'rgba(251,82,72,0.2)',
                }}
              >"</span>

              <p
                ref={textRef}
                className="leading-8 min-h-[14rem]"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '1.15rem',
                  color: 'rgba(255,255,255,0.82)',
                  whiteSpace: 'pre-wrap',
                }}
              />

              {/* Blinking cursor */}
              <span
                ref={cursorRef}
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.1em',
                  background: '#FB5248',
                  borderRadius: '1px',
                  verticalAlign: 'text-bottom',
                  marginLeft: '2px',
                }}
              />
            </div>
          </div>

          {/* Image — fades in after typing */}
          {showImage && (
            <div ref={imgRef} className="px-12 pt-4 pb-10" style={{ opacity: 0 }}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '2px solid rgba(251,82,72,0.35)',
                  boxShadow: '0 0 40px rgba(193,18,31,0.3), 0 12px 40px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src={IMAGE_URL}
                  alt="My love"
                  className="w-full h-auto block"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Heart row below image */}
              <div className="flex justify-center gap-2 mt-5">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: i === 2 ? '22px' : '14px',
                      color: i === 2 ? '#FB5248' : 'rgba(251,82,72,0.45)',
                      animation: `heartPulse ${1 + i * 0.15}s ease-in-out infinite`,
                      animationDelay: `${i * 0.12}s`,
                      display: 'inline-block',
                      filter: i === 2 ? 'drop-shadow(0 0 8px rgba(251,82,72,0.8))' : 'none',
                    }}
                  >
                    ♥
                  </span>
                ))}
              </div>

              <p
                className="text-center mt-3 text-sm italic"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: 'linear-gradient(135deg, #FB5248, #FFC945)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '2rem',
                }}
              >
                Meri Jaan ❤️
              </p>
            </div>
          )}

          {/* Bottom shimmer line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(251,82,72,0.4) 50%, transparent 100%)' }}
          />
        </div>
      </div>
    </>
  );
}
