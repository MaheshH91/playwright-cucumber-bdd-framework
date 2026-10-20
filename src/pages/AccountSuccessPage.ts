import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountSuccessPage extends BasePage {
    readonly successHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.successHeading = page.locator('#content h1');
    }

    async getAccountSuccessHeading(): Promise<string> {
        return this.getText(this.successHeading);
    }
}
