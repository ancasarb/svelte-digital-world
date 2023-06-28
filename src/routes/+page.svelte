<script lang="ts">
	$: selectedCategory = '';

	const handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = function (event) {
		if (event.currentTarget && selectedCategory == event.currentTarget.id) {
			selectedCategory = '';
			event.currentTarget.blur();
		} else {
			selectedCategory = event.currentTarget.id;
		}
	};
</script>

<div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
	<button
		type="button"
		id="all"
		class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
		on:click={handleClick}>all categories</button
	>
	<button
		type="button"
		id="knowledge"
		class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
		on:click={handleClick}>knowledge</button
	>
	<button
		type="button"
		id="divide"
		class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
		on:click={handleClick}>digital divide</button
	>
</div>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
	{#if selectedCategory == 'all' || selectedCategory == 'knowledge' || selectedCategory == ''}
		<div>
			<a href="/linkrot" class="h-auto max-w-full rounded-lg">
				<p class="text-3xl font-bold">link rot</p>
				<div class="text-left space-y-4 p-8">
					<p>
						Link rot refers to the modern nuisance when links to a resource or webpage no longer
						work or become unreachable. All websites are affected by link rot, and this analysis
						focused on the NYT website.
					</p>
					<p>
						The dataset consisted of 553,693 articles, representing 1,627,612 unique links. 72% of
						the links were deep links that included a path to a specific page and those were the
						ones examined.
					</p>
				</div>
			</a>
		</div>
	{/if}
	{#if selectedCategory == 'all' || selectedCategory == 'knowledge' || selectedCategory == ''}
		<div>
			<a href="/factcheck" class="h-auto max-w-full rounded-lg">
				<p class="text-3xl font-bold">fact-checking</p>
				<div class="text-left space-y-4 p-8">
					<p>Encountering misinformation or fake news online has become a common occurrence.</p>
					<p>
						The project explores the 1,259 claims fact-checked by the Reuters News fact-checking
						unit in 2022.
					</p>
				</div>
			</a>
		</div>
	{/if}
	{#if selectedCategory == 'all' || selectedCategory == 'divide' || selectedCategory == ''}
		<div>
			<a href="/internet" class="h-auto max-w-full rounded-lg">
				<p class="text-3xl font-bold">internet adoption</p>
				<div class="text-left space-y-4 p-8">
					<p>
						Examine the accessibility and inclusiveness of the internet, considering the number of
						unconnected or poorly served fraction of the population.
					</p>
				</div>
			</a>
		</div>
	{/if}
</div>

<style>
	@import url('https://rsms.me/inter/inter.css');

	:global(body) {
		font-family: 'Inter', sans-serif;
	}
</style>
