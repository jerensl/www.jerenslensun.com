import { test, expect } from '@playwright/test'

test('resume page is available and links to a pdf', async ({
    page,
    request,
}) => {
    await page.goto('/resume/')
    await expect(
        page.getByRole('heading', { name: /Jerens S. Lensun/i })
    ).toBeVisible()
    await expect(
        page.getByRole('link', { name: /Download PDF/i })
    ).toBeVisible()

    const response = await request.get('/resume.pdf')
    expect(response.ok()).toBeTruthy()
    expect(response.headers()['content-type']).toContain('application/pdf')
})
