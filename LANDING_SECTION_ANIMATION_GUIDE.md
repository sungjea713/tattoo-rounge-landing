# Floating Text Animation - Landing Page Section Version (16:9)

이 가이드는 VoiceModal의 floating text animation을 랜딩 페이지 섹션에 맞게 변환한 버전입니다.

## 핵심 차이점

### Full-Screen Modal vs Landing Section

| 특징 | Modal 버전 | Section 버전 (16:9) |
|------|-----------|-------------------|
| 크기 | `fixed inset-0` (전체 화면) | `relative` with aspect ratio |
| 경계 | `window.innerWidth/Height` | Section 컨테이너 크기 |
| 텍스트 개수 | 14개 | 8-10개 (공간에 맞춰 조정) |
| 텍스트 크기 | 40-150px | 30-100px (작은 공간) |
| 그라데이션 크기 | 800px/700px/600px | 400px/350px/300px |
| 애니메이션 속도 | 0.6-0.7 px/frame | 0.4-0.5 px/frame |

## 1. 완전한 React 컴포넌트 코드

```tsx
// FloatingTextSection.tsx
import React, { useState, useEffect, useRef } from 'react'

interface FloatingPhrase {
  text: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface FloatingTextSectionProps {
  phrases?: string[]
  colorTheme?: 'blue' | 'warm' | 'purple' | 'custom'
  customColors?: {
    gradient1: string
    gradient2: string
    gradient3: string
    linearStart: string
    linearMid: string
    linearEnd: string
  }
  speed?: 'slow' | 'normal' | 'fast'
  phraseCount?: number
}

export default function FloatingTextSection({
  phrases = [
    "Explore our solutions",
    "Innovation at scale",
    "Transform your workflow",
    "Build the future",
    "Connect & collaborate",
    "Powered by AI",
    "Seamless integration",
    "Next-generation platform"
  ],
  colorTheme = 'blue',
  speed = 'normal',
  phraseCount = 8
}: FloatingTextSectionProps) {
  const [floatingPhrases, setFloatingPhrases] = useState<FloatingPhrase[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // 속도 설정
  const speedConfig = {
    slow: { base: 0.3, random: 0.3 },
    normal: { base: 0.4, random: 0.4 },
    fast: { base: 0.6, random: 0.5 }
  }
  const { base, random } = speedConfig[speed]

  // 컨테이너 크기 감지 (16:9 비율)
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // 초기 phrases 생성
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const selectedPhrases = phrases.slice(0, phraseCount)
    const initialPhrases = selectedPhrases.map((text) => ({
      text,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * random + (Math.random() > 0.5 ? base : -base),
      vy: (Math.random() - 0.5) * random + (Math.random() > 0.5 ? base : -base),
      size: 30 + Math.random() * 70, // 30-100px 범위
      opacity: 0.12 + Math.random() * 0.18,
    }))

    setFloatingPhrases(initialPhrases)
  }, [dimensions, phrases, phraseCount, base, random])

  // 애니메이션 루프
  useEffect(() => {
    if (floatingPhrases.length === 0) return

    const interval = setInterval(() => {
      setFloatingPhrases((prev) =>
        prev.map((phrase) => {
          let newX = phrase.x + phrase.vx
          let newY = phrase.y + phrase.vy
          let newVx = phrase.vx
          let newVy = phrase.vy

          // 벽 충돌 감지 및 반사
          if (newX < 0) {
            newX = 0
            newVx = Math.abs(newVx)
          } else if (newX > dimensions.width) {
            newX = dimensions.width
            newVx = -Math.abs(newVx)
          }

          if (newY < 0) {
            newY = 0
            newVy = Math.abs(newVy)
          } else if (newY > dimensions.height) {
            newY = dimensions.height
            newVy = -Math.abs(newVy)
          }

          return { ...phrase, x: newX, y: newY, vx: newVx, vy: newVy }
        })
      )
    }, 16) // 60 FPS

    return () => clearInterval(interval)
  }, [floatingPhrases.length, dimensions])

  // 색상 테마
  const colorThemes = {
    blue: {
      gradient1: 'rgba(100, 200, 255, 0.3)',
      gradient2: 'rgba(80, 150, 255, 0.25)',
      gradient3: 'rgba(120, 180, 255, 0.2)',
      linearStart: 'rgba(60, 120, 200, 0.4)',
      linearMid: 'rgba(100, 160, 240, 0.3)',
      linearEnd: 'rgba(80, 140, 220, 0.35)'
    },
    warm: {
      gradient1: 'rgba(255, 180, 100, 0.3)',
      gradient2: 'rgba(255, 150, 80, 0.25)',
      gradient3: 'rgba(255, 200, 120, 0.2)',
      linearStart: 'rgba(200, 120, 60, 0.4)',
      linearMid: 'rgba(240, 160, 100, 0.3)',
      linearEnd: 'rgba(220, 140, 80, 0.35)'
    },
    purple: {
      gradient1: 'rgba(180, 100, 255, 0.3)',
      gradient2: 'rgba(150, 80, 255, 0.25)',
      gradient3: 'rgba(200, 120, 255, 0.2)',
      linearStart: 'rgba(120, 60, 200, 0.4)',
      linearMid: 'rgba(160, 100, 240, 0.3)',
      linearEnd: 'rgba(140, 80, 220, 0.35)'
    },
    custom: {
      gradient1: 'rgba(100, 200, 255, 0.3)',
      gradient2: 'rgba(80, 150, 255, 0.25)',
      gradient3: 'rgba(120, 180, 255, 0.2)',
      linearStart: 'rgba(60, 120, 200, 0.4)',
      linearMid: 'rgba(100, 160, 240, 0.3)',
      linearEnd: 'rgba(80, 140, 220, 0.35)'
    }
  }

  const colors = colorThemes[colorTheme]

  return (
    <>
      <style>{`
        @keyframes ambient-hue {
          0% { filter: hue-rotate(0deg) brightness(1); }
          5% { filter: hue-rotate(8deg) brightness(1.05); }
          10% { filter: hue-rotate(-12deg) brightness(0.9); }
          15% { filter: hue-rotate(15deg) brightness(1.08); }
          20% { filter: hue-rotate(-8deg) brightness(0.95); }
          25% { filter: hue-rotate(20deg) brightness(1.1); }
          30% { filter: hue-rotate(-15deg) brightness(0.92); }
          35% { filter: hue-rotate(10deg) brightness(1.03); }
          40% { filter: hue-rotate(-20deg) brightness(0.88); }
          45% { filter: hue-rotate(18deg) brightness(1.06); }
          50% { filter: hue-rotate(-10deg) brightness(0.96); }
          55% { filter: hue-rotate(22deg) brightness(1.09); }
          60% { filter: hue-rotate(-18deg) brightness(0.91); }
          65% { filter: hue-rotate(12deg) brightness(1.04); }
          70% { filter: hue-rotate(-22deg) brightness(0.87); }
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
      `}</style>

      <section
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '16 / 9',
          maxWidth: '100%',
          margin: '0 auto'
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
              linear-gradient(135deg, ${colors.linearStart} 0%, ${colors.linearMid} 50%, ${colors.linearEnd} 100%)
            `,
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
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
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {phrase.text}
            </div>
          ))}
        </div>

        {/* 내용 오버레이 (선택사항) */}
        <div className="relative z-10 h-full flex items-center justify-center">
          {/* 여기에 섹션 내용 추가 가능 */}
        </div>
      </section>
    </>
  )
}
```

## 2. 사용 예시

### 기본 사용법
```tsx
import FloatingTextSection from './FloatingTextSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen">
        <h1>Welcome</h1>
      </section>

      {/* Floating Text Section */}
      <FloatingTextSection />

      {/* Other sections */}
    </div>
  )
}
```

### 커스텀 텍스트 및 색상
```tsx
<FloatingTextSection
  phrases={[
    "당신의 비즈니스를 성장시키세요",
    "혁신적인 솔루션",
    "실시간 협업",
    "데이터 기반 의사결정",
    "글로벌 확장",
    "안전한 플랫폼",
    "24/7 지원",
    "맞춤형 서비스"
  ]}
  colorTheme="purple"
  speed="slow"
  phraseCount={10}
