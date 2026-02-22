import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		backgrounds: {
			default: 'discord-dark',
			values: [
				{
					name: 'discord-dark',
					value: '#313338',
				},
				{
					name: 'discord-light',
					value: '#ffffff',
				},
				{
					name: 'midnight',
					value: '#0a0a0a',
				},
			],
		},
		layout: 'centered',
	},
};

export default preview;
