Feature: Product Search Functionality

  Background:
    Given the user navigates to the TutorialsNinja application

  @smoke @regression
  Scenario: Search for an existing product
    When the user searches for product "HP"
    Then the product "HP LP3065" should appear in search results

  @regression
  Scenario: Search for a non-existing product
    When the user searches for product "Honda"
    Then the no product search result message should be displayed

  @regression
  Scenario: Search without entering product name
    When the user clicks on the search button directly
    Then the no product search result message should be displayed
