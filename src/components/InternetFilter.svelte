<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { metrics } from '../static/metrics';

	export let onSelect: (item: string) => void;
</script>

<ButtonGroup divClass="inline-flex rounded-lg px-12 pt-4">
	{#each metrics as metric}
		<Button
			outline
			color="dark"
			on:click={(e) => {
				onSelect(e.target.innerText);
			}}>{metric.title.toLocaleLowerCase()}</Button
		>
	{/each}
</ButtonGroup>
