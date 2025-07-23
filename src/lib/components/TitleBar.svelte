<script lang="ts">
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { getVersion } from '@tauri-apps/api/app';
	import { getCurrentWindow } from '@tauri-apps/api/window';
	import { onMount } from 'svelte';
	import ControlButton from './ControlButton.svelte';

	let appWindow: ReturnType<typeof getCurrentWindow>;
	let theme = '';
	let appName = '';
	let appVersion = '';
	let isMaximized = false;
	let isLoaded = false;

	let appIcon = '/icons/32x32.png';

	onMount(() => {
		let unlisten: (() => void) | undefined;

		const init = async () => {
			// Initialize theme first (client-side only)
			const savedTheme = localStorage.getItem('theme') || 'dark';
			theme = savedTheme;
			// Sync with what's already set in app.html, but update if different
			if (document.documentElement.getAttribute('data-theme') !== savedTheme) {
				document.documentElement.setAttribute('data-theme', savedTheme);
			}

			appWindow = getCurrentWindow();

			try {
				// Get the actual window title instead of product name
				appName = await appWindow.title();
				appVersion = await getVersion();
			} catch (error) {
				console.warn('Failed to get app info:', error);
				appName = 'Tauri + SvelteKit Starter Template';
				appVersion = '1.0.0';
			}

			isMaximized = await appWindow.isMaximized();

			// Mark as loaded after all data is fetched
			isLoaded = true;

			// Listen for window state changes
			unlisten = await appWindow.onResized(async () => {
				isMaximized = await appWindow.isMaximized();
			});
		};

		init();

		// Cleanup listener on component destroy
		return () => {
			if (unlisten) unlisten();
		};
	});

	const minimize = () => appWindow?.minimize();
	const maximize = async () => {
		if (!appWindow) return;
		isMaximized ? appWindow.unmaximize() : appWindow.maximize();
	};
	const close = () => appWindow?.close();

	function setTheme(newTheme: string) {
		if (browser) {
			document.documentElement.setAttribute('data-theme', newTheme);
			theme = newTheme;
			localStorage.setItem('theme', newTheme);
		}
	}

	function toggleTheme() {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}
</script>

{#if isLoaded}
	<div
		class="titlebar bg-elevated border-border drag-enable text-foreground flex h-12 select-none items-center justify-between border-b px-4 py-2 backdrop-blur-sm"
	>
		<div class="app-info flex items-center gap-3">
			<div
				class="icon-container bg-accent/10 flex h-7 w-7 items-center justify-center rounded-md p-1"
			>
				<img
					src={appIcon}
					alt="App Icon"
					class="h-full w-full rounded-sm object-contain"
					on:error={() => {
						appIcon = '';
					}}
				/>
				{#if !appIcon}
					<Icon icon="tabler:app-window" width="16" height="16" class="text-accent" />
				{/if}
			</div>

			<div class="app-details flex flex-col">
				<span class="text-foreground text-sm font-semibold tracking-tight">
					{appName}
				</span>
				<span class="text-foreground-subtle text-xs font-medium">
					v{appVersion}
				</span>
			</div>
		</div>

		<div class="window-controls drag-disable flex items-center gap-1">
			<ControlButton
				title="Toggle Theme"
				icon={theme === 'dark' ? 'tabler:moon' : 'tabler:sun'}
				onClick={toggleTheme}
				variant="theme"
			/>

			<div class="separator bg-border mx-1 h-4 w-px opacity-50"></div>

			<ControlButton title="Minimize" icon="tabler:minus" onClick={minimize} variant="default" />
			<ControlButton
				title={isMaximized ? 'Restore' : 'Maximize'}
				icon={isMaximized ? 'tabler:copy' : 'tabler:square'}
				onClick={maximize}
				variant="default"
			/>
			<ControlButton title="Close" icon="tabler:x" onClick={close} variant="danger" />
		</div>
	</div>
{:else}
	<!-- Loading state with proper theme colors -->
	<div class="titlebar bg-elevated border-border drag-enable h-12 border-b">
		<div class="flex h-full items-center justify-center">
			<div class="text-foreground-muted animate-pulse text-xs">Loading...</div>
		</div>
	</div>
{/if}

<style>
	.titlebar {
		/* Add subtle glass effect */
		background-color: hsl(var(--elevated) / 0.9);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid hsl(var(--border) / 0.5);
	}
</style>
