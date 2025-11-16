import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // .env.local 파일 명시적으로 로드 (로컬 개발용)
  const env = loadEnv(mode, process.cwd(), '')

  // Render.com 환경변수도 읽도록 설정 (프로덕션용)
  const envVars = {
    VITE_GOOGLE_SCRIPT_URL: env.VITE_GOOGLE_SCRIPT_URL || process.env.VITE_GOOGLE_SCRIPT_URL,
    VITE_EMAILJS_SERVICE_ID: env.VITE_EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID: env.VITE_EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID,
    VITE_EMAILJS_PUBLIC_KEY: env.VITE_EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY,
  }

  return {
    plugins: [react()],
    root: './src',
    publicDir: '../public',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      open: false,
    },
    define: {
      'import.meta.env.VITE_GOOGLE_SCRIPT_URL': JSON.stringify(envVars.VITE_GOOGLE_SCRIPT_URL),
      'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(envVars.VITE_EMAILJS_SERVICE_ID),
      'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(envVars.VITE_EMAILJS_TEMPLATE_ID),
      'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(envVars.VITE_EMAILJS_PUBLIC_KEY),
    }
  }
})
