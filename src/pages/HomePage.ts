import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { SearchPage } from './SearchPage';

export class HomePage extends BasePage {
    readonly searchBoxField: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.searchBoxField = page.locator('#search input[name="search"], input[name="search"]');
        this.searchButton = page.locator('#search button, #search .btn-default');
    }

    async navigateToLoginPage(): Promise<LoginPage> {
        await this.page.goto('index.php?route=account/login', { waitUntil: 'domcontentloaded' });
        return new LoginPage(this.page);
    }

    async navigateToRegisterPage(): Promise<RegisterPage> {
        await this.page.goto('index.php?route=account/register', { waitUntil: 'domcontentloaded' });
        return new RegisterPage(this.page);
    }

    async searchProduct(productName: string): Promise<SearchPage> {
        await this.searchBoxField.fill(productName);
        await this.searchButton.click();
        return new SearchPage(this.page);
    }

    async clickSearchButton(): Promise<SearchPage> {
        await this.searchButton.click();
        return new SearchPage(this.page);
    }
}
