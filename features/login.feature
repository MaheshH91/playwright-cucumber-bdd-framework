Feature: User Login Functionality

  Background:
    Given the user navigates to the TutorialsNinja application
    And navigates to the Login page

  @smoke @regression
  Scenario Outline: Successful login with valid credentials
    When the user enters email "<email>" and password "<password>"
    And clicks the Login button
    Then the user should see the My Account section

    Examples:
      | email                        | password  |
      | maheshpatil234@gmail.com     |     12345 |
      | mahesh.jadhav@aressindia.net | 123456789 |

  @regression
  Scenario Outline: Failed login with invalid credentials
    When the user enters email "<email>" and password "<password>"
    And clicks the Login button
    Then a warning message should appear stating "<expectedError>"

    Examples:
      | email                    | password         | expectedError                                         |
      | invalid_user999@test.com | wrongpassword123 | Warning: No match for E-Mail Address and/or Password. |

  @regression
  Scenario: Failed login without entering credentials
    When clicks the Login button
    Then a warning message should appear stating "Warning: No match for E-Mail Address and/or Password."
