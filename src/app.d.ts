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

		interface PageData {
			linkRot?: LinkRot[];
			contentDrift?: ContentDrift[];
		}
	}
}

export {};
