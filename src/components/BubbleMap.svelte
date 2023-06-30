<script lang="ts">
	import { geoEqualEarth, geoPath } from 'd3';

	export let data: App.Country[];

	$: innerWidth = 0;
	$: innerHeight = 0;

	const margin = {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10
	};

	$: width = innerWidth * 0.9;
	$: boundedWidth = width - margin.left - margin.right;

	$: sphere = { type: 'Sphere' };
	$: projection = geoEqualEarth().fitWidth(boundedWidth, sphere);

	$: pathGenerator = geoPath(projection);
	$: [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere);

	$: boundedHeight = y1;
	$: height = boundedHeight + margin.top + margin.bottom;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<svg viewBox={`0 0 ${width} ${height}`}>
	<g transform={`translate(${margin.left}, ${margin.top})`}>
		{#each data as dt}
			<path d={pathGenerator(dt)} fill="#e1dfd0" stroke="#c4b9aa" />
		{/each}
	</g>
</svg>
