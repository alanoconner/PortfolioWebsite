export type LanguageKey = 'en' | 'ru' | 'jp'

type AccentKey = 'cyan' | 'green' | 'yellow'

type ExperienceEntry = {
  role: string
  timeline: string
  details: string
  accent: AccentKey
}

type ProjectEntry = {
  name: string
  stack: string
}

type ContactEntry = {
  label: string
  value: string
}

type PortfolioContent = {
  intro: {
    about: string
    education: string
  }
  experiences: ExperienceEntry[]
  projects: ProjectEntry[]
  contact: ContactEntry[]
}

const ENGLISH_CONTENT: PortfolioContent = {
  intro: {
    about:
      'Full-stack Software Engineer with 2+ years of experience building production-ready web applications for B2B and healthcare domains. Proficient in Kotlin, Vue.js, and CI/CD automation. Trilingual (English, Japanese, Russian) and skilled at delivering reliable solutions across the full development cycle.',
    education:
      'Kyushu Institute of Information Sciences, Japan — Data Science\nApril 2021 - March 2025',
  },
  experiences: [
    {
      role: 'Software Engineer',
      timeline: 'Small Step Co., Ltd • May 2025 - Present',
      details: [
        'Led development of internal and client-facing web systems from concept to production, ensuring scalability and maintainability.',
        'Designed backend architecture using Kotlin and PostgreSQL that supports high-volume transactional data for operational processes.',
        'Automated deployments with GitHub Actions, Docker, and Linux-based CI/CD, reducing manual effort and enabling weekly releases.',
        'Built responsive UI components in Vue.js, improving usability across multiple business applications.',
        'Strengthened system reliability through comprehensive unit testing and continuous integration.',
      ].join('\n'),
      accent: 'cyan',
    },
    {
      role: 'Web Developer',
      timeline: 'Small Step Co., Ltd • April 2023 - May 2025',
      details: [
        'Delivered a web-based digital signature and document exchange platform that replaced inefficient manual workflows between partner companies.',
        'Implemented task tracking and order management tools for B2B clients, increasing operational transparency and coordination.',
        'Developed a hospital equipment tracking system used in surgical units, reducing search time and improving inventory control.',
        'Maintained and deployed multi-environment applications using Flask, Vue/Nuxt.js, and MySQL with a strong full-stack and DevOps mindset.',
      ].join('\n'),
      accent: 'green',
    },
    {
      role: 'Intern',
      timeline: 'LINE Fukuoka • July 2022',
      details:
        'Researched UX pain points and proposed process automation strategies to reduce user support volume.',
      accent: 'yellow',
    },
  ],
  projects: [
    {
      name: 'Edaha | B2B Platform',
      stack: 'VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL, Docker',
    },
    {
      name: 'SST-S | Hospital Equipment Tracking System',
      stack: 'VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL, Docker',
    },
    {
      name: 'AI Outfit Recommender',
      stack: 'VueJS, JavaScript, Python, Flask, TensorFlow',
    },
    {
      name: 'Zinnia | Product Management System for Factories',
      stack: 'React, TypeScript, Python, Flask, PostgreSQL, Docker',
    },
    {
      name: 'IShift | Nurse Shift Scheduling System',
      stack: 'React, TypeScript, Python, Django, PostgreSQL, Docker',
    },
  ],
  contact: [
    { label: 'Email:', value: 'akhmadullin01@gmail.com' },
    { label: 'GitHub:', value: 'github.com/alanoconner' },
    { label: 'LinkedIn:', value: 'linkedin.com/in/akhmadu17in' },
    { label: 'Telegram:', value: '@akhmadull_in' },
  ],
}

const RUSSIAN_CONTENT: PortfolioContent = {
  intro: {
    about:
      'Full Stack разработчик с более чем двухлетним опытом создания веб-приложений для B2B и медицинских компаний. Владею Kotlin, Python, TypeScript и инструментами CI/CD. Свободно говорю на английском, японском и русском языках и сопровождаю проекты от архитектуры до поддержки.',
    education:
      'Институт информационных наук Кюсю, Япония — Data Science\nАпрель 2021 - Март 2025',
  },
  experiences: [
    {
      role: 'Software Engineer',
      timeline: 'Small Step Co., Ltd • Май 2025 - по наст. время',
      details: [
        'Руководил разработкой внутренних и клиентских веб-систем от идеи до продакшена с упором на масштабируемость и стабильность.',
        'Спроектировал backend-архитектуру на Kotlin и PostgreSQL для высоконагруженных транзакционных данных.',
        'Автоматизировал деплой с помощью GitHub Actions, Docker и Linux CI/CD, что сократило ручные операции и позволило выпускать релизы каждую неделю.',
        'Разрабатывал UI-компоненты на React и Vue, улучшая пользовательский опыт в бизнес-приложениях.',
        'Повышал надежность систем благодаря unit-тестированию и непрерывной интеграции.',
      ].join('\n'),
      accent: 'cyan',
    },
    {
      role: 'Web Developer',
      timeline: 'Small Step Co., Ltd • Апрель 2023 - Май 2025',
      details: [
        'Создал платформу для электронной подписи и обмена документами, заменив ручные процессы между партнерами.',
        'Реализовал инструменты отслеживания задач и управления заказами, повысив прозрачность процессов для B2B-клиентов.',
        'Разработал систему учета медицинского оборудования для операционных блоков, сократив время поиска и улучшив контроль запасов.',
        'Поддерживал и разворачивал приложения во множественных окружениях с использованием Flask, Vue/Nuxt.js и MySQL.',
      ].join('\n'),
      accent: 'green',
    },
    {
      role: 'Стажер',
      timeline: 'LINE Fukuoka • Июль 2022',
      details:
        'Исследовал проблемы UX и предложил стратегии автоматизации процессов, сокращающие нагрузку на службу поддержки.',
      accent: 'yellow',
    },
  ],
  projects: [
    {
      name: 'Edaha | B2B Платформа',
      stack: 'VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL, Docker',
    },
    {
      name: 'SST-S | Система отслеживания медицинского оборудования',
      stack: 'VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL, Docker',
    },
    {
      name: 'AI Outfit Recommender',
      stack: 'VueJS, JavaScript, Python, Flask, TensorFlow',
    },
    {
      name: 'Zinnia | Система управления производством',
      stack: 'React, TypeScript, Python, Flask, PostgreSQL, Docker',
    },
    {
      name: 'IShift | Система планирования смен персонала',
      stack: 'React, TypeScript, Python, Django, PostgreSQL, Docker',
    },
  ],
  contact: [
    { label: 'Email:', value: 'akhmadullin01@gmail.com' },
    { label: 'GitHub:', value: 'github.com/alanoconner' },
    { label: 'LinkedIn:', value: 'linkedin.com/in/akhmadu17in' },
    { label: 'Telegram:', value: '@akhmadull_in' },
  ],
}

