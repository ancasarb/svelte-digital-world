<script lang="ts">
	import type { PageData } from './$types';
	import { metrics, type Metric } from '../../static/metrics';

	import BubbleMap from '../../components/BubbleMap.svelte';
	import InternetHeadings from '../../components/InternetHeadings.svelte';
	import InternetFilter from '../../components/InternetFilter.svelte';

	export let data: PageData;

	const metric_name = 'internet_adoption';
	let metric: Metric = metrics.find((metric) => metric.name == metric_name)!;

	function onSelect(value: string) {
		metric = metrics.find((metric) => metric.title.toLocaleLowerCase() == value)!;
	}
</script>

<InternetFilter {onSelect} />

<InternetHeadings {metric} />

<BubbleMap data={{ countries: data.countries, internet: data.internet }} {metric} />
