const CATALOG_CSS_LOCATOR = 'a[href="https://catalog.onliner.by/"].b-main-navigation__link';
const SERVICES_CSS_LOCATOR = 'a[href="https://s.onliner.by/tasks"].b-main-navigation__link';
const FORUM_CSS_LOCATOR = 'a[href="https://forum.onliner.by/"].b-main-navigation__link';
const CART_CSS_LOCATOR = 'a[href="https://cart.onliner.by"][title="Корзина"]';
const CATALOG_WIDGETS_PANEL_CSS_LOCATOR = '.catalog-content.js-scrolling-area';
const LOGIN_BUTTON_CSS_LOCATOR = '#userbar .auth-bar__item:has-text("Вход")';

const {LoginPage} = require('./loginPage');
const {CatalogNavigationPage} = require('./catalogNavigationPage');
const {CartPage} = require('./cartPage')
const {ServicesPage} = require("./servicesPage");
const {ForumPage} = require("./forumPage");

exports.NavigationBar = class NavigationBar {
    constructor(page) {
        this.page = page;
    }

    async openCatalogNavPage() {
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

    async openServicesPage() {
        await this.page.click(SERVICES_CSS_LOCATOR);
        return new ServicesPage(this.page);
    }

    async openForumPage() {
        await this.page.click(FORUM_CSS_LOCATOR);
        return new ForumPage(this.page);
    }
}