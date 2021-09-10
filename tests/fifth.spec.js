const test = require('./base.spec');
const params = require('./parameters');
const {expect} = require("@playwright/test");


test('TC-5: Go to Forum and verify the main features', async ({page, navBar}) => {
    let forumPage;

    await test.step('Go to Forum', async () => {
        forumPage = await navBar.openForumPage();
        await expect(page).toHaveTitle(params.expectedTitles.forumPage);
    });

    await test.step('Go to tab "Новое за 24 часа"', async () => {
        await forumPage.openLastPostsTab();
        await expect(page.locator(params.forumTitleSelector)).toContainText(params.expectedForumTitle);
    });

    await test.step('Verify the amount of found topics', async () => {
        const topicsCount = await forumPage.getAmountOfTopicsOnPage();
        expect(topicsCount).toBeGreaterThan(1);
    });

    await test.step('Verify the date and time of the topics on the last page', async () => {
        await forumPage.openTheLastPage();
        expect(await forumPage.areTopicsCreatedLessThan24HoursAgo()).toBeTruthy();
    });
});