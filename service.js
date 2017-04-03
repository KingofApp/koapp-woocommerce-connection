
  angular
    .module('woocommerce', [])
    .service('wcConnectionService', wcConnectionService);

    wcConnectionService.$inject = ['wcApi','wcLocalStorage'];
    function wcConnectionService(wcApi, wcLocalStorage, config) {
      // config = {
      //   url:
      //   consumerKey:
      //   consumerSecretKey:
      // }
      return (function(config){
        return angular.merge({}, wcApi(config), wcLocalStorage);
      }());
    }
