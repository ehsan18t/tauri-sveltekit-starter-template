<script lang="ts">
	import '@/app.css';
	import TitleBar from '@/lib/components/TitleBar.svelte';

	let { children } = $props();
</script>

<TitleBar />

{@render children()}
