class LandingPage {
  get copilotCTAButton() {
    return $('a[href="/github-copilot/pro"]');
  }
  get tryNowButton() {
    return $('form[action="/github-copilot/pro/signup"] button.Button--primary');
  }

  get titleBanner() {
    return $('h2=Millions of developers and businesses call GitHub home');
  }

  async open() {
    await browser.url('https://github.com/');
  }

  async getBannerTitleText() {
  await this.titleBanner.scrollIntoView();
  await this.titleBanner.waitForDisplayed({ timeout: 10000 });
  return await this.titleBanner.getText();
}

  async clickCopilotCTA() {
    await this.copilotCTAButton.waitForClickable({ timeout: 5000 });
    await this.copilotCTAButton.click();
  }

  async clickTryNowButton() {
    await this.tryNowButton.scrollIntoView();
    await this.tryNowButton.waitForClickable({ timeout: 10000 });
    await this.tryNowButton.click();
  }
}

export default new LandingPage();