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
testCart();
