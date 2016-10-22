Feature: Order products
  As a user
  I want to order products
  So that I can enjoy them

    Scenario: Placing order

    Given I am on the main page
    And I click on "Second Test Product"
    And I click on "Add into cart"
    When I click on "Checkout"
    Then I should see "Shipping information"
    And I should see "Your name"
    And I should see "Your email"
    And I should see "Shipping address"
    And I should see "Billing address"
    When I fill in input "name" with "Example User"
    And I fill in input "email" with "example@example.com"
    And I fill in input "shipping-address" with "London, United Kingdom"
    And I click on "Next"
    Then I should see "Your order"
    When I click on "Summary & pay"
    Then I should see "Example User"
    And I should see "example@example.com"
    And I should see "London, United Kingdom"
    And I should see "Second Test Product"
    And I should see "Shipping charges"
    And I should see "Taxes"
    And I should see "Total: 1182.00 €"
    And I should see "Estimated delivery date"
    And I should see "Pay with Bank transfer"
    And I should see "Pay with PayPal"
    When I click on "Pay with Bank transfer"
    Then I should see "Please, send the payment to the address below"
    And I should see "Total price"
    And I should see "Bank no."
    And I should see "Variable symbol"

