import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const result = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/link_rot.json`
	);
	const content = (await result.json()) as App.LinkRot[];

	return { linkRot: content };
}) satisfies PageLoad;
