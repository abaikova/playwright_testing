const test = require('./base.spec');
const params = require('./parameters');
const {expect} = require("@playwright/test");


test('TC-2: CHECK LOGIN FORM', async ({page, navBar}) => {
    let loginPage;

    await test.step('Go to Sign In -> Register', async () => {
        loginPage = await navBar.openLoginPage();
        await loginPage.openRegistrationForm();
        await expect(page).toHaveTitle(params.expectedTitles.registerPage);
    });

    await test.step('Type an invalid email', async () => {
        await loginPage.typeEmail(params.invalidEmail);
        await expect(page.locator(params.emailFormDescriptionErrorSelector)).toContainText(params.expectedErrorForEmailInput);
    });

    await test.step('Type an invalid password', async () => {
        await loginPage.typeNewPassword(params.invalidPassword);
        await expect(page.locator(params.shortPswdFormNotificationSelector)).toContainText(params.expectedErrorForPswdInput);
    });

    await test.step('Type different password during registration', async () => {
        await loginPage.typeNewPassword(params.newPassword);
        await loginPage.repeatNewPassword(params.incorrectNewPassword);
        await expect(page.locator(params.incorrectPasswordsErrorSelector)).toContainText(params.expectedErrorForDifferentPasswords);
    });
});

