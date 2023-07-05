<script lang="ts">
	import type { AdoptionMetric } from '../routes/internet/+page';

	export let metric: AdoptionMetric;
</script>

<p class="text-left font-bold text-2xl px-12 pt-3">{metric.title}</p>
<p class="text-left text-lg px-12 pt-2">{metric.subtitle}</p>
<p class="text-left text-xs px-12 pt-2 text-gray-500">Hover your mouse over to explore further.</p>
