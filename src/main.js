var myCar = { total: { beforeVAT: 6.5, afterVAT: 7.8, VAT: 1.3, VATRate: 20 },
      products: 
       [ { name: 'a', price: 1.5, quantity: 1 },
         { name: 'b', price: 2.5, quantity: 2 } ] };

var productsToDelete = [ { name: 'a', price: 1.5, quantity: 1 },
      { name: 'b', price: 2.5, quantity: 2 } ];

_removeProducts = function(productsToDelete) {
  console.log(productsToDelete);
  console.log(myCar);
  productsToDelete.forEach(function(value, key) {
    myCar.products = myCar.products.filter(function(el) {
      return el.name !== value.name;
    });
  });
  console.log(myCar);
  if(myCar.products.length < 1) {
    return myCar;
  }
}; 