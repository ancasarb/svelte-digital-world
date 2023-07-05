import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const linkRotResult = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/link_rot.json`
	);
	const linkRotContent = (await linkRotResult.json()) as App.LinkRot[];

	const contentDriftResult = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/content_drift.json`
	);
	const contentDriftContent = (await contentDriftResult.json()) as App.ContentDrift[];

	return { linkRot: linkRotContent, contentDrift: contentDriftContent };
}) satisfies PageLoad;
