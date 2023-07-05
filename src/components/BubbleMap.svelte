<script lang="ts">
	import { geoEqualEarth, geoPath, scaleLinear } from 'd3';
	import {
		_continentsColorScale,
		_regionsCoordinates,
		type AdoptionMetric
	} from '../routes/internet/+page';
	import BubbleMark from './BubbleMark.svelte';

	export let data: { countries: App.Country[]; internet: App.Internet[]; values: any };
	export let metric: AdoptionMetric;

	$: innerWidth = 0;

	const margin = {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10
	};

	$: width = 1100;
	$: boundedWidth = width - margin.left - margin.right;

	$: sphere = { type: 'Sphere' };
	$: projection = geoEqualEarth().fitWidth(boundedWidth, sphere);

	$: pathGenerator = geoPath(projection);
	$: [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere);

	$: boundedHeight = y1;
	$: height = boundedHeight + margin.top + margin.bottom;

	$: valueScale = scaleLinear().domain([metric!.min, metric!.max]).range([0, 50]);

	$: highlighted = '';

	const onMouseOver = function (event: MouseEvent, value: string) {
		highlighted = value;
	};

	const onMouseOut = function () {
		highlighted = '';
	};
</script>

<svelte:window bind:innerWidth />

<svg viewBox={`0 0 ${width} ${height}`}>
	<g transform={`translate(${margin.left}, ${margin.top})`}>
		{#each data.countries as dt}
			<path d={pathGenerator(dt)} fill="#e1dfd0" stroke="#c4b9aa" stroke-width="0.5" />
		{/each}

		{#each data.internet as dt}
			{@const region = _regionsCoordinates.find((region) => region.name == dt.name)}

			{@const [x, y] = projection(region.coordinates)}
			{@const [textX, textY] = projection(region?.textCoordinates)}

			{@const metricValue = dt[metric.name]}

			{@const label =
				highlighted == region.name
					? `${region.name}: ${metricValue}` + (metric.type == 'percentage' ? '%' : '')
					: region.name}

			<BubbleMark
				baseX={x}
				baseY={y}
				point={valueScale(metricValue)}
				color={_continentsColorScale(region.continent)}
				{textX}
				{textY}
				{label}
				onMouseOver={(event) => onMouseOver(event, region.name)}
				onMouseOut={() => onMouseOut()}
				highlighted={region.name == highlighted}
			/>
		{/each}
	</g>
</svg>
