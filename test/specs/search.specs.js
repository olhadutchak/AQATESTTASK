import SearchPage from '../pageobjects/search.page.js';
import assert from 'assert';

describe('GitHub Search Functionality', () => {
  it('should show results relevant to the query', async () => {
    await browser.url('https://github.com');

    await SearchPage.openSearch();

    const query = 'as';
    await SearchPage.typeSearchQuery(query);
    await SearchPage.submitSearch();

    const relevant = await SearchPage.areResultsRelevant(query);
    assert.strictEqual(relevant, true, `No relevant results found for query "${query}"`);
  });
});
