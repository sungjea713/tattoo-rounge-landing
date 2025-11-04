# Tattoo Rounge - 랜딩 페이지

타투이스트 앱 입점 홍보를 위한 다크 모드 랜딩 페이지

## 기술 스택

- **런타임**: Bun
- **프레임워크**: React 18 + TypeScript
- **스타일링**: Tailwind CSS (다크 모드)
- **서버**: Bun.serve() (HTML imports 방식)
- **아이콘**: Lucide React
- **이메일**: EmailJS
- **호스팅**: Render.com

## 시작하기

### 사전 요구사항

- [Bun](https://bun.sh) 설치 필요

### 설치

```bash
# 의존성 설치
bun install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (기본 포트: 3000)
bun dev

# 또는 다른 포트로 실행
PORT=3001 bun dev
```

서버가 시작되면 브라우저에서 `http://localhost:3000` (또는 설정한 포트)으로 접속하세요.

### 프로덕션 빌드

```bash
# 프로덕션 모드로 실행
bun start
```

## EmailJS 설정

문의 기능을 사용하려면 EmailJS 설정이 필요합니다:

1. [EmailJS](https://www.emailjs.com/)에 가입
2. 서비스와 템플릿 생성
3. `src/components/ContactForm.tsx` 파일에서 다음 값을 교체:
   ```typescript
   const serviceId = "YOUR_SERVICE_ID";
   const templateId = "YOUR_TEMPLATE_ID";
   const publicKey = "YOUR_PUBLIC_KEY";
   ```

또는 환경 변수를 사용할 수 있습니다 (권장):

```bash
# .env 파일 생성
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

## 이미지 교체

현재 임시 이미지(Unsplash)가 사용되고 있습니다. 실제 앱 스크린샷과 목업으로 교체하세요:

### 교체할 이미지 위치:

1. **히어로 섹션** - `src/components/HeroSection.tsx`
   - 배경 이미지
   - 앱 목업 이미지

2. **6가지 핵심 가치** - `src/components/CorePillars.tsx`
   - 각 카드별 비주얼 이미지 (6개)

3. **구체적 작동 방식** - `src/components/PrecisionTools.tsx`
   - 대시보드 스크린샷
   - 매칭 화면 스크린샷
   - 포트폴리오 화면 스크린샷

## Render.com 배포

### 방법 1: Render Dashboard 사용

1. [Render.com](https://render.com)에 로그인
2. "New +" → "Web Service" 선택
3. GitHub 저장소 연결
4. 설정:
   - **Environment**: Docker
   - **Build Command**: `bun install`
   - **Start Command**: `bun src/index.ts`
   - **Port**: 3000

### 방법 2: render.yaml 사용

프로젝트 루트에 `render.yaml` 파일이 이미 포함되어 있습니다. Render가 자동으로 감지하여 배포합니다.

### 환경 변수 설정 (Render Dashboard)

배포 후 Render Dashboard에서 다음 환경 변수를 설정하세요:

- `EMAILJS_SERVICE_ID`: EmailJS 서비스 ID
- `EMAILJS_TEMPLATE_ID`: EmailJS 템플릿 ID
- `EMAILJS_PUBLIC_KEY`: EmailJS 공개 키

## 프로젝트 구조

```
tattoo-rounge-landing/
├── src/
│   ├── index.ts              # Bun 서버
│   ├── index.html            # HTML 엔트리 포인트
│   ├── frontend.tsx          # React 메인
│   ├── App.tsx               # App 컴포넌트
│   ├── components/           # React 컴포넌트
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CorePillars.tsx
│   │   ├── PillarCard.tsx
│   │   ├── PrecisionTools.tsx
│   │   ├── ToolFeature.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── CTAButton.tsx
│   │   └── ContactForm.tsx
│   └── styles/
│       └── index.css         # Tailwind CSS
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── Dockerfile
├── render.yaml
└── README.md
```

## 주요 기능

- ✅ 완전한 다크 모드 (블랙/그레이 톤)
- ✅ Apple/GitHub 스타일 애니메이션
- ✅ 완전 반응형 디자인 (모바일/태블릿/데스크탑)
- ✅ EmailJS 문의 기능
- ✅ 스크롤 기반 애니메이션
- ✅ Intersection Observer를 활용한 뷰포트 애니메이션
- ✅ SEO 최적화 메타 태그

## 섹션 구성

1. **히어로 섹션**: 비전과 메인 CTA
2. **6가지 핵심 가치**: 시장 확장, 전문성, 비즈니스 성장, 작업 효율, 쉬운 디자인, 간편 이전
3. **구체적 작동 방식**: 매출 최적화 대시보드, 지능형 매칭, 즉각적인 포트폴리오
4. **최종 CTA**: 6개월 프리미엄 혜택 및 문의하기

## 커스터마이징

### 색상 변경

`tailwind.config.js` 파일에서 다크 모드 색상을 커스터마이징할 수 있습니다:

```javascript
colors: {
  'dark': {
    DEFAULT: '#000000',
    '50': '#0a0a0a',
    '100': '#111111',
    // ...
  }
}
```

### 애니메이션 조정

`src/styles/index.css` 파일에서 애니메이션 속도와 스타일을 조정할 수 있습니다.

## 라이선스

© 2025 Tattoo Rounge. All rights reserved.

## 문의

문의사항이 있으시면 웹사이트의 문의하기 양식을 이용해주세요.
