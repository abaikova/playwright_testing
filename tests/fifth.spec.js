const test = require('./base.spec');
const parameters = require('./parameters');
const {expect} = require("@playwright/test");


test('TC-5: Go to Forum and verify the main features', async ({page, navBar}) => {
    const expectedTitles = parameters.testCases.expectedTitles;
    const params = parameters.testCases.fifth;

    let forumPage;

    await test.step('Go to Forum', async () => {
        forumPage = await navBar.openForumPage();
        await expect(page).toHaveTitle(expectedTitles.forumPage);
    });

    await test.step('Go to tab "Новое за 24 часа"', async () => {
        await forumPage.openLastPostsTab();

        const title = await forumPage.getForumTitle();
        await expect(title).toContainText(params.expectedForumTitle);
    });

    await test.step('Verify the amount of found topics', async () => {
        const topicsCount = await forumPage.getAmountOfTopicsOnPage();
        expect(topicsCount).toBeGreaterThan(0);
    });

    await test.step('Verify the date and time of the topics on the last page', async () => {
        await forumPage.openTheLastPage();

        const topicsCreatedLessThan24HoursAgo = await forumPage.areTopicsCreatedLessThan24HoursAgo();
        expect(topicsCreatedLessThan24HoursAgo).toBeTruthy();
    });
});