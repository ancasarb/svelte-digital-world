<script lang="ts">
	import type { InternetMetric } from '../routes/internet/+page';

	export let metric: InternetMetric;
</script>

<p class="text-left font-bold text-2xl px-12 pt-3">{metric.title}</p>
<p class="text-left text-sm px-12 pt-2 text-gray-500">{metric.description}</p>
