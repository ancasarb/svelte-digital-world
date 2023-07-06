<script lang="ts">
	import type { PageData } from './$types';
	import {
		_internet_metrics,
		_internet_speed_type_metrics,
		_internet_type_metrics,
		type InternetMetric
	} from './+page';

	import BubbleMap from '../../components/BubbleMap.svelte';
	import BarChartRace from '../../components/BarChartRace.svelte';

	import InternetSpeedHeadings from './../../components/InternetSpeedHeadings.svelte';
	import InternetMetricHeadings from '../../components/InternetMetricHeadings.svelte';

	import InternetMetricFilter from '../../components/InternetMetricFilter.svelte';
	import InternetTypeFilter from '../../components/InternetTypeFilter.svelte';
	import InternetSpeedTypeFilter from '../../components/InternetSpeedTypeFilter.svelte';

	import Source from '../../components/Source.svelte';

	export let data: PageData;

	const default_internet_metric_name = 'internet_adoption';
	let internet_metric: InternetMetric = _internet_metrics.find(
		(metric) => metric.name == default_internet_metric_name
	)!;

	function onSelectInternetMetric(value: string) {
		internet_metric = _internet_metrics.find(
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

<div class="grid grid-cols-[minmax(1050px,_1fr)] text-center pt-4 pb-4 px-8">
	<p>
		Digital use still varies meaningfully around the world. Examine the accessibility and
		inclusiveness of the internet, considering the number of unconnected or poorly served fraction
		of the population.
	</p>
</div>
<div class="grid grid-cols-[minmax(1050px,_3fr)_minmax(400px,_1fr)]">
	<div>
		<InternetMetricFilter onSelect={onSelectInternetMetric} />

		<InternetMetricHeadings metric={internet_metric} />

		<BubbleMap
			data={{ countries: data.countries, internetMetrics: data.internetMetrics }}
			metric={internet_metric}
		/>

		<Source content="DataReportal - Digital 2023 Global Overview Report" />
	</div>
	<div>
		<InternetSpeedHeadings />
		<InternetTypeFilter onSelect={onSelectInternetTypeMetric} />
		<InternetSpeedTypeFilter onSelect={onSelectInternetSpeedTypeMetric} />

		<BarChartRace
			data={{ speedMetrics: data.internetSpeeds }}
			metricType={internet_type_metric}
			speedType={internet_speed_type_metric}
		/>

		<Source
			content="Speedtest Global Index - calculations are based on median country speeds (from May 2023)."
		/>
	</div>
</div>
