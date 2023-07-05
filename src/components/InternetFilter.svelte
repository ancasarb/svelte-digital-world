<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { _metrics } from '../routes/internet/+page';

	export let onSelect: (item: string) => void;
</script>

<ButtonGroup divClass="px-12 pt-4">
	{#each _metrics as metric}
		<Button
			outline
			color="dark"
			on:click={(e) => {
				onSelect(e.target.innerText);
			}}>{metric.title.toLocaleLowerCase()}</Button
		>
	{/each}
</ButtonGroup>
