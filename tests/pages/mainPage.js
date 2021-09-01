const CATALOG_ONLINER_URL = 'https://catalog.onliner.by/';
const CATALOG_CSS_LOCATOR = `ul.b-main-navigation a[href='${CATALOG_ONLINER_URL}']`;
const CATALOG_WIDGETS_PANEL_CSS_LOCATOR = '.catalog-content.js-scrolling-area';

class MainPage {
    constructor(page) {
        this.page = page;
    }

    async openCatalog() {
        await this.page.click(CATALOG_CSS_LOCATOR);
        await this.page.waitForSelector(CATALOG_WIDGETS_PANEL_CSS_LOCATOR);
    }
}

module.exports = {MainPage}