const STATUS_ITEM_BASE_ITEM_CSS_SELECTOR = 'div[property=status] li';
const OPTIONS_PROCESSING_INDICATOR_CSS_SELECTOR = '.service-offers_processing';
const SERVICE_ITEM_CSS_SELECTOR = '.service-offers__item_primary';

exports.ServicesPage = class ServicesPage {
    constructor(page) {
        this.page = page;
        this.listedServices = this.page.locator(SERVICE_ITEM_CSS_SELECTOR);
    }

    async selectStatusOfService(...statuses) {
        for (const status of statuses) {
            const statusSelector = STATUS_ITEM_BASE_ITEM_CSS_SELECTOR + `:has-text("${status}") .i-checkbox__faux`;
            const checkbox = this.page.locator(statusSelector);
            await checkbox.click();
            await this.page.waitForSelector(OPTIONS_PROCESSING_INDICATOR_CSS_SELECTOR, {state: "detached"});
        }
    }

    async getListOfStatuses() {
        const allTextContent = await this.listedServices.locator('.service-offers__status .ng-scope').allTextContents();
        return (allTextContent).map(item => item.trim());
    }

    async getAmountOfServices() {
        return (await this.listedServices.elementHandles()).length;
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
}