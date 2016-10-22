({
    save: function (id) {
        this.items.push(id);
    },
    add: function (id) {
        this.items.push(id);
    },
    remove: function (id) {
        var items = [];
        for (var i in this.items) {
            if (this.items[i] !== id) items.push(this.items[i]);
        }
        this.items = items;
    },
    getAll: function () {return this.items},
    empty: function () {
        this.items = [];
    }
})
