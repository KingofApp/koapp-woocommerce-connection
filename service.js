angular
  .module('king.services.woocommerceconnection', [])
  .run(woocommerceconnectionService);

  woocommerceconnectionService.$inject = [];
  function woocommerceconnectionService() {
    var scope        = configService.services.woocommerceconnection.scope;

    console.log('[V] Loading WooCommerceConnection service...');


  }
