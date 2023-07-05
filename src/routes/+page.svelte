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

<div class="flex flex-wrap justify-center py-4">
	<button
		type="button"
		id="all"
		class="text-link-blue border border-link-blue bg-white hover:text-white hover:bg-link-blue focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-6 mb-3"
		on:click={handleClick}>all categories</button
	>
	<button
		type="button"
		id="knowledge"
		class="text-gray-950 border border-white bg-white hover:border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-6 mb-3"
		on:click={handleClick}>knowledge</button
	>
	<button
		type="button"
		id="divide"
		class="text-gray-950 border border-white bg-white hover:border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-6 mb-3"
		on:click={handleClick}>digital divide</button
	>
</div>

<div
	class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 text-center"
>
	{#if selectedCategory == 'all' || selectedCategory == 'knowledge' || selectedCategory == ''}
		<div>
			<a href="/linkrot">
				<p class="text-4xl font-bold">link rot</p>
				<div class="md:text-left lg:text-left xl:text-left 2xl:text-left space-y-4 p-8">
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
			<a href="/factcheck">
				<p class="text-4xl font-bold">fact-checking</p>
				<div class="md:text-left lg:text-left xl:text-left 2xl:text-left space-y-4 p-8">
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
			<a href="/internet">
				<p class="text-4xl font-bold">internet adoption</p>
				<div class="md:text-left lg:text-left xl:text-left 2xl:text-left space-y-4 p-8">
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
