import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const result = await fetch(
		'https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/linkrot/content_drift.json'
	);
	const content = (await result.json()) as App.ContentDrift[];

	return { contentDrift: content };
}) satisfies PageLoad;
