<script lang="ts">
	import { geoEqualEarth, geoPath, line, scaleLinear } from 'd3';
	import { continentsColorScale, regionsCoordinates } from '../static/regions';

	export let data: { countries: App.Country[]; internet: App.Internet[] };
	export let metric: Metric;

	$: innerWidth = 0;

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

	const lineGenerator = line()
		.x((d) => d.x)
		.y((d) => d.y);

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
			{@const region = regionsCoordinates.find((region) => region.name == dt.name)}
			{@const [x, y] = projection(region.coordinates)}
			{@const metricValue = dt[metric.name]}
			{@const values = [
				{ x: x - 5, y },
				{ x: x, y: y - valueScale(metricValue) },
				{ x: x + 5, y: y }
			]}
			{@const color = continentsColorScale(region.continent)}
			<path
				d={lineGenerator(values)}
				stroke={color}
				fill={region.name == highlighted ? color : 'none'}
				stroke-width="2"
				on:mouseover={(event) => onMouseOver(event, region.name)}
				on:mouseout={() => onMouseOut()}
			/>
			<text
				{x}
				y={y + 10}
				text-anchor="middle"
				fill="black"
				font-size="10px"
				class={highlighted == region.name ? 'font-bold' : ''}
				>{highlighted == region.name
					? (`${region.name}: ${metricValue}` + (metric.type == 'percentage'
						? '%'
						: ''))
					: region.name}</text
			>
		{/each}
	</g>
</svg>
