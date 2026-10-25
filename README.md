# Playwright TypeScript Cucumber BDD Test Automation Framework


An enterprise-grade, end-to-end Behavior-Driven Development (BDD) test automation framework built with **Playwright**, **Cucumber (cucumber-js 13)**, and **TypeScript**, engineered for cross-browser testing, parallel execution, and continuous integration via **GitHub Actions** and **Jenkins CI/CD** with automated HTML email reports.

The framework validates the e-commerce workflows of the [TutorialsNinja
Demo Application](https://tutorialsninja.com/demo/), featuring Page
Object Model (POM) architecture, isolated browser context lifecycles,
embedded Gherkin data-driven execution, and zero reliance on heavy
external reporting binaries or spreadsheet parsers.

------------------------------------------------------------------------

## Key Features

-   **Playwright + TypeScript**: Native async/await interaction
    execution with strict type-safety.
-   **BDD with Cucumber**: Gherkin feature definitions (`Given`, `When`,
    `Then`) with decoupled step definitions.
-   **Page Object Model (POM)**: Componentized page classes
    encapsulating web element locators and action methods.
-   **Custom World Context**: Type-safe shared state management
    (`CustomWorld`) across step definitions per scenario.
-   **Zero-Dependency Test Data**: Direct integration of test matrices
    using Gherkin `Scenario Outline` `Examples:` tables and strongly
    typed TypeScript fixtures (`src/data/`).
-   **Resilient Failure Hooks**: Automatic screenshot capture attached
    directly to the Cucumber scenario buffer on assertion or locator
    failures without masking root errors.
-   **Jenkins CI/CD Ready**: Declarative `Jenkinsfile` supporting
    parameterization (`TAG`, `HEADLESS`, `APP_URL`), auto-publishing of
    styled HTML reports, and Content Security Policy (CSP)
    compatibility.

------------------------------------------------------------------------

## Tech Stack & Dependencies

  -----------------------------------------------------------------------
  Tool / Library          Version                 Purpose
  ----------------------- ----------------------- -----------------------
  **Node.js**             `>= 22.x` (LTS 22 / 24) Runtime Environment

  **Playwright Test**     `^1.64.1`               Core Browser Automation
                                                  & Locator Engine

  **Cucumber.js**         `^13.3.0`               BDD Test Runner &
                                                  Gherkin Parser

  **TypeScript**          `^5.7.3`                Programming Language

  **ts-node**             `^10.9.2`               Just-In-Time TypeScript
                                                  Execution for Node

  **dotenv**              `^18.0.8`               Environment
                                                  Configuration
                                                  Management
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Project Structure

``` text
playwright-cucumber-bdd-framework/
│
├── .github/
│   └── workflows/
│       └── cucumber.yml               # GitHub Actions CI pipeline
│
├── features/                          # Gherkin BDD Feature Files
│   ├── login.feature                  # Authentication & invalid credential matrices
│   ├── register.feature               # New user registration & mandatory validations
│   └── search.feature                 # Product catalog search validation
│
├── reports/                           # Test execution output directory
│   ├── cucumber-report.html           # Native styled HTML report
│   └── cucumber-report.json           # JSON report for CI/CD artifact storage
│   ├── traces/                        # Playwright trace archives (.zip) for failed runs
│   └── videos/                        # Recorded video executions for failed scenarios
│
├── src/
│   ├── config/
│   │   └── env.config.ts              # Centralized environment variable loader
│   │
│   ├── data/
│   │   └── testData.ts                # Strongly typed fallback fixtures & credentials
│   │
│   ├── pages/                         # Page Object Model (POM) Classes
│   │   ├── AccountPage.ts             # Member dashboard & account navigation
│   │   ├── AccountSuccessPage.ts      # Registration confirmation page
│   │   ├── HomePage.ts                # Header, navigation, and landing interactions
│   │   ├── LoginPage.ts               # Login form fields and authentication actions
│   │   ├── RegisterPage.ts            # Registration form fields and validations
│   │   └── SearchPage.ts              # Search results and zero-match containers
│   │
│   ├── step-definitions/              # Cucumber Step Definitions
│   │   ├── login.steps.ts
│   │   ├── register.steps.ts
│   │   └── search.steps.ts
│   │
│   ├── support/                       # Framework Infrastructure
│   │   ├── custom-world.ts            # Cucumber World interface with Playwright instances
│   │   └── hooks.ts                   # Before/After scenario lifecycle, context & screenshots
│   │
│   └── utils/
│       └── DataUtils.ts               # Dynamic test data generators (unique email/phone)
│
├── .env                               # Local environment overrides (gitignored)
├── .gitignore                         # Build and dependency exclusions
├── cucumber.json                      # Cucumber runner, formats, paths & modules config
├── Jenkinsfile                        # Declarative Jenkins CI/CD pipeline definition
├── package.json                       # Project scripts, engines, and dependencies
└── tsconfig.json                      # TypeScript compilation and module resolution settings
```

------------------------------------------------------------------------

## Getting Started

### Prerequisites

-   **Node.js**: `v22.x` or `v24.x` installed (`node -v`) (Cucumber 13 requires Node.js 22 || 24 || >=26)
-   **Git**: Installed and configured (`git --version`)

### Installation

1.  **Clone the repository:**

``` bash
git clone https://github.com/MaheshH91/playwright-cucumber-bdd-framework.git
cd playwright-cucumber-bdd-framework
```

2.  **Install project dependencies:**

``` bash
npm ci
```

3.  **Install Playwright browser binaries:**

``` bash
npx playwright install chromium --with-deps
```

4.  **Set up environment variables:** Create a `.env` file in the
    project root:

``` properties
URL=https://tutorialsninja.com/demo/
HEADLESS=true
EXPLICIT_WAIT=10
PAGE_LOAD_TIMEOUT=15
VALID_EMAIL=mahesh.jadhav@aressindia.net
VALID_PASSWORD=123456789
FIRST_NAME=Mahesh
LAST_NAME=Holkar
TELEPHONE=9878943234
```

------------------------------------------------------------------------

## Test Execution

### 1. Dry Run (Verify Step Matching)

Validates that every Gherkin step across all `.feature` files is
correctly mapped to a TypeScript step definition without launching
browsers:

``` bash
npx cucumber-js --dry-run
```

### 2. Run the Full Test Suite

Executes all scenarios across Login, Register, and Search in headless
mode:

``` bash
npm test
```

### 3. Run by Tags

Target specific test groups using Cucumber tags:

-   **Smoke Suite:**

``` bash
npm run test:smoke
```

-   **Regression Suite:**

``` bash
npm run test:regression
```

-   **Custom Tag (e.g., Login only):**

``` bash
npx cucumber-js --tags "@login"
```

### 4. Run in Headed Mode

Launches Chromium with a visible UI:

-   **Windows PowerShell:**

``` powershell
$env:HEADLESS="false"; npm test
```

-   **Command Prompt (cmd):**

``` cmd
npm run test:headed
```

### 5. Inspect Failure Traces
When a scenario fails, a Playwright trace archive is generated under `reports/traces/<scenario_name>.zip`. Inspect it using Playwright's Trace Viewer:

``` cmd
npx playwright show-trace reports/traces/<trace-name>.zip
```
Bash
------------------------------------------------------------------------

## Test Reporting

Test reports are automatically saved to the `reports/` directory upon
execution:

-   **Cucumber HTML Report**: `reports/cucumber-report.html`
    (interactive overview of scenarios, execution times, attached
    failure screenshots, and step statuses).
-   **Cucumber JSON Output**: `reports/cucumber-report.json`
    (machine-readable data used by CI runners and artifact archivers).

To open the HTML report after execution:

``` bash
npm run report
```

*Or open directly in PowerShell:*

``` powershell
Start-Process reports/cucumber-report.html
```

------------------------------------------------------------------------

## CI/CD Pipeline Integrations

The framework includes a declarative `Jenkinsfile` configured for
Windows and containerized agents.

### 1. GitHub Actions Pipeline (`.github/workflows/cucumber.yml`)
The repository includes a GitHub Actions workflow configured to run on `push` and `pull_request` against `main` and `master`:

Runs tests on Ubuntu using Node.js 22.

Uploads the HTML report artifact with a 14-day retention period.

Automatically dispatches an HTML email report with `cucumber-report.html` attached via `dawidd6/action-send-mail@v3`.

Required GitHub Secrets:
Navigate to Settings > Secrets and variables > Actions and configure:

`MAIL_USERNAME`: Sender email address.

`MAIL_PASSWORD`: App-specific password (e.g., Google App Password).

`MAIL_TO`: Recipient email address(es).

### 2. Jenkins Pipeline (`Jenkinsfile`)
A declarative pipeline for Windows/Linux Jenkins agents supporting parameters and HTML email delivery.
## Jenkins Pipeline Parameters

-   **`TAG`**: Filter executions (`all`, `@smoke`, `@regression`,
    `@login`).
-   **`HEADLESS`**: Toggle headless or headed execution.
-   **`APP_URL`**: Target environment URL override.
-   **`RECIPIENT_EMAIL`: Recipient address for build reports.

### Jenkins Pipeline Stages

1.  **Checkout Source**: Wipes workspace and checks out the target
    branch.
2.  **Install Dependencies**: Executes clean dependency installation via
    `npm ci`.
3.  **Install Playwright Browsers**: Ensures Chromium binaries are
    cached and up-to-date.
4.  **Execute Cucumber BDD Tests**: Runs the targeted test suites,
    capturing non-zero exit codes to mark the build as `UNSTABLE`
    without aborting post-actions.
5.  **Post-Build Actions**:
    HTML Publisher: Publishes cucumber-report.html with historical trends.
    Artifact Archiving: Archives all files under `reports/**`.
    Publishes the HTML report via the Jenkins
    Extended Email Notification (`emailext`): Sends an HTML summary table along with `reports/cucumber-report.html` attached directly to the email.
    HTML Publisher plugin and archives failure screenshots and JSON
    artifacts.

### Resolving Jenkins HTML Report Formatting (CSP)

If the HTML report renders without styles in Jenkins, relax the Content Security Policy:

1.  Navigate to **Manage Jenkins** \> **Script Console**.

2.  Execute the following Groovy statement:

``` groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
```

------------------------------------------------------------------------

## Coding Standards & Best Practices

1.  **Native Playwright Auto-Waiting**: Relies on Playwright's built-in wait mechanisms for visibility and
    actionability prior to `.fill()`,   `.click()`, or `.check()`, avoiding arbitrary hardcoded sleeps.
2.  **Dynamic Product Selectors**: Product catalog lookups utilize dynamic locators (getProductByName(productName)) to
    support data-driven search assertions without hardcoding product IDs.
3.  **Dynamic Data Generation**: Registration scenarios utilize `DataUtils.generateUniqueEmail()` to prevent duplicate account
    creation failures on repeated executions.
4.   **Decoupled Step Actions**: Form input populations and action triggers (e.g., agreeing to policies, clicking continue) remain modular in step definitions to ensure individual step traceability.
5.  **Smart Resource Management**: Video recordings are automatically deleted for passing scenarios and only retained alongside traces for failing scenarios to optimize disk and artifact usage.

## Author & Connect

- **Author**: Mahesh Holkar
- **LinkedIn**: [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/maheshholkarqaengineer/)
- **GitHub**: [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat&logo=github)](https://github.com/MaheshH91)
