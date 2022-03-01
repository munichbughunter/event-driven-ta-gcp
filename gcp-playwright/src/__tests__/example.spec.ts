import { test, expect } from '@playwright/test';

test.describe('First Serverless UI Test on GCP', () => {
    test('Open testing page', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        expect(await page.title()).toBe('GitHub - microsoft/playwright: Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API.');
    });
});
