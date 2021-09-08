const ADD_TO_CART_BUTTON_SELECTOR = '.product-aside__item--highlighted.state_add-to-cart .product-aside__item-button:not(:has-text("Купить сейчас"))';
const ANIMATED_ADD_TO_CART_BUTTON_CSS_SELECTOR = '.product-aside__item-button_animated';

exports.ProductBasePage = class ProductBasePage {
    constructor(page) {
        this.page = page;
    }

    getAddToCartButton() {
        return this.page.locator(ADD_TO_CART_BUTTON_SELECTOR);
    }

    async addProductToCart() {
        await this.getAddToCartButton().click();
        await this.page.waitForSelector(ANIMATED_ADD_TO_CART_BUTTON_CSS_SELECTOR, {state: "detached"});
    }
}