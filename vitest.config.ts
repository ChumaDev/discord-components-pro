import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@/components': path.resolve(__dirname, './src/components'),
			'@/hooks': path.resolve(__dirname, './src/hooks'),
			'@/utils': path.resolve(__dirname, './src/utils'),
			'@/types': path.resolve(__dirname, './src/types'),
			'@/store': path.resolve(__dirname, './src/store'),
			'@/constants': path.resolve(__dirname, './src/constants'),
			'@/features': path.resolve(__dirname, './src/features'),
			'@/test': path.resolve(__dirname, './src/test'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			exclude: [
				'node_modules/',
				'src/test/',
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/*.stories.tsx',
				'playground/',
				'dist/',
				'**/*.d.ts',
				'vite.config.ts',
				'vitest.config.ts',
			],
			include: ['src/**/*.{ts,tsx}'],
			all: true,
			lines: 80,
			functions: 80,
			branches: 80,
			statements: 80,
		},
		include: ['src/**/*.{test,spec}.{ts,tsx}'],
		exclude: ['node_modules', 'dist', 'playground'],
	},
});
