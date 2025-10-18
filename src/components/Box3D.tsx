import React, { useState } from "react";

export type Box3DProps = {
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  size?: number; // edge length in px (default 128)
  autoSpin?: boolean;        
  spinSeed?: number;         
  spinDurationMs?: number; 
};

const faceStyleBase: React.CSSProperties = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // border: "1px solid rgba(0,0,0,0.15)",
  background: "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(229, 233, 235, 0.96))",
  // boxShadow: "0 6px 20px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.28),  0 0 0 1px rgba(255,255,255,0.15)",
  transition: "transform 450ms ease, opacity 450ms ease",
  willChange: "transform",
  // backfaceVisibility: "hidden",

};

const Box3D: React.FC<Box3DProps> = ({
  title,
  icon,
  onClick,
  isActive = false,
  size = 160,
  autoSpin = false,
  spinSeed,
  spinDurationMs = 10000,
}) => {
  const [expanded, setExpanded] = useState(false);

  const seed = spinSeed? spinSeed * 3 : 1;
  const jitter = ((seed * 9301 + 49297) % 233280) / 233280; // 0..1
  const dur = Math.round(spinDurationMs * (1.2 + 0.4 * jitter)); // 0.8x..1.2x
  const delay = Math.round(-(jitter * dur)); // отрицательная задержка — разные фазы

  const s = size; // cube edge
  const h = s / 2; // half edge

  // helpers to build transforms for two states
  const T = {
    top: (exp: boolean) => `translateZ(${exp ? h : 0}px)`,
    bottom: (exp: boolean) => `translateZ(${exp ? -h : 0}px)`,
    front: (exp: boolean) => `rotateX(90deg) translateZ(${exp ? h : 0}px)`,
    back: (exp: boolean) => `rotateX(90deg) translateZ(${exp ? -h : 0}px)`,
    right: (exp: boolean) => `rotateY(90deg) translateZ(${exp ? h : 0}px)`,
    left: (exp: boolean) => `rotateY(90deg) translateZ(${exp ? -h : 0}px)`,
  } as const;

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={onClick}
      className="relative inline-block cursor-pointer select-none"
      style={{
        perspective: 1000,
      }}
    >
      {/* 3D stage */}
      <div
        className="relative"
        style={{
          width: s,
          height: s,
          transformStyle: "preserve-3d",
          transform: "rotateX(60deg) rotateZ(-15deg)",
          ...(autoSpin
            ? {
                animation: `box3d-spin-xyz ${dur}ms linear infinite`,
                animationDelay: `${delay}ms`,
              }
            : undefined),
        }}
      >
        {/* Three central planes (initial). They move out to +Z, +Y, +X */}
        <div
          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.top(expanded),
          }}
        >
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            <div className="text-4xl leading-none drop-shadow-sm">{icon}</div>
            {title && (
              <div className="mt-1 text-[11px] font-mono text-gray-600 opacity-90">
                {title}
              </div>
            )}
          </div>
          {isActive && (
            <div className="pointer-events-none absolute inset-0 rounded-sm bg-blue-400/20 animate-pulse" />
          )}
        </div>

        <div
          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.front(expanded),
          }}
        >
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            <div className="text-4xl leading-none drop-shadow-sm">{icon}</div>
            {title && (
              <div className="mt-1 text-[11px] font-mono text-gray-600 opacity-90">
                {title}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.right(expanded),
          }}
        >
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            <div className="text-4xl leading-none drop-shadow-sm">{icon}</div>
            {title && (
              <div className="mt-1 text-[11px] font-mono text-gray-600 opacity-90">
                {title}
              </div>
            )}
          </div>
        </div>

        {/* The complementary faces fade in and move to -Z, -Y, -X */}
        <div
          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.bottom(expanded),
            opacity: expanded ? 0.96 : 0,
          }}
        >
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            <div className="text-4xl leading-none drop-shadow-sm">{icon}</div>
            {title && (
              <div className="mt-1 text-[11px] font-mono text-gray-600 opacity-90">
                {title}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.back(expanded),
            opacity: expanded ? 0.96 : 0,
          }}
        >
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            <div className="text-4xl leading-none drop-shadow-sm">{icon}</div>
            {title && (
              <div className="mt-1 text-[11px] font-mono text-gray-600 opacity-90">
                {title}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.left(expanded),
            opacity: expanded ? 0.96 : 0,
          }}
        >
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            <div className="text-4xl leading-none drop-shadow-sm">{icon}</div>
            {title && (
              <div className="mt-1 text-[11px] font-mono text-gray-600 opacity-90">
                {title}
              </div>
            )}
          </div>
        </div>

        {/* outline rings */}
        {/* <div className="pointer-events-none absolute -inset-1 border border-gray-400/30" />
        <div className="pointer-events-none absolute -inset-2 border border-gray-500/20" /> */}
      </div>
      <style>
        {`@keyframes box3d-spin-xyz {
            from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
            to   { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }`}
      </style>
    </div>
  );
};

export default Box3D;