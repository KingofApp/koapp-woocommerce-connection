angular
  .module('king.services.woocommerceconnection', [])
  .run(woocommerceconnectionService);

  woocommerceconnectionService.$inject = ['wcApi'];
  function woocommerceconnectionService(wcApi) {
    console.log('[V] Loading WooCommerceConnection service...');
    console.log(wcApi.getProducts());
    return {
      wcApi : wcApi
    }


  }
