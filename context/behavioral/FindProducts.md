
# Test Behavioral Find Products

## tests/features/product.feature

```feature
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


```


# Tests


## tests/unit/product.js

```js
function testProduct () {
    var assert = require('assert'),
        fs = require('fs'),
        window = {},
        utils = eval(fs.readFileSync(__dirname+"/../../helpers/utils.js", "utf-8"));
        Product = eval(fs.readFileSync(__dirname+"/../../model/Product.js", "utf-8"));

    var products = Product.getAll();

    assert(products.length === 9, "Products.getAll should return 9 products");

    assert(products["1"].name === "First Test Product", "Name of product with ID 1 should be First Test Product");
    assert(products["2"].name === "Second Test Product", "Name of product with ID 2 should be Second Test Product");

    assert(Product.get("1").name === "First Test Product", "Name of product with ID 1 should be First Test Product");
    assert(Product.get("2").name === "Second Test Product", "Name of product with ID 2 should be Second Test Product");
}


```




# Code

## view/products.html

```html
{% if (o.search) { %}
<p>
    Showing results for &quot;{%=o.search%}&quot;...
</p>
{% } %}
<div id="products">
</div>
<div class="row">
<div class="col-sm-12">
    <div class="text-center">
        <a onclick="return (new public()).moreProducts()" class="btn btn-default" role="button">Load more</a>
    </div>
</div>
</div>

```

## view/product-list.html

```html

<div class="row">

{% for (var i=0; i<o.products.length; i++) { %}
    <a href="#/public/product/id/{%=o.products[i].id%}" data-id="{%=o.products[i].id%}" class="product-link" target="_self">
        <div class="col-sm-6 col-md-4">
               <div class="thumbnail">
                 <img src="{%=o.products[i].img%}" alt="...">
                 <div class="caption">
                   <h3 class="product-name">{%=o.products[i].name%}</h3>
                   <p class="product-description">{%=o.products[i].description%}</p>
                   <p>{%=o.products[i].price%} &#8364;</p>
                 </div>
               </div>
         </div>
     </a>
{% } %}

</div>


```

## controller/public.js

```js
(function () {

    var _this = this;

    this.index = function (event) {

        if (event)
            var search = this.getAttribute('data-search');
        else
            var search = attr("search");

        if (!search)
            search = "";

        document.getElementById("search-input").value = search;

        document.getElementById("search-input").onkeyup = function (event) {
            if (event.keyCode === 13) {
                document.getElementById("search").onclick(event);
                return false;
            }
        }


        document.getElementById("search").onclick = function (event) {
            window.location.href = '/#/public/products/search/'+document.getElementById("search-input").value;
            route();
        }
        document.getElementById("show-cart").onclick = function (event) {
            window.location.href = '/#/public/cart';
            route();
        }

		require({
            utils: 	"helpers/utils.js",
			Product: 	"model/Product.js"
		}, function () {

            render("products", {search: search}, function (html) {

                tags({
                    title: "List of Products - " + window.title,
                    description: stripHTML(html)
                });

                document.getElementById("content").innerHTML = html;

                render("product-list", {search: search, products: Product.getAll(search)}, function (html) {

                    document.getElementById("products").innerHTML = html;

                    var els = document.getElementsByClassName('product-link');
                    for (var i in els) els[i].onclick = _this.product;


                });

            });

        });

        if (search) {
            window.location.href = '/#/public/products/search/'+search;

        } else {
            window.location.href = '/#/public/products';
        }
        return false;
    };

    this.products = this.index;


    this.moreProducts = function () {

        render("product-list", {products: Product.getAll()}, function (html) {
            document.getElementById("products").innerHTML += html;

            var els = document.getElementsByClassName('product-link');
            for (var i in els) els[i].onclick = _this.product;
        });

        return false;
    };

})

```




## model/Product.js

```js
({

        getAll: function (search) {

        var products = [];


        if (!search) {
            for (var i = 0; i<9; i++) {
                if (i in this.cache)
                    products.push(this.cache[i]);
                else {
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
            }
        } else {
            for (var i in this.cache) {
                if (this.cache[i]["name"].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    products.push(this.cache[i]);
                }
            }
        }

        return products;
    },





})

```
