
# Test Behavioral Place Order

## tests/features/order.feature

```feature
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


```


# Code


## view/checkout.html

```html

<div class="row">
    <div class="col-md-12">
        <h1>Checkout</h1>
    </div>
</div>

<div id="checkout-wrap">

<ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#shipping" aria-controls="shipping" role="tab" data-toggle="tab">Shipping information</a></li>
    <li role="presentation"><a href="#summary" aria-controls="summary" role="tab" data-toggle="tab" id="next-top">Summary &amp; pay</a></li>
</ul>

<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="shipping">
        <div class="row">
            <div class="col-md-6">


                <div class="form-group">
                    <label for="name">Your name</label>
                    <input type="input" class="form-control" id="name">
                </div>

                <div class="form-group">
                    <label for="shipping-address">Shipping address</label>
                    <textarea class="form-control" rows="2" id="shipping-address"></textarea>
                </div>

            </div>
            <div class="col-md-6">


                <div class="form-group">
                    <label for="email">Your email</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="form-group">
                    <label for="billing-address-input">Billing address</label>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" checked="checked" onclick="visibilityToggle('billing-address-form')"> Same as shipping address
                        </label>
                    </div>
                </div>
                <div class="form-group" id="billing-address-form" style="display:none">
                    <textarea class="form-control" rows="2" id="billing-address-input"></textarea>
                </div>
            </div>

            <div class="col-md-12">

                <a class="btn btn-success pull-right" id="next" role="button">Next</a>

            </div>

        </div>
    </div>

    <div role="tabpanel" class="tab-pane" id="summary">
        ...
    </div>

</div>


</div>


```

## view/css/styles.css

```css
#checkout-wrap {
    /*max-width: 480px;*/
}
#checkout-wrap input, #checkout-wrap textarea {

}
.nav-tabs > li {
    width: 50%;
    text-align: center;
}
.tab-pane {
    padding: 15px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-radius: 0 0px 4px 4px;
}
.nav-tabs > li > a {
    margin-right: 0;
}

#paypal, #bank-transfer {
    width: 100%;
    line-height: 40px;
}

```


## controller/public.js

```js
(function () {

    var _this = this;

    this.checkout = function (event) {

		require({
			Cart: 	"model/Cart.js",
            utils: 	"helpers/utils.js",
            Product: 	"model/Product.js"
		}, function () {


            render("checkout", {}, function (html) {

                tags({
                    title: "Checkout - " + window.title,
                    description: stripHTML(html)
                });

                document.getElementById("content").innerHTML = html;

                document.getElementById("next").onclick = _this.checkoutSummary;
                document.getElementById("next-top").onclick = _this.checkoutSummary;

            });


        })

        window.location.href = '/#/public/checkout';
        return false;
    };


    this.checkoutSummary = function (event) {


		require({
			Cart: 	"model/Cart.js",
            utils: 	"helpers/utils.js",
            Product: 	"model/Product.js",
    		Order: 	"model/Order.js",
		}, function () {
            var cartItems = Cart.getAll(),
                products = [],
                totalPrice = 0,
                shippingPrice = 5,

                customerName = document.getElementById('name').value,
                customerShippingAddress =  document.getElementById('shipping-address').value,
                customerEmail = document.getElementById('email').value;

            for (var i in cartItems) {
                var product = Product.get(cartItems[i]);
                products.push(product);
                totalPrice += product.price;
            }

            totalPrice+=shippingPrice;

            var now = new Date(),
                numberOfDaysToAdd = 6;
            now.setDate(now.getDate() + numberOfDaysToAdd);
            var d = now.getDate(),
                m = now.getMonth() + 1,
                y = now.getFullYear();

            var taxes = parseFloat(0.2*totalPrice).toFixed(2),
                estimatedDeliveryDate = d+"."+m+"."+y;

            totalPrice+=parseFloat(taxes);
            totalPrice=parseFloat(totalPrice).toFixed(2);

            render("checkout-summary", {
                products: products,
                totalPrice: totalPrice,
                shippingPrice: shippingPrice,
                taxes: taxes,
                estimatedDeliveryDate: estimatedDeliveryDate,
                name: customerName,
                shippingAddress: customerShippingAddress,
                email: customerEmail
            },
                function (html) {

                    $('#checkout-wrap a[href="#summary"]').tab('show');
                    document.getElementById("summary").innerHTML = html;

                    document.getElementById("bank-transfer").onclick = function (event) {

                        var order = {
                            id: parseInt(Math.random() * (9999 - 1111) + 1111),
                            status: "placed",
                            products: products,
                            totalPrice: totalPrice,
                            shippingPrice: shippingPrice,
                            name: customerName,
                            shippingAddress: customerShippingAddress,
                            email: customerEmail
                        }

                        Order.save(order);
                        Cart.empty();

                        var length = Cart.getAll().length;

                        if (length === 0) {
                            document.getElementById("cart-length").innerHTML = "";
                        } else {
                            document.getElementById("cart-length").innerHTML = "("+length+")";
                        }

                        render("bank-transfer", {
                            totalPrice: totalPrice,
                            orderNo: order.id
                        },
                            function (html) {

                                document.getElementById("content").innerHTML = html;
                        });

                        return false;
                    }

            });
        });



    };


    this.paymentSuccessful = function (event) {

        render("payment-successful", {}, function (html) {

            tags({
                title: "Thank you - " + window.title,
                description: stripHTML(html)
            });

            var order = Order.get(order);
            order.status = "payed";
            Order.save(order);

            document.getElementById("content").innerHTML = html;

        });


        window.location.href = '/#/public/paymentSuccessful';
        return false;
    };


})

```


