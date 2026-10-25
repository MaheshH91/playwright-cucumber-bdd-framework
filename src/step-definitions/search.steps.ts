// src/step-definitions/search.steps.ts
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
// src/step-definitions/search.steps.ts


When('the user searches for product {string}', async function (this: CustomWorld, product: string) {
  this.searchPage = await this.homePage!.searchProduct(product);
});

Then('the product {string} should appear in search results', async function (this: CustomWorld, productName: string) {
  const productLocator = this.searchPage!.getProductByName(productName);
  await expect(productLocator.first()).toBeVisible({ timeout: 5000 });
});

When('the user clicks on the search button directly', async function (this: CustomWorld) {
  this.searchPage = await this.homePage!.clickSearchButton();
});

Then('the no product search result message should be displayed', async function (this: CustomWorld) {
  await expect(this.searchPage!.noProductMessage).toHaveText(
    'There is no product that matches the search criteria.'
  );
});
