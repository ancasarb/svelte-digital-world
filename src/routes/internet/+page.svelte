<script lang="ts">
	import type { PageData } from './$types';
	import {
		_adoption_metrics,
		_internet_speed_type_metrics,
		_internet_type_metrics,
		type AdoptionMetric
	} from './+page';

	import BubbleMap from '../../components/BubbleMap.svelte';

	import InternetSpeedHeadings from './../../components/InternetSpeedHeadings.svelte';
	import InternetAdoptionHeadings from '../../components/InternetAdoptionHeadings.svelte';

	import InternetAdoptionFilter from '../../components/InternetAdoptionFilter.svelte';
	import InternetTypeFilter from '../../components/InternetTypeFilter.svelte';
	import InternetSpeedTypeFilter from '../../components/InternetSpeedTypeFilter.svelte';

	import Source from '../../components/Source.svelte';

	export let data: PageData;

	const default_adoption_metric_name = 'internet_adoption';
	let adoption_metric: AdoptionMetric = _adoption_metrics.find(
		(metric) => metric.name == default_adoption_metric_name
	)!;

	function onSelectAdoptionMetric(value: string) {
		adoption_metric = _adoption_metrics.find(
			(metric) => metric.title.toLocaleLowerCase() == value
		)!;
	}

	const default_internet_type_metric_name = 'fixed broadband';
	let internet_type_metric: string = _internet_type_metrics.find(
		(metric) => metric == default_internet_type_metric_name
	)!;

	function onSelectInternetTypeMetric(value: string) {
		internet_type_metric = _internet_type_metrics.find((metric) => metric == value)!;
	}

	const default_internet_speed_type_metric_name = 'download';
	let internet_speed_type_metric: string = _internet_speed_type_metrics.find(
		(metric) => metric == default_internet_speed_type_metric_name
	)!;

	function onSelectInternetSpeedTypeMetric(value: string) {
		internet_speed_type_metric = _internet_speed_type_metrics.find((metric) => metric == value)!;
	}
</script>

<div class="grid grid-cols-[minmax(1100px,_1fr)] text-center pt-4 pb-4 px-8">
	<p>
		Examine the accessibility and inclusiveness of the internet, considering the number of
		unconnected or poorly served fraction of the population.
	</p>
</div>
<div class="grid grid-cols-[minmax(1100px,_3fr)_minmax(350px,_1fr)]">
	<div>
		<InternetAdoptionFilter onSelect={onSelectAdoptionMetric} />

		<InternetAdoptionHeadings metric={adoption_metric} />

		<BubbleMap
			data={{ countries: data.countries, internet: data.internet }}
			metric={adoption_metric}
		/>

		<Source content="DataReportal - Digital 2023 Global Overview Report" />
	</div>
	<div>
		<InternetSpeedHeadings />
		<InternetTypeFilter onSelect={onSelectInternetTypeMetric} />
		<InternetSpeedTypeFilter onSelect={onSelectInternetSpeedTypeMetric} />

		<Source content="Speedtest Global Index" />
	</div>
</div>
