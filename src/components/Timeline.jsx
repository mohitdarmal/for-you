import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionReveal } from '../hooks/useGSAPAnimations';


gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    date: 'Day One',
    title: 'The First Hello',
    desc: 'I still remember the exact moment I first saw you and spoke to you. Tb ye lga ki kya sach mein main is itni khoobsurat ladki ke group ka hissa banne wala hoon and koi itni cute ladki mujhse bhi baat kar sakti hai.',
    icon: '👋',
    side: 'left',
  },
  {
    date: 'First Hanging out group',
    title: 'Our most visited place till now.',
    desc: 'The funny thing is, I was actually trying my best not to talk to you too much, because somewhere inside I knew… Agar zyada baat kar li na, toh main jaldi hi aapse pyaar krne lg jaaunga. ❤️',
    icon: '☕',
    side: 'right',
  },
  {
    date: 'After Some Months',
    title: 'Falling for You',
    desc: 'After some months, we started messaging a lot. And I began to notice something beautiful — it felt so good when I realized that you were also waiting for my messages and It slowly became a routine…',
    icon: '🌙',
    side: 'left',
  },
  {
    date: 'Special Day (15-Aug-2020) - 1:30AM',
    title: 'I Said "I Love You"',
    desc: 'I really thank God that I didn’t wait to propose to you in person. And you know what… if I hadn’t done it that day, maybe we wouldn’t be together today. Then the next day, when you said yes. Mt hi puchooo ki kya feeling thi',
    icon: '❤️',
    side: 'right',
  },
  {
    date: 'Still Falling',
    title: 'You Are My Magnet',
    desc: 'Even after a fight, I don’t know how… Pta nhi apke aur apne aap khicha chla aata hu. Bhai kaise psnd kr liya merko. Ab toh Our little story ka section bhi end ho gya fir b dimag mai yhi aata hai howwww madam ji howwww mai hi q',
    icon: '✨',
    side: 'left',
  },
];

function TimelineEvent({ event, index }) {
  const itemRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: event.side === 'left' ? -60 : 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        dotRef.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          delay: 0.2,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [event.side]);

  const isLeft = event.side === 'left';

  return (
    <div
      className={`relative flex items-center gap-0 md:gap-8 ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      } mb-12`}
    >
      {/* Content card */}
      <div
        ref={itemRef}
        className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
        style={{ opacity: 0 }}
      >
        <div
          className="card-glass rounded-2xl p-6 md:p-8 shimmer-card"
          style={{
            background:
              'linear-gradient(135deg, rgba(193,18,31,0.07) 0%, rgba(0,34,53,0.5) 100%)',
            border: '1px solid rgba(251,82,72,0.18)',
          }}
          onMouseEnter={e => {
            gsap.to(e.currentTarget, { y: -5, borderColor: 'rgba(251,82,72,0.4)', duration: 0.3 });
          }}
          onMouseLeave={e => {
            gsap.to(e.currentTarget, { y: 0, borderColor: 'rgba(251,82,72,0.18)', duration: 0.3 });
          }}
        >
          <span
            className="inline-block text-xs font-body tracking-[0.3em] uppercase mb-3"
            style={{ color: '#FFC945', fontFamily: "'Lato', sans-serif" }}
          >
            {event.date}
          </span>
          <h3
            className="font-display text-xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {event.title}
          </h3>
          <p
            className="font-body text-white/55 text-sm leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {event.desc}
          </p>
        </div>
      </div>

      {/* Center dot (hidden on mobile, visible md+) */}
      <div className="hidden md:flex w-2/12 justify-center">
        <div
          ref={dotRef}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10 pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #C1121F, #FB5248)',
            boxShadow: '0 0 20px rgba(251,82,72,0.4)',
            transform: 'scale(0)',
          }}
        >
          {event.icon}
        </div>
      </div>

      {/* Empty opposite side */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useSectionReveal(0.1, 40);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical line growing down
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 2.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #001522 0%, #002235 40%, #003049 70%, #001830 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div data-animate className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-soft/40 max-w-24" />
            <span
              className="text-xs font-body tracking-[0.4em] uppercase text-rose-soft/80"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Our Story
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-soft/40 max-w-24" />
          </div>

          <h2
            data-animate
            className="font-display text-5xl md:text-6xl font-bold mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our{' '}
            <span className="text-gradient">Little World</span>
          </h2>
          <p
            data-animate
            className="font-body text-white/50 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Every great love story is worth remembering. Here is ours.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line (desktop) */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 hidden md:block"
            style={{
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, #FB5248 10%, #FB5248 90%, transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          {events.map((event, i) => (
            <TimelineEvent key={event.title} event={event} index={i} />
          ))}
        </div>

        {/* End badge */}
        <div data-animate className="flex flex-col items-center mt-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #C1121F, #FB5248)',
              boxShadow: '0 0 30px rgba(251,82,72,0.5)',
            }}
          >
            ♾️
          </div>
          <p
            className="font-display italic text-white/50 mt-4 text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            And this is just the beginning...
          </p>
        </div>
      </div>
    </section>
  );
}
