"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface VideoBackgroundProps {
  /** Path to the MP4 source (H.264 fallback) */
  mp4Src: string;
  /** Path to the WebM source (VP9, preferred by modern browsers) */
  webmSrc: string;
  /** Path to poster image shown while video loads */
  poster: string;
  /** Additional classes applied to the outer wrapper */
  className?: string;
  /** Classes for the gradient overlay rendered on top of the video */
  overlayClassName?: string;
}

/**
 * Full-bleed background video component optimized for performance.
 *
 * Key behaviors:
 * - Starts loading only near viewport and uses preload="metadata"
 * - Pauses playback when scrolled out of view to free bandwidth
 * - Respects `prefers-reduced-motion` — shows static poster only
 * - Source ordering: WebM first (smaller), MP4 fallback (universal)
 */
export default function VideoBackground({
  mp4Src,
  webmSrc,
  poster,
  className = "",
  overlayClassName = "",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check the user's motion preference on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Play or pause the video based on viewport visibility
  const handleVisibilityChange = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      const nextVisible = entry.isIntersecting;

      // Avoid redundant state updates from frequent observer callbacks.
      setIsVisible((previous) => (previous === nextVisible ? previous : nextVisible));

      // Start loading once and never reset, so source fetching is stable.
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
      // Start loading slightly before the element scrolls into view
      rootMargin: "200px 0px",
      threshold: 0.01,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleVisibilityChange]);

  // Control playback: play when visible, pause when offscreen
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    if (isVisible) {
      video.play().catch(() => {
        // Autoplay blocked by browser — the poster image handles this gracefully
      });
    } else {
      video.pause();
    }
  }, [isVisible, prefersReducedMotion]);

  // If the user prefers reduced motion, render a static poster image instead
  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={`absolute inset-0 ${className}`}>
        <img
          src={poster}
          alt=""
          role="presentation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {overlayClassName && (
          <div className={`absolute inset-0 ${overlayClassName}`} />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      {/* Show poster as background until video loads */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${poster})` }}
      />

      {/* Only mount the video element once it's near the viewport */}
      {hasStartedLoading && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* WebM first — modern browsers pick it for smaller file size */}
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay sits on top of the video */}
      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      )}
    </div>
  );
}
