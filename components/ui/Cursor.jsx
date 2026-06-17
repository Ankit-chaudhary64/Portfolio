"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const runningRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (cursorRef.current) cursorRef.current.style.display = "none";
      return;
    }

    const lerp = (a, b, t) => a + (b - a) * t;

    const stopTick = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      runningRef.current = false;
    };

    const tick = () => {
      if (document.hidden) {
        stopTick();
        return;
      }

      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      const dx = Math.abs(pos.current.x - mouse.current.x);
      const dy = Math.abs(pos.current.y - mouse.current.y);
      if (dx < 0.1 && dy < 0.1) {
        stopTick();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const startTick = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!startedRef.current) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        startedRef.current = true;
      }
      startTick();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopTick();
        return;
      }

      if (startedRef.current) startTick();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopTick();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        background: "var(--accent)",
        boxShadow: "0 0 16px var(--accent)",
      }}
    />
  );
}
