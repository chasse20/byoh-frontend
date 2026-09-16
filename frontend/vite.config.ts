import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
	},
	build: {
		outDir: './build',
	},
	resolve: {
		alias: {
			components: '/src/components',
			styles: '/src/styles',
			constants: '/src/constants',
			assets: '/src/assets',
			utils: '/src/utils',
			hooks: '/src/hooks',
			api: '/src/api',
			state: '/src/state',
			interfaces: '/src/interfaces',
			context: '/src/context',
			models: '/src/models',
		},
	},
	plugins: [
		react(),
		checker({
			typescript: true,
		}),
	],
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
});
