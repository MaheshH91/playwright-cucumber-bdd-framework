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

    async isHPProductDisplayed(): Promise<boolean> {
        // isVisible() does not throw a TimeoutError when the element is missing; it returns false immediately
        return await this.validHPProduct.isVisible();
    }

    async getNoProductMessage(): Promise<string> {
        return (await this.noProductMessage.innerText()).trim();
    }

    getProductByName(productName: string): Locator {
        return this.page.locator(`#content .product-layout h4 a:has-text("${productName}"), #content a:has-text("${productName}")`);
    }

    async displayStatusOfHPValidProduct(): Promise<boolean> {
        return await this.validHPProduct.isVisible();
    }

    async retrieveNoProductMessageText(): Promise<string> {
        return (await this.noProductMessage.innerText()).trim();
    }
}
