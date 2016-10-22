# Use case Navigate Site

## Actors

User

## Main scenario

1. User requests to load the site
2. System displays header and footer
3. Include "Find Products"

# Code

## index.html

```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<meta name="description" content="">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="view/css/styles.css" />

<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script type="text/javascript" src="functs.js"></script>
<script type="text/javascript" src="main.js"></script>

</head>
<body onload="main()">
<div id="wrap-content" class="container"></div>
</body>
</html>




```


## main.js

```js

var title = "Brand",

	main = function () {

        tags({
            title: window.title,
            description: "?"
        });

		require({
			public: 	"controller/public.js",
            Cart:       "model/Cart.js"
		}, function () {


                Cart.empty();

                var PublicCtrl = public;


    			render("menu", {}, function (html) {

    				document.getElementById("wrap-content").innerHTML += html;


                    render("footer", {}, function (html) {

        				document.getElementById("wrap-content").innerHTML += html;

        				var ctrl = new PublicCtrl();

        				// attach menu item listeners
        				document.getElementById("brand").onclick = ctrl.index;

        				route();

    			    });

			    });
		});
	}
	;

```


## view/menu.html

```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a id="brand" class="navbar-brand" href="#/public/products">Brand</a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <form class="navbar-form navbar-left">
        <div class="form-group">

                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search for..." id="search-input">
                  <span class="input-group-btn">
                    <button class="btn btn-default" type="button" id="search">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
        </div>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a id="show-cart"><span class="glyphicon glyphicon-shopping-cart"></span> Cart <span id="cart-length"></span></a></li>
      </ul>
    </div>
  </div>
</nav>


<div id="content"></div>

```

## view/css/styles.css

```css
html {
	font-family: Arial;
	padding:0;
	margin:0;
	font-size: 14px;
}
p {
    text-align: justify;
    text-justify: newspaper;
}
#wrap-content, .container, .container-fluid {
	max-width: 800px;
	margin: 0 auto;
}


```

## view/footer.html

```html
<div id="footer" style="height: 80px">
    <span style="line-height: 80px">&copy; Company</span>
</div>

```
