const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');

    await expect(page).toHaveTitle('Playwright');

    await expect(page.locator('text=Get Started')).toHaveAttribute('href', '/docs/intro');
});