## view/checkout-summary.html

```html




<div class="row">
    <div class="col-sm-12 col-md-12">


        {% if (o.products.length === 0) { %}
        <p>No items :-(</p>
        {% } else { %}

        <div class="row">
        <div class="col-md-4">

            <p>
                <strong>Name:</strong> <span>{%=o.name%}</span>
            </p>
            <p>
                <strong>Email:</strong> <span>{%=o.email%}</span>
            </p>
            <p style="font-weight:bold">
                Shipping address
            </p>
            <p>
                {%=o.shippingAddress%}
            </p>
        </div>

        <div class="col-md-8">
        <p style="font-weight:bold">
            Your order
        </p>
        <table class="table table-condensed">
            <thead>
                <tr>
                    <td>
                        #
                    </td>
                    <td>
                        Name
                    </td>
                    <td>
                        Price
                    </td>
                </tr>
            </thead>
            <tbody>
                {% for (var i in o.products) { %}
                <tr>
                    <td>
                        {%=o.products[i].id%}
                    </td>
                    <td>{%=o.products[i].name%}</td>
                    <td>
                        {%=o.products[i].price%} &#8364;
                    </td>
                </tr>
                {% } %}

                <tr>
                    <td colspan="2">
                        Shipping charges
                    </td>
                    <td>
                        {%=o.shippingPrice%} &#8364;
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        Taxes (20 %)
                    </td>
                    <td>
                        {%=o.taxes%} &#8364;
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <span style="font-weight: bold; line-height: 30px">Total: {%=o.totalPrice%} &#8364;</span><br>
                        <span style="line-height: 30px">Estimated delivery date:</span> <span style="font-weight: bold; line-height: 30px">{%=o.estimatedDeliveryDate%}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>

        <div class="row">
            <div class="col-md-6">

                <a class="btn btn-default" id="bank-transfer" role="button">Pay with Bank transfer</a>
            </div>
            <div class="col-md-6">
                <form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post" >
                <input type="hidden" name="cmd" value="_xclick">
                <input type="hidden" name="business" value="example@example.com">
                <input type="hidden" name="currency_code" value="EUR">
                <input type="hidden" name="item_name" value="Your order">
                <input type="hidden" name="amount" value="{%=o.totalPrice%}">
                <button class="btn btn-success"  id="paypal" type="submit" border="0" name="submit">Pay with PayPal</button>
                </form>
            </div>
        </div>
        {% } %}
    </div>
</div>


```

## model/Order.js

```js
({
    save: function (order) {
        return order.id;
    },
    get: function (id) {
        return {id: id};
    }
})

```

## model/Cart.js

```js
({
    empty: function () {
        this.items = [];
    }
})

```

## view/bank-transfer.html

```html



<div class="row">
    <div class="col-md-12">

        <h1>Pay with bank transfer</h1>

        <p>
            Please, send the payment to the address below.
        </p>

        <p>
            Total price: <strong>{%=o.totalPrice%} &#8364;</strong>
        </p>
        <p>
            Bank no.: <strong>?</strong>
        </p>
        <p>
            Variable symbol: <strong>{%=o.orderNo%}</strong>
        </p>
    </div>
</div>

```

## view/payment-successful.html

```html

<div class="row">
    <div class="col-sm-12 col-md-12">

        <h1>Thank you!</h1>

        <div class="alert alert-success" role="alert">Your payment was successful. We will send you the products soon.</div>

    </div>
</div>
```
