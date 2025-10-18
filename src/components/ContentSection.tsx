import React from 'react';

interface ContentSectionProps {
  type: 'intro' | 'experience' | 'projects' | 'contact';
  isActive: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({ type, isActive }) => {
  if (!isActive) return null;

  const renderContent = () => {
    switch (type) {
      case 'intro':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-mono text-cyan-400 mb-4">[ SYSTEM INTRO ]</h2>
            <div className="bg-gray-900 p-6 rounded border border-gray-600 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> whoami
              </div>
              <div className="text-white space-y-2">
                <p>Hello! I'm a passionate developer with expertise in modern web technologies.</p>
                <p>I specialize in creating efficient, scalable applications using cutting-edge tools and frameworks.</p>
                <p>Always learning, always building, always pushing the boundaries of what's possible.</p>
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
            <div className="bg-gray-900 p-6 rounded border border-gray-600 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> cat experience.log
              </div>
              <div className="text-white space-y-3">
                <div className="border-l-2 border-cyan-400 pl-4">
                  <div className="text-cyan-400">Senior Developer</div>
                  <div className="text-gray-400">Company Name • 2022-Present</div>
                  <div className="text-gray-300 text-xs mt-1">Leading development of scalable web applications</div>
                </div>
                <div className="border-l-2 border-green-400 pl-4">
                  <div className="text-green-400">Full Stack Developer</div>
                  <div className="text-gray-400">Previous Company • 2020-2022</div>
                  <div className="text-gray-300 text-xs mt-1">Built and maintained multiple client projects</div>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4">
                  <div className="text-yellow-400">Frontend Developer</div>
                  <div className="text-gray-400">Startup • 2019-2020</div>
                  <div className="text-gray-300 text-xs mt-1">Developed user interfaces and interactive experiences</div>
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
            <div className="bg-gray-900 p-6 rounded border border-gray-600 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> ls -la projects/
              </div>
              <div className="text-white space-y-3">
                <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
                  <span className="text-cyan-400">drwxr-xr-x</span>
                  <span className="text-yellow-400">E-Commerce Platform</span>
                  <span className="text-gray-400">React, Node.js, MongoDB</span>
                </div>
                <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
                  <span className="text-cyan-400">drwxr-xr-x</span>
                  <span className="text-yellow-400">Task Management App</span>
                  <span className="text-gray-400">Vue.js, Express, PostgreSQL</span>
                </div>
                <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
                  <span className="text-cyan-400">drwxr-xr-x</span>
                  <span className="text-yellow-400">Real-time Chat</span>
                  <span className="text-gray-400">Socket.io, React, Redis</span>
                </div>
                <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
                  <span className="text-cyan-400">drwxr-xr-x</span>
                  <span className="text-yellow-400">Portfolio Website</span>
                  <span className="text-gray-400">Next.js, TypeScript, Tailwind</span>
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
            <div className="bg-gray-900 p-6 rounded border border-gray-600 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-cyan-400">$</span> contact --help
              </div>
              <div className="text-white space-y-3">
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400">Email:</span>
                  <span className="text-yellow-400">your.email@example.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400">GitHub:</span>
                  <span className="text-yellow-400">github.com/yourusername</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400">LinkedIn:</span>
                  <span className="text-yellow-400">linkedin.com/in/yourprofile</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400">Twitter:</span>
                  <span className="text-yellow-400">@yourhandle</span>
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
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 max-w-2xl w-full px-4">
      <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-gray-600 p-6 shadow-2xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentSection;
