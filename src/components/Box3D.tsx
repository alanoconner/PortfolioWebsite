import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'

export type Box3DProps = {
  title?: string
  icon?: ReactNode
  onClick: () => void
  isActive?: boolean
  size?: number
  autoSpin?: boolean
  spinSeed?: number
  spinDurationMs?: number
  overlayOpen: boolean
  isMobile: boolean
}

type FaceConfig = {
  key: string
  transform: (expanded: boolean, halfEdge: number) => string
  fades?: boolean
}

const FACE_CONFIGS: FaceConfig[] = [
  { key: 'top', transform: (expanded, halfEdge) => `translateZ(${expanded ? halfEdge : 0}px)` },
  {
    key: 'front',
    transform: (expanded, halfEdge) =>
      `rotateX(90deg) translateZ(${expanded ? halfEdge : 0}px)`,
  },
  {
    key: 'right',
    transform: (expanded, halfEdge) =>
      `rotateY(90deg) translateZ(${expanded ? halfEdge : 0}px)`,
  },
  {
    key: 'bottom',
    transform: (expanded, halfEdge) => `translateZ(${expanded ? -halfEdge : 0}px)`,
    fades: true,
  },
  {
    key: 'back',
    transform: (expanded, halfEdge) =>
      `rotateX(90deg) translateZ(${expanded ? -halfEdge : 0}px)`,
    fades: true,
  },
  {
    key: 'left',
    transform: (expanded, halfEdge) => `rotateY(90deg) translateZ(${expanded ? -halfEdge : 0}px)`,
    fades: true,
  },
]

const faceStyleBase: CSSProperties = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(229, 233, 235, 0.96))',
  transition: 'transform 450ms ease, opacity 450ms ease',
  willChange: 'transform',
}

const BINARY_LENGTH = 128

const binaryPlaceholder = (length: number) => ' '.repeat(length)

const GlitchLayers = () => (
  <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
    <div className="glitch-rgb absolute inset-0" style={{ zIndex: 1 }} />
    <div className="glitch-outline absolute inset-0" style={{ zIndex: 2 }} />
    <div className="glitch-scanlines absolute inset-0" style={{ zIndex: 3 }} />
  </div>
)

const useRandomGlitch = (options?: { minDelayMs?: number; maxDelayMs?: number; burstMs?: number }) => {
  const { minDelayMs = 800, maxDelayMs = 5200, burstMs = 100 } = options || {}
  const [active, setActive] = useState(false)

  useEffect(() => {
    let triggerTimeout: number | null = null
    let releaseTimeout: number | null = null

    const schedule = () => {
      triggerTimeout = window.setTimeout(() => {
        setActive(true)
        releaseTimeout = window.setTimeout(() => setActive(false), Math.floor(burstMs * (0.8 + Math.random() * 0.6)))
        schedule()
      }, Math.floor(Math.random() * (maxDelayMs - minDelayMs)) + minDelayMs)
    }

    schedule()
    return () => {
      if (triggerTimeout) window.clearTimeout(triggerTimeout)
      if (releaseTimeout) window.clearTimeout(releaseTimeout)
    }
  }, [burstMs, maxDelayMs, minDelayMs])

  return active
}

const Box3D: React.FC<Box3DProps> = ({
  title,
  icon,
  onClick,
  isActive = false,
  size = 160,
  autoSpin = false,
  spinSeed,
  spinDurationMs = 10000,
  overlayOpen,
  isMobile,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [binaryStream, setBinaryStream] = useState(() => binaryPlaceholder(BINARY_LENGTH))
  const glitchOn = useRandomGlitch()

  const jitterSeed = spinSeed ? spinSeed * 3 : 1
  const jitter = ((jitterSeed * 9301 + 49297) % 233280) / 233280
  const duration = useMemo(
    () => Math.round(spinDurationMs * (0.8 + 0.4 * jitter)),
    [spinDurationMs, jitter],
  )
  const animationDelay = useMemo(() => Math.round(-(jitter * duration)), [duration, jitter])

  const halfEdge = size / 2
  const showGlitch = glitchOn && !expanded
  const faceClass = showGlitch ? 'relative overflow-visible will-change-transform glitch-face' : 'relative overflow-visible will-change-transform'

  useEffect(() => {
    if (!expanded) return

    const interval = window.setInterval(() => {
      const nextDigit = Math.round(Math.random()).toString()
      setBinaryStream(prev => {
        const next = `${prev}${nextDigit}`.slice(-BINARY_LENGTH)
        return next.padStart(BINARY_LENGTH, ' ')
      })
    }, 50)

    return () => window.clearInterval(interval)
  }, [expanded])

  useEffect(() => {
    if (!overlayOpen) {
      setExpanded(false)
    }
  }, [overlayOpen])

  useEffect(() => {
    if (!isMobile || isActive) return

    let collapseTimer: number | null = null
    const delay = window.setTimeout(() => {
      if (Math.random() < 0.9) {
        setExpanded(true)
        collapseTimer = window.setTimeout(() => setExpanded(false), 3000)
      }
    }, Math.floor(Math.random() * 5000) + 2000)

    return () => {
      window.clearTimeout(delay)
      if (collapseTimer) window.clearTimeout(collapseTimer)
    }
  }, [isMobile, isActive])

  const renderFaceContent = () => (
    <>
      <div className={expanded ? 'flex flex-col items-center justify-center text-gray-700' : 'hidden'}>
        {!isActive && (
          <div className={`${size <= 100 ? 'text-2xl' : 'text-4xl'} leading-none drop-shadow-sm`}>
            {icon}
          </div>
        )}
        {title && !isActive && (
          <div className={`mt-1 ${size <= 100 ? 'text-[9px]' : 'text-[11px]'} font-mono text-gray-600 opacity-90`}>
            {title}
          </div>
        )}
      </div>
      {isActive && (
        <div className="pointer-events-none absolute inset-0 m-auto flex items-start justify-start rounded-sm bg-gray-200 animate-pulse break-all leading-tight whitespace-pre-line">
          {binaryStream}
        </div>
      )}
      <GlitchLayers />
    </>
  )

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(isActive)}
      onClick={() => {
        setExpanded(true)
        onClick()
      }}
      className="relative inline-block cursor-pointer select-none"
      style={{ perspective: 1000 }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) rotateZ(-15deg)',
          ...(autoSpin
            ? { animation: `box3d-spin-xyz ${duration}ms linear infinite`, animationDelay: `${animationDelay}ms` }
            : undefined),
        }}
      >
        {FACE_CONFIGS.map(face => (
          <div
            key={face.key}
            className={faceClass}
            style={{
              ...faceStyleBase,
              width: size,
              height: size,
              transform: face.transform(expanded, halfEdge),
              opacity: face.fades ? (expanded ? 0.96 : 0) : 1,
            }}
          >
            {renderFaceContent()}
          </div>
        ))}
      </div>

      <style>
        {`@keyframes box3d-spin-xyz {
            from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
            to   { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }`}
      </style>

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
  )
}

export default Box3D
