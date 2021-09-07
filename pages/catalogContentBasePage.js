const {ProductBasePage} = require('./productBasePage');

const PRICE_CSS_SELECTOR = '.schema-product__price span[data-bind*="minPrice"]';
const SCHEMA_ORDER_ID = '#schema-order';
const DECS_SORTED_PRICE_OPTION = '.schema-order__list span:has-text("Дорогие")';
const OPTIONS_PROCESSING_INDICATOR_CSS_SELECTOR = '.schema-products_processing';
const PRODUCT_TITLE_CSS_SELECTOR = '.schema-product__title';
const MANUFACTURER_FILTER_SELECTOR = ':has-text("Производитель")';

class CatalogContentBasePage {
    constructor(page) {
        this.page = page;
    }

    async selectManufacturerFromListOfAvailable(...phoneLabels) {
        for (const phoneLabel of phoneLabels) {
            const statusSelector = MANUFACTURER_FILTER_SELECTOR + ` li:has-text("${phoneLabel}") .i-checkbox__faux`;
            const checkbox = this.page.locator(statusSelector);
            await checkbox.click();
            await this.page.waitForSelector(OPTIONS_PROCESSING_INDICATOR_CSS_SELECTOR, {state: "detached"});
        }
    }

    async sortByPriceDescAndReturnData() {
        const extractPrices = (elements) => {
            const excludePriceRegEx = /(^\d+)/g;
            return elements.map(el => {
                let trimmedTextItem = el.textContent.trim();
                let result = trimmedTextItem.match(excludePriceRegEx);
                return Number(result);
            });
        };

        await this.page.click(SCHEMA_ORDER_ID);
        await this.page.click(DECS_SORTED_PRICE_OPTION);
        await this.page.waitForSelector(OPTIONS_PROCESSING_INDICATOR_CSS_SELECTOR, {state: "detached"});
        return await this.page.$$eval(PRICE_CSS_SELECTOR, extractPrices);
    }

    async isSortedDesc(array) {
        let isSorted = true;
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] < array[i + 1]) {
                isSorted = false;
                break;
            }
        }
        return isSorted;
    }

    async openFirstItemInGroup() {
        const firstProduct = await this.page.locator(PRODUCT_TITLE_CSS_SELECTOR).first();
        await firstProduct.click();
        return new ProductBasePage(this.page);
    }
}

exports.MobilePhonesPage = class MobilePhonesPage extends CatalogContentBasePage {
    constructor(page) {
        super();
        this.page = page;
    }
}

exports.ConsolesPage = class ConsolesPage extends CatalogContentBasePage {
    constructor(page) {
        super();
        this.page = page;
    }
}