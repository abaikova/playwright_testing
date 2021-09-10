const test = require('./base.spec');
const parameters = require('./parameters');
const {expect} = require("@playwright/test");


test('TC-1: SORT BY PRICE', async ({page, navBar}) => {
    const expectedTitles = parameters.testCases.expectedTitles;
    const params = parameters.testCases.first;

    let catalogPage;
    let mobilesPage;

    await test.step('Go to Onliner and open the catalog', async () => {
        catalogPage = await navBar.openCatalogNavPage();
        await expect(page).toHaveTitle(expectedTitles.catalogPage);
    });

    await test.step('Go to Mobile Phones', async () => {
        await catalogPage.expandElectronicsTab();
        mobilesPage = await catalogPage.openMobilePhonesPage();

        await expect(page).toHaveTitle(expectedTitles.mobilePage);
    });

    await test.step('Select a manufacturer and sort by price', async () => {
        await mobilesPage.selectManufacturerFromListOfAvailable(params.mobileManufacturer);
        const prices = await mobilesPage.sortByPriceDescAndReturnData();

        await expect(mobilesPage.isSortedDesc(prices)).toBeTruthy();
    });
});
