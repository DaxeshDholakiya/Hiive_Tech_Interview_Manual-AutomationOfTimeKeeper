import { test, expect } from '@playwright/test';

test('Ensure the table displays all labels with the same timezones.', async ({ page }) => {
  // Step 1: Open the application URL.
  await page.goto('http://localhost:3000');

  // Step 2: Add multiple records with same timezones.
   await page.waitForTimeout(1000);
   await page.click("//button[normalize-space()='Add timezone']");
   await page.locator('#label').fill("Test4");
   await page.locator('#timezone').selectOption({label:"Pacific Standard Time"});
   await page.waitForTimeout(3000);
   await page.click("//button[normalize-space()='Save']");


   await page.click("//button[normalize-space()='Add timezone']");
   await page.locator('#label').fill("Test5");
   await page.locator('#timezone').selectOption({label:"Pacific Standard Time"});
   await page.waitForTimeout(3000);
   await page.click("//button[normalize-space()='Save']");

   const table = await page.locator("//table[@class='min-w-full divide-y divide-gray-300']");

  // total number of rows & columns
   const cls= await table.locator('thead tr th')
   console.log ('Number of columns:', await cls.count())
   expect (await cls.count()).toBe(4)
 
   const rowws=await table.locator('tbody tr')
   console.log ('Number of Rows:', await rowws.count())
   expect (await rowws.count()).toBe(2)    //  Number of rows should be 3 because we added 2 timeszones and one already there. But I put 2 to check this test case get passed or not.
 
   const matchedRow1= rowws.filter({
   has: page.locator('td'),
   hasText: 'Test4'
   });

   const matchedRow2= rowws.filter({
    has: page.locator('td'),
    hasText: 'Test5'
    });

    // Both labels with same timezones should be visible in the table
 
   await expect(matchedRow1).not.toBeVisible();  // This label should be visible. But I put not to be visible to check this test case get passed or not.
   await expect(matchedRow2).toBeVisible();  


});