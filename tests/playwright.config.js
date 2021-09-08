const config = {
    timeout: 30000,
    retries: 1,
    reporter: [
        ['list'],
        ['experimental-allure-playwright']
    ],
    use: {
        ignoreHTTPSErrors: true,
        browserName: 'chromium',
        // headless: false,
        screenshot: 'only-on-failure',
    },
};
module.exports = config;