const test = require('./base.spec');
const parameters = require('./parameters');
const {expect} = require("@playwright/test");


test('TC-2: CHECK LOGIN FORM', async ({page, navBar}) => {
    const expectedTitles = parameters.testCases.expectedTitles;
    const params = parameters.testCases.second;

    let loginPage;

    await test.step('Go to Sign In -> Register', async () => {
        loginPage = await navBar.openLoginPage();
        await loginPage.openRegistrationForm();
        await expect(page).toHaveTitle(expectedTitles.registerPage);
    });

    await test.step('Type an invalid email', async () => {
        await loginPage.typeEmail(params.invalidEmail);

        const emailError = await loginPage.getEmailErrorNoteLocator();
        await expect(emailError).toContainText(params.expectedErrorForEmailInput);
    });

    await test.step('Type an invalid password', async () => {
        await loginPage.typeNewPassword(params.invalidPassword);

        const shortPasswordNote = await loginPage.getShortPasswordNoteLocator();
        await expect(shortPasswordNote).toContainText(params.expectedErrorForPswdInput);
    });

    await test.step('Type different password during registration', async () => {
        await loginPage.typeNewPassword(params.newPassword);
        await loginPage.repeatNewPassword(params.incorrectNewPassword);

        const passwordError = await loginPage.getPasswordErrorNoteLocator();
        await expect(passwordError).toContainText(params.expectedErrorForDifferentPasswords);
    });
});

