const {test, expect} = require('@playwright/test');
const config = require('./test.config')

const {MainPage} = require('./pages/mainPage');
const {CatalogPage} = require('./pages/catalogPage');
const {MobilePhonesPage} = require('./pages/mobilePhonesPage');

test.describe('O.BY SUITE >>', () => {
    const CATALOG_PAGE_TAB_TITLE = config.params.catalogPageTitle;
    const MOBILE_PHONES_PAGE_TAB_TITLE = config.params.mobilePageTitle;

    test.beforeEach(async ({page}) => {
        await page.goto(config.params.url);
    });

    test('TC-1: SORT BY PRICE', async ({page}) => {
        await test.step('Go to Onliner and open the catalog', async () => {
            const mainPage = new MainPage(page);

            await mainPage.openCatalog();

            await expect(page).toHaveTitle(CATALOG_PAGE_TAB_TITLE);
        });

        await test.step('Go to Mobile Phones', async () => {
            const catalogPage = new CatalogPage(page);

            await catalogPage.expandElectronicsTab();
            await catalogPage.openMobilePhonePage();

            await expect(page).toHaveTitle(MOBILE_PHONES_PAGE_TAB_TITLE);
        });

        await test.step('Select a manufacturer and sort by price', async () => {
            const mobilesPage = new MobilePhonesPage(page);
            const requiredMobile = config.params.mobileManufacturer;

            await mobilesPage.selectManufacturerFromListOfAvailable(requiredMobile);
            const prices = await mobilesPage.sortByPriceDescAndReturnData();

            await expect(mobilesPage.isSortedDesc(prices)).toBeTruthy();
        });
    });
});