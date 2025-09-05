import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/__tests__/utils/setup.ts'],
		globals: true,
		css: true,
		exclude: ['**/e2e/**', '**/node_modules/**'],
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});
