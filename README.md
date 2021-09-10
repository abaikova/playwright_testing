# playwright_testing
Playing with Playwright for the first time

# Get Started

1. Clone:
```shell
git clone https://github.com/bkvtrash/playwright_testing.git
```
2. Install dependencies:
```shell
npm install
npm i -D @playwright/test
npm i -D experimental-allure-playwright
npx playwright install
```
3. Run the tests:
```shell
npx playwright test --config=tests/playwright.config.js
```
4. Generate a report:
```shell
npx allure generate ./allure-results --clean
```
5. Open the report:
```shell
npx allure open ./allure-report
```
Press <Ctrl+C> to exit in a terminal.
