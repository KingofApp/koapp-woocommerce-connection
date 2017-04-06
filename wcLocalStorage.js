angular
  .module('woocommerce.localstorage', [])
  .factory('wcLocalStorage', wcLocalStorage);

  wcLocalStorage.$inject = [];

  function wcLocalStorage() {
    return {
      addCartItem    : addCartItem,
      deleteCartItem : deleteCartItem,
      getCart        : getCart,
      resetCart      : resetCart
    };

    function getCart() {
      return  (!sessionStorage.storedCart) ?  {} : angular.fromJson(sessionStorage.storedCart); 
    }

    function deleteCartItem(idToDelete) {
      var storedObject = angular.fromJson(sessionStorage.storedCart);
      var objectToSave = [];
      if (storedObject && angular.isArray(storedObject)) {
        for (var i = 0; i < storedObject.length; i++) {
          if (idToDelete === storedObject[i].id) storedObject.splice(i, 1);
        }
      }
      sessionStorage.storedCart = angular.toJson(storedObject);
    }

    function addCartItem(itemToAdd) {
      var storedObject = angular.fromJson(sessionStorage.storedCart);
      var objectToSave = [];
      var exist        = false;
      if (storedObject && angular.isArray(storedObject)) {
        storedObject.forEach(function(item) {
          if (item.id === itemToAdd.id) {
            exist = true;
            item.quantity = (itemToAdd.quantity+item.quantity);
          }
          objectToSave.push(item);
        });
      }

      if (!exist) objectToSave.push(itemToAdd);

      sessionStorage.storedCart = angular.toJson(objectToSave);
    }

    function resetCart() {
      sessionStorage.removeItem('storedCart');
    }

  }
