import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
    readonly myAccountHeading: Locator;
    readonly logoutLink: Locator;
    readonly rightColumnListGroup: Locator;

    constructor(page: Page) {
        super(page);
        this.myAccountHeading = page.locator('//h2[text()="My Account"]');
        this.rightColumnListGroup = page.locator('aside#column-right .list-group, .list-group');
        // Direct link to logout in the right sidebar
        this.logoutLink = this.rightColumnListGroup.locator('a[href*="route=account/logout"]');
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    async verifySuccessfulLogin(): Promise<boolean> {
        return (await this.getText(this.myAccountHeading)) === 'My Account';
    }
}
