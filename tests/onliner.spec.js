const {test, expect} = require('@playwright/test');
const params = require('./parameters');
const {NavigationBar} = require('../pages/navBar');

test.describe('O.BY SUITE >>', () => {
    const CATALOG_PAGE_TAB_TITLE = params.expectedTitles.catalogPage;
    const MOBILE_PHONES_PAGE_TAB_TITLE = params.expectedTitles.mobilePage;
    const REGISTER_PAGE_TAB_TITLE = params.expectedTitles.registerPage;
    const CONSOLE_PAGE_TAB_TITLE = params.expectedTitles.consolePage;
    const SERVICES_PAGE_TAB_TITLE = params.expectedTitles.servicesPage;

    let navBar;
    let catalogPage;
    let mobilesPage;
    let loginPage;
    let consolesPage;
    let productPage;
    let cartPage;
    let servicesPage;

    let page

    test.beforeEach(async ({context}) => {
        page = await context.newPage();
        await context.route('**/*', route => {
            if (route.request().frame().parentFrame()) {
                route.abort();
            } else {
                route.continue();
            }
        });
        await page.goto(params.url);
        navBar = new NavigationBar(page);
    });

    test('TC-1: SORT BY PRICE', async () => {
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
            const requiredMobile = params.mobileManufacturer;

            await mobilesPage.selectManufacturerFromListOfAvailable(requiredMobile);
            const prices = await mobilesPage.sortByPriceDescAndReturnData();

            await expect(mobilesPage.isSortedDesc(prices)).toBeTruthy();
        });
    });

    test('TC-2: CHECK LOGIN FORM', async () => {
        await test.step('Go to Sign In -> Register', async () => {
            loginPage = await navBar.openLoginPage();
            await loginPage.openRegistrationForm();
            await expect(page).toHaveTitle(REGISTER_PAGE_TAB_TITLE);
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

    test('TC-3: ADD TO CART', async () => {
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
            await expect(productPage.getAddToCartButton()).toHaveText(params.expectedButtonText);
        });

        await test.step('Check that the product is in the cart', async () => {
            cartPage = await navBar.openCartPage();
            const productData = await cartPage.getProductData();
            await expect(productData).toContainText(params.expectedProductData);
        });
    });

    test('TC-4: CHECK SERVICES', async () => {
        await test.step('Open the Services', async () => {
            servicesPage = await navBar.openServicesPage();
            await expect(page).toHaveTitle(SERVICES_PAGE_TAB_TITLE);
        });

        await test.step('Select the status of a service', async () => {
            await servicesPage.selectStatusOfService(params.serviceCheckboxStatus);
            let listOfStatuses = await servicesPage.getListOfStatuses();

            await expect(servicesPage.areListedServicesHaveStatus(listOfStatuses, params.expectedServiceStatus)).toBeTruthy();
        });

        await test.step('Check the amount of services', async () => {
            const actualAmount = await servicesPage.getAmountOfListedServices();
            expect(actualAmount).toBeGreaterThan(0);
        });

        await test.step('Check that each service contains an image', async () => {
            expect(await servicesPage.areListedServicesHaveImage()).toBeTruthy();
        });
    });

    test('TC-5: Go to Forum and verify the main features', async () => {
        let forumPage;

        await test.step('Go to Forum', async () => {
            forumPage = await navBar.openForumPage();
            await expect(page).toHaveTitle(params.expectedTitles.forumPage);
        });

        await test.step('Go to tab "Новое за 24 часа"', async () => {
            await forumPage.openLastPostsTab();
            await expect(page.locator(params.forumTitleSelector)).toContainText(params.expectedForumTitle);
        });

        await test.step('Verify the amount of found topics', async () => {
            const topicsCount = await forumPage.getAmountOfTopicsOnPage();
            expect(topicsCount).toBeGreaterThan(1);
        });

        await test.step('Verify the date and time of the topics on the last page', async () => {
            await forumPage.openTheLastPage();
            expect(await forumPage.areTopicsCreatedLessThan24HoursAgo()).toBeTruthy();
        });
    })
});