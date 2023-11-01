import { test, expect } from '@playwright/test';

test('Verify the automatic creation of the local timezone record marked as "Local(You)"', async ({ page }) => {
  // Step 1: Open the application URL.
  await page.goto('http://localhost:3000');

  // Step 2: Check the table for the presence of a row marked as "Local(You)".
  const table = await page.locator("//table[@class='min-w-full divide-y divide-gray-300']");

 // total number of rows & columns
  const col= await table.locator('thead tr th')
  console.log ('Number of columns:', await col.count())
  expect (await col.count()).toBe(4)

  const row=await table.locator('tbody tr')
  console.log ('Number of Rows:', await row.count())
  expect (await row.count()).toBe(1)

  const localRow= row.filter({
  has: page.locator('td'),
  hasText: 'Local(You)'
  });

  // Assertion: There should be a row marked as "Local(You)" in the table.
  await expect(localRow).toBeVisible();

});
