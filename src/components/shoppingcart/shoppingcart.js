(function() {
  var shopping = function() {

    function hideEmptyCart() {
      $("#section-shoppingcart").hide();
    };

    function showCart() {
      $("#section-shoppingcart").show();
      $("#proceed")[0].addEventListener('click', proceed, false);
    };

    function proceed() {
      $("#proceed")[0].innerText = 'Sending your order...';
      $("#proceed")[0].disabled = true;
    };

    function templateProduct(product) {
      return `
        <tr>
          <td class="info" width="60%">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="remove">
              <button>Remove</button>
            </div>
          </td>
          <td align="right" class="price" width="10%">
            &euro;<output>${product.price}</output>
          </td>
          <td align="right" class="items" width="30%">
            <input type="number" min="1" value="1">
            <span>
            <button class="minus" type="button" aria-label="decrease">
            -
            </button>
            <button class="plus" type="button" aria-label="step up">
            +
            </button>
            </span>
          </td>
        </tr>`
    };

    function renderProduct(innerHTML) {
      showCart();
      $("#shopping-list").append(innerHTML);
      calculateTotal();
    };

    function calculateTotal() {
      var prices = $("#shopping-list tr td.price output");
      var beforeVAT = 0;
      var vat = 0;
      var total = 0;
      var quantity = $("#shopping-list tr td.items input");
      for (var i = 0; i < prices.length; i++) {
        beforeVAT += parseInt(prices[i].value) * parseInt(quantity[i].value);
      }
      $('#price output')[0].value = beforeVAT;
      vat = (beforeVAT / 100) * 20;
      total = beforeVAT + vat;
      $('#taxes output')[0].value = vat;
      $('#total output')[0].value = '€' + total;
    };

    function validNewProduct(product) {
      var products = $("#shopping-list tr td.info h3");
      var quantity = $("#shopping-list tr td.items input");
      for (var i = 0; i < products.length; i++) {
        if(products[i].innerText === product.name) {
          quantity[i].value = parseInt(quantity[i].value) + 1;
          calculateTotal();
          return false;
        }
      }
      return true;
    };

    function init() {
      hideEmptyCart();
      addEvenListener();
    };

    function addProduct(prod) {
      var attr = this.getAttribute('data-shop-listing');
      var product = JSON.parse(attr);
      if(validNewProduct(product)) {
        const innerHTML = templateProduct(product);
        renderProduct(innerHTML);
        addProductEvenListener();
      } 
    };

    function removeProduct() {
      this.parentElement.parentElement.parentElement.remove();
      calculateTotal();
      if($("#shopping-list tr").length === 0) {
        hideEmptyCart();
      }
    };

    function changeMinusProductQuantity(index) {
      var context = this.parentElement.parentElement.parentElement;
      var quantity = parseInt(context.lastElementChild.firstElementChild.value);
      if(quantity > 0) {
        context.lastElementChild.firstElementChild.value = quantity - 1;
        calculateTotal();
      } 
    };

    function changePlusProductQuantity() {
      var context = this.parentElement.parentElement.parentElement;
      var quantity = parseInt(context.lastElementChild.firstElementChild.value);
      if(quantity > 0) {
        context.lastElementChild.firstElementChild.value = quantity + 1;
        calculateTotal();
      } 
    };

    function addEvenListener() {
      var classname = document.getElementsByClassName("btn-add");

      for (var i = 0; i < classname.length; i++) {
          classname[i].addEventListener('click', addProduct, false);
      }
    };

    function addProductEvenListener() {
      var classname = $("#shopping-list tr td.info button");
      var minusBtn = $("#shopping-list tr td.items button.minus");
      var plusBtn = $("#shopping-list tr td.items button.plus")
      for (var i = 0; i < classname.length; i++) {
          classname[i].addEventListener('click', removeProduct, false);
          minusBtn[i].addEventListener('click', changeMinusProductQuantity, false);
          plusBtn[i].addEventListener('click', changePlusProductQuantity, false);
      }
    };

    init();

  };

  shopping();
})();