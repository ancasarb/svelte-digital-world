// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface Platform {}

		interface LinkRot {
			year: string;
			intact: number;
			ambiguous: number;
			rotted: number;
		}

		interface ContentDrift {
			year: string;
			intact: number;
			drifted: number;
		}

		interface Country {
			type: string;
			properties: {
				name: string;
				id: string;
			};
			geometry: {
				type: string;
				coordinates: [[number, number]];
			};
		}

		interface Internet {
			name: string;
			[metric: string]: number;
		}

		interface InternetSpeed {
			[metric: string]: [{ name: string; rank: number; raw_value: number }];
		}

		interface PageData {
			linkRot?: LinkRot[];
			contentDrift?: ContentDrift[];
			countries?: Country[];
			internet?: Internet[];
		}
	}
}

export {};
