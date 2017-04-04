angular
  .module('woocommerce.localstorage', [])
  .factory('wcLocalStorage', wcLocalStorage);

  wcLocalStorage.$inject = ['$q', '$http'];

  function wcLocalStorage($q, $http) {
    return {
      getCart: getCart
    };

    function getCart() {
      console.log('Getting cart!');
    }

  }
