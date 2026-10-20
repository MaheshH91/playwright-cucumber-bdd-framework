import { Given, When, Then } from '@cucumber/cucumber';
import { test, expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { DataUtils } from '../utils/DataUtils';
import { ENV } from '../config/env.config';

Given('navigates to the Register page', async function (this: CustomWorld) {
  this.registerPage = await this.homePage!.navigateToRegisterPage();
});

When('the user fills in valid mandatory details', async function (this: CustomWorld) {
  this.accountSuccessPage = await this.registerPage!.registerMandatory({
    firstName: ENV.FIRST_NAME,
    lastName: ENV.LAST_NAME,
    email: DataUtils.generateUniqueEmail(),
    phone: ENV.TELEPHONE,
    password: ENV.VALID_PASSWORD,
  });
});

When('agrees to the Privacy Policy and clicks Continue', async function (this: CustomWorld) {
  // Handled inside registerMandatory
});

Then('the account should be created successfully with {string}', async function (this: CustomWorld, expectedMsg: string) {
  const heading = await this.accountSuccessPage!.getAccountSuccessHeading();
  expect(heading).toBe(expectedMsg);
});

When('the user registers using existing email {string}', async function (this: CustomWorld, existingEmail: string) {
  this.accountSuccessPage = await this.registerPage!.registerFull({
    firstName: ENV.FIRST_NAME,
    lastName: ENV.LAST_NAME,
    email: existingEmail,
    phone: ENV.TELEPHONE,
    password: ENV.VALID_PASSWORD,
    subscribeNewsletter: true,
  });
});

Then('an alert should display {string}', async function (this: CustomWorld, errorMsg: string) {
  const warning = await this.registerPage!.getAlertWarningText();
  expect(warning).toContain(errorMsg);
});

When('the user clicks the continue button without filling form', async function (this: CustomWorld) {
  await this.registerPage!.clickContinue();
});

Then('mandatory field error warnings should be visible', async function (this: CustomWorld) {
  await expect(this.registerPage!.alertWarning).toContainText('Warning: You must agree to the Privacy Policy!');
  await expect(this.registerPage!.firstNameError).toContainText('First Name must be between 1 and 32 characters!');
});
