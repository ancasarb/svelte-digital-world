<script lang="ts">
	import type { InternetMetric } from '../routes/internet/+page';

	export let metric: InternetMetric;
</script>

<p class="text-left font-bold text-2xl px-12 pt-3">{metric.title}</p>
<p class="text-left text-md px-12 pt-2">{metric.subtitle}</p>
<p class="text-left text-sm px-12 pt-2 text-gray-500">{metric.description}</p>
<p class="text-left text-xs px-12 pt-2 text-gray-500">Hover your mouse over to explore further.</p>
