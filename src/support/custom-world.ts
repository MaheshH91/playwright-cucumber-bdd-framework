import { World, setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchPage } from '../pages/SearchPage';
import { AccountPage } from '../pages/AccountPage';
import { AccountSuccessPage } from '../pages/AccountSuccessPage';

export interface CustomWorld extends World {
    browser?: Browser;
    context?: BrowserContext;
    page?: Page;
    homePage?: HomePage;
    loginPage?: LoginPage;
    registerPage?: RegisterPage;
    searchPage?: SearchPage;
    accountPage?: AccountPage;
    accountSuccessPage?: AccountSuccessPage;
}

export class CustomWorldClass extends World implements CustomWorld {
    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorldClass);
