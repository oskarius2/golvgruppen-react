import { useState, useEffect, useCallback, useRef } from "react";
import { HERO_POSTER, HERO_VIDEO_SOURCES } from "../data.jsx";

/**
 * Keep hero playback lightweight and smooth:
 * - loop one active source for seamless playback
 * - fallback to next source only on hard media error
 * - pause when tab is hidden to reduce background CPU usage
 */
export default function HeroLoopVideo({ onLoopReady }) {
  const ref = useRef(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [deferredStart, setDeferredStart] = useState(false);
  const attemptsRef = useRef(0);
  const readyRef = useRef(false);
  const c = typeof navigator !== "undefined" ? navigator.connection : undefined;
  const lowBandwidth = Boolean(c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")));

  const markReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    onLoopReady?.();
  }, [onLoopReady]);

  useEffect(() => {
    const t = window.setTimeout(() => setDeferredStart(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled || !deferredStart) return;
    const onVisibilityChange = () => {
      if (document.hidden) {
        el.pause();
        return;
      }
      void el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [deferredStart, disabled, srcIndex]);

  const handleError = useCallback(() => {
    attemptsRef.current += 1;
    if (attemptsRef.current >= HERO_VIDEO_SOURCES.length) {
      setDisabled(true);
      return;
    }
    setSrcIndex(attemptsRef.current);
  }, []);

  useEffect(() => {
    if (!deferredStart) return;
    if (disabled || lowBandwidth || HERO_VIDEO_SOURCES.length === 0) {
      markReady();
    }
  }, [deferredStart, disabled, lowBandwidth, markReady]);

  if (disabled || !deferredStart || lowBandwidth || HERO_VIDEO_SOURCES.length === 0) return null;

  return (
    <video
      ref={ref}
      className="hvid"
      autoPlay
      muted
      playsInline
      preload="none"
      poster={HERO_POSTER}
      aria-hidden="true"
      loop
      src={HERO_VIDEO_SOURCES[srcIndex]}
      onError={handleError}
      onLoadedData={markReady}
      onPlaying={markReady}
    />
  );
}
