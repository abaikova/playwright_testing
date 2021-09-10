const test = require('./base.spec');
const params = require('./parameters');
const {expect} = require("@playwright/test");


test('TC-3: ADD TO CART', async ({page, navBar}) => {
    let catalogPage;
    let consolesPage;
    let productPage;

    await test.step('Open the Catalog', async () => {
        catalogPage = await navBar.openCatalogNavPage();
        await expect(page).toHaveTitle(params.expectedTitles.catalogPage);
    });

    await test.step('Go to Gaming Consoles', async () => {
        await catalogPage.expandElectronicsTab();
        consolesPage = await catalogPage.openGamingConsolesPage();

        await expect(page).toHaveTitle(params.expectedTitles.consolePage);
    });

    await test.step('Select the first result and add it to the cart', async () => {
        productPage = await consolesPage.openFirstItemInGroup();
        await productPage.addProductToCart();
        await expect(productPage.getAddToCartButton()).toHaveText(params.expectedButtonText);
    });

    await test.step('Check that the product is in the cart', async () => {
        const cartPage = await navBar.openCartPage();
        const productData = await cartPage.getProductData();
        await expect(productData).toContainText(params.expectedProductData);
    });
});