export const APP_CONFIG = {
	name: "Tauri + SvelteKit Starter Template",
	version: "1.0.0",
	author: "Your Name",
	description: "A modern starter template for Tauri 2 and SvelteKit",
	repository: "https://github.com/yourusername/tauri-sveltekit-starter",

	// Theme settings
	theme: {
		default: "dark" as const,
		storageKey: "theme",
		followSystem: true
	},

	// Window settings
	window: {
		defaultTitle: "Tauri + SvelteKit Starter Template",
		minWidth: 600,
		minHeight: 400
	}
} as const;

export type AppConfig = typeof APP_CONFIG;