/>
```

### 반응형 섹션
```tsx
<div className="container mx-auto px-4 py-16">
  <div className="max-w-6xl mx-auto">
    <FloatingTextSection
      colorTheme="warm"
      speed="normal"
    />
  </div>
</div>
```

## 3. 반응형 디자인 가이드

### Tailwind 클래스로 크기 조정
```tsx
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <FloatingTextSection />
</div>
```

### 브레이크포인트별 최적화
```css
/* 큰 화면 (데스크탑) */
@media (min-width: 1024px) {
  .floating-section-container {
    max-width: 1400px;
  }
}

/* 중간 화면 (태블릿) */
@media (min-width: 768px) and (max-width: 1023px) {
  .floating-section-container {
    max-width: 900px;
  }
}

/* 작은 화면 (모바일) */
@media (max-width: 767px) {
  .floating-section-container {
    max-width: 100%;
    padding: 0 1rem;
  }
}
```

## 4. 커스터마이징 매개변수

### Props 설명

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `phrases` | `string[]` | 8개 영문 문구 | 떠다니는 텍스트 배열 |
| `colorTheme` | `'blue' \| 'warm' \| 'purple' \| 'custom'` | `'blue'` | 색상 테마 |
| `customColors` | `object` | - | 커스텀 색상 객체 |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | 애니메이션 속도 |
| `phraseCount` | `number` | `8` | 표시할 문구 개수 (4-12 권장) |

### 텍스트 크기 조정
```tsx
// FloatingTextSection.tsx 내부 수정
size: 30 + Math.random() * 70, // 기본: 30-100px

