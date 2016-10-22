# Use case Find Similar Products specializes Find Products

## Actors

User

## Main scenario

1. User requests to find similar products
2. System searches for similar products by name and description
3. (inherited) System lists the products as thumbnails


# Tests

## tests/features/product.feature

```feature
Feature: Browse through products
    As a user
    I want to browse through products
    So that I can buy them

    Scenario: Showing similar products
        Given I am on the test product page
        Then I should see "Similar products"



```

# Code

## view/similar-products.html

```html

<h1>Similar products</h1>

<div id="products">
</div>

```


## controller/public.js

```js
(function () {

    var _this = this;

    this.similarProducts = function (product, done) {

		require({
            utils: 	"helpers/utils.js",
			Product: 	"model/Product.js"
		}, function () {

            render("similar-products", {search: search}, function (html) {

                document.getElementById("content").innerHTML += html;

                render("product-list", {products: Product.getSimilar(product)}, function (html) {

                    document.getElementById("products").innerHTML = html;

                    var els = document.getElementsByClassName('product-link');
                    for (var i in els) els[i].onclick = _this.product;

                    done();


                });

            });

        });
    }

})

```



## model/Product.js

```js
({

    getSimilar: function (search) {

        var products = [],
            rand = window.getRandomNumber(0, 50);

        for (var i = rand; i<rand+3; i++) {
            var product = {
                id: i,
                name: window.getRandomWords(3),
                description: window.getRandomWords(40),
                price: window.getRandomNumber(0, 50),
                img: "http://placeimg.com/32"+i+"/24"+i+"/tech"
            };
            this.cache[i] = product;
            products.push(product);
        }
        return products;
    },


})

```
