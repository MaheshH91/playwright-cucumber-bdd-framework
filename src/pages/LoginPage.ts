import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountPage } from './AccountPage';

export class LoginPage extends BasePage {
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly warningMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.emailField = page.locator('#input-email');
        this.passwordField = page.locator('#input-password, input[name="password"]');
        this.loginButton = page.locator('input[value="Login"], button:has-text("Login")');
        this.warningMessage = page.locator('div.alert-danger');
    }

    async login(email: string, pass: string): Promise<AccountPage> {
        await this.emailField.fill(email);
        await this.passwordField.fill(pass);
        await this.loginButton.click();
        return new AccountPage(this.page);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }
}
