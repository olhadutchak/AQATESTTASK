import LandingPage from '../pageobjects/copilotButton.page';
import assert from 'assert';

describe('GitHub Copilot CTA', () => {
  it('should display correct title and navigate to Copilot page', async () => {
    await LandingPage.open();

    const titleText = await LandingPage.getBannerTitleText();
    assert.strictEqual(
      titleText,
      'Millions of developers and businesses call GitHub home',
      'Expected banner title does not match'
    );

    await LandingPage.clickCopilotCTA();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/github-copilot/pro'),
      {
        timeout: 5000,
        timeoutMsg: 'Expected to be navigated to GitHub Copilot Pro page',
      }
    );

    const currentUrl = await browser.getUrl();
    assert.ok(
      currentUrl.includes('/github-copilot/pro'),
      'User was not redirected to GitHub Copilot page'
    );

    await LandingPage.clickTryNowButton();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('github.com/login'),
      {
        timeout: 10000,
        timeoutMsg: 'Expected to navigate to Copilot Pro Signup page',
      }
    );
  });
});
