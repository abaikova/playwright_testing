const {ConsolesPage, MobilePhonesPage} = require('./catalogContentBasePage');

const ELECTRONICS_CLASSIFIER_ITEM_CSS_LOCATOR = 'li[data-id="1"]';
const ASIDE_TITLE_CSS_SELECTOR = '.catalog-navigation-list__aside-title';
const MOBILE_PHONES_ASIDE_TITLE_SELECTOR = ASIDE_TITLE_CSS_SELECTOR + ':has-text("Мобильные телефоны")';
const VIDEO_GAMES_ASIDE_TITLE_SELECTOR = ASIDE_TITLE_CSS_SELECTOR + ':has-text("Видеоигры")';
const MOBILE_PHONES_CATEGORY_CSS_SELECTOR = 'a[href="https://catalog.onliner.by/mobile"]';
const CONSOLES_PHONES_CATEGORY_CSS_SELECTOR = 'a[href="https://catalog.onliner.by/console"]';

exports.CatalogNavigationPage = class CatalogNavigationPage {
    constructor(page) {
        this.page = page;
    }

    async expandElectronicsTab() {
        await this.page.click(ELECTRONICS_CLASSIFIER_ITEM_CSS_LOCATOR);
    }

    async openMobilePhonesPage() {
        await this.page.click(MOBILE_PHONES_ASIDE_TITLE_SELECTOR);
        await this.page.click(MOBILE_PHONES_CATEGORY_CSS_SELECTOR);
        return new MobilePhonesPage(this.page);
    }

    async openGamingConsolesPage() {
        await this.page.locator(VIDEO_GAMES_ASIDE_TITLE_SELECTOR).click();
        await this.page.locator(CONSOLES_PHONES_CATEGORY_CSS_SELECTOR).click();
        return new ConsolesPage(this.page);
    }
}