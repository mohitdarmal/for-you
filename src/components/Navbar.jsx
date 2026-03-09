import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const border = borderRef.current;
    if (!nav || !border) return;

    let isSticky = false;

    const onScroll = () => {
      const shouldBeSticky = window.scrollY > 100;
      if (shouldBeSticky === isSticky) return; // no change, skip
      isSticky = shouldBeSticky;

      if (shouldBeSticky) {
        gsap.to(nav, {
          backgroundColor: 'rgba(0,21,34,0.88)',
          backdropFilter: 'blur(18px)',
          duration: 0.45,
          ease: 'power2.out',
        });
        gsap.to(border, { opacity: 1, duration: 0.45, ease: 'power2.out' });
      } else {
        gsap.to(nav, {
          backgroundColor: 'rgba(0,21,34,0)',
          backdropFilter: 'blur(0px)',
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(border, { opacity: 0, duration: 0.35, ease: 'power2.out' });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
      style={{ backgroundColor: 'rgba(0,21,34,0)', willChange: 'background-color' }}
    >
      {/* Bottom border — fades in separately to avoid flash */}
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'rgba(251,82,72,0.18)', opacity: 0 }}
      />

      {/* Logo — left */}
      <span
        className="font-display text-2xl font-bold text-gradient shrink-0"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        ♥ Love
      </span>

      {/* Nav links — absolute center */}
      <div
        className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-6 text-sm text-white/60 whitespace-nowrap"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        <a href="#love-message" className="hover:text-white transition-colors duration-200">A Little Notes</a>
        <a href="#gallery"      className="hover:text-white transition-colors duration-200">Our Moments</a>
        <a href="#reasons"      className="hover:text-white transition-colors duration-200">Why I Love You</a>
        <a href="#timeline"     className="hover:text-white transition-colors duration-200">Our Little World</a>
        <a href="#say-yes"      className="hover:text-white transition-colors duration-200">Please Say Yes</a>
      </div>

      {/* Our Story CTA — right */}
      <a
        href="#timeline"
        className="shrink-0 text-sm font-body font-bold text-white px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
        style={{
          fontFamily: "'Lato', sans-serif",
          background: 'linear-gradient(135deg, #C1121F, #FB5248)',
          boxShadow: '0 4px 16px rgba(193,18,31,0.4)',
        }}
      >
        Our Story
      </a>
    </nav>
  );
}
