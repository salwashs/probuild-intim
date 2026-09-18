import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:3001';
  const isNgrokTarget = /ngrok/i.test(apiProxyTarget);

  const apiProxy = {
    target: apiProxyTarget,
    changeOrigin: true,
    secure: true,
    headers: isNgrokTarget
      ? { 'ngrok-skip-browser-warning': 'true' }
      : undefined,
  };

  return {
    base: '/',
    plugins: [react()],
    server: {
      allowedHosts: ['.ngrok-free.app', '.ngrok.io', 'localhost'],
      proxy: {
        '/api': apiProxy,
      },
    },
    preview: {
      proxy: {
        '/api': apiProxy,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
          @use "sass:color";
          @use "sass:math";
          @use "/src/styles/variables" as *;
        `,
        },
      },
    },
  };
});
