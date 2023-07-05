<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3';
	import { _continentsColorScale } from '../routes/internet/+page';

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

	$: xScale = scaleLinear().domain([0, 250]).range([0, boundedWidth]); //{xScale(dt.raw_value)}
</script>

<svg viewBox={`0 0 ${width} ${height}`}>
	<g transform={`translate(${margin.left}, ${margin.top})`}>
		{#each filteredData as dt}
			{@const yStart = yScale(dt.name)}
			{@const annotationY = yStart + yScale.bandwidth() / 2}
			<line
				x1={-9}
				x2={0}
				y1={annotationY}
				y2={annotationY}
				stroke={_continentsColorScale(dt.continent)}
				stroke-width="2.5"
			/>
			<text
				x={-11}
				y={annotationY}
				class="text-xs"
				fill="black"
				text-anchor="end"
				alignment-baseline="middle">{dt.name}</text
			>
			<rect
				x={0}
				fill="#e1dfd0"
				stroke="#c4b9aa"
				stroke-width="0.5"
				y={yStart}
				width={boundedWidth}
				height={yScale.bandwidth()}
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
