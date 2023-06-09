import type { PageLoad } from './$types';
import { scaleOrdinal } from 'd3';

export const load = (async ({ fetch }) => {
	const result = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/world-geojson.json`
	);
	const features = (await result.json()).features;

	const countries = features.map((feature) => {
		return {
			type: feature.type,
			properties: {
				name: feature.properties['NAME'],
				id: feature.properties['ADM0_A3_IS']
			},
			geometry: feature.geometry
		};
	});

	const rawMetricsData = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/internet.json`
	);
	const metricsData = await rawMetricsData.json();

	const rawSpeedsData = await fetch(
		`https://raw.githubusercontent.com/ancasarb/svelte-digital-world/main/data/internet_speed.json`
	);
	const speedsData = await rawSpeedsData.json();

	return { countries: countries, internetMetrics: metricsData, internetSpeeds: speedsData };
}) satisfies PageLoad;

export const _regionsCoordinates: Array<{
	name: string;
	coordinates: [number, number];
	textCoordinates: [number, number];
	continent: string;
}> = [
	{
		name: 'Northern America',
		coordinates: [-95.695312, 39.056198],
		textCoordinates: [-95.695312, 39.056198],
		continent: 'North America'
	},
	{
		name: 'Central America',
		coordinates: [-99.125519, 19.451054],
		textCoordinates: [-99.125519, 19.451054],
		continent: 'North America'
	},
	{
		name: 'Southern America',
		coordinates: [-47.882166, -15.794229],
		textCoordinates: [-47.882166, -15.794229],
		continent: 'South America'
	},
	{
		name: 'Caribbean',
		coordinates: [-76.809904, 18.017874],
		textCoordinates: [-76.809904, 18.017874],
		continent: 'North America'
	},
	{
		name: 'Northern Europe',
		coordinates: [10.757933, 59.911491],
		textCoordinates: [-5.757933, 83.911491],
		continent: 'Europe'
	},
	{
		name: 'Western Europe',
		coordinates: [13.404954, 52.520008],
		textCoordinates: [-2.404954, 58.520008],
		continent: 'Europe'
	},
	{
		name: 'Southern Europe',
		coordinates: [12.496366, 41.902782],
		textCoordinates: [12.496366, 41.902782],
		continent: 'Europe'
	},
	{
		name: 'Eastern Europe',
		coordinates: [30.523333, 50.450001],
		textCoordinates: [48.259230045370096, 57.99735028322929],
		continent: 'Europe'
	},
	{
		name: 'Northern Africa',
		coordinates: [21.96667, 24.25],
		textCoordinates: [21.96667, 24.25],
		continent: 'Africa'
	},
	{
		name: 'Western Africa',
		coordinates: [7.491302, 9.072264],
		textCoordinates: [7.491302, 9.072264],
		continent: 'Africa'
	},
	{
		name: 'Middle Africa',
		coordinates: [29.9308, -3.4264],
		textCoordinates: [39.9308, 3.4264],
		continent: 'Africa'
	},
	{
		name: 'Eastern Africa',
		coordinates: [33.78725, -13.96692],
		textCoordinates: [33.78725, -13.96692],
		continent: 'Africa'
	},
	{
		name: 'Southern Africa',
		coordinates: [25.906792, -24.653257],
		textCoordinates: [25.906792, -24.653257],
		continent: 'Africa'
	},
	{
		name: 'Central Asia',
		coordinates: [71.449074, 51.169392],
		textCoordinates: [71.449074, 51.169392],
		continent: 'Asia'
	},
	{
		name: 'Eastern Asia',
		coordinates: [121.597366, 25.105497],
		textCoordinates: [121.597366, 25.105497],
		continent: 'Asia'
	},
	{
		name: 'Western Asia',
		coordinates: [46.738586, 24.774265],
		textCoordinates: [46.738586, 24.774265],
		continent: 'Asia'
	},
	{
		name: 'Southern Asia',
		coordinates: [77.216721, 28.6448],
		textCoordinates: [77.216721, 28.6448],
		continent: 'Asia'
	},
	{
		name: 'South-Eastern Asia',
		coordinates: [106.816666, -6.2],
		textCoordinates: [106.816666, -6.2],
		continent: 'Asia'
	},
	{
		name: 'Oceania',
		coordinates: [149.128998, -35.282001],
		textCoordinates: [149.128998, -35.282001],
		continent: 'Australia'
	}
];

export const _regionNormalColor = '#F68E26';
export const _regionHighlightColor = '#FF3333';

export interface InternetMetric {
	name: string;
	title: string;
	subtitle: string;
	description?: string;
	min: number;
	max: number;
	threshold?: number;
	thresholdType?: string;
	oppositeThresholdType?: string;
	type: 'percentage' | 'numeric';
}

export const _internet_metrics: Array<InternetMetric> = [
	{
		name: 'internet_adoption',
		title: 'Internet Adoption',
		subtitle: 'Internet Users as a Percentage of Total Population',
		description:
			'Regional disparities in internet adoption persist; at the top of the rankings, internet adoption rates now exceed 90 percent in a total of three regions, compared to just over 20 percent in the regions with the lowest rates of internet adoption.',
		min: 0,
		max: 100,
		threshold: 50,
		thresholdType: '<',
		oppositeThresholdType: '>=',
		type: 'percentage'
	},
	{
		name: 'share_global_internet_users',
		title: 'Share of Global Internet Users',
		subtitle: 'Internet Users as a Percentage of Total Global Internet Users',
		description:
			'A small number of regions, such as Eastern Asia and Southern Asia, account for a significant proportion of global internet users. In contrast, regions like Middle Africa and Southern Africa contribute less to the global internet user population.',
		min: 0,
		max: 50,
		threshold: 10,
		thresholdType: '>=',
		oppositeThresholdType: '<',
		type: 'percentage'
	},
	{
		name: 'internet_adoption_indexed_share',
		title: 'Internet Adoption: Indexed Share',
		subtitle:
			"Indices Comparing Each Region's Share of Global Internet Users with Each Region's Respective Share of the Global Population",
		description:
			'Index values above 100 indicate higher internet usage compared to the global average, while values below 100 indicate lower internet usage compared to the global average.',
		min: 0,
		max: 175,
		threshold: 100,
		thresholdType: '<',
		oppositeThresholdType: '>=',
		type: 'numeric'
	},
	{
		name: 'unconnected_populations',
		title: 'Unconnected Populations',
		subtitle: 'Number of People (in Millions) Who Do Not Use the Internet',
		description:
			'Unconnected populations are primarily concentrated in lower and middle-income countries, with barriers such as literacy, digital skills, affordability, and safety and security hindering internet adoption.',
		min: 0,
		max: 1100,
		type: 'numeric'
	}
];

export const _internet_type_metrics: Array<string> = ['mobile', 'fixed broadband'];
export const _internet_speed_type_metrics: Array<string> = ['download', 'upload'];
