var seleniumWebdriver = require('selenium-webdriver');

module.exports = function () {

    this.World = function () {
        this.driver = new seleniumWebdriver.Builder()
            .forBrowser('chrome')
            .build();

        this.clickOn = function (text) {

            var xpath = "//*[contains(text(),'" + text + "')]";
            var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
            this.driver.wait(condition, 5000);

            return this.driver.findElement({xpath: xpath}).then(function(element) {
                return element.click();
            });
        }

        this.shouldSee = function  (text) {
            var xpath = "//*[contains(text(),'" + text + "')]";
            var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
            return this.driver.wait(condition, 5000);
        }

        this.fillInInput = function (arg1, arg2) {

            var xpath = "//*[id('" + arg1 + "')]";
            var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
            this.driver.wait(condition, 5000);

            return this.driver.findElement({id: arg1}).then(function(element) {
                return element.sendKeys(arg2);//[0].setAttribute('value', arg2);
            });
        }

    };;

    this.When(/^I select to checkout$/, function () {
        return this.clickOn("Checkout");
    });
    this.Then(/^system prompts for billing and shipping info$/, function () {
        this.shouldSee("Shipping information");
        return this.shouldSee("Your name");
    });

    this.Then(/^I enter billing and shipping info$/, function () {
        this.fillInInput("name", "Example User");
        this.fillInInput("email", "example@example.com");
        this.fillInInput("shipping-address", "London, United Kingdom");
        return this.clickOn("Next");
    });

    this.Then(/^system shows the price including taxes, shipping charges and estimated delivery date$/, function () {
        return this.shouldSee("Your order");
    });

    this.When(/^I confirm the price$/, function () {
        this.clickOn("Summary & pay");
        this.shouldSee("Example User");
        this.shouldSee("example@example.com");
        this.shouldSee("London, United Kingdom");
        this.shouldSee("Second Test Product");
        this.shouldSee("Shipping charges");
        this.shouldSee("Taxes");
        this.shouldSee("Total: 1182.00 €");
        return this.shouldSee("Estimated delivery date");
    });

    this.Then(/^system prompts for method of payment$/, function () {
        this.shouldSee("Pay with Bank transfer");
        return this.shouldSee("Pay with PayPal");
    });

    this.When(/^I select Bank transfer payment method$/, function () {
        return this.clickOn("Pay with Bank transfer");
    });

    this.Then(/^system provides bank transfer instructions$/, function () {
        this.shouldSee("Please, send the payment to the address below");
        this.shouldSee("Total price");
        this.shouldSee("Bank no.");
        return this.shouldSee("Variable symbol");
    });






    this.Given(/^I am on the main page$/, function() {
        return this.driver.get('http://eshop.dev/');
    });

    this.Given(/^I am on the test product page$/, function () {
        return this.driver.get('http://eshop.dev/#/public/product/id/1');
    });

    this.Given(/^I am on the checkout page$/, function () {
        return this.driver.get('http://eshop.dev/#/public/checkout');
    });

    this.When(/^I click on "([^"]*)"$/, function (text) {
        return this.clickOn(text);
    });

    this.When(/^I click on element "([^"]*)"$/, function (id) {

        var condition = seleniumWebdriver.until.elementLocated({id: id});
        this.driver.wait(condition, 5000);

        return this.driver.findElement({id: id}).then(function(element) {
            return element.click();
        });
    });


    this.When(/^I wait for it to appear$/, function () {
        return this.driver.wait(function () {return true;}, 1000);
    });


    this.Then(/^I should see "([^"]*)"$/, function (text) {
        return this.shouldSee(text);
    });

    this.Then(/^I should not see "([^"]*)"$/, function (text) {
        var xpath = "//*[not(contains(text(),'" + text + "'))]";
        var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
        return this.driver.wait(condition, 5000);
    });

    this.When(/^I fill in input "([^"]*)" with "([^"]*)"$/, function (arg1, arg2) {
        return this.fillInInput(arg1, arg2);
    });



};
