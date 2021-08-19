const {test, expect} = require('@playwright/test');

test.describe('feature foo', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://playwright.dev/');
    });

    test('my test', async ({page}) => {
        await expect(page).toHaveURL('https://playwright.dev/');
    })
});