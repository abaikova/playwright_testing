exports.MobilePhonesPage = class MobilePhonesPage {
    constructor(page) {
        this.page = page;
    }

    async selectManufacturerFromListOfAvailable(...phoneLabels) {
        for (const phoneLabel of phoneLabels) {
            const checkboxSelector = `li:has-text("${phoneLabel}") .schema-filter__checkbox-item .i-checkbox .i-checkbox__faux`;

            await Promise.all([
                this.page.waitForNavigation(),
                this.page.click(checkboxSelector)
            ]);
        }
    }

    async sortByPriceDescAndReturnData() {
        const priceCssSelector = '.schema-product__price span[data-bind*="minPrice"]'

        await Promise.all([
            this.page.click('#schema-order'),
            this.page.click('text=Дорогие'),
            this.page.waitForSelector('.schema-products_processing', {state: "detached"}),
            this.page.$$eval(priceCssSelector, elements => elements.map(el => el.textContent.trim())),
        ])
    }

    async isSortedDesc(data) {
        console.log(data);

        for (let i in data) {
            let isSorted = true;
            for (let j = 0; j < data.length - 1; j++) {
                if (data[j] > data[j + 1]) {
                    isSorted = false;
                    break;
                }
            }
            console.log(isSorted);
        }

    }
}