import PricingPage from '../pageobjects/pricing.page.js';
import assert from 'assert';

describe('GitHub Pricing Page - Compare features test', () => {
  it('should navigate to Pricing, scroll and click Compare all features, then verify text', async () => {
    await browser.url('https://github.com');

    const pricingLink = await $('a[href="https://github.com/pricing"]');
    await pricingLink.waitForClickable({ timeout: 5000 });
    await pricingLink.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('pricing'),
      {
        timeout: 10000,
        timeoutMsg: 'Pricing page did not load in time',
      }
    );

    await PricingPage.scrollToCompareAllFeatures();
    await PricingPage.clickCompareAllFeatures();
    const isPresent = await PricingPage.isCompareFeaturesTextPresent();
    assert.strictEqual(isPresent, true, 'Expected "Compare features" text to be present');
  });
});
