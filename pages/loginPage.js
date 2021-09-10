const REGISTRATION_LINK_CSS_SELECTOR = 'a[href="https://profile.onliner.by/registration"]';
const EMAIL_INPUT_CSS_SELECTOR = 'input[type=email]';
const PSWD_INPUT_CSS_SELECTOR = 'input[type=password]';
const NEW_PSWD_INPUT_CSS_SELECTOR = PSWD_INPUT_CSS_SELECTOR + '[placeholder="Придумайте пароль"]';
const REPEAT_NEW_PSWD_INPUT_CSS_SELECTOR = PSWD_INPUT_CSS_SELECTOR + '[placeholder="Повторите пароль"]';
const EMAIL_ERROR_NOTE_UNDER_INPUT_SELECTOR = '.auth-form__field:has([type=email]) .auth-form__description_error';
const PASSWORD_ERROR_NOTE_UNDER_INPUT_SELECTOR = '.auth-form__field:has([type=password]) .auth-form__description_error';
const SHORT_PASSWORD_NOTE_UNDER_INPUT_SELECTOR = '.auth-form__securebox_condensed .auth-form__description_primary:below(.auth-form__row:has([type=password]))';
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
        await input.fill(EMPTY_STRING);     // clear the input
        await input.fill(password);
    }

    async repeatNewPassword(password) {
        const input = this.page.locator(REPEAT_NEW_PSWD_INPUT_CSS_SELECTOR);
        await input.fill(EMPTY_STRING);     // clear the input
        await input.type(password);
    }

    async getEmailErrorNoteLocator() {
        return await this.page.locator(EMAIL_ERROR_NOTE_UNDER_INPUT_SELECTOR);
    }

    async getShortPasswordNoteLocator() {
        return await this.page.locator(SHORT_PASSWORD_NOTE_UNDER_INPUT_SELECTOR);
    }

    async getPasswordErrorNoteLocator() {
        return await this.page.locator(PASSWORD_ERROR_NOTE_UNDER_INPUT_SELECTOR);
    }
}