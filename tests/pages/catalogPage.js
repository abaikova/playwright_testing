const ELECTRONICS_CLASSIFIER_ITEM_CSS_LOCATOR = 'li[data-id="1"]';
const CATALOG_ONLINER_URL = 'https://catalog.onliner.by/';
const MOBILE_PHONES_URL = CATALOG_ONLINER_URL + 'mobile';

class CatalogPage {
    constructor(page) {
        this.page = page;
    }

    async expandElectronicsTab() {
        await this.page.click(ELECTRONICS_CLASSIFIER_ITEM_CSS_LOCATOR);
    }

    async openMobilePhonePage() {
        await this.page.click('.catalog-navigation-list__aside-title:has-text("Мобильные телефоны")');
        await this.page.click(`a[href='${MOBILE_PHONES_URL}']`);
    }
}

module.exports = {CatalogPage};