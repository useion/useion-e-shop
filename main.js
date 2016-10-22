
var title = "Brand",
    // **User requests to load the site**


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
