<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { _internet_speed_type_metrics } from '../routes/internet/+page';

	export let onSelect: (item: string) => void;
</script>

<ButtonGroup divClass="px-4 pt-4">
	{#each _internet_speed_type_metrics as metric}
		<Button
			outline
			color="dark"
			on:click={(e) => {
				onSelect(e.target.innerText);
			}}>{metric}</Button
		>
	{/each}
</ButtonGroup>
