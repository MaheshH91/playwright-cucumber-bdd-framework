// src/pages/RegisterPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountSuccessPage } from './AccountSuccessPage';

export interface RegistrationFields {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    subscribeNewsletter?: boolean;
}

export class RegisterPage extends BasePage {
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly telephoneField: Locator;
    readonly passwordField: Locator;
    readonly confirmPasswordField: Locator;
    readonly newsletterRadio: Locator;
    readonly privacyPolicyCheckbox: Locator;
    readonly continueButton: Locator;
    readonly alertWarning: Locator;
    readonly firstNameError: Locator;
    readonly lastNameError: Locator;
    readonly emailError: Locator;
    readonly telephoneError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameField = page.locator('#input-firstname');
        this.lastNameField = page.locator('#input-lastname');
        this.emailField = page.locator('#input-email');
        this.telephoneField = page.locator('#input-telephone');
        this.passwordField = page.locator('#input-password');
        this.confirmPasswordField = page.locator('#input-confirm');
        this.newsletterRadio = page.locator('input[name="newsletter"][value="1"]');
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.locator('input[value="Continue"]');
        this.alertWarning = page.locator('.alert-danger');
        this.firstNameError = page.locator('#input-firstname + .text-danger');
        this.lastNameError = page.locator('#input-lastname + .text-danger');
        this.emailError = page.locator('#input-email + .text-danger');
        this.telephoneError = page.locator('#input-telephone + .text-danger');
        this.passwordError = page.locator('#input-password + .text-danger');
    }

    private async fillMandatory(details: RegistrationFields): Promise<void> {
        await this.firstNameField.fill(details.firstName);
        await this.lastNameField.fill(details.lastName);
        await this.emailField.fill(details.email);
        await this.telephoneField.fill(details.phone);
        await this.passwordField.fill(details.password);
        await this.confirmPasswordField.fill(details.password);
        await this.privacyPolicyCheckbox.check();
    }

    async registerMandatory(details: RegistrationFields): Promise<AccountSuccessPage> {
        await this.fillMandatory(details);
        await this.continueButton.click();
        return new AccountSuccessPage(this.page);
    }

    async registerFull(details: RegistrationFields): Promise<AccountSuccessPage> {
        await this.fillMandatory(details);
        await this.newsletterRadio.check();
        await this.continueButton.click();
        return new AccountSuccessPage(this.page);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async getAlertWarningText(): Promise<string> {
        return (await this.alertWarning.innerText()).trim();
    }
}
