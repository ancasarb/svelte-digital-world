<script lang="ts">
	import { geoEqualEarth, geoPath, scaleLinear } from 'd3';
	import {
		_continentsColorScale,
		_regionsCoordinates,
		type InternetMetric
	} from '../routes/internet/+page';
	import SymbolMark from './SymbolMark.svelte';

	export let data: { countries: App.Country[]; internetMetrics: App.Internet[] };
	export let metric: InternetMetric;

	const margin = {
		left: 0,
		right: 10,
		top: 25,
		bottom: 0
	};

	const width = 1050;
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

<svg {width} {height}>
	<g transform={`translate(${margin.left}, ${margin.top})`}>
		{#each data.countries as dt}
			<path d={pathGenerator(dt)} fill="#e1dfd0" stroke="#c4b9aa" stroke-width="0.5" />
		{/each}

		{#each data.internetMetrics as dt}
			{@const region = _regionsCoordinates.find((region) => region.name == dt.name)}

			{@const [x, y] = projection(region.coordinates)}
			{@const [textX, textY] = projection(region?.textCoordinates)}

			{@const metricValue = dt[metric.name]}

			{@const normalColor = _continentsColorScale(region.continent)}
			{@const highlightColor = "#FF3333"}

			{@const color = metric.name == "internet_adoption" ? (metricValue >= 50 ? normalColor : "#FF3333"): metric.name == "share_global_internet_users" ? (metricValue < 10 ? normalColor : "#FF3333") : metric.name == "internet_adoption_indexed_share" ? (metricValue >= 100 ? normalColor : "#FF3333"): normalColor}

			{@const label =
				highlighted == region.name
					? `${region.name}: ${metricValue}` + (metric.type == 'percentage' ? '%' : '')
					: region.name}

			<SymbolMark
				baseX={x}
				baseY={y}
				point={valueScale(metricValue)}
				{color}
				{textX}
				{textY}
				{label}
				onMouseOver={(event) => onMouseOver(event, region.name)}
				onMouseOut={() => onMouseOut()}
				highlighted={region.name == highlighted}
			/>
		{/each}
		<text x={50} y={400} class="text-xs" fill="#666666">
			Hover your mouse over
		</text>
		<text x={50} y={400} dy={20} class="text-xs" fill="#666666">
			to explore further.
		</text>
	</g>
</svg>
