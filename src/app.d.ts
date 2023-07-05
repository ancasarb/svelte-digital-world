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
			internet_adoption: number;
			share_global_internet_users: number;
			internet_adoption_indexed_share: number;
			unconnected_populations: number;
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
