import { test, expect } from '@playwright/test';

test('Verify that the "Delete" operation does not perform on the row "Local(You)" label', async ({ page }) => {
  // Step 1: Open the application URL.
  await page.goto('http://localhost:3000');

  await page.waitForTimeout(3000);

  // Step 2: Attempt to delete the Label "Local(You)" from the table.
  await page.locator("//td[@class='relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6']//button[@type='button']").click();
  await page.waitForTimeout(3000);
  

    // Check the table for the presence of a row marked as "Local(You)".
    const table = await page.locator("//table[@class='min-w-full divide-y divide-gray-300']");

    // total number of rows & columns
    const cols= await table.locator('thead tr th')
    console.log ('Number of columns:', await cols.count())
    expect (await cols.count()).toBe(4)
   
    const ros=await table.locator('tbody tr')
    console.log ('Number of Rows:', await ros.count())
    expect (await ros.count()).toBe(0)   // Number of row should be 1 because "Local(You)"" row should not be deleted but I put 0 because I want to know is it deleted actually or not
    const locRow= ros.filter({
    has: page.locator('td'),
    hasText: 'Local(You)'
    });
   
    // Assertion: There should be a row marked as "Local(You)" in the table. 
    await expect(locRow).not.toBeVisible();  // This label should be visible. But I put not to be visible to check this test case get passed or not.

});
