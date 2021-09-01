const config = {
    reporter: 'list',
    use: {
        browserName: 'chromium',
        channel: 'chrome-beta',
    },
    params: {
        url: 'https://www.onliner.by/',
        catalogPageTitle: /Каталог/,
        mobilePageTitle: /Мобильный телефон/,
        mobileManufacturer: 'HONOR',
    }
};

module.exports = config;
