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
              <div className="text-green-400 mt-4">
                <span className="text-cyan-400">$</span> _
              </div>
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-mono text-cyan-400 mb-4">[ EXPERIENCE LOG ]</h2>
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
                <div className="border-l-2 border-cyan-400 pl-4">
                  <div className="text-cyan-400"><TypingText text="Senior Developer" /></div>
                  <div className="text-gray-400"><TypingText text="Company Name • 2022-Present" /></div>
                  <div className="text-gray-300 text-xs mt-1"><TypingText text="Leading development of scalable web applications" /></div>
                </div>
                <div className="border-l-2 border-green-400 pl-4">
                  <div className="text-green-400"><TypingText text="Full Stack Developer" /></div>
                  <div className="text-gray-400"><TypingText text="Previous Company • 2020-2022" /></div>
                  <div className="text-gray-300 text-xs mt-1"><TypingText text="Built and maintained multiple client projects" /></div>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4">
                  <div className="text-yellow-400"><TypingText text="Frontend Developer" /></div>
                  <div className="text-gray-400"><TypingText text="Startup • 2019-2020" /></div>
                  <div className="text-gray-300 text-xs mt-1"><TypingText text="Developed user interfaces and interactive experiences" /></div>
                </div>
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
            <h2 className="text-2xl font-mono text-cyan-400 mb-4">[ PROJECT REPOSITORY ]</h2>
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-0 right-0 hover:text-black px-4 py-2 text-xl"
            >
              X
            </button>
            <div className="bg-gray-900 p-6 rounded border border-gray-600 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> ls -la projects/
              </div>
              <div className="text-white space-y-3">
                <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
                  <span className="text-cyan-400"><TypingText text="drwxr-xr-x" /></span>
                  <span className="text-yellow-400"><TypingText text="E-Commerce Platform" /></span>
                  <span className="text-gray-400"><TypingText text="React, Node.js, MongoDB" /></span>
                </div>
                <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
                  <span className="text-cyan-400"><TypingText text="drwxr-xr-x" /></span>
                  <span className="text-yellow-400"><TypingText text="Task Management App" /></span>
                  <span className="text-gray-400"><TypingText text="Vue.js, Express, PostgreSQL" /></span>
                </div>
                <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
                  <span className="text-cyan-400"><TypingText text="drwxr-xr-x" /></span>
                  <span className="text-yellow-400"><TypingText text="Real-time Chat" /></span>
                  <span className="text-gray-400"><TypingText text="Socket.io, React, Redis" /></span>
                </div>
                <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
                  <span className="text-cyan-400"><TypingText text="drwxr-xr-x" /></span>
                  <span className="text-yellow-400"><TypingText text="Portfolio Website" /></span>
                  <span className="text-gray-400"><TypingText text="Next.js, TypeScript, Tailwind" /></span>
                </div>
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
            <h2 className="text-2xl font-mono text-cyan-400 mb-4">[ CONTACT TERMINAL ]</h2>
            <button
              onClick={()=> onClose()}
              className="bg-black text-white hover:bg-white border border-white fixed top-0 right-0 hover:text-black px-4 py-2 text-xl"
            >
              X
            </button>
            <div className="bg-gray-900 p-6 rounded border border-gray-600 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> contact --help
              </div>
              <div className="text-white space-y-3">
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400"><TypingText text="Email:" /></span>
                  <span className="text-yellow-400"><TypingText text="your.email@example.com" /></span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400"><TypingText text="GitHub:" /></span>
                  <span className="text-yellow-400"><TypingText text="github.com/yourusername" /></span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400"><TypingText text="LinkedIn:" /></span>
                  <span className="text-yellow-400"><TypingText text="linkedin.com/in/yourprofile" /></span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400"><TypingText text="Twitter:" /></span>
                  <span className="text-yellow-400"><TypingText text="@yourhandle" /></span>
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
      className={`fixed top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 max-w-2xl w-full px-4 transition-all duration-500 ease-out ${
        isActive 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0'
      }`}
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
