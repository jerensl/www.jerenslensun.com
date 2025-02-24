import { test, expect } from '@playwright/test';

test("Visit homepage and match page title", async ({ page }) => {
        await page.goto("/")

        await page.addLocatorHandler(page.getByText('Sign up to the newsletter'), async () => {
                await page.getByRole('button', { name: 'Close' }).click();
        });


        await expect(page).toHaveTitle(/Jerens Lensun/)
})

