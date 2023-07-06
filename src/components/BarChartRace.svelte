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

	let replay: boolean = false;
</script>

<div class="flex flex-wrap justify-end">
	<button
		class="mx-5 my-2 text-center font-small px-2 py-1 text-sm text-gray-900 hover:ring-2 hover:z-10 hover:ring-gray-300 border border-gray-800 active:bg-gray-100 border-l-0 first:border-l first:rounded-l-lg last:rounded-r-lg"
		on:click={(e) => {
			replay = !replay;
		}}>replay</button
	>
</div>
<svg viewBox={`0 0 ${width} ${height}`}>
	<g transform={`translate(${margin.left}, ${margin.top})`}>
		{#each filteredData as dt}
			<RaceBar
				y={yScale(dt.name)}
				width={boundedWidth}
				height={yScale.bandwidth()}
				annotation={dt.name}
				value={dt.raw_value}
				{replay}
			/>
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
