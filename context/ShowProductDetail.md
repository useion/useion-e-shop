# Use case Show Product Detail

## Actors

User

## Main scenario

1. User selects to show detail of a product
2. System displays product name, description and price
3. Include "Find Similar Products"
4. System allows to add the product into shopping cart

## Triggers

The use case is triggered when the "displaying products" extension point is reached


# Tests

## tests/features/product.feature

```feature
Feature: Browse through products
    As a user
    I want to browse through products
    So that I can buy them

    Scenario: Showing product detail
        Given I am on the test product page
        Then I should see "First Test Product"
        And I should see "120 €"
        And I should see "Similar products"
        And I should see "Add into cart"



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

    this.product = function (event) {

        if (event)
            var id = this.getAttribute('data-id');
        else
            var id = attr("id");

        require({
            utils: 	"helpers/utils.js",
            Product: 	"model/Product.js"
        }, function () {

            var product = Product.get(id);

            render("product-detail", {product: product}, function (html) {

                tags({
                    title: product.name+" - " + window.title,
                    description: stripHTML(html)
                });

                document.getElementById("content").innerHTML = html;

                _this.similarProducts(product, function () {
                    document.getElementById("add-into-cart").onclick = _this.addIntoCart;
                });

            });

        });

        window.location.href = '/#/public/product/id/'+id;
        return false;
    };




})


```



## model/Product.js

```js
({

    get: function (id) {

        if (id in this.cache) {
            return this.cache[id];
        } else {
            var product = {
                id: id,
                name: window.getRandomWords(3),
                description: window.getRandomWords(40),
                price: window.getRandomNumber(0, 50),
                img: "http://placeimg.com/32"+i+"/24"+i+"/tech"
            };
            this.cache[id] = product;
            return product;
        }
    }

})

```
