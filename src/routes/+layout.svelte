<script lang="ts">
	import '@/app.css';
	import TitleBar from '@/lib/components/TitleBar.svelte';
	import { themeStore } from '@/lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();
	onMount(() => {
		themeStore.init();
	});
</script>

<TitleBar />

{@render children()}
