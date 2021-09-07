const config = {
    retries: 1,
    reporter: [
        ['list'],
        ['experimental-allure-playwright']
    ],
    use: {
        browserName: 'chromium',
        trace: 'on',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
    },
};
module.exports = config;