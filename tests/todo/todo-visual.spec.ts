import {test,expect} from '@playwright/test';

test.skip(
({ browserName, isMobile }) => browserName !== 'chromium' || isMobile || !!process.env.CI,
  'visual baseline exists only for chromium on this machine',
);

test('one todo: soft checks and a visual baseline', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Buy milk');
  await input.press('Enter');

  await expect.soft(page.getByTestId('todo-title')).toHaveText('Buy milk');
  await expect.soft(page.getByTestId('todo-count')).toHaveText('1 item left');
  await expect.soft(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();

  await expect(page.locator('.todo-list')).toHaveScreenshot('one-todo.png');
});