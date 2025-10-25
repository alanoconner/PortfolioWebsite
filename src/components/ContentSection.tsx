import { useEffect, useState } from 'react'
import { accentStyles, LanguageKey, portfolioContent } from '../content/portfolioContent'
import { useTypingAnimation } from '../hooks/useTypingAnimation'

type SectionType = 'intro' | 'experience' | 'projects' | 'contact'

type ContentSectionProps = {
  type: SectionType | null
  isActive: boolean
  onClose: () => void
  isMobile: boolean
  language: LanguageKey
}

type TypingTextProps = {
  text: string
  delay?: number
  className?: string
  speed?: number
}

const TypingText: React.FC<TypingTextProps> = ({ text, delay = 0, className, speed = 4 }) => {
  const animatedText = useTypingAnimation(text, speed, delay)
  return <span className={className}>{animatedText}</span>
}

const ContentSection: React.FC<ContentSectionProps> = ({
  type,
  isActive,
  onClose,
  isMobile,
  language,
}) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setShowContent(false)
      return
    }

    const timer = window.setTimeout(() => setShowContent(true), 300)
    return () => window.clearTimeout(timer)
  }, [isActive])

  if (!isActive || !type) {
    return null
  }

  const content = portfolioContent[language]
  const baseClasses =
    'bg-black text-white hover:bg-white border border-white fixed top-2 right-2 sm:top-4 sm:right-4 hover:text-black px-3 py-2 sm:px-4 text-lg sm:text-xl z-30'

  const renderIntro = () => {
    const commandDelay = content.intro.about.length * 5 + 500
    return (
      <div className="space-y-4">
        <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ Info ]</h2>
        <button onClick={onClose} className={baseClasses}>
          X
        </button>
        <div className="bg-black p-6 font-mono text-sm">
          <div className="text-green-400 mb-4">
            <span className="text-cyan-400">$</span> whoami
          </div>
          <div className="text-white space-y-2">
            <p>
              <TypingText text={content.intro.about} delay={0} />
            </p>
          </div>
          <div className="text-white space-y-2">
            <br />
            <span className="text-cyan-400">
              <TypingText text="$" delay={commandDelay} />
            </span>
            <span className="text-green-400">
              <TypingText text=" cat education.txt" delay={commandDelay + 200} />
            </span>
            <br />
            <span>
              <TypingText text="" delay={commandDelay + 400} />
            </span>
            <br />
            <p className="whitespace-pre-line">
              <TypingText text={content.intro.education} delay={commandDelay + 700} />
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderExperience = () => (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ EXPERIENCE LOG ]</h2>
      <button onClick={onClose} className={baseClasses}>
        X
      </button>
      <div className="bg-black p-6 font-mono text-sm">
        <div className="text-green-400 mb-4">
          <span className="text-cyan-400">$</span> cat experience.log
        </div>
        <div className="text-white space-y-3">
          {content.experiences.map((experience, index) => {
            const timing = index * 4200
            const accent = accentStyles[experience.accent]

            return (
              <div key={experience.role} className={`border-l-2 pl-4 ${accent.border}`}>
                <div className={`${accent.text} font-semibold`}>
                  <TypingText text={experience.role} delay={timing} />
                </div>
                <div className="text-gray-400">
                  <TypingText
                    text={experience.timeline}
                    delay={timing + experience.role.length * 5 + 200}
                  />
                </div>
                <div className="text-gray-300 text-xs mt-1 whitespace-pre-line">
                  <TypingText
                    text={experience.details}
                    delay={
                      timing + experience.role.length * 5 + experience.timeline.length * 5 + 400
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ PROJECT REPOSITORY ]</h2>
      <button onClick={onClose} className={baseClasses}>
        X
      </button>
      <div className="bg-black p-6 font-mono text-sm">
        <div className="text-green-400 mb-4">
          <span className="text-cyan-400">$</span> ls projects/
        </div>
        <div className="text-white space-y-3">
          {content.projects.map((project, index) => {
            const baseDelay = index * 800
            return (
              <div
                key={project.name}
                className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-2 hover:bg-gray-800 rounded gap-2 sm:gap-5"
              >
                <span className="text-yellow-400 text-sm sm:text-base">
                  <TypingText text={project.name} delay={baseDelay} />
                </span>
                <span className="text-gray-400 text-xs sm:text-sm break-words">
                  <TypingText
                    text={project.stack}
                    delay={baseDelay + project.name.length * 5 + 50}
                  />
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ CONTACT ]</h2>
      <button onClick={onClose} className={baseClasses}>
        X
      </button>
      <div className="bg-black p-6 font-mono text-sm">
        <div className="text-green-400 mb-4">
          <span className="text-cyan-400">$</span> contact --help
        </div>
        <div className="text-white space-y-3">
          {content.contact.map((entry, index) => (
            <div
              key={entry.label}
              className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4"
            >
              <span className="text-cyan-400 text-sm">
                <TypingText text={entry.label} delay={index * 200} />
              </span>
              <span className="text-yellow-400 text-sm break-words">
                <TypingText text={entry.value} delay={index * 200 + 100} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const contentBySection: Record<SectionType, JSX.Element> = {
    intro: renderIntro(),
    experience: renderExperience(),
    projects: renderProjects(),
    contact: renderContact(),
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 z-20 w-full max-w-[90vw] transform -translate-x-1/2 -translate-y-1/2 ${
        isMobile ? 'max-w-sm px-4 max-h-[90vh] overflow-y-auto' : 'sm:max-w-2xl lg:max-w-4xl'
      }`}
    >
      <div className="bg-black/90 backdrop-blur-sm rounded border-none p-4 w-full">
        {showContent && contentBySection[type]}
      </div>
    </div>
  )
}

export default ContentSection
