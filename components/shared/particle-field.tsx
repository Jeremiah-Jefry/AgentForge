"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";

export function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        top: `${(index * 23) % 100}%`,
        delay: `${(index % 6) * 0.5}s`,
        duration: `${4 + (index % 5)}s`,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute size-1 rounded-full bg-white/50 animate-[pulse_var(--duration)_linear_infinite]"
          style={
            {
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              "--duration": particle.duration,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
