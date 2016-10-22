Feature: Order products
    As a user
    I want to order products
    So that I can enjoy them

    Scenario: Placing order

        Given I am on the main page
        And I click on "Second Test Product"
        And I click on "Add into cart"








        When I selects to checkout
        Then system prompts for billing and shipping info
        When I enter billing and shipping info
        Then system shows the price including taxes, shipping charges and estimated delivery date
        When I confirm the price
        Then system prompts for method of payment
        When I select Bank transfer payment method
        Then system provides bank transfer instructions

