angular
  .module('king.services.woocommerceconnection', [])
  .run(woocommerceconnectionService);

  woocommerceconnectionService.$inject = ['wcApi','wcLocalStorage'];
  function woocommerceconnectionService(wcApi, wcLocalStorage) {
    console.log('[V] Loading WooCommerceConnection service...');
    var fullApi = {};
    angular.merge(fullApi, wcApi);
    angular.merge(fullApi, wcLocalStorage);
    return {
      wcApi : fullApi
    }

  }
