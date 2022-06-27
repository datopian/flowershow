const { test, expect } = require('@playwright/test')

/* First pass on test setup */

test('Basic test', async ({ page }) => {
  // Start from the index page
  await page.goto('/');
  // The page should contain an h1 with the title 'Flowershow Default Template'
  await expect(page.locator('h1')).toContainText('Flowershow Default Template');
})
