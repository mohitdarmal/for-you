import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionReveal } from '../hooks/useGSAPAnimations';


gsap.registerPlugin(ScrollTrigger);

/* Confetti particle */
function Particle({ x, y, color, shape }) {
  const isRect = shape === 'rect';
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: isRect ? '10px' : '8px',
        height: isRect ? '5px' : '8px',
        borderRadius: isRect ? '2px' : '50%',
        background: color,
        transform: 'scale(0)',
      }}
    />
  );
}

/* The famous "will you be mine?" choice buttons */
const NO_TEXTS = [
  'No...',
  'What. 😐',
  'Why 🤨',
  'I thought you loved me 😢',
  'No way, aise toh picha n chutega 😤',
];

function ChoiceButtons() {
  const [answer, setAnswer] = useState(null);
  const noRef = useRef(null);
  const playgroundRef = useRef(null);
  const confettiRef = useRef(null);
  const messageRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const hoverCount = useRef(0);

  const handleYes = () => {
    // Flash "pta tha pyar toh hai" on the No button before it disappears
    if (noRef.current) {
      gsap.to(noRef.current, { x: 0, y: 0, duration: 0.2 });
      noRef.current.textContent = 'pta tha pyar toh hai 😏';
      gsap.fromTo(noRef.current, { scale: 0.8, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' });
    }
    setTimeout(() => setAnswer('yes'), 900);
    if (confettiRef.current) {
      const els = confettiRef.current.querySelectorAll('div');
      // First burst immediately
      gsap.fromTo(
        els,
        { scale: 0, x: 0, y: 0, rotation: 0, opacity: 1 },
        {
          scale: () => gsap.utils.random(0.8, 1.6),
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-250, 50),
          rotation: () => gsap.utils.random(-360, 360),
          opacity: 0,
          duration: () => gsap.utils.random(1, 1.8),
          stagger: { amount: 0.3, from: 'random' },
          ease: 'power3.out',
        }
      );
      // Second burst after 900ms (when message appears)
      setTimeout(() => {
        if (!confettiRef.current) return;
        const els2 = confettiRef.current.querySelectorAll('div');
        gsap.fromTo(
          els2,
          { scale: 0, x: 0, y: 0, rotation: 0, opacity: 1 },
          {
            scale: () => gsap.utils.random(0.8, 1.6),
            x: () => gsap.utils.random(-220, 220),
            y: () => gsap.utils.random(-300, 80),
            rotation: () => gsap.utils.random(-360, 360),
            opacity: 0,
            duration: () => gsap.utils.random(1.2, 2),
            stagger: { amount: 0.4, from: 'random' },
            ease: 'power2.out',
          }
        );
      }, 900);
    }
  };

  // Animate message in after it mounts (when answer flips to 'yes')
  useEffect(() => {
    if (answer === 'yes' && messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)' }
      );
    }
    // Reset No button position when answer resets
    if (!answer && noRef.current) gsap.set(noRef.current, { x: 0, y: 0 });
    lastPos.current = { x: 0, y: 0 };
    hoverCount.current = 0;
  }, [answer]);

  const handleNoHover = () => {
    if (answer) return;
    const btn = noRef.current;
    if (!btn) return;

    // Advance text on each hover (cap at last entry)
    hoverCount.current = Math.min(hoverCount.current + 1, NO_TEXTS.length - 1);
    const newText = NO_TEXTS[hoverCount.current];

    // Flash the text change with a quick scale pop
    gsap.fromTo(btn, { scale: 0.85 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
    btn.textContent = newText;

    const RANGE = 100;
    let nx, ny, attempts = 0;
    do {
      nx = Math.round((Math.random() * 2 - 1) * RANGE);
      ny = Math.round((Math.random() * 2 - 1) * RANGE);
      attempts++;
    } while (
      attempts < 12 &&
      Math.abs(nx - lastPos.current.x) < 80 &&
      Math.abs(ny - lastPos.current.y) < 40
    );

    lastPos.current = { x: nx, y: ny };
    gsap.to(btn, { x: nx, y: ny, duration: 0.32, ease: 'power3.out' });
  };

  const COLORS = ['#FB5248', '#FFC945', '#FFB3B0', '#fff', '#C1121F', '#FF85A1', '#FFD700'];
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: `${gsap.utils.random(5, 95)}%`,
    y: `${gsap.utils.random(5, 95)}%`,
    color: COLORS[i % COLORS.length],
    shape: i % 3 === 0 ? 'rect' : 'circle',
  }));

  return (
    <div className="relative flex flex-col items-center gap-8">
      <h3
        className="font-display text-3xl md:text-4xl font-bold text-white text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Will you be{' '}
        <em className="text-gradient not-italic">mine forever?</em>
      </h3>

      {!answer ? (
        <div className="flex flex-row items-center justify-center gap-4">
          {/* YES */}
          <button
            onClick={handleYes}
            onMouseEnter={() => {
              if (noRef.current) {
                gsap.to(noRef.current, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
                lastPos.current = { x: 0, y: 0 };
              }
            }}
            className="relative px-10 py-4 rounded-full font-body font-bold text-white text-lg tracking-wider overflow-hidden transition-transform duration-200 hover:scale-105 shrink-0"
            style={{
              background: 'linear-gradient(135deg, #C1121F, #FB5248)',
              boxShadow: '0 8px 30px rgba(193,18,31,0.5)',
              fontFamily: "'Lato', sans-serif",
            }}
          >
            YES! 💖
          </button>

          {/* Anchor div — overflow visible so button can move 200px in any direction */}
          <div
            ref={playgroundRef}
            className="shrink-0"
            style={{ overflow: 'visible' }}
          >
            <button
              ref={noRef}
              onMouseEnter={handleNoHover}
              className="block px-10 py-4 rounded-full font-body font-bold text-white/40 text-lg tracking-wider border border-white/15 select-none"
              style={{ fontFamily: "'Lato', sans-serif", cursor: 'default', position: 'relative', zIndex: 50 }}
            >
              {NO_TEXTS[0]}
            </button>
          </div>
        </div>
      ) : (
        <div
          ref={messageRef}
          className="text-center"
          style={{ opacity: 0 }}
        >
          {/* <div className="text-6xl mb-4 heart-beat inline-block">❤️</div> */}
          <p
            className="font-display italic text-2xl md:text-3xl text-gradient"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            You have unlocked happiness in my life forever. ❤️
          </p>
        </div>
      )}

      {/* Confetti container */}
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none overflow-visible">
        {particles.map(p => (
          <Particle key={p.id} x={p.x} y={p.y} color={p.color} shape={p.shape} />
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const sectionRef = useSectionReveal(0.15, 45);
  const bigHeartRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bigHeartRef.current) {
        gsap.fromTo(
          bigHeartRef.current,
          { scale: 0.5, opacity: 0, rotation: -20 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: bigHeartRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // continuous gentle pulse
        gsap.to(bigHeartRef.current, {
          scale: 1.07,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Quote Section */}
      <section
        id="say-yes"
        ref={sectionRef}
        className="relative py-24 md:py-36 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #001830 0%, #002235 50%, #001522 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          {/* Divider */}
          <div className="divider-rose mb-16 mx-auto w-3/4" />

          {/* Big heart */}
          <div className="text-center mb-12">
            <span
              ref={bigHeartRef}
              className="inline-block text-8xl md:text-9xl select-none"
              style={{ opacity: 0 }}
            >
              ❤️
            </span>
          </div>

          {/* Testimonial style quote */}
         

          {/* Interactive section */}
          <div data-animate className="mb-16">
            <ChoiceButtons />
          </div>

          {/* Final message */}
          <div data-animate className="text-center">
            <h2
              className="font-display text-4xl md:text-6xl font-bold mb-6 text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Forever{' '}
              <span className="text-gradient">Yours</span>
            </h2>
            <p
              className="font-body text-white/50 text-lg max-w-lg mx-auto mb-10"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Always reachable — in your heart.
            </p>

            <div
              className="inline-flex flex-col items-center gap-2 text-sm font-body text-white/30"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <span>💌 mylove@forever.com</span>
              <span>📍 In Your Heart</span>
            </div>
          </div>

          {/* Divider */}
          <div className="divider-rose mt-16 mx-auto w-3/4" />
        </div>
      </section>

      {/* Footer bar */}
      <footer
        className="py-8 text-center"
        style={{
          background: '#000e18',
          borderTop: '1px solid rgba(251,82,72,0.15)',
        }}
      >
        <p
          className="font-body text-white/30 text-sm tracking-wide"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Everything written here{' '}
          <span style={{ color: '#FB5248' }}>❤️</span>
          {' '} comes straight from my heart.
        </p>
        <p
          className="font-body text-white/30 text-xs mt-2"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          @Copyright till the end of my life. All rights reserved by Mohit only.
        </p>
      </footer>
    </>
  );
}
