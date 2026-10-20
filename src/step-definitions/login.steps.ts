import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { ENV } from '../config/env.config';
import { AccountPage } from '../pages/AccountPage';

Given('the user navigates to the TutorialsNinja application', async function (this: CustomWorld) {
  await this.page!.goto(ENV.BASE_URL, { waitUntil: 'domcontentloaded' });
});

Given('navigates to the Login page', async function (this: CustomWorld) {
  this.loginPage = await this.homePage!.navigateToLoginPage();
});

When('the user enters email {string} and password {string}', async function (this: CustomWorld, email: string, pass: string) {
  await this.loginPage!.emailField.waitFor({ state: 'visible', timeout: 10000 });
  await this.loginPage!.emailField.fill(email);
  await this.loginPage!.passwordField.waitFor({ state: 'visible', timeout: 10000 });
  await this.loginPage!.passwordField.fill(pass);
});

When('clicks the Login button', async function (this: CustomWorld) {
  await this.loginPage!.clickLogin();
  this.accountPage = new AccountPage(this.page!);
});

Then('the user should see the My Account section', async function (this: CustomWorld) {
  await expect(this.accountPage!.myAccountHeading).toBeVisible({ timeout: 10000 });
});

Then('a warning message should appear stating {string}', async function (this: CustomWorld, expectedError: string) {
  await expect(this.loginPage!.warningMessage).toContainText(expectedError);
});
