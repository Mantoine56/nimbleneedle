"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface VideoShowcaseProps {
  /** Path to the MP4 source (H.264 fallback) */
  mp4Src: string;
  /** Path to the WebM source (VP9, preferred by modern browsers) */
  webmSrc: string;
  /** Path to poster image shown while video loads */
  poster: string;
  /** Additional classes applied to the outer wrapper */
  className?: string;
}

/**
 * Inline vertical video showcase with a styled frame treatment.
 *
 * Designed for 9:16 vertical videos displayed alongside text content.
 * Uses the same performance patterns as VideoBackground:
 * - Lazy-loads via IntersectionObserver (won't fetch until near viewport)
 * - Pauses when scrolled offscreen
 * - Respects `prefers-reduced-motion`
 * - Fades in smoothly once the video is ready
 */
export default function VideoShowcase({
  mp4Src,
  webmSrc,
  poster,
  className = "",
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check the user's motion preference on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track whether the component is in or near the viewport
  const handleVisibilityChange = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      const nextVisible = entry.isIntersecting;

      // Avoid redundant re-renders when observer fires repeatedly.
      setIsVisible((previous) => (previous === nextVisible ? previous : nextVisible));

      // Start loading exactly once when the showcase is near viewport.
      if (nextVisible) {
        setHasStartedLoading((previous) => previous || nextVisible);
      }
    },
    []
  );

  // Set up IntersectionObserver on the container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleVisibilityChange, {
      rootMargin: "200px 0px",
      threshold: 0.01,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleVisibilityChange]);

  // Play/pause based on visibility while preserving autoplay behavior.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion || !hasStartedLoading) return;

    if (isVisible) {
      video.play().catch(() => {
        // Autoplay blocked — poster handles fallback
      });
    } else {
      video.pause();
    }
  }, [isVisible, prefersReducedMotion, hasStartedLoading]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl shadow-2xl ${className}`}
    >
      {/* Decorative top-left accent — subtle pink glow */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
      {/* Decorative bottom-right accent */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* 9:16 aspect ratio container for vertical video */}
      <div className="relative aspect-[9/16] w-full bg-gray-100">
        {/* Static poster shown until the video is ready to play */}
        <img
          src={poster}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoReady && !prefersReducedMotion ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Lazy-mount the video only once it's near the viewport */}
        {hasStartedLoading && !prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setIsVideoReady(true)}
            poster={poster}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={webmSrc} type="video/webm" />
            <source src={mp4Src} type="video/mp4" />
          </video>
        )}

        {/* Subtle bottom gradient for visual polish */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
