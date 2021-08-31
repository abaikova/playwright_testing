const {test, expect} = require('@playwright/test');
const {MainPage} = require('./pages/mainPage.js');
const {CatalogPage} = require('./pages/catalogPage.js');
const {MobilePhonesPage} = require('./pages/mobilePhonesPage.js');

test('Test case 1 (4 steps)', async ({page}) => {
    const CATALOG_PAGE_TAB_TITLE = /Каталог/;
    const MOBILE_PHONES_PAGE_TAB_TITLE = /Мобильный телефон/;

    await test.step('Go to Onliner and open the catalog', async () => {
        const mainPage = new MainPage(page);

        await mainPage.navigate();
        await mainPage.openCatalog();

        await expect(page).toHaveTitle(CATALOG_PAGE_TAB_TITLE);
    });

    await test.step('Go to Mobile Phones', async () => {
        const catalogPage = new CatalogPage(page);

        await catalogPage.expandElectronicsTab();
        await catalogPage.openMobilePhonePage();

        await expect(page).toHaveTitle(MOBILE_PHONES_PAGE_TAB_TITLE);
    });

    await test.step('Sort by a manufacturer', async () => {
        const mobilesPage = new MobilePhonesPage(page);

        await mobilesPage.selectManufacturerFromListOfAvailable('HONOR');
        const prices = await mobilesPage.sortByPriceDescAndReturnData();
        //  TODO add verification
        // await expect(mobilesPage.isSortedDesc(prices)).toBeTruthy();
    });
});