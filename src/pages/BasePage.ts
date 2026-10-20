import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    constructor(protected readonly page: Page) { }

    protected async navigate(path = ''): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    protected async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    protected async type(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
    }

    protected async getText(locator: Locator): Promise<string> {
        return (await locator.innerText()).trim();
    }

    protected async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
}
