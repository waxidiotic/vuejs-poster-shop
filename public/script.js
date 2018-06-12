const PRICE = 9.99;

new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    newSearch: 'baseball',
    lastSearch: '',
    loading: false,
    price: PRICE
  },
  methods: {
    onSubmit: function() {
      this.items = [];
      this.loading = true;
      this.$http
        .get('/search/'.concat(this.newSearch))
        .then(function(res) {
          this.lastSearch = this.newSearch;
          this.search = '';
          this.items = res.data;
          this.loading = false;
        })
      ;
    },
    addItem: function(index) {
      var item = this.items[index];
      this.total += this.price;
      var found = false;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty++;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: this.price
        });
      }
    },
    inc: function(item) {
      item.qty++;
      this.total += this.price;
    },
    dec: function(item) {
      item.qty--;
      this.total -= this.price;
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
  },
  mounted: function() {
    this.onSubmit(this.newSearch);
  }
});