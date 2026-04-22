import React, { useState, useEffect } from 'react';
import BottomSheet from './BottomSheet';

interface ContentSectionProps {
  type: 'intro' | 'experience' | 'projects' | 'contact';
  isActive: boolean;
  onClose: () => void
  isMobile: boolean
}

// Custom hook for typing animation
const useTypingAnimation = (text: string, speed: number = 50, delay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start the animation after the delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, hasStarted]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setHasStarted(false);
  }, [text]);

  return displayedText;
};

const CONTENT_REVEAL_DELAY = 240;
const CONTENT_HIDE_DELAY = 450;
const experienceAccentClasses: Record<string, { border: string; text: string }> = {
  cyan: { border: 'border-cyan-400', text: 'text-cyan-400' },
  green: { border: 'border-green-400', text: 'text-green-400' },
  yellow: { border: 'border-yellow-400', text: 'text-yellow-400' },
  red: { border: 'border-red-400', text: 'text-red-400' }
};

const ContentSection: React.FC<ContentSectionProps> = ({ type, isActive, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const [visibleType, setVisibleType] = useState(type);
  const introText = `Full-stack Software Engineer with 3+ years of experience building production-ready web applications, automation workflows, and cloud infrastructure. Strong background in Kotlin, Python, TypeScript, AWS, and CI/CD. Trilingual in English, Japanese, and Russian and skilled at delivering reliable solutions across the full development cycle.`
  const introEducation = `Kyushu Institute of Information Sciences, Fukuoka — Data Science (bachelor)
April 2021 - March 2025`
  const introSkills = [
    'Languages: Russian (native), English (fluent), Japanese (fluent)',
    'Programming: Kotlin, Python, TypeScript, JavaScript, Java',
    'Frontend: React, Vue.js, Nuxt.js',
    'Backend: Flask, Django, REST APIs, SpringBoot',
    'Databases: PostgreSQL, MySQL',
    'Cloud/DevOps: AWS, Docker, GitHub Actions, CI/CD, Linux, EC2, ALB, Lambda, Fargate, Cognito',
    'Automation/AI: Playwright, web scraping, workflow automation, LLM APIs, prompt engineering'
  ]
  const experiences = [
    {
      id:0,
      position:"Software Engineer",
      timeAndPlace: "Small Step Co., Ltd., Fukuoka • May 2025 - Present",
      responsibilities: `Led development of internal and client-facing web systems from concept to production, improving scalability and long-term maintainability.
        Designed backend architecture using Kotlin and PostgreSQL to support high-volume transactional workflows.
        Built a stable AWS production environment using Cognito, ALB, Auto Scaling Groups, EC2, PostgreSQL, Lambda, and Fargate for scalable web and serverless services.
        Configured CI/CD pipelines with GitHub Actions for automated production deployments, reducing manual release work by 60% and supporting frequent releases.
        Built responsive React UI components that improved usability and reduced average processing time by 30%.`,
      color: 'cyan'
    },

    {
      id:1,
      position:"Web Developer",
      timeAndPlace: "Small Step Co., Ltd., Fukuoka • April 2023 - May 2025",
      responsibilities: `Delivered a web-based digital signature and document exchange platform that removed manual coordination between partner companies.
        Implemented task tracking and order management tools for B2B clients, improving operational transparency and workflow coordination.
        Developed a hospital equipment tracking system used in surgical units, reducing search time and improving inventory control.
        Maintained and deployed multi-environment applications using Flask, Vue/Nuxt.js, and MySQL, applying strong full-stack and DevOps practices.`,
      color: 'green'
    },
    {
      id:2,
      position:"Automation Engineer",
      timeAndPlace: "Mimamol, Fukuoka • December 2024 - March 2025",
      responsibilities: `Built automated supplier discovery workflows for product sourcing using Python, Playwright, and n8n-style orchestration.
        Integrated AI models into workflow steps and developed prompt engineering approaches for supplier search and data filtering.
        Created web-scraping pipelines that reduced manual supplier research and scraping time by 40%.`,
      color: "yellow"
    },
    {
      id:3,
      position:"Intern",
      timeAndPlace: "LINE Fukuoka, Fukuoka • July 2022",
      responsibilities: `Researched UX pain points and proposed process automation strategies to reduce user support volume.`,
      color: "red"
    }
  ]

  const projects = [
    {
      id:0,
      name:"AI Outfit Recommender",
      meta: "Flask + Python",
      timeframe: "2024",
      highlights: [
        "Built an ML-powered tool that suggests outfit combinations from user-uploaded images."
      ]
    },
    {
      id:1,
      name:'Online School Platform "TeraSchool"',
      meta: "Vue + Flask + MySQL",
      timeframe: "2025",
      highlights: [
        "Developed a web-based school management system designed to support structured learning and streamline course delivery for online education."
      ]
    },
    {
      id:2,
      name:"Smeta Tool",
      meta: "Freelance Project, Remote - Desktop Python Application",
      timeframe: "February 2026 - March 2026",
      highlights: [
        "Built a desktop Python application for construction cost estimation used by the client for upcoming building projects.",
        "Automated calculation workflows and reduced manual cost estimation time by 70% in active client usage."
      ]
    },
    {
      id:3,
      name:"Startup Idea Analysis Agent",
      meta: "Personal Project - LLM + Telegram + Python",
      timeframe: "2026",
      highlights: [
        "Developed a Telegram-connected agent that performs initial niche and market research for startup ideas using LLM APIs and Python."
      ]
    },
    {
      id:4,
      name:"Tender Search Agent",
      meta: "Personal Project - LLM + Playwright + Python",
      timeframe: "2026",
      highlights: [
        "Built an agent that logs into public procurement platforms, searches for matching tenders, analyzes documentation, and sends summarized updates to users.",
        "Used LLM APIs and Playwright to automate contract discovery, document review, and notification workflows."
      ]
    },
  ]

  useEffect(() => {
    if (isActive) {
      setVisibleType(type);
    }
  }, [isActive, type]);

  useEffect(() => {
    if (isActive) {
      // Let the sheet settle before the typing animation starts.
      const timer = setTimeout(() => setShowContent(true), CONTENT_REVEAL_DELAY);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setShowContent(false), CONTENT_HIDE_DELAY);
    return () => clearTimeout(timer);
  }, [isActive]);

  const renderContent = () => {
    const TypingText = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
      const displayedText = useTypingAnimation(text, 4, delay);
      return <span className={className}>{displayedText}</span>;
    };

    switch (visibleType) {
      case 'intro':
        return (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ Info ]</h2>
            <div className="bg-black p-6 border-none font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> whoami
              </div>
              <div className="text-white space-y-2">
                <p><TypingText text={introText} delay={0} /></p>
              </div>
              <div className="text-white space-y-3">
                <br />
                <span className="text-cyan-400">
                  <TypingText text='$' delay={introText.length * 5 + 500} ></TypingText> 
                </span>
                <span className="text-green-400" > 
                  <TypingText text=' cat education.txt' delay={introText.length * 5 + 700} ></TypingText> 
                </span>
                <p className="break-words pt-2">
                  <TypingText text={introEducation} delay={introText.length * 5 + 1100} />
                </p>
                <span className="text-cyan-400">
                  <TypingText text='$' delay={introText.length * 5 + 1900} ></TypingText> 
                </span>
                <span className="text-green-400" > 
                  <TypingText text=' cat skills.txt' delay={introText.length * 5 + 2100} ></TypingText> 
                </span>
                <div className="space-y-2 pt-2">
                  {introSkills.map((skill, index) => (
                    <p key={skill} className="break-words">
                      <TypingText text={`- ${skill}`} delay={introText.length * 5 + 2500 + index * 240} />
                    </p>
                  ))}
                </div>
              </div>
              {/* <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div> */}
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ EXPERIENCE LOG ]</h2>
            <div className="bg-black p-6  font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> cat experience.log
              </div>
              <div className="text-white space-y-3">
              
                {
                  experiences.map((exp, index) => {
                    const baseDelay = index * 4500; // 3 seconds between each experience
                    const accent = experienceAccentClasses[exp.color] ?? experienceAccentClasses.cyan;
                    return (
                      <div key={index} className={`border-l-2 pl-4 ${accent.border}`}>
                        <div className={accent.text}><TypingText text={exp.position} delay={baseDelay} /></div>
                        <div className="text-gray-400"><TypingText text={exp.timeAndPlace} delay={baseDelay + exp.position.length * 5 + 200} /></div>
                        <div className="text-gray-300 text-xs mt-1"><TypingText text={exp.responsibilities} delay={baseDelay + exp.position.length * 5 + exp.timeAndPlace.length * 5 + 400} /></div>
                      </div>
                    )
                  })
                }
              </div>
              {/* <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div> */}
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ PROJECT REPOSITORY ]</h2>
            <div className="bg-black p-6  font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> ls projects/
              </div>
              <div className="text-white space-y-3">
                {
                  projects.map((pr, index) => {
                    const baseDelay = index * 1800;
                    return (
                      <div key={index} className="rounded border border-white/10 p-3 transition-colors hover:bg-gray-800/60">
                        <div className="space-y-1">
                          <div className="text-yellow-400 text-sm sm:text-base break-words">
                            <TypingText text={pr.name} delay={baseDelay} />
                          </div>
                          <div className="text-gray-400 text-xs sm:text-sm break-words">
                            <TypingText text={pr.meta} delay={baseDelay + pr.name.length * 5 + 80} />
                          </div>
                          <div className="text-cyan-400 text-xs break-words">
                            <TypingText text={pr.timeframe} delay={baseDelay + pr.name.length * 5 + pr.meta.length * 5 + 160} />
                          </div>
                        </div>
                        <div className="mt-3 space-y-2 text-gray-300 text-xs sm:text-sm">
                          {pr.highlights.map((highlight, highlightIndex) => (
                            <p key={highlight} className="break-words">
                              <TypingText
                                text={`- ${highlight}`}
                                delay={baseDelay + pr.name.length * 5 + pr.meta.length * 5 + pr.timeframe.length * 5 + 260 + highlightIndex * 320}
                              />
                            </p>
                          ))}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              {/* <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div> */}
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ CONTACT ]</h2>
            <div className="bg-black p-6 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> contact --help
              </div>
              <div className="text-white space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-cyan-400 text-sm"><TypingText text="Email:" delay={0} /></span>
                  <span className="text-yellow-400 text-sm break-words"><TypingText text="akhmadullin01@gmail.com" delay={100} /></span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-cyan-400 text-sm"><TypingText text="GitHub:" delay={300} /></span>
                  <a href="https://github.com/alanoconner" target="_blank" className="text-yellow-400 text-sm break-words"><TypingText text="github.com/alanoconner" delay={400} /></a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-cyan-400 text-sm"><TypingText text="LinkedIn:" delay={500} /></span>
                  <a href="https://linkedin.com/in/akhmadu17in" target="_blank" className="text-yellow-400 text-sm break-words"><TypingText text="linkedin.com/in/akhmadu17in" delay={600} /></a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-cyan-400 text-sm"><TypingText text="Telegram:" delay={800} /></span>
                  <a href="https://t.me/akhmadull_in" target="_blank" className="text-yellow-400 text-sm break-words"><TypingText text="@akhmadull_in" delay={900} /></a>
                </div>
              </div>
              {/* <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div> */}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <BottomSheet isActive={isActive} onClose={onClose}>
      {showContent && renderContent()}
    </BottomSheet>
  );
};

export default ContentSection;
