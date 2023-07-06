<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	export let y: number;
	export let width: number;
	export let height: number;

	export let value: number;
	export let annotation: string;

	export let replay: boolean;

	$: annotationY = y + height / 2;

	let duration;
	let opacity;
	let rawDuration: number;

	$: {
		rawDuration = 100 / (value / 8);
		duration = tweened(0, { duration: 50 * rawDuration, delay: 500, easing: cubicInOut });
		opacity = tweened(0, { duration: 50 * rawDuration, delay: 500, easing: cubicInOut });

		duration.set(width);

		opacity.set(1);
	}

	$: {
		if (replay || !replay) {
			rawDuration = 100 / (value / 8);
			duration = tweened(0, { duration: 50 * rawDuration, delay: 500, easing: cubicInOut });
			opacity = tweened(0, { duration: 50 * rawDuration, delay: 500, easing: cubicInOut });

			duration.set(width);

			opacity.set(1);
		}
	}

	let totalTime: string;

	$: {
		if (rawDuration >= 60) {
			const minutes = Math.floor(rawDuration / 60);
			const seconds = Math.floor(rawDuration - minutes * 60);
			totalTime = `${minutes}m ${seconds}s`;
		} else {
			const seconds = Math.floor(rawDuration);
			totalTime = `${seconds}s`;
		}
	}

	$: isGlobal = annotation == 'global';
</script>

<line
	x1={-9}
	x2={0}
	y1={annotationY}
	y2={annotationY}
	stroke="#c4b9aa"
	stroke-width={isGlobal ? '2' : '0.5'}
/>
<text
	x={-11}
	y={annotationY}
	class={isGlobal ? 'text-xs font-bold' : 'text-xs'}
	fill="black"
	text-anchor="end"
	alignment-baseline="middle">{annotation}</text
>
<rect
	x={0}
	fill="#e1dfd0"
	stroke="#c4b9aa"
	stroke-width={isGlobal ? '2' : '0.5'}
	{y}
	width={$duration}
	{height}
/>

<text
	x={width}
	y={annotationY}
	dx={-5}
	class={isGlobal ? 'text-xs font-bold' : 'text-xs'}
	fill="black"
	text-anchor="end"
	opacity={$opacity}
	alignment-baseline="middle">{totalTime}</text
>
