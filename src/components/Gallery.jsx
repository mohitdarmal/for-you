import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionReveal } from '../hooks/useGSAPAnimations';

gsap.registerPlugin(ScrollTrigger);

const gdrive = (id) => `https://lh3.googleusercontent.com/d/${id}`;

const memories = [
  { id: 1,  img: gdrive('1s1LtkzrJYQoSichw5oNENfXwxYqV_soc'), label: 'Sweetest Moment', tag: 'Us ♥' },
  { id: 2,  img: gdrive('1lP6cc5pkBFDD6PP5sE7aRx3iWqyTvASe'), label: 'Pure Joy',         tag: 'Smiles' },
  { id: 3,  img: gdrive('1-bjZxKPJfzkpAYOIC4fC4h66EhQ5TmJR'), label: 'Together',         tag: 'Always' },
  { id: 4,  img: gdrive('1ObN7zdJUWW6Wv_ZVkueml79WoFZ33wGO'), label: 'Our Story',         tag: 'Love' },
  { id: 5,  img: gdrive('1H2cS9eM3PCDzHIO3RUIErmk-i7XZzVef'), label: 'Golden Hour',       tag: 'Sunset' },
  { id: 6,  img: gdrive('1inGve7o6doerlsZAgeKa6XmouM_PRcHi'), label: 'Adventures',        tag: 'Wild & Free' },
  { id: 7,  img: gdrive('1z9riIPK_fivgPhdGB5gHj_g2mIqxraC0'), label: 'Laughter',          tag: 'Priceless' },
  { id: 8,  img: gdrive('1wkR5doBsM8C_BX5VlVl9AdyF1Lgjb3zN'), label: 'Late Night',        tag: 'Just Us' },
  { id: 9,  img: gdrive('12ZcxO0f7y4SYCv-0nmZHDbQ5IxHZx8eo'), label: 'Cozy Vibes',        tag: 'Bliss' },
  { id: 10, img: gdrive('172namOzW4mHi4qih9dL6MV5FWAg09C6K'), label: 'Our Bubble',        tag: 'Safe' },
  { id: 11, img: gdrive('1CcwfwIlLL334DegDin_nPMlh26MLMjUu'), label: 'First Date',         tag: 'Romantic' },
  { id: 12, img: gdrive('1RRq4jRTsOw6Lzo52n5JLyNzG1lJcQfOL'), label: 'Road Trip',         tag: 'Memories' },
  { id: 13, img: gdrive('1qp_ADVeka97zVXSpnRmHxkZj65y2eLB7'), label: 'Holding On',        tag: 'Forever' },
  { id: 14, img: gdrive('1_wmhDGy-WamMJn2Ik4Ps2HgLx48a1FyV'), label: 'Morning Light',     tag: 'New Day' },
  { id: 15, img: gdrive('1HKQ1gvAnXwdyhqT5xvAcoSawTDy6sDbL'), label: 'Dancing',           tag: 'Free Spirit' },
  { id: 16, img: gdrive('1jbffWuImlcDOpsCTM1gDPWRQpPMKCMXJ'), label: 'Special Moments',   tag: 'Cherish' },
  { id: 17, img: gdrive('1a7bszWOaafvOEaez_kfv4-imNGW8WxL8'), label: 'Star Gazing',       tag: 'Dreamy' },
  { id: 18, img: gdrive('1s1tTwAE9bm-Oh5spjjMQtiZWJAY4swAQ'), label: 'Deep Talks',        tag: 'Soulmates' },
  { id: 19, img: gdrive('1BLqW6VXNHG-FxYNH0qsOPZMOPMse1ZnW'), label: 'You & Me',          tag: 'Duo' },
  { id: 20, img: gdrive('1lKvAP4w2k5JlY8v5v_TVwDgAnpeOEio3'), label: 'Celebrations',      tag: 'Joy' },
  { id: 21, img: gdrive('1p6NMIa4CQ4p86varsxuS2elhhwRn6-cc'), label: 'Tender Touch',      tag: 'Gentle' },
  { id: 22, img: gdrive('1xtp8v805_JcFc6JdmtfVDwICDPkaPgp2'), label: 'Last Frame',        tag: 'Unforgettable' },
];

const VISIBLE_COUNT = 7;

