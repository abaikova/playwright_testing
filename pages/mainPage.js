const CATALOG_ONLINER_URL = 'https://catalog.onliner.by/';
const CATALOG_CSS_LOCATOR = `ul.b-main-navigation a[href='${CATALOG_ONLINER_URL}']`;
const CATALOG_WIDGETS_PANEL_CSS_LOCATOR = '.catalog-content.js-scrolling-area';
const LOGIN_BUTTON_CSS_LOCATOR = '#userbar .auth-bar__item:has-text("Вход")';

const {LoginPage} = require('./loginPage');
const {CatalogPage} = require('./catalogPage');

exports.MainPage = class MainPage {
    constructor(page) {
        this.page = page;
    }

    async openCatalog() {
        await this.page.click(CATALOG_CSS_LOCATOR);
        await this.page.waitForSelector(CATALOG_WIDGETS_PANEL_CSS_LOCATOR);
        return new CatalogPage(this.page);
    }

    async openLoginPage() {
        await this.page.click(LOGIN_BUTTON_CSS_LOCATOR);
        return new LoginPage(this.page);
    }
}