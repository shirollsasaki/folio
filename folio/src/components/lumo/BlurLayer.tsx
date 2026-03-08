'use client';

import { useEffect, useState } from 'react';

export default function BlurLayer() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] transition-[backdrop-filter] duration-300"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        maskImage: `radial-gradient(circle 200px at ${position.x}% ${position.y}%, transparent 0%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle 200px at ${position.x}% ${position.y}%, transparent 0%, black 100%)`,
      }}
    />
  );
}