/* ── Lightbox ── */
function Lightbox({ startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + memories.length) % memories.length), []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % memories.length), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [prev, next, onClose]);

  const m = memories[current];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,10,20,0.96)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl font-light leading-none"
        style={{ fontFamily: 'sans-serif' }}
      >
        ×
      </button>

      {/* Counter */}
      <p className="absolute top-5 left-6 text-white/50 text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
        {current + 1} / {memories.length}
      </p>

      {/* Main image */}
      <div className="relative flex items-center justify-center w-full px-16" style={{ maxHeight: '75vh' }}>
        <button
          onClick={prev}
          className="absolute left-4 text-white/60 hover:text-white text-4xl select-none"
          style={{ fontFamily: 'sans-serif' }}
        >
          ‹
        </button>

        <img
          key={m.id}
          src={m.img}
          alt={m.label}
          className="rounded-xl object-contain shadow-2xl"
          style={{ maxHeight: '72vh', maxWidth: '80vw' }}
        />

        <button
          onClick={next}
          className="absolute right-4 text-white/60 hover:text-white text-4xl select-none"
          style={{ fontFamily: 'sans-serif' }}
        >
          ›
        </button>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <span
          className="text-xs tracking-widest uppercase px-3 py-1 rounded-full mr-2"
          style={{
            background: 'rgba(251,82,72,0.2)',
            border: '1px solid rgba(251,82,72,0.4)',
            color: '#FB5248',
            fontFamily: "'Lato', sans-serif",
          }}
        >
          {m.tag}
        </span>
        <span className="text-white/80 text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
          {m.label}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-5 overflow-x-auto px-4 pb-1" style={{ maxWidth: '90vw' }}>
        {memories.map((thumb, i) => (
          <button
            key={thumb.id}
            onClick={() => setCurrent(i)}
            className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200"
            style={{
              width: 56,
              height: 56,
              outline: i === current ? '2px solid #FB5248' : '2px solid transparent',
              opacity: i === current ? 1 : 0.5,
            }}
          >
            <img src={thumb.img} alt={thumb.label} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Memory Card ── */
function MemoryCard({ memory, index, onOpen }) {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const isWide = index === 0 || index === 3; // row-span-2 cards

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    gsap.to(cardRef.current.querySelector('img'), { scale: 1.08, duration: 0.6, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' });
    gsap.to(cardRef.current.querySelector('img'), { scale: 1, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <div
      ref={cardRef}
      data-card
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${isWide ? 'row-span-2' : ''}`}
      style={{
        border: '1px solid rgba(251,82,72,0.15)',
        minHeight: isWide ? '420px' : '220px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(index)}
    >
      <img
        src={memory.img}
        alt={memory.label}
        className="w-full h-full object-cover"
        style={{ display: 'block', minHeight: isWide ? '420px' : '220px' }}
        loading="lazy"
      />

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,21,34,0.85) 0%, transparent 60%)' }}
      />

      <div className="absolute bottom-4 left-4">
        <span
          className="text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full mb-2 inline-block"
          style={{
            background: 'rgba(251,82,72,0.2)',
            border: '1px solid rgba(251,82,72,0.4)',
            fontFamily: "'Lato', sans-serif",
            color: '#FB5248',
          }}
        >
          {memory.tag}
        </span>
        <h3
          className="font-display text-white text-lg font-semibold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {memory.label}
        </h3>
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: 0,
          background: 'linear-gradient(135deg, rgba(193,18,31,0.7) 0%, rgba(53,89,117,0.7) 100%)',
        }}
      >
        <span className="text-5xl heart-beat" style={{ color: 'white' }}>♥</span>
      </div>
    </div>
  );
}

/* ── Gallery Section ── */
export default function Gallery() {
  const sectionRef = useSectionReveal(0.1, 40);
  const gridRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const visibleMemories = memories.slice(0, VISIBLE_COUNT);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('[data-card]');
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.88, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #002235 0%, #001830 50%, #002235 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div data-animate className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-soft/40 max-w-24" />
            <span
              className="text-xs font-body tracking-[0.4em] uppercase text-rose-soft/80"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Memories
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-soft/40 max-w-24" />
          </div>

          <h2
            data-animate
            className="font-display text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Sweetest{' '}
            <span className="text-gradient">Moments</span>
          </h2>
          <p
            data-animate
            className="font-body text-white/50 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Every picture holds a lifetime of smiles, laughter, and love.
          </p>
        </div>

        {/* Masonry-style grid — first 7 images */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          style={{ gridAutoRows: '220px' }}
        >
          {visibleMemories.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} onOpen={openLightbox} />
          ))}
        </div>

        {/* See More button */}
        <div className="text-center mt-10">
          <button
            onClick={() => openLightbox(VISIBLE_COUNT)}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(193,18,31,0.15) 0%, rgba(53,89,117,0.15) 100%)',
              border: '1px solid rgba(251,82,72,0.5)',
              color: '#FB5248',
              fontFamily: "'Lato', sans-serif",
              boxShadow: '0 0 24px rgba(251,82,72,0.15)',
            }}
          >
            <span>♥</span>
            <span>See More Memories</span>
            {/* <span>({memories.length - VISIBLE_COUNT} more)</span> */}
          </button>
        </div>

        {/* Bottom call-out */}
        <div data-animate className="text-center mt-10">
          <p
            className="font-display italic text-white/40 text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "A photograph is a secret about a secret."
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox startIndex={lightboxIndex} onClose={closeLightbox} />
      )}
    </section>
  );
}
