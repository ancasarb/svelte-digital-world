export interface Metric {
	name: string;
	title: string;
	subtitle: string;
	min: number;
	max: number;
	type: "percentage" | "numeric";
}

export const metrics: Array<Metric> = [
	{
		name: 'internet_adoption',
		title: 'Internet Adoption',
		subtitle: 'Internet Users as a Percentage of Total Population',
		min: 0,
		max: 100,
		type: "percentage"
	},
	{
		name: 'share_global_internet_users',
		title: 'Share of Global Internet Users',
		subtitle: 'Internet Users as a Percentage of Total Global Internet Users',
		min: 0,
		max: 100,
		type: "percentage"
	},
	{
		name: 'internet_adoption_indexed_share',
		title: 'Internet Adoption: Indexed Share',
		subtitle:
			"Comparing Each Region's Share of Global Internet Users with Each Region's Respective Share of the Global Population",
		min: 0,
		max: 175,
		type: "numeric"
	},
	{
		name: 'unconnected_populations',
		title: 'Unconnected Populations',
		subtitle: 'Number of People (in Millions) Who Do Not Use the Internet',
		min: 0,
		max: 1100,
		type: "numeric"
	}
];
