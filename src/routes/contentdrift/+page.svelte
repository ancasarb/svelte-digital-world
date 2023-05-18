<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	$: console.log(data);
</script>

<p class="text-3xl font-bold underline">content drift</p>
