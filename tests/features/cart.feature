Feature: Shopping cart
    As a user
    I want to have shopping cart
    So that I can choose products

    Scenario: Showing cart
        Given I am on the main page
        Then I should see "Cart"
        When I click on "Cart"
        Then I should see "Shopping cart"
        And I should see "No items"

    Scenario: Adding products into cart
        Given I am on the test product page
        And I click on "Add into cart"
        Then I should see "Shopping cart"
        And I should see "First Test Product"
        And I should see "120 €"
        And I should see "(1)"
        And I should see "Total: 120 €"

