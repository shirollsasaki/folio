'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outlinePosition, setOutlinePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateOutlinePosition = () => {
      setOutlinePosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
    };

    window.addEventListener('mousemove', updatePosition);
    const interval = setInterval(updateOutlinePosition, 16);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      clearInterval(interval);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot cursor */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '4px',
          height: '4px',
          backgroundColor: 'var(--lumo-accent)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Outline with crosshairs */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-[width,height] duration-200"
        style={{
          left: `${outlinePosition.x}px`,
          top: `${outlinePosition.y}px`,
          width: '40px',
          height: '40px',
          border: '1px solid rgba(230, 126, 34, 0.4)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'color-burn',
        }}
      >
        {/* Horizontal crosshair */}
        <div
          className="absolute"
          style={{
            top: '50%',
            left: '-20%',
            right: '-20%',
            height: '1px',
            backgroundColor: 'var(--lumo-accent)',
          }}
        />
        {/* Vertical crosshair */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '-20%',
            bottom: '-20%',
            width: '1px',
            backgroundColor: 'var(--lumo-accent)',
          }}
        />
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