// 더 작게
size: 20 + Math.random() * 40, // 20-60px

// 더 크게
size: 40 + Math.random() * 100, // 40-140px
```

### 투명도 조정
```tsx
// 더 진하게
opacity: 0.2 + Math.random() * 0.3, // 0.2-0.5

// 더 연하게
opacity: 0.05 + Math.random() * 0.1, // 0.05-0.15
```

### 애니메이션 주기 조정
```css
/* 더 빠른 색상 변화 */
animation: ambient-hue 45s ease-in-out infinite;

/* 더 느린 색상 변화 */
animation: ambient-hue 180s ease-in-out infinite;
```

## 5. 16:9 비율 유지 팁

### CSS Aspect Ratio 사용 (최신 브라우저)
```css
.section-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

### Padding Trick (구형 브라우저 호환)
```css
.section-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 9/16 = 0.5625 */
}

.section-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### 최대 높이 제한
```tsx
<section
  style={{
    aspectRatio: '16 / 9',
    maxHeight: '80vh', // 화면의 80%를 넘지 않도록
    width: '100%'
  }}
>
```

## 6. 성능 최적화

### 1. 텍스트 개수 제한
- **데스크탑**: 8-12개
- **태블릿**: 6-8개
- **모바일**: 4-6개

### 2. GPU 가속 필수 CSS
```css
.floating-phrase {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0); /* GPU 레이어 강제 생성 */
}
```

### 3. Intersection Observer로 뷰포트 외부 일시정지
```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        // 섹션이 보이지 않으면 애니메이션 일시정지
        clearInterval(intervalRef.current)
      } else {
        // 다시 시작
        startAnimation()
      }
    },
    { threshold: 0.1 }
  )

  if (containerRef.current) {
    observer.observe(containerRef.current)
  }

  return () => observer.disconnect()
}, [])
```

## 7. 내용 오버레이 추가 예시

### 중앙 텍스트 콘텐츠
```tsx
<div className="relative z-10 h-full flex items-center justify-center">
  <div className="text-center text-white">
    <h2 className="text-5xl font-bold mb-4">Our Vision</h2>
    <p className="text-xl opacity-90">Building the future of technology</p>
  </div>
