import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionReveal } from '../hooks/useGSAPAnimations';


gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: '👁️',
    title: 'Your Eyes',
    desc: 'Sach mein, bahut pyaari hain. I truly love them, cutuuuu. Jiske pyar aur gusse mai aankhe hamesha khubsurat lge — Uffffffffff.',
  },
  {
    icon: '🥰',
    title: 'Your Cheeks',
    desc: 'The second most lovable thing about you — your golu-molu cheeks. Seriously, kha jaaun inhe toh main.',
  },
  {
    icon: '💋',
    title: 'Your Lips',
    desc: 'Now I finally understand ki ye song aaya kha se — "Honth raseele tere honth raseele." Yours are exactly like that.',
  },
  {
    icon: '😊',
    title: 'Your Smile',
    desc: 'It\'s a perfect 100. The number of people you\'ve killed with that beautiful smile.',
  },
  {
    icon: '💇‍♀️',
    title: 'Your Hair',
    desc: 'I\'m actually hurt that you\'re not in Clinic Plus shampoo advertisement yet. Itne lambe aur ghane baal wo bhi kamar tak… seriously beautiful.',
  },
  {
    icon: '🕊️',
    title: 'Your Kindness',
    desc: 'You are proof that Satyug still exists. You are like Sita — pure, kind, and my Laxmi.',
  },
  {
    icon: '🏠',
    title: 'Your Caring Nature',
    desc: 'Only one thing I can say — ghar chalane wali ladki.',
  },
  {
    icon: '🪷',
    title: 'Your Feet',
    desc: 'Even in modern times, I\'d still say — Laxmi ji ke kadam padne wale hain mere ghar mein.',
  },
  {
    icon: '🎵',
    title: 'Your Voice',
    desc: 'Chaasni ghol ke peeti ho kya? How is your voice so sweet, babe?',
  },
  {
    icon: '💎',
    title: 'Your Jhumke',
    desc: 'Sometimes I wish ki mai aapke kaano ka jhumka hi hota… I\'m a little jealous of them.',
  },
  {
    icon: '👗',
    title: 'Your Clothing Sense',
    desc: 'I sometimes wonder — does Manish Malhotra copy your dressing sense? Because you always look amazing.',
  },
  {
    icon: '🌟',
    title: 'Your Mathe Ki Tikuli',
    desc: 'Sach mein… usmein toh aap bawal lagte ho. It looks incredibly beautiful on you.',
  },
  {
    icon: '🌙',
    title: 'Late Night Chats',
    desc: 'This is where it all started — the moment I slowly trapped you in my love. 😄',
  },
  {
    icon: '🛍️',
    title: 'Pacific Mall Walks',
    desc: 'We\'ve probably gone there a hundred times, but with you it always feels like we\'re exploring a new place.',
  },
];

function ReasonCard({ reason, index }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      borderColor: 'rgba(251,82,72,0.5)',
      duration: 0.35,
      ease: 'power2.out',
    });
    gsap.to(cardRef.current.querySelector('.icon-wrap'), {
      scale: 1.2,
      rotation: 5,
      duration: 0.35,
      ease: 'back.out(2)',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      borderColor: 'rgba(251,82,72,0.18)',
      duration: 0.35,
      ease: 'power2.inOut',
    });
    gsap.to(cardRef.current.querySelector('.icon-wrap'), {
      scale: 1,
      rotation: 0,
      duration: 0.35,
      ease: 'power2.inOut',
    });
  };

  return (
    <div
      ref={cardRef}
      data-card
      className="card-glass shimmer-card rounded-2xl p-7 flex flex-col gap-4"
      style={{
        background:
          index % 2 === 0
            ? 'linear-gradient(135deg, rgba(193,18,31,0.07) 0%, rgba(0,34,53,0.6) 100%)'
            : 'linear-gradient(135deg, rgba(53,89,117,0.1) 0%, rgba(0,34,53,0.6) 100%)',
        border: '1px solid rgba(251,82,72,0.18)',
        cursor: 'default',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="icon-wrap inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(193,18,31,0.25), rgba(251,82,72,0.15))',
          border: '1px solid rgba(251,82,72,0.3)',
        }}
      >
        {reason.icon}
      </div>

      <h3
        className="font-display font-semibold text-xl text-white"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {reason.title}
      </h3>

      <p
        className="font-body text-white/55 text-sm leading-relaxed"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {reason.desc}
      </p>
    </div>
  );
}

export default function Reasons() {
  const sectionRef = useSectionReveal(0.08, 45);
  const gridRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card entrance
      const cards = gridRef.current?.querySelectorAll('[data-card]');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Count-up for the number
      if (countRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: reasons.length,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = Math.round(obj.val);
          },
          scrollTrigger: {
            trigger: countRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reasons"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #001830 0%, #002235 50%, #001522 100%)',
      }}
    >
      {/* Decorative rotated text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 text-white/[0.03] font-display font-bold select-none pointer-events-none"
        style={{ fontSize: '12rem', fontFamily: "'Playfair Display', serif", transformOrigin: 'right center', right: '-6rem' }}
      >
        LOVE
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div data-animate className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-light/40 max-w-24" />
            <span
              className="text-xs font-body tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif", color: '#FFC945' }}
            >
              Reasons
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-light/40 max-w-24" />
          </div>

          <h2
            data-animate
            className="font-display text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span ref={countRef} className="text-gradient">14</span>{' '}
            <span className="text-white">Reasons</span>
          </h2>
          <h3
            data-animate
            className="font-display italic text-3xl md:text-4xl text-white/70 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why I Love You
          </h3>
          <p
            data-animate
            className="font-body text-white/40 max-w-lg mx-auto"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            These are just a few — the real list goes on forever.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} reason={r} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <div data-animate className="text-center mt-16">
          <p
            className="font-display italic text-2xl md:text-3xl text-white/60"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "And a thousand more reasons that words can't hold."
          </p>
          <p
            className="mt-3 font-body text-white/30 text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            — Yours, always
          </p>
        </div>
      </div>
    </section>
  );
}
