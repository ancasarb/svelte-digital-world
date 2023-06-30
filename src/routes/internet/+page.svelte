<script lang="ts">
	import BubbleMap from '../../components/BubbleMap.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<BubbleMap data={data.countries} />
