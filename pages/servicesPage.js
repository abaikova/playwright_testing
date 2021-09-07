const STATUS_ITEM_BASE_ITEM_CSS_SELECTOR = 'div[property=status]';
const OPTIONS_PROCESSING_INDICATOR_CSS_SELECTOR = '.service-offers_processing';
const SERVICE_ITEM_CSS_SELECTOR = '.service-offers__item_primary';
const SERVICE_IMAGE_CSS_SELECTOR = '.service-offers__image';

exports.ServicesPage = class ServicesPage {
    constructor(page) {
        this.page = page;
    }

    async selectStatusOfService(...statuses) {
        for (const status of statuses) {
            const statusSelector = STATUS_ITEM_BASE_ITEM_CSS_SELECTOR + ` li:has-text("${status}") .i-checkbox__faux`;
            const checkbox = this.page.locator(statusSelector);
            await checkbox.click();
            await this.page.waitForSelector(OPTIONS_PROCESSING_INDICATOR_CSS_SELECTOR, {state: "detached"});
        }
    }

    async getListOfStatuses() {
        const allTextContent = await this.page.locator(SERVICE_ITEM_CSS_SELECTOR + '.service-offers__status .ng-scope').allTextContents();
        return (allTextContent).map(item => item.trim());
    }

    getAmountOfListedServices() {
        this.page.waitForNavigation();
        return this.page.locator(SERVICE_ITEM_CSS_SELECTOR).count();
    }

    async areListedServicesHaveStatus(statuses, expectedStatus) {
        let areSame = true;
        for (let i = 0; i < statuses.length; i++) {
            if (statuses[i] !== expectedStatus) {
                areSame = false;
                break;
            }
        }
        return areSame;
    }

    async areListedServicesHaveImage() {
        const images = await this.page.$$(SERVICE_IMAGE_CSS_SELECTOR);

        const noImageRegex = /(data-ng-if)/g;
        let isImagePresent = true;
        for (let i = 0; i < images.length; i++) {
            let innerHtml = await images[i].innerHTML();
            if (!innerHtml.match(noImageRegex)) {
                isImagePresent = false;
                break;
            }
        }
        return isImagePresent;
    }
}