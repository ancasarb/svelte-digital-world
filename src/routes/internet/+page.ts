import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const result = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/world-geojson.json`
	);
	const features = (await result.json()).features;

	const countries = features.map((feature) => {
		return {
			type: feature.type,
			properties: {
				name: feature.properties['NAME'],
				id: feature.properties['ADM0_A3_IS']
			},
			geometry: feature.geometry
		};
	});

	const raw = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/internet.json`
	);
	const data = await raw.json();

	return { countries: countries, internet: data };
}) satisfies PageLoad;
