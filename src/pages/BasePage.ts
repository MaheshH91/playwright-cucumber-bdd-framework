import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    constructor(protected readonly page: Page) {}

    protected async getText(locator: Locator): Promise<string> {
        return (await locator.innerText()).trim();
    }
}
