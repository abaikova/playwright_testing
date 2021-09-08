const PRODUCT_DATA_CSS_SELECTOR = '.cart-form__offers .cart-form__offers-part_data';

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
    }

    async getProductData() {
        return await this.page.locator(PRODUCT_DATA_CSS_SELECTOR);
    }
}