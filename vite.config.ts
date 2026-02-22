import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const isPlayground = mode === 'development';

  return {
    root: isPlayground ? 'playground' : '.',
    plugins: [
      react(),
      !isPlayground &&
        dts({
          insertTypesEntry: true,
          include: ['src'],
          exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
          staticImport: true,
          rollupTypes: true,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/store': path.resolve(__dirname, './src/store'),
        '@/constants': path.resolve(__dirname, './src/constants'),
      },
    },
    build: {
      outDir: isPlayground ? 'playground/dist' : 'dist',
      lib: !isPlayground
        ? {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'DiscordComponentsSDK',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
          }
        : undefined,
      rollupOptions: !isPlayground
        ? {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'react/jsx-runtime',
              },
              assetFileNames: (assetInfo) => {
                if (assetInfo.name === 'style.css') return 'sdk.css';
                return assetInfo.name || '';
              },
            },
          }
        : undefined,
      sourcemap: true,
      minify: 'esbuild',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  };
});
