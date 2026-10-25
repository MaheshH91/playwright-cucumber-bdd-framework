# Playwright TypeScript Cucumber BDD Test Automation Framework

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-24.21.0-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 24.21.0" />
  <img src="https://img.shields.io/badge/Playwright-1.64.1-45ba4b?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright 1.64.1" />
  <img src="https://img.shields.io/badge/Cucumber.js-13.3.0-23D96B?style=for-the-badge&logo=cucumber&logoColor=white" alt="Cucumber.js 13.3.0" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.7.3" />
  <img src="https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions CI" />
  <img src="https://img.shields.io/badge/Jenkins-Pipeline-D24939?style=for-the-badge&logo=jenkins&logoColor=white" alt="Jenkins Pipeline" />
</p>

An enterprise-grade end-to-end Behavior-Driven Development (BDD) automation framework built with Playwright, Cucumber.js, and TypeScript for reliable validation of modern web applications.

This project tests the e-commerce workflows of the [TutorialsNinja Demo Application](https://tutorialsninja.com/demo/) using a scalable Page Object Model (POM), Gherkin feature files, and a reusable custom World context for scenario execution.

------------------------------------------------------------------------

## Key Features

- Playwright + TypeScript: Native async/await browser automation with strong type safety.
- Cucumber BDD: Gherkin feature files with `Given`, `When`, and `Then` step definitions.
- Page Object Model: Encapsulated page interactions and reusable UI methods.
- Custom World Context: Shared per-scenario state with `CustomWorld` and Playwright instances.
- Data-Driven Testing: Scenario Outline examples and typed fixtures under `src/data/`.
- Resilient Failure Handling: Automatic screenshots attached to failed scenarios without masking root errors.
- CI/CD Ready: Supports both GitHub Actions and Jenkins with HTML artifact publishing and email reporting.

------------------------------------------------------------------------

## Tech Stack

| Tool / Library | Version | Purpose |
| --- | --- | --- |
| Node.js | >= 22.x (project CI pinned to 24.21.0) | Runtime environment |
| Playwright | ^1.64.1 | Browser automation and test execution |
| Cucumber.js | ^13.3.0 | BDD runner and parser |
| TypeScript | ^5.7.3 | Type-safe test development |
| ts-node | ^10.9.2 | Runtime execution for TypeScript |
| dotenv | ^18.0.8 | Environment variable management |

------------------------------------------------------------------------

## Project Structure

```text
playwright-cucumber-bdd-framework/
├── .github/
│   └── workflows/
│       └── cucumber.yml               # GitHub Actions CI pipeline
├── features/                          # Gherkin BDD feature files
│   ├── login.feature
│   ├── register.feature
│   └── search.feature
├── reports/                           # Run artifacts and traces
│   ├── cucumber-report.html
│   ├── cucumber-report.json
│   ├── traces/
│   └── videos/
├── src/
│   ├── config/
│   │   └── env.config.ts              # ENV configuration loader
│   ├── data/
│   │   └── testData.ts                # Typed test data and credentials
│   ├── pages/
│   │   ├── AccountPage.ts
│   │   ├── AccountSuccessPage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   └── SearchPage.ts
│   ├── step-definitions/
│   │   ├── login.steps.ts
│   │   ├── register.steps.ts
│   │   └── search.steps.ts
│   ├── support/
│   │   ├── custom-world.ts
│   │   └── hooks.ts
│   └── utils/
│       └── DataUtils.ts
├── .env                               # Local environment overrides
├── .gitignore
├── cucumber.json                      # Cucumber runner configuration
├── Jenkinsfile                        # Jenkins pipeline definition
├── package.json                       # Scripts and dependency versions
├── tsconfig.json                      # TypeScript compiler configuration
└── README.md
```

------------------------------------------------------------------------

## Getting Started

### Prerequisites

- Node.js 22.x or 24.x installed (`node -v`)
- Git installed and configured (`git --version`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MaheshH91/playwright-cucumber-bdd-framework.git
cd playwright-cucumber-bdd-framework
```

2. Install dependencies:

```bash
npm ci
```

3. Install Playwright browser binaries:

```bash
npx playwright install chromium --with-deps
```

4. Configure environment variables by creating a `.env` file in the project root:

```properties
URL=https://tutorialsninja.com/demo/
HEADLESS=true
EXPLICIT_WAIT=10
PAGE_LOAD_TIMEOUT=15
VALID_EMAIL=your_email@example.com
VALID_PASSWORD=your_password
FIRST_NAME=Mahesh
LAST_NAME=Holkar
TELEPHONE=9878943234
```

------------------------------------------------------------------------

## Test Execution

### 1. Dry Run

Validate all step mappings without launching the browser:

```bash
npx cucumber-js --dry-run
```

### 2. Run Full Suite

```bash
npm test
```

### 3. Execute by Tags

```bash
npm run test:smoke
npm run test:regression
```

Custom tag execution:

```bash
npx cucumber-js --tags "@login"
```

### 4. Run in Headed Mode

Windows PowerShell:

```powershell
$env:HEADLESS="false"; npm test
```

Command Prompt:

```cmd
npm run test:headed
```

### 5. Inspect Trace Files

When a scenario fails, Playwright creates a trace archive under `reports/traces/`:

```bash
npx playwright show-trace reports/traces/<trace-name>.zip
```

------------------------------------------------------------------------

## Test Reporting

The framework generates HTML and JSON reports automatically under the `reports/` folder:

- Cucumber HTML Report: `reports/cucumber-report.html`
- Cucumber JSON Report: `reports/cucumber-report.json`

Open the HTML report from the terminal:

```bash
npm run report
```

On Windows PowerShell:

```powershell
Start-Process reports/cucumber-report.html
```

------------------------------------------------------------------------

## CI/CD Pipeline Integrations

### GitHub Actions

The repository includes a CI workflow in `.github/workflows/cucumber.yml` that runs on:

- `push` to `main` and `master`
- `pull_request` to `main` and `master`

Pipeline behavior:

- Uses Node.js `24.21.0`
- Installs dependencies with `npm ci`
- Installs Playwright Chromium binaries
- Runs the test suite with `npm run test`
- Uploads the generated HTML report as an artifact for 14 days
- Sends an email report using the configured mail secrets

Required GitHub secrets:

- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_TO`

### Jenkins

The repository includes a declarative `Jenkinsfile` with pipeline parameters:

- `TAG` (`all`, `@smoke`, `@regression`, `@login`)
- `HEADLESS` (`true` / `false`)
- `APP_URL`
- `RECIPIENT_EMAIL`

Pipeline stages:

1. Checkout source
2. Install dependencies and browser binaries
3. Execute selected Cucumber tests
4. Publish HTML report
5. Archive test artifacts
6. Send an email with the report attached

If the HTML report styling appears broken in Jenkins due to CSP restrictions, use:

```groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
```

Run this in Jenkins Script Console under Manage Jenkins.

------------------------------------------------------------------------

## Coding Standards and Best Practices

1. Prefer Playwright's built-in auto-waiting instead of arbitrary sleep calls.
2. Use dynamic locators for resilient product and form interactions.
3. Generate unique test data to avoid duplicate-account collisions during repeated runs.
4. Keep step definitions modular and scenario-focused for easier debugging and maintenance.
5. Retain traces and videos only for failing scenarios to keep the reports clean and actionable.

------------------------------------------------------------------------

## Author and Connect

- Author: Mahesh Holkar
- LinkedIn: [Connect on LinkedIn](https://www.linkedin.com/in/maheshholkarqaengineer/)
- GitHub: [View GitHub Profile](https://github.com/MaheshH91)

------------------------------------------------------------------------

## License

This project is available for learning and experimentation. Update the license file if you intend to distribute or reuse it commercially.
