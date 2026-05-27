"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    `${prefix}${Math.round(latest).toLocaleString()}${suffix}`,
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.8,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}
