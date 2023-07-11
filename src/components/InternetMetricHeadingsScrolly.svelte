<script lang="ts">
	import type { InternetMetric } from '../routes/internet/+page';

	export let metric: InternetMetric;
</script>

<p class="text-left font-bold text-2xl px-12 pt-36">{metric.title}</p>
<p class="text-left sm:text-xl px-12 pt-5 text-gray-500">{metric.description}</p>
