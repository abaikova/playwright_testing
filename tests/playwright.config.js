const {devices} = require('@playwright/test');

const config = {
    projects: [
        {
            name: 'Desktop Chromium',
            use: {
                browserName: 'chromium',
                channel: 'chrome-beta',
            },
        },
        {
            name: 'Mobile Chrome',
            use: devices['Pixel 5'],
        },
    ],
};

module.exports = config;
