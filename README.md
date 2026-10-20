# Playwright TypeScript Cucumber BDD Test Automation Framework

An enterprise-grade, end-to-end Behavior-Driven Development (BDD) test
automation framework built with **Playwright**, **Cucumber
(cucumber-js)**, and **TypeScript**, designed for cross-browser testing
and continuous integration via **Jenkins CI/CD**.

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
  **Node.js**             `>= 20.x`               Runtime Environment

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
│
├── src/
│   ├── config/
│   │   └── env.config.ts              # Centralized environment variable loader
│   │
│   ├── data/
│   │   ├── categories.ts              # Defect & assertion failure taxonomy
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

-   **Node.js**: `v20.x` or later installed (`node -v`)
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

## CI/CD Pipeline (Jenkins Integration)

The framework includes a declarative `Jenkinsfile` configured for
Windows and containerized agents.

### Jenkins Pipeline Parameters

-   **`TAG`**: Filter executions (`all`, `@smoke`, `@regression`,
    `@login`).
-   **`HEADLESS`**: Toggle headless or headed execution.
-   **`APP_URL`**: Target environment URL override.

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
5.  **Post-Build Actions**: Publishes the HTML report via the Jenkins
    HTML Publisher plugin and archives failure screenshots and JSON
    artifacts.

### Resolving Jenkins HTML Report Formatting (CSP)

If reports render in Jenkins without CSS styling or collapsible
elements, relax the Content Security Policy:

1.  Navigate to **Manage Jenkins** \> **Script Console**.

2.  Execute the following Groovy statement:

``` groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
```

------------------------------------------------------------------------

## Coding Standards & Best Practices

1.  **Explicit Separation of Actions**: Step definitions avoid bundling
    input population with submit clicks to prevent redundant locator
    timeouts across page transitions.
2.  **Dynamic Data Generation**: Registration scenarios utilize
    `DataUtils.generateUniqueEmail()` to prevent duplicate account
    creation failures on repeated executions.
3.  **Relative URL Routing**: `HomePage` navigation utilizes clean
    relative routing resolved against the Playwright `baseURL`
    configured in `hooks.ts`.
