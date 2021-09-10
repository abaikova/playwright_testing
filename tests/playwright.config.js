module.exports = config = {
    timeout: 60000,
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