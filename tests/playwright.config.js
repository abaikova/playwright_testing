const config = {
    // timeout: 30000,
    retries: 1,
    reporter: [
        ['line'],
        ['json', {  outputFile: 'test-results/output.json' }],
        ['experimental-allure-playwright']
    ],
    use: {
        baseURL: 'https://www.onliner.by/',
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
    },
    workers: 1,
};
module.exports = config;