'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticles = () => {
      if (typeof window !== 'undefined' && (window as any).particlesJS && !init) {
        setInit(true);
        (window as any).particlesJS('particles-js', {
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.2, random: false },
            size: { value: 2, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#ffffff',
              opacity: 0.15,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' },
              resize: true,
            },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 0.5 } },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        });
      }
    };

    // Check immediately in case it's already loaded
    initParticles();

    // Also check periodically
    const intervalId = setInterval(initParticles, 100);

    return () => clearInterval(intervalId);
  }, [init]);

  return (
    <>
      <Script
        src="/assets/js/particles.min.js"
        strategy="lazyOnload"
      />
      <div id="particles-js" className="fixed inset-0 z-0"></div>
    </>
  );
}
