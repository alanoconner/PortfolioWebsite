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

const ContentSectionRU: React.FC<ContentSectionProps> = ({ type, isActive, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const [visibleType, setVisibleType] = useState(type);
  const introText = `Software Engineer с более чем 3 годами опыта разработки B2B-продуктов, AWS-инфраструктуры и AI-автоматизации. Веду системы от архитектуры до продакшна, включая платформу обмена документами, которой пользуются 250+ компаний. Также создаю LLM-агентов и инструменты для разработчиков. Свободно владею английским, японским и русским языками.`
  const introEducation = `Институт информационных наук Кюсю, Фукуока — Data Science (бакалавриат)
Апрель 2021 - Март 2025
Сертификаты Anthropic: Claude Code in Action (март 2026); Claude with the Anthropic API (апрель 2026)`
  const introSkills = [
    'Языки: русский (родной), английский (свободно), японский (свободно)',
    'Программирование: Kotlin, Python, TypeScript, JavaScript, Java',
    'Frontend: React, Vue.js, Nuxt.js, библиотеки компонентов',
    'Backend: Kotlin, Python, Java, TypeScript, Spring Boot, Flask, Django, REST APIs',
    'Базы данных: PostgreSQL, MySQL, профилирование и оптимизация запросов',
    'Cloud/DevOps: AWS, Docker, GitHub Actions, CI/CD, мониторинг, Linux, EC2, ALB, Lambda, Fargate, Cognito',
    'Автоматизация/AI: MCP, LLM APIs, оркестрация агентов, Yjs/CRDTs, Playwright, web scraping, workflow automation, prompt engineering'
  ]
  const experiences = [
    {
      id:0,
      position:"Software Engineer",
      timeAndPlace: "Small Step Co., Ltd., Фукуока • Май 2025 - Настоящее время",
      responsibilities: `Развернул внутренний MCP-сервер в инфраструктуре компании и интегрировал его с облачной LLM, привязав ответы к внутренним данным и сократив время на исследование ошибок и анализ данных.
                          Сократил рутинную нагрузку команды с помощью AI-автоматизации, освободив разработчиков для более сложных задач и стратегических приоритетов.
                          Спроектировал и эксплуатировал AWS production-инфраструктуру с Cognito, ALB, Auto Scaling Groups, EC2, PostgreSQL, Lambda и Fargate, включая мониторинг нескольких активных B2B-клиентов.
                          Руководил разработкой внутренних и клиентских веб-систем от идеи до продакшна, повышая масштабируемость и долгосрочную поддерживаемость.
                          Спроектировал backend-архитектуру на Kotlin и PostgreSQL для поддержки высоконагруженных транзакционных процессов; профилировал и переписал критичные запросы, сократив среднее время отклика на ~30% под продакшн-нагрузкой.
                          Настроил CI/CD пайплайны на GitHub Actions для автоматизированных production-деплоев, сократив ручную работу при релизах на 60% и поддержав частые поставки.
                          Разработал библиотеку React-компонентов, используемую в 3 клиентских продуктах, стандартизировав UI-паттерны, сократив объём работы над отдельными фичами и ускорив онбординг новых разработчиков.`,
      color: 'cyan'
    },

    {
      id:1,
      position:"Web Developer",
      timeAndPlace: "Small Step Co., Ltd., Фукуока • Апрель 2023 - Май 2025",
      responsibilities: `Разработал веб-платформу для цифровой подписи и обмена документами — сейчас используется 250+ компаниями — устранив ручную координацию между компаниями-партнёрами.
                          Реализовал инструменты отслеживания задач и управления заказами для B2B-клиентов, повысив прозрачность операций и координацию рабочих процессов.
                          Создал систему отслеживания больничного оборудования, развёрнутую в 3+ больницах, дав хирургическим командам видимость оборудования в реальном времени и сократив задержки при подготовке.
                          Вырос от исполнения задач до самостоятельного владения фичами: собирал требования, предлагал технические решения и доводил их до продакшна без контроля.`,
      color: 'green'
    },
    {
      id:2,
      position:"Automation Engineer (Part-time)",
      timeAndPlace: "Mimamol, Фукуока • Декабрь 2024 - Март 2025",
      responsibilities: `Создал pipeline поиска поставщиков на Python и Playwright для поиска, фильтрации и оценки компаний, сократив время исследования примерно на 40% за один цикл sourcing.
                          Построил автоматизированные workflow для поиска поставщиков в задачах product sourcing с использованием Python, Playwright и orchestration в стиле n8n.
                          Интегрировал AI-модели в отдельные шаги процесса и разработал подходы prompt engineering для поиска поставщиков и фильтрации данных.
                          Внедрил LLM-скоринг в 3 повторяющихся аналитических процесса, заменив ручную проверку структурированным AI-выводом.
                          Создал web-scraping пайплайны, которые сократили время ручного поиска поставщиков и сбора данных на 40%.`,
      color: "yellow"
    },
    {
      id:3,
      position:"UX Research стажер",
      timeAndPlace: "LINE Fukuoka, Фукуока • Июль 2022",
      responsibilities: `Исследовал UX-болевые точки и предложил стратегии автоматизации процессов для снижения нагрузки на пользовательскую поддержку.`,
      color: "red"
    }
  ]

  const projects = [
    {
      id:0,
      name:"Agent Sync Layer",
      meta: "Personal Project - Yjs/CRDTs + Git Worktrees + MCP",
      timeframe: "2026",
      highlights: [
        "Создал слой синхронизации для параллельно работающих агентов Codex и Claude Code на базе Yjs CRDT и изолированных Git worktree: независимые текстовые изменения объединяются, а устаревшие пересекающиеся изменения отклоняются.",
        "Реализовал надёжное восстановление после сбоев, валидацию перед интеграцией и поэтапный merge workflow; предоставил SDK и MCP-прокси для подключения дополнительных агентов."
      ]
    },
    {
      id:1,
      name:"Tender Search Agent",
      meta: "Personal Project - LLM + Playwright + Python",
      timeframe: "2026",
      highlights: [
        "Создал агента, который входит на платформы государственных закупок, ищет подходящие тендеры, анализирует документацию и отправляет пользователям краткие Telegram-уведомления.",
        "Использовал LLM APIs и Playwright для автоматизации многочасового ежедневного поиска контрактов, анализа документов и уведомлений; система активно используется."
      ]
    },
    {
      id:2,
      name:"Construction Company Management System",
      meta: "Django + React + TypeScript + PostgreSQL",
      timeframe: "2026",
      highlights: [
        "Разработал активно используемую систему для учёта персонала и рабочего времени, мониторинга объектов, документооборота, контрагентов, материалов, поставщиков и доставок.",
        "Сократил время поиска документов на 60%, централизовав данные об объектах, персонале и документах; система активно используется и постоянно расширяется."
      ]
    },
    {
      id:3,
      name:"Smeta Tool",
      meta: "Freelance Project, Remote - Desktop Python Application",
      timeframe: "Февраль 2026 - Март 2026",
      highlights: [
        "Разработал десктопное Python-приложение для расчета строительных смет, которое клиент использует для будущих строительных проектов.",
        "Автоматизировал расчеты и сократил время ручной оценки стоимости на 70% при реальном использовании клиентом."
      ]
    },
    {
      id:4,
      name:"Startup Idea Analysis Agent",
      meta: "Personal Project - LLM + Telegram + Python",
      timeframe: "2026",
      highlights: [
        "Разработал агента, подключенного к Telegram, который выполняет первичный анализ ниши и рынка для стартап-идей с использованием LLM APIs и Python."
      ]
    },
    {
      id:5,
      name:'Online School Platform "TeraSchool"',
      meta: "Vue + Flask + MySQL",
      timeframe: "2025",
      highlights: [
        "Разработал веб-систему управления онлайн-школой, предназначенную для поддержки структурированного обучения и упрощения процесса проведения курсов."
      ]
    },
    {
      id:6,
      name:"AI Outfit Recommender",
      meta: "Flask + Python",
      timeframe: "2024",
      highlights: [
        "Создал ML-инструмент, который предлагает сочетания одежды на основе загруженных пользователем изображений."
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
                  <span className="text-cyan-400 text-sm"><TypingText text="Телефон:" delay={200} /></span>
                  <a href="tel:+817075886879" className="text-yellow-400 text-sm break-words"><TypingText text="+81 (707) 588-6879" delay={300} /></a>
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
