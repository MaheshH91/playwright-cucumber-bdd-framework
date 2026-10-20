// src/pages/SearchPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
    readonly validHPProduct: Locator;
    readonly noProductMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.validHPProduct = page.locator('//a[text()="HP LP3065"]');
        this.noProductMessage = page.locator('#content p:has-text("There is no product that matches the search criteria.")');
    }

    async displayStatusOfHPValidProduct(): Promise<boolean> {
        await this.validHPProduct.waitFor({ state: 'visible', timeout: 10000 });
        return this.isElementVisible(this.validHPProduct);
    }

    async retrieveNoProductMessageText(): Promise<string> {
        await this.noProductMessage.waitFor({ state: 'visible', timeout: 10000 });
        return this.getText(this.noProductMessage);
    }
}
