<script lang="ts">
	import BubbleMap from '../../components/BubbleMap.svelte';
	import type { PageData } from './$types';
	import { metrics } from '../../static/metrics';

	export let data: PageData;
</script>

<p class="text-left font-bold text-2xl px-24 pt-3">{metrics[0].title}</p>
<p class="text-left text-lg px-24 pt-2">{metrics[0].subtitle}</p>

<BubbleMap data={{ countries: data.countries, internet: data.internet }} />
