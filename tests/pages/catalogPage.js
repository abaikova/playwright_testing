const ELECTRONICS_CLASSIFIER_ITEM_CSS_LOCATOR = 'li[data-id="1"]';
const MOBILE_PHONES_ASIDE_TITLE_CSS_SELECTOR = '.catalog-navigation-list__aside-title:has-text("Мобильные телефоны")';
const MOBILE_PHONES_URL = 'a[href="https://catalog.onliner.by/mobile"]';

exports.CatalogPage = class CatalogPage {
    constructor(page) {
        this.page = page;
    }

    async expandElectronicsTab() {
        await this.page.click(ELECTRONICS_CLASSIFIER_ITEM_CSS_LOCATOR);
    }

    async openMobilePhonePage() {
        await this.page.click(MOBILE_PHONES_ASIDE_TITLE_CSS_SELECTOR);
        await this.page.click(MOBILE_PHONES_URL);
    }
}