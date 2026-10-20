import { BeforeAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './custom-world';
import { ENV } from '../config/env.config';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchPage } from '../pages/SearchPage';


setDefaultTimeout(60 * 1000);



Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: ENV.HEADLESS,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  this.context = await this.browser.newContext({
    baseURL: ENV.BASE_URL,
    viewport: { width: 1920, height: 1080 }
  });

  this.page = await this.context.newPage();

  this.homePage = new HomePage(this.page);
  this.loginPage = new LoginPage(this.page);
  this.registerPage = new RegisterPage(this.page);
  this.searchPage = new SearchPage(this.page);
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    try {
      const screenshot = await this.page.screenshot({ timeout: 5000 });
      this.attach(screenshot, 'image/png');
    } catch {
      // Ignore screenshot error if page context crashed
    }
  }

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
