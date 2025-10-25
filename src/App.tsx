import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import type { JSX } from 'react'
import Box3D from './components/Box3D'
import ContentSection from './components/ContentSection'
import { LanguageKey } from './content/portfolioContent'
import { PerlinNoise } from './utils/perlinNoise'

const ASCII_CHARS = '@:;+. ,*?%S#'
const MOBILE_BREAKPOINT = 640

const BOXES = [
  { id: 'intro', title: 'INTRO', icon: '>_' },
  { id: 'experience', title: 'EXP', icon: '{}' },
  { id: 'projects', title: 'PROJ', icon: '[]' },
  { id: 'contact', title: 'CONTACT', icon: '@' },
] as const

type BoxId = (typeof BOXES)[number]['id']

function App(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const perlinRef = useRef<PerlinNoise>(new PerlinNoise())

  const [activeSection, setActiveSection] = useState<BoxId | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [language, setLanguage] = useState<LanguageKey>('en')

  const boxes = useMemo(() => BOXES, [])

  const handleBoxClick = (boxId: BoxId) => {
    setActiveSection(prev => (prev === boxId ? null : boxId))
  }

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const update = () => setIsMobile(query.matches)

    update()
    query.addEventListener('change', update)

    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const isMobileScreen = window.innerWidth < MOBILE_BREAKPOINT
      const charWidth = isMobileScreen ? 10 : 8
      const charHeight = isMobileScreen ? 15 : 12
      
      ctx.font = isMobileScreen ? '15px Courier New, monospace' : '12px Courier New, monospace'
      ctx.fillStyle = '#ffffff95'
      const cols = Math.floor(canvas.width / charWidth)
      const rows = Math.floor(canvas.height / charHeight)
      
      const time = Date.now() * (isMobileScreen ? 0.0003 : 0.0005)
      const scale = isMobileScreen ? 0.03 : 0.02
      const noise = perlinRef.current
      
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const noise1 = noise.noise(x * scale, y * scale, time)
          const noise2 = noise.noise(x * scale * 2, y * scale * 2, time * 0.5)
          const noise3 = noise.noise(x * scale * 0.5, y * scale * 0.5, time * 2)
          
          const combinedNoise = (noise1 + noise2 * 0.5 + noise3 * 0.25) / 1.75
          
          const normalizedNoise = (combinedNoise + 1) / 2
          const charIndex = Math.floor(normalizedNoise * (ASCII_CHARS.length - 1))
          const char = ASCII_CHARS[charIndex]
          
          if (Math.random() < 0.05) {
            const randomChar = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
            ctx.fillText(randomChar, x * charWidth, y * charHeight)
          } else {
            ctx.fillText(char, x * charWidth, y * charHeight)
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [])

  return (
    <div className="min-h-screen relative bg-black">
      {/* ASCII Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 bg-black/80 text-white p-2 sm:p-3 font-mono text-xs sm:text-sm z-10 max-w-[calc(100vw-4rem)] sm:max-w-none">
        <span className="hidden sm:inline">[ AKHMADULLIN AZAMAT / SOFTWARE ENGINEER ]</span>
        <span className="sm:hidden">[ AKHMADULLIN AZAMAT ]</span>
      </div>
      
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 bg-black/80 text-white p-2 sm:p-3 font-mono text-xs sm:text-sm z-10">
        {isMobile ? "[ SOFTWARE ENGINEER ]" : "[ SYSTEM ONLINE ]" } 
      </div>

      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/80 text-white p-2 sm:p-3 font-mono text-xs sm:text-sm z-100 w-28">
        <div className="flex w-full items-center justify-between">
          {( ['en', 'ru', 'jp'] as LanguageKey[] ).map((code, index, array) => (
            <Fragment key={code}>
              <button
                type="button"
                className="border-none shadow-none w-fit uppercase"
                onClick={() => setLanguage(code)}
                aria-pressed={language === code}
              >
                <span className={language === code ? 'underline underline-offset-4' : ''}>
                  {code}
                </span>
              </button>
              {index < array.length - 1 && <span>/</span>}
            </Fragment>
          ))}
        </div>
      </div>
      
      <div className={`fixed top-1/2 left-1/2 z-20 w-full px-4 transform -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'h-full px-10 py-8' : ''}`}>
        <div className={`flex flex-wrap justify-around items-center w-full gap-4 sm:gap-8 ${isMobile ? 'h-full justify-between gap-10' : ''}`}>
          {boxes.map((box, index) => (
            <Box3D
              key={box.id}
              autoSpin={true}
              spinSeed={index}
              title={box.title}
              icon={box.icon}
              onClick={() => handleBoxClick(box.id)}
              isActive={activeSection === box.id}
              overlayOpen={Boolean(activeSection)}
              size={isMobile ? 100 : 160}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
      
      <ContentSection
        type={activeSection}
        isActive={Boolean(activeSection)}
        onClose={() => setActiveSection(null)}
        isMobile={isMobile}
        language={language}
      />
            
    </div>
  )
}

export default App
