import SignupPage from '../pageobjects/home.page.js';
import users from '../data/users';
import assert from 'assert';

describe('GitHub Signup Flow', () => {
  it('should redirect to Sign up page and accept a valid email', async () => {
    await SignupPage.openHome();
    await SignupPage.clickSignUpButton();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/signup'),
      {
        timeout: 5000,
        timeoutMsg: 'Expected to be redirected to the /signup page',
      }
    );

    const currentUrl = await browser.getUrl();
    assert.ok(
      currentUrl.includes('/signup'),
      'User is not redirected to the Sign up page'
    );

    await SignupPage.enterEmail(users.validUser.email);
    await browser.waitUntil(
      async () => !(await SignupPage.isEmailErrorVisible()),
      {
        timeout: 5000,
        timeoutMsg: 'Expected email error NOT to appear, but it is visible',
      }
    );


    await SignupPage.enterPassword(users.validUser.password);
    await browser.waitUntil(
      async () => !(await SignupPage.isPasswordErrorVisible()),
      {
        timeout: 5000,
        timeoutMsg: 'Expected password error NOT to appear, but it is visible',
      }

    );

    await SignupPage.enterUserName(users.validUser.userName);
    await SignupPage.selectCountry('Ukraine');

    const isClickable = await SignupPage.isCreateAccountButtonClickable();
    expect(isClickable).toBe(true);

  });
});
