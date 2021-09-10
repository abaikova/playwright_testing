const LAST_POSTS_CSS_SELECTOR = 'a[href="/search.php?type=lastposts&time=86400"]';
const LIST_TOPIC_ITEM_CSS_SELECTOR = '.b-list-topics li';
const LIST_TOPIC_ITEM_UPDATE_TIME_CSS_SELECTOR = LIST_TOPIC_ITEM_CSS_SELECTOR + '.link-getlast';
const AMOUNT_OF_FOUND_TOPICS_UNDER_TITLE_CSS_SELECTOR = 'h1.m-title span';

exports.ForumPage = class ForumPage {
    constructor(page) {
        this.page = page;
    }

    async openLastPostsTab() {
        const link = await this.page.locator(LAST_POSTS_CSS_SELECTOR);
        await link.click();
    }

    async getAmountOfTopicsOnPage() {
        const elements = this.page.locator(LIST_TOPIC_ITEM_CSS_SELECTOR);
        return await elements.evaluateAll((lis) => lis.length);
    }

    async openTheLastPage() {
        const numberOfLastPage = (amountOfFoundItemsText, amountOfTopics) => {
            const extractDigitsRegex = /(\d+)/g;
            const amountOfFoundItems = amountOfFoundItemsText.match(extractDigitsRegex);
            return Math.ceil(amountOfFoundItems / amountOfTopics);
        }

        const underTitleElement = this.page.locator(AMOUNT_OF_FOUND_TOPICS_UNDER_TITLE_CSS_SELECTOR);
        const amountOfFoundItemsText = String(await underTitleElement.evaluate(node => node.textContent));
        const amountOfTopics = Number(await this.getAmountOfTopicsOnPage());
        const lastPageIndex = numberOfLastPage(amountOfFoundItemsText, amountOfTopics)
        await this.openPage(lastPageIndex);
    }

    async openPage(pageNumber) {
        const selector = `[class="b-hdtopic"] li:has-text("${pageNumber}")`;
        await this.page.locator(selector).click();
    }

    async areTopicsCreatedLessThan24HoursAgo() {
        const elements = this.page.locator(LIST_TOPIC_ITEM_UPDATE_TIME_CSS_SELECTOR);
        const topicsCount = await elements.evaluateAll((lis) => lis.map(li => li.textContent));
        let areCreated24HoursAgo = true;
        for (let i = 0; i < topicsCount.length; i++) {
            const timeUpdateNote = topicsCount[i];
            if (!timeUpdateNote.match(/((минут|секунд)[уы]?)|(час[ова]*)/g)) {
                areCreated24HoursAgo = false;
                break;
            }
        }
        return areCreated24HoursAgo;
    }
}