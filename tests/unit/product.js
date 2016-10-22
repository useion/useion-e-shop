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
testProduct();
