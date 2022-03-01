import { PlaywrightTestConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {

    use: {

        headless: process.env.HEADLESS === 'true',

        /* What is this? */
        ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',

        screenshot: 'only-on-failure',

        /* video: 'on-first-retry', */
        video: 'on',

        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on',
    },

    /* Maximum time one test can run for. */
    timeout: 30 * 1000,

    expect: {
        /**
        * Maximum time expect() should wait for the condition to be met.
        * For example in `await expect(locator).toHaveText();`
        */
        timeout: 5000,
    },

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* reporter: process.env.CI ? 'dot' : 'list', */

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/'
};
export default config;