const ADD_TO_CART_BUTTON_SELECTOR = '.product-aside__item--highlighted.state_add-to-cart .product-aside__item-button:not(:has-text("Купить сейчас"))';

exports.ProductBasePage = class ProductBasePage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = this.page.locator(ADD_TO_CART_BUTTON_SELECTOR);
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }
}