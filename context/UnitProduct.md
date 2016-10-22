# Test Unit Product

## tests/unit/product.js

```js
function testSaveProductIntoCart() {
  product = {
      id: 1,
      name: "Test",
      description: "...",
      price: 980,
      img: "http://placeimg.com/331/251/tech"
  }
  assert(Cart.save(product) === true,
      "System saves the product into cart");
}

function testFindProducts() {
  var products = Product.getAll({name: "Test"});

  assert(products.length >= 1, "System should find products");

  for (var i in products) {
    assert(products[i].name === "Test",
      "The name of the products should be \"Test\"") 
  }
}
```

# Code

## model/Cart.js

```js
({
    save: function (id) {
        this.items.push(id);
    },
})

```

## model/Product.js

```js
({
    save: function (id) {
        this.items.push(id);
    },
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
