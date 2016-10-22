({
    save: function (order) {
        return order.id;
    },
    get: function (id) {
        return {id: id};
    }
})
