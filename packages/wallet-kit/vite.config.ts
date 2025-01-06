import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import viteSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: 'es2020',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      fileName: 'index',
      name: 'razorWalletKit',
    },
    emptyOutDir: false,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps.
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  esbuild: {
    target: 'es2020',
    pure: mode === 'production' ? ['console.log', 'debugger'] : [],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  plugins: [react(), vanillaExtractPlugin(), viteSvgr()],
  server: {
    port: 5000,
    open: true,
  },
}));
