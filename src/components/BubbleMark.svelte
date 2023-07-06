<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { line } from 'd3';

	export let values;

	const lineGenerator = line()
		.x((d) => d.x)
		.y((d) => d.y);

	export let baseX: number;
	export let baseY: number;
	export let point: number;

	export let textX: number;
	export let textY: number;
	export let label: string;

	export let color: string;

	export let highlighted: boolean;

	export let onMouseOver;
	export let onMouseOut;

	const pointY = tweened(point, { duration: 300, easing: cubicInOut });

	$: pointY.set(point);

	$: values = [
		{ x: baseX - 5, y: baseY },
		{ x: baseX, y: baseY - $pointY },
		{ x: baseX + 5, y: baseY }
	];
</script>

<path
	d={lineGenerator(values)}
	stroke={color}
	fill={highlighted ? color : 'none'}
	stroke-width="2"
	on:mouseover={onMouseOver}
	on:mouseout={onMouseOut}
/>

<text
	x={textX}
	y={textY}
	text-anchor="middle"
	fill="black"
	class={highlighted ? 'font-bold text-xs' : 'text-xs'}
	on:mouseover={onMouseOver}
	on:mouseout={onMouseOut}
>
	{#each label.split(' ') as fragment}
		<tspan x={textX} dy="1.2em" text-anchor="middle">{fragment}</tspan>
	{/each}
</text>
