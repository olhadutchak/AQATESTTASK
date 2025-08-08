class HomePage {
  get signUpButton() { return $('.HeaderMenu-link--sign-up');}
  get emailInput()   { return $('#email');}
  get emailError()   { return $('div.error');}
  get userName()     { return $('input[name="user[login]"]');}
  get countryDropdown() {return $('.Button-content.Button-content--alignStart');}
  get createAccountButton() {return $('button.js-octocaptcha-load-captcha');}
  

  async openHome() {
    await browser.url('https://github.com');
  }

  async clickSignUpButton() {
    await this.signUpButton.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: '"Sign up" button was not visible on the home page',
    });
    await this.signUpButton.click();
  }

  async enterEmail(email) {
    await this.emailInput.waitForDisplayed();
    await this.emailInput.clearValue();
    await this.emailInput.setValue(email);
    await this.emailInput.addValue('\uE004'); 
  }


  async isEmailErrorVisible() {
  const errorElem = await $('.nux-error');
  return await errorElem.isDisplayed();
}

  async enterPassword(password) {
    const passwordInput = await $('#password');
    await passwordInput.waitForDisplayed({ timeout: 5000 });
    await passwordInput.setValue(password);
    await passwordInput.addValue('\uE004');
  }

  async isPasswordErrorVisible() {
    const errorBlock = await $('auto-check .error');
    return await errorBlock.isDisplayed();
  }

  async enterUserName(userName){
    await this.userName.waitForDisplayed();
    await this.userName.clearValue();
    await this.userName.setValue(userName);
    await this.userName.addValue('\uE004'); 
  }

  countryOption(countryName) {
    return $(`span.ActionListItem-label=${countryName}`);
  }

  async selectCountry(countryName) {
    await this.countryDropdown.waitForClickable();
    await this.countryDropdown.click();

    const option = await this.countryOption(countryName);
    await option.waitForDisplayed();
    await option.click();
  }

  async isCreateAccountButtonClickable() {
    const btn = await this.createAccountButton;
    const isDisplayed = await btn.isDisplayed();
    const isEnabled = await btn.isEnabled();

    console.log('Кнопка відображається:', isDisplayed);
    console.log('Кнопка активна:', isEnabled);

    return isDisplayed && isEnabled;
  }

}

export default new HomePage();