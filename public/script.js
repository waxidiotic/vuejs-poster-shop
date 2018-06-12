new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      { item: 1, title: 'Item 1', price: 9.99 },
      { item: 2, title: 'Item 2', price: 9.99 },
      { item: 3, title: 'Item 3', price: 9.99 }
    ],
    cart: []
  },
  methods: {
    addItem: function(index) {
      this.total += 9.99;
      var item = this.items[index];
      var found = false;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty++;
          break;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: item.price
        });
      }
    },
    inc: function(item) {
      item.qty++;
      this.total += item.price;
    },
    dec: function(item) {
      item.qty--;
      this.total -= item.price;
      if (item.qty <= 0) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
            break;
          }
        }
      }
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  }
});