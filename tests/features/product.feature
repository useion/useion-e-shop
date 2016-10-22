Feature: Browse through products
    As a user
    I want to browse through products
    So that I can buy them

    Scenario: Searching for a product
        Given I am on the main page
        And I fill in input "search-input" with "Test Product"
        And I click on element "search"
        Then I should see "First Test Product"
        And I should see "Second Test Product"
        When I click on "First Test Product"
        Then I should see "Aliquam vitae tempor ligula."

    Scenario: Searching for non existing product
        Given I am on the main page
        And I fill in input "search" with "Non existing product"
        And I click on element "search-input"
        And I should not see "Second Test Product"

    Scenario: Showing product detail
        Given I am on the test product page
        Then I should see "First Test Product"
        And I should see "120 €"
        And I should see "Similar products"
        And I should see "Add into cart"

    Scenario: Showing similar products
        Given I am on the test product page
        Then I should see "Similar products"

