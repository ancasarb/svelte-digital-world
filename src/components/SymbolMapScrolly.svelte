<script lang="ts">
	import { geoEqualEarth, geoPath, scaleLinear } from 'd3';
	import {
		_regionsCoordinates,
		_regionHighlightColor,
		_regionNormalColor,
		type InternetMetric
	} from '../routes/internet-scrolly/+page';
	import SymbolMark from './SymbolMark.svelte';
	import LegendItem from './LegendItem.svelte';

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

			{@const color = metric.threshold
				? metric.thresholdType == '<'
					? metricValue < metric.threshold
						? _regionHighlightColor
						: _regionNormalColor
					: metric.thresholdType == '>='
					? metricValue >= metric.threshold
						? _regionHighlightColor
						: _regionNormalColor
					: _regionNormalColor
				: _regionNormalColor}

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
		<text x={50} y={400} class="text-xs" fill="#666666"> Hover your mouse over </text>
		<text x={50} y={400} dy={20} class="text-xs" fill="#666666"> to explore further. </text>
		{#if metric.threshold}
			<LegendItem
				baseX={50}
				baseY={480}
				point={50}
				color={_regionNormalColor}
				highlighted={false}
			/>
			<text x={50} y={480} dy={15} class="text-xs" fill="black" text-anchor="middle"
				>{metric.oppositeThresholdType}
				{metric.threshold}
				{metric.type == 'percentage' ? '%' : ''}</text
			>
			<LegendItem baseX={58} baseY={480} point={50} color={_regionNormalColor} highlighted={true} />

			<LegendItem
				baseX={110}
				baseY={480}
				point={50}
				color={_regionHighlightColor}
				highlighted={false}
			/>
			<text x={110} y={480} dy={15} class="text-xs" fill="black" text-anchor="middle"
				>{metric.thresholdType} {metric.threshold} {metric.type == 'percentage' ? '%' : ''}</text
			>
			<LegendItem
				baseX={118}
				baseY={480}
				point={50}
				color={_regionHighlightColor}
				highlighted={true}
			/>
		{:else}
			<LegendItem
				baseX={90}
				baseY={480}
				point={50}
				color={_regionNormalColor}
				highlighted={false}
			/>
			<LegendItem baseX={98} baseY={480} point={50} color={_regionNormalColor} highlighted={true} />
		{/if}
	</g>
</svg>
