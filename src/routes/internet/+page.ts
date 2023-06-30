import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const result = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/world-geojson.json`
	);
	const raw = (await result.json()).features;

	const countries = raw.map((feature) => {
		return {
			type: feature.type,
			properties: {
				name: feature.properties['NAME'],
				id: feature.properties['ADM0_A3_IS']
			},
			geometry: feature.geometry
		};
	});

	return { countries: countries };
}) satisfies PageLoad;
