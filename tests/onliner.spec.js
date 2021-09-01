const {test, expect} = require('@playwright/test');
const config = require('./test.config');
const {MainPage} = require('../pages/mainPage');

test.describe('O.BY SUITE >>', () => {
    const CATALOG_PAGE_TAB_TITLE = config.params.catalogPageTitle;
    const MOBILE_PHONES_PAGE_TAB_TITLE = config.params.mobilePageTitle;
    const REGISTER_PAGE_TAB_TITLE = config.params.registerPageTitle;

    let mainPage;
    let catalogPage;
    let mobilesPage;
    let loginPage;

    test.beforeEach(async ({page}) => {
        await page.goto(config.params.url);
        mainPage = new MainPage(page);

    });

    test('TC-1: SORT BY PRICE', async ({page}) => {
        await test.step('Go to Onliner and open the catalog', async () => {
            catalogPage = await mainPage.openCatalog();
            await expect(page).toHaveTitle(CATALOG_PAGE_TAB_TITLE);
        });

        await test.step('Go to Mobile Phones', async () => {
            await catalogPage.expandElectronicsTab();
            mobilesPage = await catalogPage.openMobilePhonesPage();

            await expect(page).toHaveTitle(MOBILE_PHONES_PAGE_TAB_TITLE);
        });

        await test.step('Select a manufacturer and sort by price', async () => {
            const requiredMobile = config.params.mobileManufacturer;

            await mobilesPage.selectManufacturerFromListOfAvailable(requiredMobile);
            const prices = await mobilesPage.sortByPriceDescAndReturnData();

            await expect(mobilesPage.isSortedDesc(prices)).toBeTruthy();
        });
    });

    test('TC-2: CHECK LOGIN FORM', async ({page}) => {
        await test.step('Go to Sign In -> Register', async () => {
            loginPage = await mainPage.openLoginPage();
            await loginPage.openRegistrationForm();
            await expect(page).toHaveTitle(REGISTER_PAGE_TAB_TITLE);
        });

        await test.step('Type an invalid email', async (params = config.params) => {
            await loginPage.typeEmail(params.invalidEmail);
            await expect(page.locator(params.emailFormDescriptionErrorSelector)).toContainText(params.expectedErrorForEmailInput);
        });

        await test.step('Type an invalid password', async (params = config.params) => {
            await loginPage.typeNewPassword(params.invalidPassword);
            await expect(page.locator(params.shortPswdFormNotificationSelector)).toContainText(params.expectedErrorForPswdInput);
        });

        await test.step('Type different password during registration', async (params = config.params) => {
            await loginPage.typeNewPassword(params.newPassword);
            await loginPage.repeatNewPassword(params.incorrectNewPassword);
            await expect(page.locator(params.incorrectPasswordsErrorSelector)).toContainText(params.expectedErrorForDifferentPasswords);
        });
    });
});