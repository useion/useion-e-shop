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

    this.products = this.index;


    this.moreProducts = function () {

        render("product-list", {products: Product.getAll()}, function (html) {
            document.getElementById("products").innerHTML += html;

            var els = document.getElementsByClassName('product-link');
            for (var i in els) els[i].onclick = _this.product;
        });

        return false;
    };

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
