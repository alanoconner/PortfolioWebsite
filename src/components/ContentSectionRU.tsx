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

const ContentSectionRU: React.FC<ContentSectionProps> = ({ type, isActive, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const [visibleType, setVisibleType] = useState(type);
  const introText = `Full Stack разработчик с более чем 2 годами опыта
                      создания веб-приложений для B2B-сегмента и
                      сферы здравоохранения. Владею Kotlin, Python,
                      TypeScript и инструментами CI/CD. Свободно
                      говорю на английском, японском и русском языках.
                      Обладаю полным циклом навыков — от
                      проектирования до запуска и поддержки
                      приложений.`
  const introEduText = `Институт информационных наук Кюсю,
                        Япония — Data Science (Бакалавриат)
                        Апрель 2021 - Март 2025`
  const experiences = [
    {
      id:0,
      position:"Software Engineer",
      timeAndPlace: "Small Step Co., Ltd • Май 2025 - Настоящее время",
      responsibilities: `Руководил разработкой внутренних и
                          клиентских веб-систем — от идеи до
                          развёртывания в продакшн, с акцентом на
                          масштабируемость и стабильность.
                          
                          Спроектировал архитектуру backend на Kotlin
                          + PostgreSQL для работы с
                          высоконагруженными транзакционными
                          данными.
                          
                          Автоматизировал процесс деплоя с
                          использованием GitHub Actions, Docker и Linux
                          CI/CD, что сократило ручную работу и
                          обеспечило еженедельные релизы.
                          
                          Разрабатывал UI-компоненты на React,
                          улучшив пользовательский опыт в нескольких
                          приложениях.
                          
                          Повысил надёжность системы через покрытие
                          unit -тестами и`,
      color: 'cyan-400'
    },

    {
      id:1,
      position:"Web Developer",
      timeAndPlace: "Small Step Co., Ltd • Апрель 2023 - Май 2025",
      responsibilities: `Создал веб-платформу для обмена
                          документами и цифровой подписи, которая
                          заменила неэффективные ручные процессы
                          между партнёрами.
                          
                          Реализовал инструменты для отслеживания
                          задач и управления заказами, повысив
                          прозрачность операций у B2B-клиентов.
                          
                          Разрабатывал систему учёта медицинского
                          оборудования, используемую в хирургических
                          отделениях, что сократило время на поиск и
                          улучшило контроль.
                          
                          Поддерживал и развёртывал приложения в
                          нескольких окружениях, используя Flask,
                          Vue/Nuxt.js и MySQL, применяя full-stack и
                          DevOps-подходы.`,
      color: 'green-400'
    },
    {
      id:2,
      position:"Стажер",
      timeAndPlace: "Line Fukuoka • Июль 2022",
      responsibilities: `Проводил исследование проблем UX и
                          предложил стратегии автоматизации
                          поддержки пользователей для снижения
                          нагрузки на техподдержку.`,
      color: "yellow-400"
    }
  ]

  const projects = [
    {
      id:0,
      name:"Edaha | B2B Платформа",
      stack: "VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL, Docker",
    },
    {
      id:1,
      name:"SST-S | Система Отслеживания Больничного Оборудования",
      stack: "VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL, Docker",
    },
    {
      id:3,
      name:"AI Outfit Recommender",
      stack: "VueJS, JavaScript, Python, Flask, TensorFlow",
    },
    {
      id:4,
      name:"Zinnia | Система Контроля Продукции",
      stack: "React, TypeScript, Python, Flask, PostgreSQL, Docker",
    },
    {
      id:5,
      name:"IShift | Система Планирования Смен Персонала",
      stack: "React, TypeScript, Python, Django, PostgreSQL, Docker",
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

export default ContentSectionRU;
