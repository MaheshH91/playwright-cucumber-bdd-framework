// src/support/hooks.ts
import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, BrowserType } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { CustomWorld } from './custom-world';
import { ENV } from '../config/env.config';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchPage } from '../pages/SearchPage';

setDefaultTimeout(60 * 1000);

const browsers: Record<string, BrowserType> = {
  chromium,
  firefox,
  webkit,
};

Before(async function (this: CustomWorld) {
  const browserType = browsers[process.env.BROWSER || 'chromium'] || chromium;

  this.browser = await browserType.launch({
    headless: ENV.HEADLESS,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  this.context = await this.browser.newContext({
    baseURL: ENV.BASE_URL,
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: 'reports/videos/',
      size: { width: 1280, height: 720 },
    },
  });

  // Start tracing for failure debugging
  await this.context.tracing.start({ screenshots: true, snapshots: true });

  this.page = await this.context.newPage();

  this.homePage = new HomePage(this.page);
  this.loginPage = new LoginPage(this.page);
  this.registerPage = new RegisterPage(this.page);
  this.searchPage = new SearchPage(this.page);
});

After(async function (this: CustomWorld, scenario) {
  const isFailed = scenario.result?.status === Status.FAILED;
  const sanitizeName = scenario.pickle.name.replace(/[^a-zA-Z0-9_-]/g, '_');

  if (isFailed && this.page) {
    // 1. Capture and attach screenshot
    try {
      const screenshot = await this.page.screenshot({ timeout: 5000 });
      this.attach(screenshot, 'image/png');
    } catch {
      // Ignore if page is closed
    }

    // 2. Stop and export Playwright trace
    const traceDir = path.resolve('reports/traces');
    if (!fs.existsSync(traceDir)) {
      fs.mkdirSync(traceDir, { recursive: true });
    }
    const tracePath = path.join(traceDir, `${sanitizeName}.zip`);
    await this.context?.tracing.stop({ path: tracePath });
  } else {
    // Discard trace if scenario passed
    await this.context?.tracing.stop();
  }

  // Cleanup page and context
  const video = this.page?.video();
  await this.page?.close();
  await this.context?.close();

  // If passed, delete unnecessary video file to save disk space
  if (!isFailed && video) {
    try {
      const videoPath = await video.path();
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    } catch {
      // Ignore cleanup error
    }
  }

  await this.browser?.close();
});
