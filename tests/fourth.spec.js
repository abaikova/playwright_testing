const test = require('./base.spec');
const params = require('./parameters');
const {expect} = require("@playwright/test");


test('TC-4: CHECK SERVICES', async ({page, navBar}) => {
    let servicesPage;

    await test.step('Open the Services', async () => {
        servicesPage = await navBar.openServicesPage();
        await expect(page).toHaveTitle(params.expectedTitles.servicesPage);
    });

    await test.step('Select the status of a service', async () => {
        await servicesPage.selectStatusOfService(params.serviceCheckboxStatus);
        let listOfStatuses = await servicesPage.getListOfStatuses();

        await expect(servicesPage.areListedServicesHaveStatus(listOfStatuses, params.expectedServiceStatus)).toBeTruthy();
    });

    await test.step('Check the amount of services', async () => {
        const actualAmount = await servicesPage.getAmountOfListedServices();
        expect(actualAmount).toBeGreaterThan(0);
    });

    await test.step('Check that each service contains an image', async () => {
        expect(await servicesPage.areListedServicesHaveImage()).toBeTruthy();
    });
});