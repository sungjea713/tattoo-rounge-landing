import React, { useState, useEffect, useRef } from "react";

interface FloatingPhrase {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function PromptSection() {
  const [floatingPhrases, setFloatingPhrases] = useState<FloatingPhrase[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [typedText, setTypedText] = useState("");
  const typingStateRef = useRef({
    phraseIndex: 0,
    charIndex: 0,
    isDeleting: false,
    lastUpdate: Date.now(),
  });

  const phrases = [
    "용과 불꽃이 어우러진 타투",
    "미니멀한 기하학 패턴",
    "나비와 꽃이 함께하는 도안",
    "블랙워크 스타일 만다라",
    "수채화 느낌의 벚꽃",
    "레터링과 음표 조합",
    "옛날 선원 타투 스타일",
    "추상적인 라인 아트",
    "일본 스타일의 이레즈미",
    "호랑이 일러스트",
    "올드스쿨 레터링",
    "해골 오컬트 문양"
  ];

  const speedConfig = { base: 0.8, random: 0.6 };
  const { base, random } = speedConfig;

  // 컨테이너 크기 감지
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // 초기 phrases 생성
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const initialPhrases = phrases.map((text) => ({
      text,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * random + (Math.random() > 0.5 ? base : -base),
      vy: (Math.random() - 0.5) * random + (Math.random() > 0.5 ? base : -base),
      size: 30 + Math.random() * 70,
      opacity: 0.12 + Math.random() * 0.18,
    }));

    setFloatingPhrases(initialPhrases);
  }, [dimensions, base, random]);

