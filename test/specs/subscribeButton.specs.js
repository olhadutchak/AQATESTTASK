import SubscribeButtonPage from '../pageobjects/subscribeButton.page.js';
import assert from 'assert';

describe('GitHub Subscribe Button', () => {
  it('should scroll to Subscribe button, click it and navigate to external domain', async () => {
    await browser.url('https://github.com/');
    await SubscribeButtonPage.subscribeButton.scrollIntoView();
    const isClickable = await SubscribeButtonPage.isSubscribeClickable();
    assert.strictEqual(isClickable, true, 'Subscribe button is not clickable');
    const oldUrl = await browser.getUrl();
    await SubscribeButtonPage.clickSubscribe();

    await browser.waitUntil(
      async () => {
        const newUrl = await browser.getUrl();
        return newUrl !== oldUrl && newUrl.includes('resources.github.com/newsletter');
      },
      {
        timeout: 10000,
        timeoutMsg: 'Expected to be redirected to resources.github.com/newsletter',
      }
    );

    const finalUrl = await browser.getUrl();
    assert.ok(
      finalUrl.includes('resources.github.com/newsletter'),
      `Expected to be on resources.github.com, but got ${finalUrl}`
    );

    const headingCorrect = await SubscribeButtonPage.verifyHeadingText('Subscribe to our developer newsletter');
    assert.strictEqual(headingCorrect, true, 'Heading text is incorrect');
    await SubscribeButtonPage.fillSubscribeForm('testuser@example.com', 'Ukraine', true);

    await SubscribeButtonPage.submitForm();
    assert.strictEqual(
      await SubscribeButtonPage.isConfirmationVisible('Thanks for subscribing!'),
      true,
      'Confirmation message not visible or incorrect'
    );
  });
});
