<script lang="ts">
	import { scaleBand } from 'd3';
	import RaceBar from './RaceBar.svelte';

	export let data: { speedMetrics: App.InternetSpeed };
	export let metricType: string;
	export let speedType: string;

	const margin = {
		left: 130,
		right: 25,
		top: 20,
		bottom: 5
	};

	const width = 400;
	const height = 475;

	$: boundedWidth = width - margin.left - margin.right;
	$: boundedHeight = height - margin.top - margin.bottom;

	$: filteredData = data.speedMetrics[`${speedType}-${metricType}`];

	$: yScale = scaleBand()
		.domain(filteredData.map((d) => d.name))
		.range([0, boundedHeight])
		.paddingInner(0.15);

	//{xScale(dt.raw_value)}
</script>

<svg viewBox={`0 0 ${width} ${height}`}>
	<g transform={`translate(${margin.left}, ${margin.top})`}>
		{#each filteredData as dt}
            <RaceBar y={yScale(dt.name)} width={boundedWidth} height={yScale.bandwidth()} annotation={dt.name} value={dt.raw_value}/>
		{/each}
	</g>
	<g transform={`translate(${margin.left}, 0)`}>
		<line
			x1={boundedWidth}
			x2={boundedWidth}
			y1={0}
			y2={height}
			stroke="black"
			stroke-dasharray="5"
		/>
		<text
			x={boundedWidth}
			dx={-5}
			dy={-5}
			y={margin.top}
			text-anchor="end"
			fill="black"
			class="text-xs">100 MB</text
		>
	</g>
</svg>
