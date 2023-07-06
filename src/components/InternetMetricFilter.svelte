<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { _internet_metrics } from '../routes/internet/+page';

	export let onSelect: (item: string) => void;
</script>

<ButtonGroup divClass="px-12 pt-4">
	{#each _internet_metrics as metric}
		<Button
			outline
			color="dark"
			on:click={(e) => {
				onSelect(e.target.innerText);
			}}>{metric.title.toLocaleLowerCase()}</Button
		>
	{/each}
</ButtonGroup>