</div>
```

### CTA 버튼
```tsx
<div className="relative z-10 h-full flex flex-col items-center justify-center gap-8">
  <h2 className="text-6xl font-bold text-white">Get Started Today</h2>
  <button className="px-8 py-4 bg-white text-blue-600 rounded-lg text-xl font-semibold hover:bg-blue-50 transition">
    Start Free Trial
  </button>
</div>
```

## 8. 다양한 레이아웃 패턴

### 좌측 정렬 콘텐츠
```tsx
<div className="relative z-10 h-full flex items-center">
  <div className="ml-16 max-w-xl text-white">
    <h2 className="text-5xl font-bold mb-6">Innovation Starts Here</h2>
    <p className="text-lg leading-relaxed mb-8">
      Transform your business with cutting-edge AI solutions
    </p>
    <button className="px-6 py-3 bg-white text-blue-600 rounded">
      Learn More
    </button>
  </div>
</div>
```

### 그리드 레이아웃
```tsx
<div className="relative z-10 h-full p-16">
  <div className="grid grid-cols-3 gap-8 h-full items-center">
    <div className="text-white">
      <h3 className="text-2xl font-bold mb-2">Feature 1</h3>
      <p>Description here</p>
    </div>
    <div className="text-white">
      <h3 className="text-2xl font-bold mb-2">Feature 2</h3>
      <p>Description here</p>
    </div>
    <div className="text-white">
      <h3 className="text-2xl font-bold mb-2">Feature 3</h3>
      <p>Description here</p>
    </div>
  </div>
</div>
```

## 9. 접근성 (Accessibility)

### 애니메이션 감소 설정 존중
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const speedMultiplier = prefersReducedMotion ? 0.3 : 1.0

vx: ((Math.random() - 0.5) * random + base) * speedMultiplier,
vy: ((Math.random() - 0.5) * random + base) * speedMultiplier,
```

### ARIA 레이블
```tsx
<section
  aria-label="Animated background section"
  role="presentation"
>
```

## 10. 빠른 시작 체크리스트

- [ ] `FloatingTextSection.tsx` 파일 생성
- [ ] 원하는 텍스트 문구 배열 준비
- [ ] 색상 테마 선택 (blue/warm/purple)
- [ ] 섹션에 내용 오버레이 추가 (선택사항)
- [ ] 반응형 컨테이너 래퍼 추가
- [ ] 페이지에 섹션 import 및 렌더링
- [ ] 텍스트 개수/크기/속도 조정
- [ ] 성능 테스트 (특히 모바일)
- [ ] 접근성 검토

## 요약

이 가이드는 VoiceModal의 floating text animation을 **16:9 비율 랜딩 섹션**으로 완벽히 변환한 버전입니다.

**주요 변경 사항:**
1. `fixed inset-0` → `aspect-ratio: 16/9`
2. 전체 화면 → 컨테이너 기반 크기
3. 14개 문구 → 8개 문구 (공간 최적화)
4. 큰 텍스트 → 작은 텍스트 (30-100px)
5. 큰 그라데이션 → 작은 그라데이션 (비율 조정)

**사용 시나리오:**
- 회사 홈페이지 hero 섹션
- 제품 소개 페이지 배경
- 이벤트 랜딩 페이지 섹션
- 포트폴리오 인트로 영역

완전히 독립적인 컴포넌트로, 어떤 React 프로젝트에도 복사해서 바로 사용 가능합니다.
