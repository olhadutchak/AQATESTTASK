class PricingPage {
  get compareAllFeaturesButton() {
    return $('a[href="#compare-features"]'); 
  }

  get compareFeaturesHeading() {
    return $('h1, h2, h3'); 
  }

  async scrollToCompareAllFeatures() {
    await this.compareAllFeaturesButton.scrollIntoView();
  }

  async clickCompareAllFeatures() {
    await this.compareAllFeaturesButton.waitForClickable({ timeout: 5000 });
    await this.compareAllFeaturesButton.click();
  }

  async isCompareFeaturesTextPresent() {
    await browser.pause(1000); 
    const headings = await $$('h1, h2, h3');
    for (const heading of headings) {
      const text = await heading.getText();
      if (text.toLowerCase().includes('compare features')) {
        return true;
      }
    }
    return false;
  }
}

export default new PricingPage();