const JAPANESE_CONTENT: PortfolioContent = {
  intro: {
    about:
      'B2Bおよび医療分野向けの本番環境 Web アプリケーションを2年以上にわたり開発してきたフルスタックエンジニアです。Kotlin、Vue.js、CI/CD 自動化に精通し、英語・日本語・ロシア語に対応できます。構想から運用まで信頼性の高いソリューションを提供します。',
    education:
      '九州情報大学 情報ネットワーク学科 — データサイエンス\n2021年4月 - 2025年3月',
  },
  experiences: [
    {
      role: 'ソフトウェアエンジニア',
      timeline: '株式会社スモールステップ • 2025年5月〜現在',
      details: [
        '社内およびクライアント向け Web システムの開発を企画から本番運用まで主導し、スケーラビリティと保守性を確保。',
        'Kotlin と PostgreSQL を用いてバックエンドアーキテクチャを設計し、大量トランザクションデータの処理を支援。',
        'GitHub Actions・Docker・Linux ベースの CI/CD でデプロイを自動化し、週次リリースを実現。',
        'Vue.js でレスポンシブな UI コンポーネントを構築し、業務アプリのユーザビリティを向上。',
        '単体テストと継続的インテグレーションでシステムの信頼性を強化。',
      ].join('\n'),
      accent: 'cyan',
    },
    {
      role: 'Web デベロッパー',
      timeline: '株式会社スモールステップ • 2023年4月〜2025年5月',
      details: [
        'パートナー企業間の手作業を置き換える、Web ベースの電子署名・文書交換プラットフォームを開発。',
        'B2B クライアント向けにタスク追跡・注文管理ツールを実装し、業務の透明性と連携を向上。',
        '手術室で使用される医療機器追跡システムを開発し、検索時間削減と在庫管理の最適化に貢献。',
        'Flask、Vue/Nuxt.js、MySQL を利用して複数環境のアプリケーションを保守・デプロイ。',
      ].join('\n'),
      accent: 'green',
    },
    {
      role: 'インターン',
      timeline: 'LINE 福岡 • 2022年7月',
      details:
        'UX の課題を調査し、ユーザーサポート負荷を軽減するプロセス自動化戦略を提案。',
      accent: 'yellow',
    },
  ],
  projects: [
    {
      name: 'Edaha | B2B プラットフォーム',
      stack: 'VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL, Docker',
    },
    {
      name: 'SST-S | 滅菌管理システム',
      stack: 'VueJS, TypeScript, Kotlin, SpringBoot, PostgreSQL, Docker',
    },
    {
      name: 'AI 洋服スタイリング アプリケーション',
      stack: 'VueJS, JavaScript, Python, Flask, TensorFlow',
    },
    {
      name: 'Zinnia | 工場向けプロダクト管理システム',
      stack: 'React, TypeScript, Python, Flask, PostgreSQL, Docker',
    },
    {
      name: 'IShift | 看護師シフト管理システム',
      stack: 'React, TypeScript, Python, Django, PostgreSQL, Docker',
    },
  ],
  contact: [
    { label: 'Email:', value: 'akhmadullin01@gmail.com' },
    { label: 'GitHub:', value: 'github.com/alanoconner' },
    { label: 'LinkedIn:', value: 'linkedin.com/in/akhmadu17in' },
    { label: 'Telegram:', value: '@akhmadull_in' },
  ],
}

export const portfolioContent: Record<LanguageKey, PortfolioContent> = {
  en: ENGLISH_CONTENT,
  ru: RUSSIAN_CONTENT,
  jp: JAPANESE_CONTENT,
}

export const accentStyles: Record<AccentKey, { border: string; text: string }> = {
  cyan: { border: 'border-cyan-400', text: 'text-cyan-400' },
  green: { border: 'border-green-400', text: 'text-green-400' },
  yellow: { border: 'border-yellow-400', text: 'text-yellow-400' },
}
