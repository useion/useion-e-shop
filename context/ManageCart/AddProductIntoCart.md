# Use case Add a Product Into Cart

## Actors

User

## Main scenario

1. User selects to add a product into cart
2. System saves the product into cart
3. System notifies user about updating shopping cart
4. Include "Show Cart"

# Tests

## tests/features/cart.feature

```feature
Feature: Shopping cart
    As a user
    I want to have shopping cart
    So that I can choose products

    Scenario: Adding products into cart
        Given I am on the test product page
        And I click on "Add into cart"
        Then I should see "Shopping cart"
        And I should see "First Test Product"
        And I should see "120 €"
        And I should see "(1)"
        And I should see "Total: 120 €"


```


## tests/unit/cart.js

```js
function testCart () {
    var assert = require('assert'),
        fs = require('fs'),
        window = {},
        utils = eval(fs.readFileSync(__dirname+"/../../helpers/utils.js", "utf-8"));
        Cart = eval(fs.readFileSync(__dirname+"/../../model/Cart.js", "utf-8"));

    Cart.empty();

    assert(Cart.getAll().length === 0, "Empty cart should have 0 items");

    Cart.add("1");

    assert(Cart.getAll().length === 1, "Adding a product into empty cart should result in 1 prodct in cart");
    assert(Cart.getAll()[0] === "1", "Product with id 1 should be the first in cart");


    Cart.add("3");

    assert(Cart.getAll().length === 2, "Adding another product into cart should result in 2 products in cart");

    Cart.remove("3");

    assert(Cart.getAll().length === 1, "After removing a product, there should be 1 item in cart");
}



```


# Code

## view/product-detail.html

```html


<div class="row">

    <div class="col-sm-12 col-md-12">
       <div class="thumbnail">
         <img src="{%=o.product.img%}" alt="...">
         <div class="caption">
           <h3>{%=o.product.name%}</h3>
           <p>{%#o.product.description%}</p>
           <p>
               <span style="font-weight: bold; line-height: 30px">{%=o.product.price%} &#8364;</span>
               <a class="btn btn-success pull-right" data-id="{%=o.product.id%}" id="add-into-cart" role="button">Add into cart</a>
           </p>
         </div>
       </div>
     </div>

</div>

```


## controller/public.js

```js
(function () {

    var _this = this;

    this.addIntoCart = function (event) {

        var id = this.getAttribute('data-id');

		require({
			Cart: 	"model/Cart.js"
		}, function () {
            Cart.add(id);

            var length = Cart.getAll().length;

            if (length === 0) {
                document.getElementById("cart-length").innerHTML = "";
            } else {
                document.getElementById("cart-length").innerHTML = "("+length+")";

                _this.cart(event);

            }
        });

    };

})

```

# model/Cart.js

```js
({
    items: [],
    add: function (id) {
        this.items.push(id);
    },
})
```
