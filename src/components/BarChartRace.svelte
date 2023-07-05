<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3';
	import { _continentsColorScale } from '../routes/internet/+page';

	export let data: { speedMetrics: App.InternetSpeed };
	export let metricType: string;
	export let speedType: string;

	const margin = {
		left: 125,
		right: 25,
		top: 10,
		bottom: 10
	};

	const width = 350;
	const height = 450;

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
		{#each filteredData as dt, i}
			{@const annotationY = yScale(dt.name) + yScale.bandwidth() / 2}
			<line x1={-5} x2={0} y1={annotationY} y2={annotationY} stroke="#c4b9aa" />
			<text
				x={-6}
				y={annotationY}
				class="text-xs"
                fill="black"
				text-anchor="end"
				alignment-baseline="middle">{dt.name}</text
			>
			<rect
				x={0}
				fill="#e1dfd0"
                stroke={_continentsColorScale(dt.continent)}
				y={yScale(dt.name)}
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
	</g>
</svg>
