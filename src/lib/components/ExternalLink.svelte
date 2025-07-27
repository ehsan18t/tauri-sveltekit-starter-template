<script lang="ts">
	import { open } from "@tauri-apps/plugin-shell";

	// `...rest` will automatically capture `class`, `target`, `title`, etc.
	const { href, children, ...rest } = $props();

	async function handleClick(event: MouseEvent) {
		// Only intercept external links
		if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
			event.preventDefault();
			try {
				await open(href);
			} catch (error) {
				console.error(`Failed to open external link: ${href}`, error);
			}
		}
	}
</script>

<a {href} {...rest} onclick={handleClick}>
	{@render children()}
</a>
