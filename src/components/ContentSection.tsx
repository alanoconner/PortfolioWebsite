import React, { useState, useEffect } from 'react';

interface ContentSectionProps {
  type: 'intro' | 'experience' | 'projects' | 'contact';
  isActive: boolean;
  onClose: () => void
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

const ContentSection: React.FC<ContentSectionProps> = ({ type, isActive, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const introText = "Full-stack Software Engineer with 2+ years of experience building production-ready web applications for B2B and healthcare domains. Proficient in Kotlin, Vue.js, and CI/CD automation. Trilingual (English, Japanese, Russian) and skilled at delivering reliable solutions across the full development cycle."
  const introEduText = `Kyushu Institute of Information Sciences,
                        Japan — Data Science
                        April 2021 - March 2025`
  const experiences = [
    {
      id:0,
      position:"Software Engineer",
      timeAndPlace: "Small Step Co., Ltd • May 2025 - Present",
      responsibilities: `Led development of internal and client -facing web
        systems from concept to production, ensuring
        scalability and maintainability.
        Designed backend architecture using Kotlin and
        PostgreSQL, supporting high-volume transactional
        data for operational processes.
        Automated deployment with GitHub Actions, Docker,
        and Linux -based CI/CD, reducing manual overhead
        and enabling weekly releases.
        Built responsive UI components in Vue.js, improving
        usability across multiple business apps.
        Enhanced system reliability through comprehensive
        unit testing and continuous integration.`,
      color: 'cyan-400'
    },

    {
      id:1,
      position:"Web Developer",
      timeAndPlace: "Small Step Co., Ltd • April 2023 - May 2025",
      responsibilities: `Delivered a web-based digital signature and
        document exchange platform that eliminated
        inefficient manual workflows between partner
        companies.
        Implemented task tracking and order management
        tools for B2B clients, increasing operational
        transparency and coordination.
        Developed a hospital equipment tracking system
        used in surgical units, reducing search time and
        improving inventory control.
        Maintained and deployed multi-environment
        applications using Flask, Vue/Nuxt.js, and MySQL,
        applying strong full-stack and DevOps skills.`,
      color: 'green-400'
    },
    {
      id:2,
      position:"Intern",
      timeAndPlace: "Line Fukuoka • July 2022",
      responsibilities: `Conducted research on UX pain points and proposed
        process automation strategies to reduce user support
        volume.`,
      color: "yellow-400"
    }
  ]

  const projects = [
    {
      id:0,
      name:"Edaha | B2B Platform",
      stack: "VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL",
    },
    {
      id:1,
      name:"SST-S | Hospital Equipment Tracking System",
      stack: "VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL",
    },
    {
      id:3,
      name:"AI Outfit Recommender",
      stack: "VueJS, JavaScript, Python, Flask, TensorFlow",
    },
    {
      id:4,
      name:"Zinnia | Product Management System for Factories",
      stack: "React, TypeScript, Python, Flask, PostgreSQL",
    },
    {
      id:5,
      name:"IShift | Nurse Shift Scheduling System",
      stack: "React, TypeScript, Python, Django, PostgreSQL",
    },
  ]

  useEffect(() => {
    if (isActive) {
      // Delay showing content to allow slide animation to start
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isActive]);

  if (!isActive) return null;

  const renderContent = () => {
    const TypingText = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
      const displayedText = useTypingAnimation(text, 5, delay);
      return <span className={className}>{displayedText}</span>;
    };

    switch (type) {
      case 'intro':
        return (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-2xl font-mono text-white mb-4">[ Info ]</h2>
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-2 right-2 sm:top-4 sm:right-4 hover:text-black px-3 py-2 sm:px-4 text-lg sm:text-xl z-30"
            >
              X
            </button>
            <div className="bg-black p-6 border-none font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> whoami
              </div>
              <div className="text-white space-y-2">
                <p><TypingText text={introText} delay={0} /></p>
              </div>
              <div className="text-white space-y-2">
                <br />
                <span className="text-cyan-400">
                  <TypingText text='$' delay={introText.length * 5 + 500} ></TypingText> 
                </span>
                <span className="text-green-400" > 
                  <TypingText text=' cat education.txt' delay={introText.length * 5 + 700} ></TypingText> 
                </span>
                <br />
                <span> <TypingText text='' delay={introText.length * 5 + 1000} /></span><br />
                <p><TypingText text={introEduText} delay={introText.length * 5 + 1300} /></p>
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
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-2 right-2 sm:top-4 sm:right-4 hover:text-black px-3 py-2 sm:px-4 text-lg sm:text-xl z-30"
            >
              X
            </button>
            <div className="bg-black p-6  font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> cat experience.log
              </div>
              <div className="text-white space-y-3">
              
                {
                  experiences.map((exp, index) => {
                    const baseDelay = index * 4500; // 3 seconds between each experience
                    return (
                      <div key={index} className={`border-l-2 border-${exp.color} pl-4`}>
                        <div className={"text-"+exp.color}><TypingText text={exp.position} delay={baseDelay} /></div>
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
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-2 right-2 sm:top-4 sm:right-4 hover:text-black px-3 py-2 sm:px-4 text-lg sm:text-xl z-30"
            >
              X
            </button>
            <div className="bg-black p-6  font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> ls projects/
              </div>
              <div className="text-white space-y-3">
                {
                  projects.map((pr, index) => {
                    const baseDelay = index * 800; // 2 seconds between each project
                    return (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-2 hover:bg-gray-800 rounded gap-2 sm:gap-5">
                        <span className="text-yellow-400 text-sm sm:text-base"><TypingText text={pr.name} delay={baseDelay} /></span>
                        <span className="text-gray-400 text-xs sm:text-sm break-words"><TypingText text={pr.stack} delay={baseDelay + pr.name.length * 5 + 50} /></span>
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
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-2 right-2 sm:top-4 sm:right-4 hover:text-black px-3 py-2 sm:px-4 text-lg sm:text-xl z-30"
            >
              X
            </button>
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
                  <span className="text-yellow-400 text-sm break-words"><TypingText text="github.com/alanoconner" delay={400} /></span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-cyan-400 text-sm"><TypingText text="LinkedIn:" delay={500} /></span>
                  <span className="text-yellow-400 text-sm break-words"><TypingText text="linkedin.com/in/akhmadu17in" delay={600} /></span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-cyan-400 text-sm"><TypingText text="Telegram:" delay={800} /></span>
                  <span className="text-yellow-400 text-sm break-words"><TypingText text="@akhmadull_in" delay={900} /></span>
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
    <div 
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-sm sm:max-w-2xl lg:max-w-4xl px-4 max-h-[90vh] overflow-y-auto`}
    >
      <div
        className="bg-black/90 backdrop-blur-sm rounded border-none p-4 w-full"
      >
        {showContent && renderContent()}
      </div>
    </div>
  );
};

export default ContentSection;
