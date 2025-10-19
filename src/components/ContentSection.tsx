import React, { useState, useEffect } from 'react';

interface ContentSectionProps {
  type: 'intro' | 'experience' | 'projects' | 'contact';
  isActive: boolean;
  onClose: () => void
}

// Custom hook for typing animation
const useTypingAnimation = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
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
        color: "cyan-400"
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
        color: "green-400"
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
    const TypingText = ({ text, className = "" }: { text: string; className?: string }) => {
      const displayedText = useTypingAnimation(text, 5);
      return <span className={className}>{displayedText}</span>;
    };

    switch (type) {
      case 'intro':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-mono text-white mb-4">[ Info ]</h2>
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-0 right-0 hover:text-black px-4 py-2 text-xl"
            >
              X
            </button>
            <div className="bg-black p-6 border-none font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> whoami
              </div>
              <div className="text-white space-y-2">
                <p><TypingText text={introText} /></p>
              </div>
              <div className="text-white space-y-2">
                <br /><span className="text-cyan-400">$</span><span className="text-green-400"> cat education.txt</span><br />
                <span>---------------------------------------------</span><br />
                <p><TypingText text={introEduText} /></p>
              </div>
              <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div>
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-mono text-white mb-4">[ EXPERIENCE LOG ]</h2>
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-0 right-0 hover:text-black px-4 py-2 text-xl"
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
                    return (
                      <div key={index} className={`border-l-2 border-${exp.color} pl-4`}>
                        <div className={"text-"+exp.color}><TypingText text={exp.position} /></div>
                        <div className="text-gray-400"><TypingText text={exp.timeAndPlace} /></div>
                        <div className="text-gray-300 text-xs mt-1"><TypingText text={exp.responsibilities} /></div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div>
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-mono text-white mb-4">[ PROJECT REPOSITORY ]</h2>
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-0 right-0 hover:text-black px-4 py-2 text-xl"
            >
              X
            </button>
            <div className="bg-black p-6  font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> ls projects/
              </div>
              <div className="text-white space-y-3 text-nowrap ">
                {
                  projects.map((pr, index) => (
                    <div key={index} className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded justify-between">
                      <span className="text-yellow-400"><TypingText text={pr.name} /></span>
                      <span className="text-gray-400"><TypingText text={pr.stack} /></span>
                    </div>
                  ))
                }
              </div>
              <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-mono text-white mb-4">[ CONTACT ]</h2>
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-0 right-0 hover:text-black px-4 py-2 text-xl"
            >
              X
            </button>
            <div className="bg-black p-6 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> contact --help
              </div>
              <div className="text-white space-y-3">
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400"><TypingText text="Email:" /></span>
                  <span className="text-yellow-400"><TypingText text="akhmadullin01@gmail.com" /></span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400"><TypingText text="GitHub:" /></span>
                  <span className="text-yellow-400"><TypingText text="github.com/alanoconner" /></span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400"><TypingText text="LinkedIn:" /></span>
                  <span className="text-yellow-400"><TypingText text="linkedin.com/in/akhmadu17in" /></span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400"><TypingText text="Telegram:" /></span>
                  <span className="text-yellow-400"><TypingText text="@akhmadull_in" /></span>
                </div>
              </div>
              <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-fit px-4`}
    >
      <div
        className="bg-black/90 backdrop-blur-sm rounded border-none p-4"
      >
        {showContent && renderContent()}
      </div>
    </div>
  );
};

export default ContentSection;
