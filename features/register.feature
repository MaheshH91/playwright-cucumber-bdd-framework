Feature: User Registration Functionality

  Background:
    Given the user navigates to the TutorialsNinja application
    And navigates to the Register page

  @smoke @regression
  Scenario: Register an account with mandatory fields
    When the user fills in valid mandatory details
    And agrees to the Privacy Policy and clicks Continue
    Then the account should be created successfully with "Your Account Has Been Created!"

  @regression
  Scenario: Register with an already existing email
    When the user registers using existing email "mahesh.jadhav@aressindia.net"
    Then an alert should display "Warning: E-Mail Address is already registered!"

  @regression
  Scenario: Verify validation warnings when submitting blank form
    When the user clicks the continue button without filling form
    Then mandatory field error warnings should be visible
