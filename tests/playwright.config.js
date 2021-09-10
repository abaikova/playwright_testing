const config = {
    timeout: 30000,
    retries: 1,
    reporter: [
        ['list'],
        ['experimental-allure-playwright']
    ],
    use: {
        baseURL: 'https://www.onliner.by/',
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
    },
    workers: 2,
};
module.exports = config;