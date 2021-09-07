const config = {
    retries: 1,
    reporter: [
        ['list'],
        ['experimental-allure-playwright']
    ],
    use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
    },
};
module.exports = config;