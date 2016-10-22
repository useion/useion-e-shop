# Install e-shop-useion

To install e-shop-useion, setup the eshop.dev virtual domain name and add the following entry into the `/etc/hosts` file:

    127.0.0.1 eshop.dev

An example virtual domain configuration for lighttpd web server follows:

    $HTTP["host"] =~ "(^|\.)eshop\.dev$" {
        server.document-root = "/path/to/eshop-useion"
        server.errorlog = "/var/log/lighttpd/error.log"
        accesslog.filename = "/var/log/lighttpd/access.log"
        server.error-handler-404 = "/e404.php"
    }

Then, to run e-shop-useion visit http://eshop.dev/

# Cucumber tests

To install dependencies of the Cucumber tests, run the following commands:

    cd ./tests
    npm install

To run the Cucumber tests, the Chrome browser must be installed. The Cucumber tests can be executed with the following command:

    sh run.sh

# Unit tests

Run the following commands to execute the unit tests:

    node unit/product.js
    node unit/cart.js
