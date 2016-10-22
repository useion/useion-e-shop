
# Test Behavioral Show Cart

## tests/features/cart.feature

```feature
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



```


# Code

## view/cart.html

```html




<div class="row">
    <div class="col-sm-12 col-md-12">
        <h1>Shopping cart</h1>


        {% if (o.products.length === 0) { %}
        <p>No items :-(</p>
        {% } else { %}

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
                    <td>
                        {%=o.products[i].name%}
                    </td>
                    <td>
                        {%=o.products[i].price%} &#8364;
                    </td>
                </tr>
                {% } %}
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <span style="font-weight: bold; line-height: 30px">Total: {%=o.totalPrice%} &#8364;</span>
                    </td>
                </tr>
            </tbody>
        </table>


        <a class="btn btn-success pull-right" id="place-order" role="button">Checkout</a>

        {% } %}
    </div>
</div>




```


## controller/public.js

```js
(function () {

    var _this = this;


    this.cart = function (event) {

		require({
			Cart: 	"model/Cart.js",
            utils: 	"helpers/utils.js",
            Product: 	"model/Product.js"
		}, function () {

            var cartItems = Cart.getAll(),
                products = [],
                totalPrice = 0;

            for (var i in cartItems) {
                var product = Product.get(cartItems[i]);
                products.push(product);
                totalPrice += product.price;
            }

            render("cart", {products: products, totalPrice: totalPrice}, function (html) {

                tags({
                    title: "Shopping cart - " + window.title,
                    description: stripHTML(html)
                });

                document.getElementById("content").innerHTML = html;

                if (document.getElementById("place-order"))
                    document.getElementById("place-order").onclick = _this.checkout;

            });



        });


        window.location.href = '/#/public/cart';
        return false;

    };

})

```

# model/Cart.js

```js
({
    items: [],
    getAll: function () {return this.items}
})
```
