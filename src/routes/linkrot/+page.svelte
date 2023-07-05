<script lang="ts">
	import AreaChart from '../../components/AreaChart.svelte';
import type { PageData } from './$types';

	export let data: PageData;

</script>

<AreaChart data={{ linkRot: data.linkRot, contentDrift: data.contentDrift }}/>
