const base = require('@playwright/test');
const {NavigationBar} = require('../pages/navBar');

module.exports = base.test.extend({
    page: async ({context, baseURL}, use) => {
        const page = await context.newPage();
        await page.goto(baseURL);
        await context.route('**/*', route => {
            if (route.request().frame().parentFrame()) {
                route.abort();
            } else {
                route.continue();
            }
        });
        await use(page);
    },
    navBar: async ({page}, use) => {
        await use(new NavigationBar(page));
    },
});