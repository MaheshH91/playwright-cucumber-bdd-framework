// src/pages/HomePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { SearchPage } from './SearchPage';

export class HomePage extends BasePage {
    readonly myAccountDropMenu: Locator;
    readonly loginOption: Locator;
    readonly logoutOption: Locator;
    readonly registerOption: Locator;
    readonly searchBoxField: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.myAccountDropMenu = page.locator('a[title="My Account"]');
        this.loginOption = page.locator('ul.dropdown-menu a:has-text("Login")');
        this.logoutOption = page.locator('ul.dropdown-menu a:has-text("Logout"), aside#column-right a:has-text("Logout")');
        this.registerOption = page.locator('ul.dropdown-menu a:has-text("Register")');

        // Matches both nested and standalone search inputs & buttons
        this.searchBoxField = page.locator('#search input[name="search"], input[name="search"]');
        this.searchButton = page.locator('#search button, #search .btn-default');
    }

async navigateToLoginPage(): Promise<LoginPage> {
        await this.page.goto('index.php?route=account/login', {
            waitUntil: 'domcontentloaded',
            timeout: 15000,
        });

        const loginPage = new LoginPage(this.page);
        await loginPage.emailField.waitFor({ state: 'visible', timeout: 15000 });
        return loginPage;
    }

    async navigateToRegisterPage(): Promise<RegisterPage> {
        await this.page.goto('index.php?route=account/register', {
            waitUntil: 'domcontentloaded',
            timeout: 15000,
        });

        const registerPage = new RegisterPage(this.page);
        await registerPage.firstNameField.waitFor({ state: 'visible', timeout: 15000 });
        return registerPage;
    }
    async searchProduct(productName: string): Promise<SearchPage> {
        await this.searchBoxField.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchBoxField.fill(productName);
        await this.searchButton.click();
        return new SearchPage(this.page);
    }

    async clickSearchButton(): Promise<SearchPage> {
        await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchButton.click();
        return new SearchPage(this.page);
    }
}
