/**
 * CustomCursor.tsx
 * Combined Neural Pulse + Magnetic Glass cursor effect.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  startTime: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const INTERACTIVE_SELECTOR =
  'button, a, [role="button"], .project-card, input, textarea, select, label[for], .nav-link, .skill-planet';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const lastMousePos = useRef({ x: -200, y: -200 });
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const particleIdCounter = useRef(0);
  const rippleIdCounter = useRef(0);
  const rafRef = useRef<number>(0);
  const hoveredEl = useRef<Element | null>(null);
  const magnetTarget = useRef({ x: 0, y: 0 });
  const glassPos = useRef({ x: -300, y: -300 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const noTouch = !window.matchMedia('(hover: none)').matches;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsEnabled(finePointer && noTouch);
    setReducedMotion(rm);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = '__custom-cursor-style';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);
    return () => {
      document.documentElement.style.cursor = '';
      document.getElementById('__custom-cursor-style')?.remove();
    };
  }, [isEnabled]);

  const spawnParticle = useCallback((x: number, y: number, speed: number) => {
    const angle = Math.random() * Math.PI * 2;
    const v = (Math.random() * 0.8 + 0.4) * speed * 0.04;
    particles.current.push({
      id: particleIdCounter.current++,
      x,
      y,
      vx: Math.cos(angle) * v,
      vy: Math.sin(angle) * v,
      life: 1,
      size: Math.random() * 3 + 1,
    });
    if (particles.current.length > 40) particles.current.splice(0, 5);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const onMove = (e: MouseEvent) => {
      const prev = lastMousePos.current;
      const speed = Math.hypot(e.clientX - prev.x, e.clientY - prev.y);
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      if (speed > 8 && !reducedMotion) spawnParticle(e.clientX, e.clientY, speed);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = target?.closest(INTERACTIVE_SELECTOR) ?? null;

      if (interactive !== hoveredEl.current) {
        hoveredEl.current = interactive;
        isHovering.current = !!interactive;
      }

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        magnetTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    };

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isClicking.current = true;
      ripples.current.push({
        id: rippleIdCounter.current++,
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
      });
    };

    const onUp = () => { isClicking.current = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isEnabled, reducedMotion, spawnParticle]);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const RING_LAG = reducedMotion ? 1 : 0.1;
    const GLASS_LAG = reducedMotion ? 1 : 0.12;

    const tick = () => {
      const { x: mx, y: my } = mousePos.current;

      if (dotRef.current) {
        const scale = isClicking.current ? 0.6 : 1;
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px) scale(${scale})`;
      }

      ringPos.current.x = lerp(ringPos.current.x, mx, RING_LAG);
      ringPos.current.y = lerp(ringPos.current.y, my, RING_LAG);
      if (ringRef.current) {
        const s = isClicking.current ? 1.4 : 1;
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${s})`;
        ringRef.current.style.opacity = isHovering.current ? '0' : '1';
      }

      if (isHovering.current && hoveredEl.current) {
        const mt = magnetTarget.current;
        const pullX = lerp(mx, mt.x, 0.25);
        const pullY = lerp(my, mt.y, 0.25);
        glassPos.current.x = lerp(glassPos.current.x, pullX, GLASS_LAG);
        glassPos.current.y = lerp(glassPos.current.y, pullY, GLASS_LAG);
      } else {
        glassPos.current.x = lerp(glassPos.current.x, -300, 0.08);
        glassPos.current.y = lerp(glassPos.current.y, -300, 0.08);
      }
      if (glassRef.current) {
        const gs = isClicking.current && isHovering.current ? 0.85 : 1;
        glassRef.current.style.transform = `translate(${glassPos.current.x - 28}px, ${glassPos.current.y - 28}px) scale(${gs})`;
        glassRef.current.style.opacity = isHovering.current ? '1' : '0';
      }

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.current = particles.current.filter(p => p.life > 0.02);
        for (const p of particles.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.life -= 0.04;
          const alpha = p.life * 0.7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        const now = performance.now();
        ripples.current = ripples.current.filter(r => now - r.startTime < 600);
        for (const r of ripples.current) {
          const t = (now - r.startTime) / 600;
          const radius = t * 40;
          const alpha = (1 - t) * 0.6;
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isEnabled, reducedMotion]);

  if (!isEnabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99998,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#00d4ff',
          boxShadow: '0 0 6px 2px rgba(0,212,255,0.9), 0 0 14px 4px rgba(0,180,255,0.5)',
          zIndex: 99999,
          pointerEvents: 'none',
          willChange: 'transform',
          transition: 'transform 0.05s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,212,255,0.55)',
          boxShadow: '0 0 8px 1px rgba(0,212,255,0.25), inset 0 0 6px rgba(0,212,255,0.1)',
          zIndex: 99999,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          transition: 'opacity 0.2s ease',
        }}
      />
      <div
        ref={glassRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(0, 212, 255, 0.04)',
          border: '1px solid rgba(0,212,255,0.5)',
          boxShadow: '0 0 18px 3px rgba(0,212,255,0.30), inset 0 0 8px rgba(0,212,255,0.08)',
          zIndex: 99999,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          transition: 'opacity 0.18s ease, transform 0.1s ease',
          opacity: 0,
        }}
      />
    </>
  );
};



