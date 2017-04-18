(function() {
  var MODULE_NAME = 'shoppingcartModel',
    NETCENTRIC_NAMESPACE = 'nn';

  window[NETCENTRIC_NAMESPACE] = window[NETCENTRIC_NAMESPACE] || {};

  window[NETCENTRIC_NAMESPACE][MODULE_NAME] = function() {
    _getDefaultCart = function() {
      return {
        total: {
          beforeVAT: 0,
          afterVAT: 0,
          VAT: 0
        },
        products: []
      };
    }

    _getCart = function() {
      if(window.myCar) {
        return window.myCar;
      } else {
        return _getDefaultCart();
      }
    }

    _calculateTotal = function(cart) {
      var beforeVAT = 0;
      var vatRate = cart.total.VATRate ? cart.total.VATRate : 0;

      cart.products.forEach(function(value) {
        beforeVAT = beforeVAT + (value.price * value.quantity);
      });
      cart.total.beforeVAT = beforeVAT;
      cart.total.afterVAT = (beforeVAT / 100) * vatRate + beforeVAT;
      cart.total.VAT = (beforeVAT / 100) * vatRate;
      return cart;
    }

    _setProduct = function(product) {
      product.price = product.price ? product.price : 0;
      product.quantity = product.quantity ? product.quantity : 1;
      var index = window.myCar.products.indexOf(product);
      if(index >= 0) {
        window.myCar.products[index].quantity = 
        window.myCar.products[index].quantity + product.quantity;
      } else {
        window.myCar.products.push(product);
      }
      window.myCar = _calculateTotal(window.myCar);
      return window.myCar;
    }

    _changeProductQuantity = function(product, newQuantity) {
      var index = window.myCar.products.indexOf(product);
      if(index >= 0) {
        window.myCar.products[index].quantity = newQuantity;
      } else {
        product.quantity = newQuantity;
        window.myCar = _getCart();
        window.myCar.products.push(product)
      }
      return _calculateTotal(window.myCar);
    }

    _removeProducts = function(productsToDelete) {
      productsToDelete.forEach(function(value) {
        window.myCar.products = window.myCar.products.filter(function(el) {
          return el.name !== value.name;
        });
      });
      if(window.myCar.products.length === 0) {
        window.myCar = _getDefaultCart();
        return window.myCar;
      }
      return _calculateTotal(window.myCar);
    }  

    return {
      init: function(initialState) {
        window.myCar = _getDefaultCart();
        if(initialState) {
          window.myCar.products = initialState.products;
          window.myCar.total.VATRate = initialState.VATRate;
          _calculateTotal(window.myCar);
        }
      },

      getCart: _getCart,

      addProducts: function(newOrExistingProducts) {
        return _setProduct(newOrExistingProducts);
      },

      changeProductQuantity: function(product, newQuantity) {
        return _changeProductQuantity(product, newQuantity);
      },

      removeProducts: function(productsToDelete) {
        return _removeProducts(productsToDelete);
      },

      destroy: function() {
        window.myCar = _getDefaultCart();
        return window.myCar;
      },
    };
  }
})();
