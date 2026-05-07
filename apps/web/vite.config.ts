import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  esbuild: {
    include: /\.[jt]sx?$/,
    exclude: [],
    loader: 'tsx',
  },
  plugins: [react({
    jsxRuntime: 'classic' // Add this line
  }), viteTsconfigPaths()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  define: {
    "global": {},
  },
});