  // 애니메이션 루프
  useEffect(() => {
    if (floatingPhrases.length === 0) return;

    const interval = setInterval(() => {
      setFloatingPhrases((prev) =>
        prev.map((phrase) => {
          let newX = phrase.x + phrase.vx;
          let newY = phrase.y + phrase.vy;
          let newVx = phrase.vx;
          let newVy = phrase.vy;

          // 벽 충돌 감지 및 반사
          if (newX < 0) {
            newX = 0;
            newVx = Math.abs(newVx);
          } else if (newX > dimensions.width) {
            newX = dimensions.width;
            newVx = -Math.abs(newVx);
          }

          if (newY < 0) {
            newY = 0;
            newVy = Math.abs(newVy);
          } else if (newY > dimensions.height) {
            newY = dimensions.height;
            newVy = -Math.abs(newVy);
          }

          return { ...phrase, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 16); // 60 FPS

    return () => clearInterval(interval);
  }, [floatingPhrases.length, dimensions]);

  // 타이핑 애니메이션
  useEffect(() => {
    let animationFrameId: number;
    let isActive = true;

    const animate = () => {
      if (!isActive) return;

      const now = Date.now();
      const state = typingStateRef.current;
      const currentPhrase = phrases[state.phraseIndex];

      // 타이밍 체크
      const typingDelay = state.isDeleting ? 40 + Math.random() * 30 : 80 + Math.random() * 60;
      const waitDelay = 800;

      if (now - state.lastUpdate < (state.charIndex === currentPhrase.length && !state.isDeleting ? waitDelay : typingDelay)) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      state.lastUpdate = now;

      // 타이핑 완료 후 대기
      if (!state.isDeleting && state.charIndex === currentPhrase.length) {
        state.isDeleting = true;
        setTypedText(currentPhrase);
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // 삭제 완료 후 다음 문장으로
      if (state.isDeleting && state.charIndex === 0) {
        state.isDeleting = false;
        state.phraseIndex = (state.phraseIndex + 1) % phrases.length;
        setTypedText("");
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // 타이핑 중
      if (!state.isDeleting) {
        state.charIndex++;
        setTypedText(currentPhrase.substring(0, state.charIndex));
      } else {
        // 삭제 중
        state.charIndex--;
        setTypedText(currentPhrase.substring(0, state.charIndex));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [phrases]);

  // 색상 테마 (purple/pink/green/mint)
  const colors = {
    gradient1: "rgba(180, 100, 255, 0.3)",
    gradient2: "rgba(150, 80, 255, 0.25)",
    gradient3: "rgba(200, 120, 255, 0.2)",
    gradient4: "rgba(16, 185, 129, 0.25)", // green
    gradient5: "rgba(20, 184, 166, 0.3)", // mint/teal
    linearStart: "rgba(120, 60, 200, 0.4)",
    linearMid: "rgba(160, 100, 240, 0.3)",
    linearEnd: "rgba(140, 80, 220, 0.35)",
  };

  return (
    <>
      <style>{`
        @keyframes ambient-hue {
          0% { filter: hue-rotate(0deg) brightness(1); }
          5% { filter: hue-rotate(8deg) brightness(1.05); }
          10% { filter: hue-rotate(-12deg) brightness(0.9); }
          15% { filter: hue-rotate(15deg) brightness(1.08); }
          20% { filter: hue-rotate(-8deg) brightness(0.95); }
          25% { filter: hue-rotate(60deg) brightness(1.1); }
          30% { filter: hue-rotate(75deg) brightness(1.05); }
          35% { filter: hue-rotate(85deg) brightness(1.08); }
          40% { filter: hue-rotate(70deg) brightness(0.95); }
          45% { filter: hue-rotate(18deg) brightness(1.06); }
          50% { filter: hue-rotate(-10deg) brightness(0.96); }
          55% { filter: hue-rotate(22deg) brightness(1.09); }
          60% { filter: hue-rotate(95deg) brightness(1.03); }
          65% { filter: hue-rotate(110deg) brightness(1.06); }
          70% { filter: hue-rotate(100deg) brightness(0.98); }
          75% { filter: hue-rotate(25deg) brightness(1.11); }
          80% { filter: hue-rotate(-12deg) brightness(0.93); }
          85% { filter: hue-rotate(15deg) brightness(1.07); }
          90% { filter: hue-rotate(-25deg) brightness(0.89); }
          95% { filter: hue-rotate(10deg) brightness(1.02); }
          100% { filter: hue-rotate(0deg) brightness(1); }
        }
        .ambient-gradient {
          animation: ambient-hue 90s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>

      <section className="relative overflow-hidden bg-dark-50">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden flex items-center justify-center"
            style={{
              height: "100vh",
              width: "100vw",
            }}
          >
            {/* 배경 그라데이션 레이어 */}
            <div
              className="absolute inset-0 ambient-gradient"
              style={{
                background: `
                  radial-gradient(ellipse 400px 300px at 20% 30%, ${colors.gradient1} 0%, transparent 50%),
                  radial-gradient(ellipse 350px 250px at 80% 70%, ${colors.gradient2} 0%, transparent 50%),
                  radial-gradient(ellipse 300px 300px at 50% 50%, ${colors.gradient3} 0%, transparent 60%),
                  radial-gradient(ellipse 380px 280px at 70% 20%, ${colors.gradient4} 0%, transparent 55%),
                  radial-gradient(ellipse 320px 320px at 30% 80%, ${colors.gradient5} 0%, transparent 50%),
                  linear-gradient(135deg, ${colors.linearStart} 0%, ${colors.linearMid} 50%, ${colors.linearEnd} 100%)
                `,
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
              }}
            />

            {/* Floating Phrases */}
            <div className="absolute inset-0 pointer-events-none">
              {floatingPhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="absolute font-sans whitespace-nowrap font-light"
                  style={{
                    transform: `translate(${phrase.x}px, ${phrase.y}px)`,
                    fontSize: `${phrase.size}px`,
                    color: `rgba(255, 255, 255, ${phrase.opacity})`,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
                  {phrase.text}
                </div>
              ))}
            </div>

            {/* 내용 오버레이 */}
            <div className="relative z-10 text-center text-white px-6 max-w-4xl w-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  이제 모든 도안은
                </h2>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gradient font-semibold mb-8">
                  프롬프트 몇마디로 해결
                </p>

                {/* 타이핑 입력창 */}
                <div className="mt-8 sm:mt-12 max-w-2xl mx-auto">
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 text-left">
                        <span className="text-lg sm:text-xl md:text-2xl text-white font-light">
                          {typedText}
                          <span className="cursor-blink inline-block w-0.5 h-5 sm:h-6 md:h-7 bg-white ml-1 align-middle"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </section>
    </>
  );
}
