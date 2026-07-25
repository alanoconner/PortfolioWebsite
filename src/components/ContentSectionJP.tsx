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

const ContentSectionJP: React.FC<ContentSectionProps> = ({ type, isActive, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const [visibleType, setVisibleType] = useState(type);
  const introText = "3年以上にわたりB2Bプロダクトの構築とスケーリングに携わってきたフルスタックソフトウェアエンジニア。AWSインフラを設計し、CI/CDパイプラインを自動化してリリース作業の負荷を約60%削減、250社以上に利用される文書交換プラットフォームを提供してきました。個人プロジェクトではLLMを活用した自動化エージェントも開発。英語・日本語・ロシア語の3言語に対応し、設計から運用まで開発サイクル全体で信頼性の高いソリューションを提供します。";
  const introEducation = `九州情報大学, 福岡 — Data Science (学士)
2021年4月 - 2025年3月`;
  const introSkills = [
    '言語: ロシア語 (ネイティブ), 英語 (流暢), 日本語 (流暢)',
    'プログラミング: Kotlin, Python, TypeScript, JavaScript, Java',
    'フロントエンド: React, Vue.js, Nuxt.js',
    'バックエンド: Flask, Django, REST APIs, SpringBoot',
    'データベース: PostgreSQL, MySQL',
    'Cloud/DevOps: AWS, Docker, GitHub Actions, CI/CD, Linux, EC2, ALB, Lambda, Fargate, Cognito',
    '自動化/AI: Playwright, web scraping, workflow automation, LLM APIs, prompt engineering'
  ]
  const experiences = [
    {
      "id": 0,
      "position": "ソフトウェアエンジニア",
      "timeAndPlace": "株式会社スモールステップ, 福岡 • 2025年5月〜現在",
      "responsibilities": "社内およびクライアント向けのWebシステム開発を構想段階から本番運用まで主導し、拡張性と長期的な保守性を向上。\nKotlinとPostgreSQLを用いて、高トランザクションの業務フローを支えるバックエンドアーキテクチャを設計。重要なクエリをプロファイリングして書き直し、本番負荷下での平均レスポンスタイムを約30%削減。\nCognito、ALB、Auto Scaling Groups、EC2、PostgreSQL、Lambda、Fargateを活用し、スケーラブルなWebサービスとサーバーレス処理のための安定したAWS本番環境を構築。\nGitHub Actionsで自動本番デプロイ用のCI/CDパイプラインを構成し、手動リリース作業を60%削減しつつ高頻度リリースを支援。\n3つのクライアントプロダクトで使われるReactコンポーネントライブラリを設計し、UIパターンを標準化して新規開発者のオンボーディングを高速化。",
      "color": "cyan"
    },

    {
      "id": 1,
      "position": "Webデベロッパー",
      "timeAndPlace": "株式会社スモールステップ, 福岡 • 2023年4月〜2025年5月",
      "responsibilities": "パートナー企業間の手作業による調整をなくす、Webベースの電子署名・文書交換プラットフォームを提供 — 現在250社以上が利用。\nB2Bクライアント向けにタスク管理と受注管理ツールを実装し、業務の可視性とワークフロー連携を改善。\n3施設以上の病院に導入された設備追跡システムを開発し、手術チームに機器のリアルタイムな可視性を提供して準備の遅延を削減。\nタスク遂行から機能提供の独立したオーナーシップへと成長 — 要件のヒアリング、技術提案、監督なしでのエンドツーエンドの開発を担当。",
      "color": "green"
    },
    {
      "id": 2,
      "position": "オートメーションエンジニア",
      "timeAndPlace": "Mimamol, 福岡 • 2024年12月〜2025年3月",
      "responsibilities": "Python、Playwright、n8nスタイルのオーケストレーションを用いて、商品調達向けのサプライヤー探索ワークフローを自動化。\nAIモデルを各ワークフローステップに組み込み、サプライヤー検索とデータフィルタリングのためのプロンプト設計を開発。\n3つの反復的なアナリスト業務にLLMベースのスコアリングを組み込み、手動レビューを構造化されたAI出力に置き換え。\nWebスクレイピング基盤を構築し、手動のサプライヤー調査とスクレイピング時間を40%削減。",
      "color": "yellow"
    },
    {
      "id": 3,
      "position": "UXリサーチインターン",
      "timeAndPlace": "LINE Fukuoka, 福岡 • 2022年7月",
      "responsibilities": "UX上の課題点を調査し、ユーザーサポート件数を減らすためのプロセス自動化戦略を提案。",
      "color": "red"
    }
  ]

  const projects = [
    {
      id:0,
      name:"AI Outfit Recommender",
      meta: "Flask + Python",
      timeframe: "2024",
      highlights: [
        "ユーザーがアップロードした画像をもとに服装の組み合わせを提案する、MLベースのツールを構築。"
      ]
    },
    {
      id:1,
      name:'Online School Platform "TeraSchool"',
      meta: "Vue + Flask + MySQL",
      timeframe: "2025",
      highlights: [
        "体系的な学習を支援し、オンライン教育におけるコース運営を効率化するためのWebベースの学校管理システムを開発。"
      ]
    },
    {
      id:2,
      name:"Smeta Tool",
      meta: "Freelance Project, Remote - Desktop Python Application",
      timeframe: "2026年2月 - 2026年3月",
      highlights: [
        "建設コスト見積もりのためのデスクトップPythonアプリケーションを開発し、クライアントの今後の建築プロジェクトで利用される形にした。",
        "計算フローを自動化し、実運用において手作業による見積もり時間を70%削減。"
      ]
    },
    {
      id:3,
      name:"Startup Idea Analysis Agent",
      meta: "Personal Project - LLM + Telegram + Python",
      timeframe: "2026",
      highlights: [
        "LLM APIsとPythonを使い、スタートアップのアイデアに対して初期のニッチ分析と市場調査を行うTelegram連携エージェントを開発。"
      ]
    },
    {
      id:4,
      name:"Tender Search Agent",
      meta: "Personal Project - LLM + Playwright + Python",
      timeframe: "2026",
      highlights: [
        "公共調達プラットフォームにログインし、条件に合う入札案件を検索し、資料を分析して要約をユーザーへ送るエージェントを構築。",
        "LLM APIsとPlaywrightを使って、契約候補の発見、書類レビュー、通知ワークフローを自動化。"
      ]
    },
    {
      id:5,
      name:"Construction Company Management System",
      meta: "Django + React + TypeScript + PostgreSQL",
      timeframe: "2026",
      highlights: [
        "建設会社の基幹業務を自動化するWebベースのシステムを開発 — 人員・勤怠管理、現場モニタリング、文書フロー、取引先・資材・仕入先の管理を含む。",
        "散在していた文書フローを一元化し、文書検索時間を60%削減。実運用で継続的に機能を拡張中。"
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

export default ContentSectionJP;
