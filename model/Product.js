({
    save: function (id) {
        this.items.push(id);
    },

    cache: {
        "1": {
            id: "1",
            name: "First Test Product",
            description: "Suspendisse potenti. Vivamus eleifend, quam eget luctus auctor, libero lacus iaculis metus, a gravida lectus urna eu dui. Duis leo augue, euismod eu auctor sed, vehicula a neque. Cras vitae enim feugiat, facilisis neque ut, pulvinar dolor. Maecenas aliquet nulla nec nunc lacinia sollicitudin. Donec tempor posuere magna, id dapibus est laoreet ut. Donec est nulla, dignissim ut nulla mattis, finibus ornare nibh. Ut imperdiet, arcu rhoncus euismod auctor, dolor urna ornare enim, vitae blandit elit quam in lacus. Vestibulum eget blandit turpis. Praesent dapibus porttitor libero et hendrerit. Aliquam vitae tempor ligula.",
            price: 120,
            img: "http://placeimg.com/330/250/tech"
        },
        "2": {
            id: "2",
            name: "Second Test Product",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur commodo elit nibh, ac lobortis nisi lacinia vel. Mauris sodales, lectus eget vulputate imperdiet, orci sapien commodo tortor, a euismod leo justo eget neque. Vivamus justo eros, sagittis quis augue sit amet, congue tempor nulla. Etiam non molestie est, et lacinia nunc. Quisque ornare eu tellus ac cursus. Quisque aliquet convallis odio ac faucibus. Nunc at dignissim justo.",
            price: 980,
            img: "http://placeimg.com/331/251/tech"
        }
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
