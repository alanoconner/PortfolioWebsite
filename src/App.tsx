import { useEffect, useRef, useState } from 'react'
import Box3D from './components/Box3D'
import ContentSection from './components/ContentSection'

// Simple Perlin noise implementation
class PerlinNoise {
  private p: number[]
  private permutation: number[] = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]
  
  constructor() {
    this.p = new Array(512)
    
    for (let i = 0; i < 256; i++) {
      this.p[256 + i] = this.p[i] = this.permutation[i]
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a)
  }

  private grad(hash: number, x: number, y: number, z: number): number {
    const h = hash & 15
    const u = h < 8 ? x : y
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  noise(x: number, y: number, z: number = 0): number {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    const Z = Math.floor(z) & 255

    x -= Math.floor(x)
    y -= Math.floor(y)
    z -= Math.floor(z)

    const u = this.fade(x)
    const v = this.fade(y)
    const w = this.fade(z)

    const A = this.p[X] + Y
    const AA = this.p[A] + Z
    const AB = this.p[A + 1] + Z
    const B = this.p[X + 1] + Y
    const BA = this.p[B] + Z
    const BB = this.p[B + 1] + Z

    return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z),
      this.grad(this.p[BA], x - 1, y, z)),
      this.lerp(u, this.grad(this.p[AB], x, y - 1, z),
        this.grad(this.p[BB], x - 1, y - 1, z))),
      this.lerp(v, this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1),
        this.grad(this.p[BA + 1], x - 1, y, z - 1)),
        this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1),
          this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))))
  }
}

function App(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const perlinRef = useRef<PerlinNoise>(new PerlinNoise())
  
  // Navigation state
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Box data
  const boxes = [
    { id: 'intro', title: 'INTRO', icon: '>_' },
    { id: 'experience', title: 'EXP', icon: '{}' },
    { id: 'projects', title: 'PROJ', icon: '[]' },
    { id: 'contact', title: 'CONTACT', icon: '@' }
  ]
  
  const handleBoxClick = (boxId: string) => {
    setActiveSection(activeSection === boxId ? null : boxId)
  }

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // ASCII characters for the noise effect
    const asciiChars = '@:;+. ,*?%S#'
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // ASCII noise animation
    const animate = () => {
      // Clear canvas with off-white background
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Adjust character size based on screen size for better mobile performance
      const isMobileScreen = window.innerWidth < 640
      const charWidth = isMobileScreen ? 10 : 8
      const charHeight = isMobileScreen ? 15 : 12
      
      // Set font for ASCII characters based on screen size
      ctx.font = isMobileScreen ? '15px Courier New, monospace' : '12px Courier New, monospace'
      ctx.fillStyle = '#ffffff95'
      const cols = Math.floor(canvas.width / charWidth)
      const rows = Math.floor(canvas.height / charHeight)
      
      const time = Date.now() * (isMobileScreen ? 0.0003 : 0.0005) // Even slower animation on mobile
      const scale = isMobileScreen ? 0.03 : 0.02 // Larger scale on mobile for fewer calculations
      
      // Create Perlin noise patterns
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          // Multiple layers of Perlin noise for complexity
          const noise1 = perlinRef.current.noise(x * scale, y * scale, time)
          const noise2 = perlinRef.current.noise(x * scale * 2, y * scale * 2, time * 0.5)
          const noise3 = perlinRef.current.noise(x * scale * 0.5, y * scale * 0.5, time * 2)
          
          // Combine noise layers
          const combinedNoise = (noise1 + noise2 * 0.5 + noise3 * 0.25) / 1.75
          
          // Map noise value to ASCII character
          const normalizedNoise = (combinedNoise + 1) / 2 // Convert from [-1,1] to [0,1]
          const charIndex = Math.floor(normalizedNoise * (asciiChars.length - 1))
          const char = asciiChars[charIndex]
          
          // Add some randomness for organic feel
          if (Math.random() < 0.05) {
            const randomChar = asciiChars[Math.floor(Math.random() * asciiChars.length)]
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
      
      {/* System Status */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 bg-black/80 text-white p-2 sm:p-3 font-mono text-xs sm:text-sm z-10">
        {isMobile ? "[ SOFTWARE ENGINEER ]" : "[ SYSTEM ONLINE ]" } 
      </div>

      {/* Language */}
      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/80 text-white p-2 sm:p-3 font-mono text-md sm:text-sm z-10 w-28">
        <div className='flex w-full items-center justify-between'>
          <a href="https://akhmadull.in" className={`${location.pathname === "https://akhmadull.in" ? "underline" : ""}`}>EN</a><span>/</span>
          <a href="https://ru.akhmadull.in" className={`${location.pathname.includes("ru.") ? "underline" : ""}`}>RU</a><span>/</span>
          <a href="https://jp.akhmadull.in" className={`${location.pathname.includes("jp.") ? "underline" : ""}`}>JP</a>
        </div>
        

      </div>
      
      {/* 3D Boxes Container - Centered */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4 ${isMobile && "h-full px-10 py-8"}`}>
        <div className={`flex flex-wrap gap-4 sm:gap-8 w-full justify-around items-center ${isMobile && "h-full justify-between gap-10"} `}>
          {boxes.map((box, index) => (
            <Box3D
              key={box.id}
              autoSpin={true}
              spinSeed={index}
              title={box.title}
              icon={box.icon}
              onClick={() => handleBoxClick(box.id)}
              isActive={activeSection === box.id}
              windowClosed={!!activeSection}
              size={isMobile ? 100 : 160}
            />
          ))}
        </div>
      </div>
      
      {/* Content Section */}
      <ContentSection 
        type={activeSection as 'intro' | 'experience' | 'projects' | 'contact'} 
        isActive={!!activeSection} 
        onClose={() => setActiveSection(null)}
        isMobile={isMobile}
      />
            
    </div>
  )
}

export default App
