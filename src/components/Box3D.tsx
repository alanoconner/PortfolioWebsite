import React, { useEffect, useState } from "react";

export type Box3DProps = {
  title?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  size?: number; // edge length in px (default 128)
  autoSpin?: boolean;        
  spinSeed?: number;         
  spinDurationMs?: number; 
  windowClosed: boolean;
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
  windowClosed
}) => {
  const [expanded, setExpanded] = useState(false);

  const seed = spinSeed? spinSeed * 3 : 1;
  const jitter = ((seed * 9301 + 49297) % 233280) / 233280; // 0..1
  const dur = Math.round(spinDurationMs * (1.2 + 0.4 * jitter)); // 0.8x..1.2x
  const delay = Math.round(-(jitter * dur)); // отрицательная задержка — разные фазы
  const selectedLength = 128
  const [selected01, setSelected01] = useState<string[]>(Array(selectedLength).fill(" "));
  const glitchOn = useRandomGlitch();          // или включай по hover/active


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

    // Add this function to create random glitch per face
  const getFaceGlitchClass = (faceIndex: number) => {
    if (!glitchOn) return '';
    
    // Only glitch 2-3 random faces at a time
    const shouldGlitch = Math.random() > 0.4; // 60% chance per face
    return shouldGlitch ? 'glitch-face' : '';
  };

  // Then use it for each face:
  const FaceClass1 = `relative overflow-visible will-change-transform ${ (glitchOn && !expanded ) ? getFaceGlitchClass(0) : ''}`;
  // const FaceClass2 = `relative overflow-visible will-change-transform ${getFaceGlitchClass(1)}`;
  // const FaceClass3 = `relative overflow-visible will-change-transform ${getFaceGlitchClass(2)}`;
  // const FaceClass4 = `relative overflow-visible will-change-transform ${getFaceGlitchClass(3)}`;
  // const FaceClass5 = `relative overflow-visible will-change-transform ${getFaceGlitchClass(4)}`;
  // const FaceClass6 = `relative overflow-visible will-change-transform ${getFaceGlitchClass(5)}`;



  useEffect(() => {
    if (!expanded) return;
    const interval = setInterval(() => {
      const newItem = Math.round(Math.random()).toString();
      setSelected01(prev => {
        // Remove the oldest element (index 0), add new one at end
        const updated = [...prev.slice(1), newItem];
        return updated;
      });
    }, 50);
  
    return () => clearInterval(interval);
  }, [expanded]);

  useEffect(() => {
    if (windowClosed === false) {setExpanded(false)}
  }, [windowClosed])

  function useRandomGlitch(opts?: { minDelayMs?: number; maxDelayMs?: number; burstMs?: number }) {
    const { minDelayMs = 800, maxDelayMs = 5200, burstMs = 100 } = opts || {};
    const [on, setOn] = React.useState(false);
  
    React.useEffect(() => {
      let timeout: number;
      let interval: number;
  
      const schedule = () => {
        const delay = Math.floor(Math.random() * (maxDelayMs - minDelayMs)) + minDelayMs;
        interval = window.setTimeout(() => {
          setOn(true);
          timeout = window.setTimeout(() => setOn(false), Math.floor(burstMs * (0.8 + Math.random() * 0.6)));
          schedule();
        }, delay);
      };
  
      schedule();
      return () => { clearTimeout(timeout); clearTimeout(interval); };
    }, [minDelayMs, maxDelayMs, burstMs]);
  
    return on;
  }

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        isActive? setExpanded(true) : setExpanded(false)
      }}
      onClick={() => {
        setExpanded(true)
        onClick()
      }
      }
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
          className={FaceClass1}

          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.top(expanded),
          }}
        >
          
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            {!isActive && <div className={`${size <= 100 ? 'text-2xl' : 'text-4xl'} leading-none drop-shadow-sm`}>{icon}</div>}
            {(title && !isActive) && (
              <div className={`mt-1 ${size <= 100 ? 'text-[9px]' : 'text-[11px]'} font-mono text-gray-600 opacity-90`}>
                {title}
              </div>
            )}
          </div>
          {isActive && (
            <div className="pointer-events-none absolute inset-0 rounded-sm bg-gray-200 animate-pulse break-all whitespace-normal m-auto flex justify-start items-start leading-tight">
              {selected01}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
            <div className="glitch-rgb absolute inset-0" style={{ zIndex: 1 }} />
            <div className="glitch-outline absolute inset-0" style={{ zIndex: 2 }} />
            <div className="glitch-scanlines absolute inset-0" style={{ zIndex: 3 }} />
          </div>
        </div>

        <div
          // className={FaceClass2}

          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.front(expanded),
          }}
        >
          
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            {!isActive && <div className={`${size <= 100 ? 'text-2xl' : 'text-4xl'} leading-none drop-shadow-sm`}>{icon}</div>}
            {(title && !isActive) && (
              <div className={`mt-1 ${size <= 100 ? 'text-[9px]' : 'text-[11px]'} font-mono text-gray-600 opacity-90`}>
                {title}
              </div>
            )}
          </div>
          {isActive && (
            <div className="pointer-events-none absolute inset-0 rounded-sm bg-gray-200 animate-pulse break-all whitespace-normal m-auto flex justify-start items-start leading-tight">
              {selected01}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
            <div className="glitch-rgb absolute inset-0" style={{ zIndex: 1 }} />
            <div className="glitch-outline absolute inset-0" style={{ zIndex: 2 }} />
            <div className="glitch-scanlines absolute inset-0" style={{ zIndex: 3 }} />
          </div>
        </div>

        <div
          // className={FaceClass3}

          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.right(expanded),
          }}
        >
          
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            {!isActive && <div className={`${size <= 100 ? 'text-2xl' : 'text-4xl'} leading-none drop-shadow-sm`}>{icon}</div>}
            {(title && !isActive) && (
              <div className={`mt-1 ${size <= 100 ? 'text-[9px]' : 'text-[11px]'} font-mono text-gray-600 opacity-90`}>
                {title}
              </div>
            )}
          </div>
          {isActive && (
            <div className="pointer-events-none absolute inset-0 rounded-sm bg-gray-200 animate-pulse break-all whitespace-normal m-auto flex justify-start items-start leading-tight">
              {selected01}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
            <div className="glitch-rgb absolute inset-0" style={{ zIndex: 1 }} />
            <div className="glitch-outline absolute inset-0" style={{ zIndex: 2 }} />
            <div className="glitch-scanlines absolute inset-0" style={{ zIndex: 3 }} />
          </div>
        </div>

        {/* The complementary faces fade in and move to -Z, -Y, -X */}
        <div
          // className={FaceClass4}
          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.bottom(expanded),
            opacity: expanded ? 0.96 : 0,
          }}
        >
          
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            {!isActive && <div className={`${size <= 100 ? 'text-2xl' : 'text-4xl'} leading-none drop-shadow-sm`}>{icon}</div>}
            {(title && !isActive) && (
              <div className={`mt-1 ${size <= 100 ? 'text-[9px]' : 'text-[11px]'} font-mono text-gray-600 opacity-90`}>
                {title}
              </div>
            )}
          </div>
          {isActive && (
            <div className="pointer-events-none absolute inset-0 rounded-sm bg-gray-200 animate-pulse break-all whitespace-normal m-auto flex justify-start items-start leading-tight">
              {selected01}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
            <div className="glitch-rgb absolute inset-0" style={{ zIndex: 1 }} />
            <div className="glitch-outline absolute inset-0" style={{ zIndex: 2 }} />
            <div className="glitch-scanlines absolute inset-0" style={{ zIndex: 3 }} />
          </div>
        </div>

        <div
          // className={FaceClass5}

          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.back(expanded),
            opacity: expanded ? 0.96 : 0,
          }}
        >
          
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            {!isActive && <div className={`${size <= 100 ? 'text-2xl' : 'text-4xl'} leading-none drop-shadow-sm`}>{icon}</div>}
            {(title && !isActive) && (
              <div className={`mt-1 ${size <= 100 ? 'text-[9px]' : 'text-[11px]'} font-mono text-gray-600 opacity-90`}>
                {title}
              </div>
            )}
          </div>
          {isActive && (
            <div className="pointer-events-none absolute inset-0 rounded-sm bg-gray-200 animate-pulse break-all whitespace-normal m-auto flex justify-start items-start leading-tight">
              {selected01}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
            <div className="glitch-rgb absolute inset-0" style={{ zIndex: 1 }} />
            <div className="glitch-outline absolute inset-0" style={{ zIndex: 2 }} />
            <div className="glitch-scanlines absolute inset-0" style={{ zIndex: 3 }} />
          </div>
        </div>

        <div
          // className={FaceClass6}

          style={{
            ...faceStyleBase,
            width: s,
            height: s,
            transform: T.left(expanded),
            opacity: expanded ? 0.96 : 0,
          }}
        >
          
          <div className={expanded ? `flex flex-col items-center justify-center text-gray-700` : `hidden`}>
            {!isActive && <div className={`${size <= 100 ? 'text-2xl' : 'text-4xl'} leading-none drop-shadow-sm`}>{icon}</div>}
            {(title && !isActive) && (
              <div className={`mt-1 ${size <= 100 ? 'text-[9px]' : 'text-[11px]'} font-mono text-gray-600 opacity-90`}>
                {title}
              </div>
            )}
          </div>
          {isActive && (
            <div className="pointer-events-none absolute inset-0 rounded-sm bg-gray-200 animate-pulse break-all whitespace-normal m-auto flex justify-start items-start leading-tight">
              {selected01}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
            <div className="glitch-rgb absolute inset-0" style={{ zIndex: 1 }} />
            <div className="glitch-outline absolute inset-0" style={{ zIndex: 2 }} />
            <div className="glitch-scanlines absolute inset-0" style={{ zIndex: 3 }} />
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

      {/* GLITCHES */}
      <style>{`
        /* базовая тряска, короткими рывками */
        @keyframes glitch-jitter {
          0%   { transform: translate3d(0, 0, 0); }
          15%  { transform: translate3d(-5px, 2px, 0); }
          30%  { transform: translate3d(2px, -5px, 0); }
          45%  { transform: translate3d(-1px, -1px, 0); }
          60%  { transform: translate3d(5px, 2px, 0); }
          75%  { transform: translate3d(-2px, 5px, 0); }
          90%  { transform: translate3d(1px, -1px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* бегущая полоса (как CRT scanline) */
        @keyframes glitch-scan {
          0%   { transform: translate3d(0, -100%, 0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate3d(0, 100%, 0); opacity: 0; }
        }

        /* лёгкое мерцание прозрачности линий */
        @keyframes glitch-flicker {
          0%, 100% { opacity: 0; }
          20%, 80% { opacity: 1; }
          40%, 60% { opacity: 0.3; }
        }

        /* RGB split эффект */
        @keyframes glitch-rgb-split {
          0%   { transform: translate3d(0, 0, 0); }
          20%  { transform: translate3d(-10px, 7px, 0); }
          40%  { transform: translate3d(10px, -7px, 0); }
          60%  { transform: translate3d(-10px, -7px, 0); }
          80%  { transform: translate3d(7px, 10px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* когда включён глитч */
        .glitch-face {
          animation: glitch-jitter 300ms ease-in-out infinite;
        }

        /* RGB split по краям: имитируем смещение цветовых каналов box-shadow'ами */
          .glitch-face .glitch-rgb {
            animation: glitch-rgb-split 300ms ease-in-out infinite;
          }
          .glitch-face .glitch-rgb::before,
          .glitch-face .glitch-rgb::after {
            content: '';
            position: absolute; 
            inset: 0;
            border-radius: 2px;
            pointer-events: none;
          }
          /* красно-циановые смещения */
          .glitch-face .glitch-rgb::before {
            box-shadow:
              5px -5px 0 rgba(255, 0, 0, 0.8),
            -5px  5px 0 rgba(0, 255, 255, 0.8),
              7px -7px 0 rgba(255, 0, 0, 0.4),
            -7px  7px 0 rgba(0, 255, 255, 0.4);
          }
          .glitch-face .glitch-rgb::after {
            box-shadow:
            -5px  5px 0 rgba(0, 255, 0, 0.7),
              5px -5px 0 rgba(255, 0, 255, 0.7),
            -7px  7px 0 rgba(0, 255, 0, 0.35),
              7px -7px 0 rgba(255, 0, 255, 0.35);
          }

          /* белые контуры/полосы вокруг грани */
          .glitch-face .glitch-outline {
            mix-blend-mode: screen;
            opacity: 1;
          }
          .glitch-face .glitch-outline::before,
          .glitch-face .glitch-outline::after {
            content: '';
            position: absolute; 
            inset: -10px;
            border: 2px solid rgba(255,255,255,0.6);
            border-radius: 4px;
            pointer-events: none;
          }
          /* второй контур — толще и с прерывистым clip-path для "обрывков" линий */
          .glitch-face .glitch-outline::after {
            inset: -8px;
            border: 2px solid rgba(255,255,255,0.4);
            clip-path: polygon(
              0% 10%, 15% 10%, 15% 0%, 85% 0%, 85% 15%, 100% 15%,
              100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%
            );
            animation: glitch-flicker 300ms ease-in-out infinite;
          }

          /* scanlines сверху вниз во время вспышки */
          .glitch-face .glitch-scanlines {
            background: repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.15) 0px,
              rgba(255,255,255,0.15) 2px,
              transparent 4px,
              transparent 6px
            );
            opacity: 1;
            will-change: transform, opacity;
            animation: glitch-scan 20ms ease-in-out infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Box3D;