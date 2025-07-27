<script lang="ts">
	import { themeStore } from "@/lib/stores/theme";
	import Icon from "@iconify/svelte";
	import { getName, getVersion } from "@tauri-apps/api/app";
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import { onMount } from "svelte";
	import ControlButton from "./ControlButton.svelte";

	let appWindow: ReturnType<typeof getCurrentWindow>;
	let appName = "";
	let appVersion = "";
	let isMaximized = false;
	let isLoaded = false;

	let appIcon = "/tauri.svg";

	onMount(() => {
		let unlisten: (() => void) | undefined;

		const init = async () => {
			try {
				appWindow = getCurrentWindow();

				// Set initial window shadow
				appWindow.setShadow(true);

				// Get app info with better error handling
				const [title, version, maximized] = await Promise.allSettled([
					getName(),
					getVersion(),
					appWindow.isMaximized()
				]);

				appName = title.status === "fulfilled" ? title.value : "Tauri + SvelteKit Starter Template";
				appVersion = version.status === "fulfilled" ? version.value : "1.0.0";
				isMaximized = maximized.status === "fulfilled" ? maximized.value : false;

				isLoaded = true;

				// Listen for window state changes
				unlisten = await appWindow.onResized(async () => {
					try {
						isMaximized = await appWindow.isMaximized();
					} catch (error) {
						console.warn("Failed to check maximized state:", error);
					}
				});
			} catch (error) {
				console.error("Failed to initialize titlebar:", error);
				// Still show the titlebar even if some things fail
				appName = "Tauri + SvelteKit Starter Template";
				appVersion = "1.0.0";
				isLoaded = true;
			}
		};

		init();

		// Cleanup listener on component destroy
		return () => {
			if (unlisten) unlisten();
		};
	});

	// Window control functions with error handling
	const minimize = async () => {
		try {
			await appWindow?.minimize();
		} catch (error) {
			console.error("Failed to minimize:", error);
		}
	};

	const maximize = async () => {
		if (!appWindow) return;
		try {
			isMaximized ? await appWindow.unmaximize() : await appWindow.maximize();
		} catch (error) {
			console.error("Failed to maximize/restore:", error);
		}
	};

	const close = async () => {
		try {
			await appWindow?.close();
		} catch (error) {
			console.error("Failed to close:", error);
		}
	};

	// Use theme store for theme toggling
	const toggleTheme = () => {
		themeStore.toggle();
	};
</script>

{#if isLoaded}
	<div
		class="titlebar bg-elevated border-border drag-enable text-foreground flex h-10 select-none items-center justify-between border-b pl-1.5 pr-1 backdrop-blur-sm"
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
						appIcon = "";
					}}
				/>
				{#if !appIcon}
					<Icon icon="tabler:app-window" width="16" height="16" class="text-accent" />
				{/if}
			</div>

			<div class="app-details flex items-center gap-1">
				<span class="text-foreground font-semibold tracking-tight">
					{appName}
					<span class="text-foreground-subtle text-xs font-medium">
						v{appVersion}
					</span>
				</span>
			</div>
		</div>

		<div class="window-controls drag-disable flex items-center">
			<ControlButton
				title="Toggle Theme"
				icon={$themeStore === "dark" ? "tabler:moon" : "tabler:sun"}
				onClick={toggleTheme}
				variant="theme"
			/>

			<!-- Material Design divider -->
			<div class="bg-foreground-muted/20 mx-2 h-4 w-px"></div>

			<ControlButton
				title="Minimize"
				icon="fluent:minimize-20-filled"
				onClick={minimize}
				variant="default"
			/>
			<ControlButton
				title={isMaximized ? "Restore" : "Maximize"}
				icon={isMaximized ? "tabler:copy" : "fluent:maximize-20-filled"}
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
