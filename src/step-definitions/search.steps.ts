import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

When('the user searches for product {string}', async function (this: CustomWorld, product: string) {
  this.searchPage = await this.homePage!.searchProduct(product);
});

Then('the product {string} should appear in search results', async function (this: CustomWorld, _product: string) {
  const isPresent = await this.searchPage!.displayStatusOfHPValidProduct();
  expect(isPresent).toBeTruthy();
});

When('the user clicks on the search button directly', async function (this: CustomWorld) {
  this.searchPage = await this.homePage!.clickSearchButton();
});

Then('the no product search result message should be displayed', async function (this: CustomWorld) {
  const message = await this.searchPage!.retrieveNoProductMessageText();
  expect(message).toBe('There is no product that matches the search criteria.');
});
