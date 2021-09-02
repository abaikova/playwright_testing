const CATALOG_CSS_LOCATOR = `ul.b-main-navigation a[href="https://catalog.onliner.by/"]`;
const CART_CSS_LOCATOR = 'a[href="https://cart.onliner.by"][title="Корзина"]';
const CATALOG_WIDGETS_PANEL_CSS_LOCATOR = '.catalog-content.js-scrolling-area';
const LOGIN_BUTTON_CSS_LOCATOR = '#userbar .auth-bar__item:has-text("Вход")';

const {LoginPage} = require('./loginPage');
const {CatalogNavigationPage} = require('./catalogNavigationPage');
const {CartPage} = require('./cartPage')

exports.NavigationBar = class NavigationBar {
    constructor(page) {
        this.page = page;
    }

    async openCatalog() {
        await this.page.click(CATALOG_CSS_LOCATOR);
        await this.page.waitForSelector(CATALOG_WIDGETS_PANEL_CSS_LOCATOR);
        return new CatalogNavigationPage(this.page);
    }

    async openLoginPage() {
        await this.page.click(LOGIN_BUTTON_CSS_LOCATOR);
        return new LoginPage(this.page);
    }

    async openCartPage() {
        await this.page.click(CART_CSS_LOCATOR);
        return new CartPage(this.page);
    }
}