<script lang="ts">
	import BarChartRaceScrolly from './../../components/BarChartRaceScrolly.svelte';
	import InternetMetricHeadingsScrolly from './../../components/InternetMetricHeadingsScrolly.svelte';
	import SymbolMapScrolly from './../../components/SymbolMapScrolly.svelte';

	import { onMount } from 'svelte';
	import scrollama from 'scrollama';

	import type { PageData } from './$types';
	import {
		_internet_metrics,
		_internet_speed_type_metrics,
		_internet_type_metrics,
		type InternetMetric
	} from './+page';

	import InternetSpeedHeadings from './../../components/InternetSpeedHeadings.svelte';

	import InternetTypeFilter from '../../components/InternetTypeFilter.svelte';
	import InternetSpeedTypeFilter from '../../components/InternetSpeedTypeFilter.svelte';

	import Source from '../../components/Source.svelte';

	export let data: PageData;

	const default_internet_metric_name = 'internet_adoption';
	let internet_metric: InternetMetric = _internet_metrics.find(
		(metric) => metric.name == default_internet_metric_name
	)!;

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

	let innerWidth: number;
	let innerHeight: number;

	let article;
	let figure;

	let stepHeight: number;
	let figureHeight: number;
	let figureMarginTop: number;

	onMount(async () => {
		const scroller = scrollama();

		function handleResize() {
			stepHeight = 670;

			figureHeight = 700;
			figureMarginTop = (innerHeight - figureHeight) / 10;

			scroller.resize();
		}

		function handleStepEnter(response) {
			internet_metric = _internet_metrics[response.index];
		}

		function init() {
			handleResize();

			scroller
				.setup({
					step: '#scrolly article .step',
					offset: 0.4
					// debug: false
				})
				.onStepEnter(handleStepEnter);
		}

		init();
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<section id="scrolly" class="p-4 relative flex">
	<article bind:this={article} class="max-w-xs relative py-0 px-4">
		<div class="step" data-step="1" style="height: {stepHeight}px">
			<InternetMetricHeadingsScrolly metric={_internet_metrics[0]} />
		</div>
		<div class="step" data-step="2" style="height: {stepHeight}px">
			<InternetMetricHeadingsScrolly metric={_internet_metrics[1]} />
		</div>
		<div class="step" data-step="3" style="height: {stepHeight}px">
			<InternetMetricHeadingsScrolly metric={_internet_metrics[2]} />
		</div>
		<div class="step" data-step="4" style="height: {stepHeight}px">
			<InternetMetricHeadingsScrolly metric={_internet_metrics[3]} />
		</div>
	</article>

	<figure bind:this={figure} style="height: {figureHeight}px; top:{figureMarginTop}px;" class="sticky">
		<section id="intro" class="text-center">
			<p class="text-2xl m-7 w-[1150px]">
				Digital use still varies meaningfully around the world. Examine the accessibility and
				inclusiveness of the internet, considering the number of unconnected or poorly served
				fraction of the population.
			</p>
		</section>

		<div class="w-[1150px]">
			<p class="text-left text-lg px-10 font-semibold">{internet_metric.subtitle}</p>
		</div>

		<div class="w-[1050px]">
			<SymbolMapScrolly
				data={{ countries: data.countries, internetMetrics: data.internetMetrics }}
				metric={internet_metric}
			/>
		</div>

		<Source content="DataReportal - Digital 2023 Global Overview Report" />
	</figure>
</section>

<div class="pl-80 pr-80 mr-80 ml-80">
	<section id="outro" class="flex justify-center w-[400px] h-[550px]">
		<div>
			<InternetSpeedHeadings />
			<InternetTypeFilter onSelect={onSelectInternetTypeMetric} current={internet_type_metric} />
			<InternetSpeedTypeFilter
				onSelect={onSelectInternetSpeedTypeMetric}
				current={internet_speed_type_metric}
			/>

			<BarChartRaceScrolly
				data={{ speedMetrics: data.internetSpeeds }}
				metricType={internet_type_metric}
				speedType={internet_speed_type_metric}
			/>

			<Source
				content="Speedtest Global Index - calculations are based on median country speeds from May 2023."
			/>
		</div>
	</section>
</div>

<style>

	#scrolly > * {
		flex: 1;
	}
</style>
