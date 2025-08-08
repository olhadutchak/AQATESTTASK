class SearchPage {
  get searchButton() {
    return $('button.header-search-button');
  }

  get searchInput() {
    return $('#query-builder-test'); 
  }

  get searchResults() {
    return $$('.Box-sc-g0xbh4-0.gPrlij');
  }

  async openSearch() {
    await this.searchButton.waitForClickable({ timeout: 5000 });
    await this.searchButton.click();
  }

  async typeSearchQuery(query) {
    await this.searchInput.waitForDisplayed({ timeout: 5000 });
    await this.searchInput.setValue(query);
  }

  async submitSearch() {
    await browser.keys('Enter');
  }

  async areResultsRelevant(query) {
    await browser.pause(1000); 
    const results = await this.searchResults;
    for (const result of results) {
      const text = await result.getText();
      if (text.toLowerCase().includes(query.toLowerCase())) {
        return true; 
      }
    }
    return false; 
  }
}

export default new SearchPage();
