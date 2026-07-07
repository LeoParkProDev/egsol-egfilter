"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  warm: boolean;
  a: number;
};

export default function AirParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let raf = 0;

    const resize = () => {
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawn = (p: Particle, init: boolean): Particle => {
      p.x = Math.random() * W;
      p.y = init ? Math.random() * H : -8;
      p.r = 0.8 + Math.random() * 2.2;
      p.vy = 0.25 + Math.random() * 0.55;
      p.vx = (Math.random() - 0.5) * 0.22;
      p.warm = Math.random() < 0.45;
      p.a = 0.25 + Math.random() * 0.4;
      return p;
    };

    const dust: Particle[] = Array.from({ length: 70 }, () =>
      spawn({ x: 0, y: 0, r: 0, vx: 0, vy: 0, warm: false, a: 0 }, true)
    );

    // 입자가 히어로 하단(H14 필터 라인)에 가까워지면 서서히 사라지는 포집 연출
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < dust.length; i++) {
        const p = dust[i];
        if (!reduced) {
          p.x += p.vx + Math.sin((p.y + i * 37) * 0.011) * 0.14;
          p.y += p.vy;
        }
        if (p.y > H || p.x < -10 || p.x > W + 10) {
          spawn(p, false);
          continue;
        }
        const dist = H - p.y;
        const fade = dist < 90 ? Math.max(dist / 90, 0) : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? `rgba(196,160,120,${p.a * fade})`
          : `rgba(148,163,184,${p.a * fade})`;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
