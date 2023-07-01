import { scaleOrdinal } from 'd3';

export const regionsCoordinates: Array<{
	name: string;
	coordinates: [number, number];
	continent: string;
}> = [
	{ name: 'Northern America', coordinates: [-95.695312, 39.056198], continent: 'North America' },
	{ name: 'Central America', coordinates: [-99.125519, 19.451054], continent: 'North America' },
	{ name: 'Southern America', coordinates: [-47.882166, -15.794229], continent: 'South America' },
	{ name: 'Caribbean', coordinates: [-76.809904, 18.017874], continent: 'North America' },
	{ name: 'Northern Europe', coordinates: [10.757933, 59.911491], continent: 'Europe' },
	{ name: 'Western Europe', coordinates: [13.404954, 52.520008], continent: 'Europe' },
	{ name: 'Southern Europe', coordinates: [12.496366, 41.902782], continent: 'Europe' },
	{ name: 'Eastern Europe', coordinates: [30.523333, 50.450001], continent: 'Europe' },
	{ name: 'Northern Africa', coordinates: [21.96667, 24.25], continent: 'Africa' },
	{ name: 'Western Africa', coordinates: [7.491302, 9.072264], continent: 'Africa' },
	{ name: 'Middle Africa', coordinates: [29.9308, -3.4264], continent: 'Africa' },
	{ name: 'Eastern Africa', coordinates: [33.78725, -13.96692], continent: 'Africa' },
	{ name: 'Southern Africa', coordinates: [25.906792, -24.653257], continent: 'Africa' },
	{ name: 'Central Asia', coordinates: [71.449074, 51.169392], continent: 'Asia' },
	{ name: 'Eastern Asia', coordinates: [121.597366, 25.105497], continent: 'Asia' },
	{ name: 'Western Asia', coordinates: [46.738586, 24.774265], continent: 'Asia' },
	{ name: 'Southern Asia', coordinates: [77.216721, 28.6448], continent: 'Asia' },
	{ name: 'South-Eastern Asia', coordinates: [106.816666, -6.2], continent: 'Asia' },
	{ name: 'Oceania', coordinates: [149.128998, -35.282001], continent: 'Australia' }
];

export const continentsColorScale = scaleOrdinal()
	.domain(['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia'])
	.range(['#f9b25b', '#51976e', '#0a5881', '#997596', '#f7e165', '#53b3c7', '#d5a09e']);
