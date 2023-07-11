<script lang="ts">
	import { line } from 'd3';

	const lineGenerator = line()
		.x((d) => d.x)
		.y((d) => d.y);

	export let baseX: number;
	export let baseY: number;
	export let point: number;

	export let color: string;

	export let highlighted: boolean;

	$: values = [
		{ x: baseX - 5, y: baseY },
		{ x: baseX, y: baseY - point },
		{ x: baseX + 5, y: baseY }
	];
</script>

<path
	d={lineGenerator(values)}
	stroke={color}
	fill={highlighted ? color : 'none'}
	stroke-width="2"
/>
