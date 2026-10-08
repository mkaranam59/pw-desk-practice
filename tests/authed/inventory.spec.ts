import { test, expect } from '@playwright/test';

test('starts logged in and sees six products', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page.getByTestId('inventory-item')).toHaveCount(6);
});

test('can add an item without logging in again', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
});