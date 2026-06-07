import { ShieldCheck } from 'lucide-react';

/**
 * Spinning guarantee badge — ported from Riber's Suits and adapted to
 * Nimble Needle's pink brand palette. Uses a CSS animation instead of
 * Framer Motion (which is not installed in this project).
 *
 * The SVG text follows a circular path and rotates continuously via
 * the `animate-spin-slow` utility (20s full rotation, defined in
 * tailwind.config.ts).
 */
export default function GuaranteeBadge() {
  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center transform-gpu">
      {/* Semi-transparent backdrop circle */}
      <div className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm border border-pink-500/20" />

      {/* Rotating text ring — uses Tailwind's custom spin-slow keyframe */}
      <div className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-spin-slow transform-gpu will-change-transform">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path
            id="guaranteeTextPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="transparent"
          />
          <text className="text-[10.5px] font-bold uppercase tracking-[0.15em] fill-pink-500 drop-shadow-md" style={{ fontFamily: 'var(--font-league-spartan), sans-serif' }}>
            <textPath href="#guaranteeTextPath" startOffset="50%" textAnchor="middle">
              &bull; 30-Day Perfect Fit Guarantee &bull;
            </textPath>
          </text>
        </svg>
      </div>

      {/* Centre icon circle */}
      <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 bg-pink-500/10 backdrop-blur-md rounded-full border border-pink-500/40 flex items-center justify-center shadow-lg">
        <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-pink-500 drop-shadow-sm" strokeWidth={1.5} />
      </div>
    </div>
  );
}
