const {test, expect} = require('@playwright/test');
const config = require('./test.config');
const {NavigationBar} = require('../pages/navBar');

test.describe('O.BY SUITE >>', () => {
    const CATALOG_PAGE_TAB_TITLE = config.params.expectedTitles.catalogPage;
    const MOBILE_PHONES_PAGE_TAB_TITLE = config.params.expectedTitles.mobilePage;
    const REGISTER_PAGE_TAB_TITLE = config.params.expectedTitles.registerPage;
    const CONSOLE_PAGE_TAB_TITLE = config.params.expectedTitles.consolePage;
    const SERVICES_PAGE_TAB_TITLE = config.params.expectedTitles.servicesPage;

    let navBar;
    let catalogPage;
    let mobilesPage;
    let loginPage;
    let consolesPage;
    let productPage;
    let cartPage;
    let servicesPage;

    test.beforeEach(async ({page}) => {
        await page.goto(config.params.url);
        navBar = new NavigationBar(page);
    });

    test('TC-1: SORT BY PRICE', async ({page}) => {
        await test.step('Go to Onliner and open the catalog', async () => {
            catalogPage = await navBar.openCatalogNavPage();
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
            loginPage = await navBar.openLoginPage();
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

    test('TC-3: ADD TO CART', async ({page}) => {
        await test.step('Open the Catalog', async () => {
            catalogPage = await navBar.openCatalogNavPage();
            await expect(page).toHaveTitle(CATALOG_PAGE_TAB_TITLE);
        });

        await test.step('Go to Gaming Consoles', async () => {
            await catalogPage.expandElectronicsTab();
            consolesPage = await catalogPage.openGamingConsolesPage();

            await expect(page).toHaveTitle(CONSOLE_PAGE_TAB_TITLE);
        });

        await test.step('Select the first result and add it to the cart', async () => {
            productPage = await consolesPage.openFirstItemInGroup();
            await productPage.addProductToCart();
            await expect(productPage.addToCartButton).toHaveText(config.params.expectedButtonText);
        });

        await test.step('Check that the product is in the cart', async () => {
            cartPage = await navBar.openCartPage();
            await expect(cartPage.productData).toContainText(config.params.expectedProductData);
        });
    });

    test.only('TC-4: CHECK SERVICES', async ({page}) => {
        let listOfStatuses;

        await test.step('Open the Services', async () => {
            servicesPage = await navBar.openServicesPage();
            await expect(page).toHaveTitle(SERVICES_PAGE_TAB_TITLE);
        });

        await test.step('Select the status of a service', async () => {
            await servicesPage.selectStatusOfService(config.params.serviceCheckboxStatus);
            listOfStatuses = await servicesPage.getListOfStatuses();

            await expect(servicesPage.areListedServicesHaveStatus(listOfStatuses, config.params.expectedServiceStatus)).toBeTruthy();
        });

        await test.step('Check the amount of services', async () => {
            const amountOfServices = await servicesPage.listedServices.count();
            expect(amountOfServices).toBeGreaterThan(0);     // todo: update to a more elegant solution
        });

        await test.step('Check that each service contains an image', async () => {

        });
    });
});