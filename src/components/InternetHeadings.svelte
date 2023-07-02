<script lang="ts">
	import type { Metric } from "../static/metrics";

    export let metric: Metric;

</script>

<p class="text-left font-bold text-2xl px-12 pt-3">{metric.title}</p>
<p class="text-left text-lg px-12 pt-2">{metric.subtitle}</p>