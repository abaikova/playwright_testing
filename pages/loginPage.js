const REGISTRATION_LINK_CSS_SELECTOR = 'a[href="https://profile.onliner.by/registration"]';
const EMAIL_INPUT_CSS_SELECTOR = 'input[type=email]';
const PSWD_INPUT_CSS_SELECTOR = 'input[type=password]';
const NEW_PSWD_INPUT_CSS_SELECTOR = PSWD_INPUT_CSS_SELECTOR + '[placeholder="Придумайте пароль"]';
const REPEAT_NEW_PSWD_INPUT_CSS_SELECTOR = PSWD_INPUT_CSS_SELECTOR + '[placeholder="Повторите пароль"]';
const EMPTY_STRING = '';

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async openRegistrationForm() {
        await this.page.click(REGISTRATION_LINK_CSS_SELECTOR);
    }

    async typeEmail(email) {
        const input = this.page.locator(EMAIL_INPUT_CSS_SELECTOR);
        await input.type(email);
    }

    async typeNewPassword(password) {
        const input = this.page.locator(NEW_PSWD_INPUT_CSS_SELECTOR);
        await input.fill(EMPTY_STRING);
        await input.fill(password);
    }

    async repeatNewPassword(password) {
        const input = this.page.locator(REPEAT_NEW_PSWD_INPUT_CSS_SELECTOR);
        await input.fill(EMPTY_STRING);
        await input.type(password);
    }
}