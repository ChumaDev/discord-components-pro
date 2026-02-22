import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	viteFinal: async (config) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@': path.resolve(__dirname, '../src'),
				'@/components': path.resolve(__dirname, '../src/components'),
				'@/hooks': path.resolve(__dirname, '../src/hooks'),
				'@/utils': path.resolve(__dirname, '../src/utils'),
				'@/types': path.resolve(__dirname, '../src/types'),
				'@/store': path.resolve(__dirname, '../src/store'),
				'@/constants': path.resolve(__dirname, '../src/constants'),
				'@/features': path.resolve(__dirname, '../src/features'),
			};
		}
		return config;
	},
};

export default config;
