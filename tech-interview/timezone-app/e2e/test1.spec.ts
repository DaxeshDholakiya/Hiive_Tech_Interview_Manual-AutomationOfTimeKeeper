import { test, expect } from '@playwright/test';

test('Verify the ability to add timezones to the table', async ({ page }) => {
  // Step 1: Open the application URL.
  await page.goto('http://localhost:3000'); 

  // Step 2: Click on the "Add Timezone" button.
  await page.click("//button[normalize-space()='Add timezone']");

  // Step 3: Enter a Label name.
  await page.locator('#label').fill("Test1");

  // Step 4: Select a valid timezone in the Location field.
  await page.locator('#timezone').selectOption({label:"Eastern Standard Time"});

  await page.waitForTimeout(1000);
  // Step 5: Click on the "Add" button.

  await page.click("//button[normalize-space()='Save']");

 // Assertion: The entered timezone should be added as a new row in the table.

  const table = await page.locator("//table[@class='min-w-full divide-y divide-gray-300']");

 // total number of rows & columns
  const columns= await table.locator('thead tr th')
  console.log ('Number of columns:', await columns.count())
  expect (await columns.count()).toBe(4)

  const rows=await table.locator('tbody tr')
  console.log ('Number of Rows:', await rows.count())
  expect (await rows.count()).toBe(2)

  const machedRow1= rows.filter({
  has: page.locator('td'),
  hasText: 'Test1'
  });

  await expect(machedRow1).toBeVisible();

  // Assertion: The table should display the current time for the added timezone.
  const machedRow2= rows.filter({
    has: page.locator('td'),
    hasText: 'America/New_York'
    });

  await expect(machedRow2).toBeVisible();

});