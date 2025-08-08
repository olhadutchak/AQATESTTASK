class SubscribeButtonPage {
    get subscribeButton() {
        return $('a[href="https://resources.github.com/newsletter/"]');
    }

    get headingSubscribePage() {
        return $('#hero-section-brand-heading');
    }

     get workEmailInput() {
        return $('input[name="emailAddress"]');
    }

    get countrySelect() {
        return $('select[name="country"]');
    }

    get marketingOptInCheckbox() {
        return $('input[name="marketingEmailOptin1"]');
    }

    get submitFormButton() {
        return $('section#form button[type="submit"]');
    }

    get confirmationMessage() {
        return $('//*[contains(text(),"Thanks for subscribing!")]');
    }

    async clickSubscribe() {
        await this.subscribeButton.scrollIntoView();
        await this.subscribeButton.waitForClickable({ timeout: 10000 });
        await this.subscribeButton.click();
    }

    async isSubscribeClickable() {
        return await this.subscribeButton.isClickable();
    }

    async verifyHeadingText(expectedText) {
        await this.headingSubscribePage.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Expected heading to be visible',
        });
        const actualText = await this.headingSubscribePage.getText();
        return actualText.trim() === expectedText;
    }


    async fillSubscribeForm(email, country, optIn = false) {
        await this.workEmailInput.waitForDisplayed({ timeout: 5000 });
        await this.workEmailInput.setValue(email);
        await this.countrySelect.selectByVisibleText(country);

        const checkbox = this.marketingOptInCheckbox;
        const isChecked = await checkbox.isSelected();
        if (optIn && !isChecked) await checkbox.click();
        if (!optIn && isChecked) await checkbox.click();
    }

    async submitForm() {
        await this.submitFormButton.scrollIntoView();
        await this.submitFormButton.waitForClickable({ timeout: 5000 });
        await this.submitFormButton.click();
    }

    async isConfirmationVisible(expectedText) {
        await browser.waitUntil(
            async () => (await this.confirmationMessage.isDisplayed()),
            { timeout: 10000, timeoutMsg: 'Expected confirmation message to appear' }
        );
        const text = await this.confirmationMessage.getText();
        return text.trim().includes(expectedText);
    }
}

export default new SubscribeButtonPage();
