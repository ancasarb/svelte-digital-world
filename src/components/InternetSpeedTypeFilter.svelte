<script lang="ts">
	import { _internet_speed_type_metrics } from '../routes/internet/+page';

	export let onSelect: (item: string) => void;
	export let current: string;
</script>

<button class="px-4 pt-4" role="group">
	{#each _internet_speed_type_metrics as metric}
		<button
			class={metric == current
				? 'text-center font-medium inline-flex items-center justify-center px-4 py-2 text-sm hover:ring-2 hover:z-10 hover:ring-gray-300 border border-gray-800 bg-gray-900 text-white border-l-0 first:border-l first:rounded-l-lg last:rounded-r-lg'
				: 'text-center font-medium inline-flex items-center justify-center px-4 py-2 text-sm text-gray-900 hover:ring-2 hover:z-10 hover:ring-gray-300 border border-gray-800 focus:bg-gray-900 focus:text-white border-l-0 first:border-l first:rounded-l-lg last:rounded-r-lg'}
			on:click={(e) => {
				onSelect(e.target.innerText);
			}}>{metric}</button
		>
	{/each}
</button>
