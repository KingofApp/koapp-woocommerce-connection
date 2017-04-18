angular
  .module('woocommerce.api', [])
  .service('wcApi', wcApi);

  wcApi.$inject = ['$q', '$http'];

  function wcApi($q, $http) {
    return function(endpoint){
        var WC = {};
        var WC = (endpoint.url) ? new WooCommerceAPI.WooCommerceAPI({
                url: endpoint.url,
                consumerKey: endpoint.consumerKey,
                consumerSecret: endpoint.consumerSecretKey
        }) : {};

        return {
          getProducts         : getProducts,
          getMoreProducts     : getMoreProducts,
          getProductById      : getProductById,
          getProductReviews   : getProductReviews,
          getProductByCategory: getProductByCategory,
          getProductByTag     : getProductByTag,
          getProductAttributes: getProductAttributes,
          getOrder            : getOrder,
          createOrder         : createOrder
        }

      function getProducts() {
        return getResults("products");
      }
      function getMoreProducts(offset) {
        return getResults("products?filter[offset]="+offset);
      }

      function getProductById(productId) {
        return getResults("products/" + productId);
      }

      function getProductReviews(productId) {
        return getResults("products/"+ productId +"/reviews");
      }

      // slug category
      function getProductByCategory(category) {
        return getResults("products?filter[category]=" + category);
      }

      function getProductByTag(tag) {
        return getResults('products?filter[tag]=' + tag);
      }

      function getProductAttributes(productId) {
        return getResults("products/attributes/"+ productId);
      }


      function getOrder(orderId) {
        return getResults("orders/" + orderId);
      }

      function createOrder(orderItem) {        
        return postOrder("orders", orderItem);
      }

      function postOrder(route, orderItem) {
        var deferred = $q.defer();
        WC.post(route, orderItem,function(err, data, res) {
          if(err) deferred.reject(err);
          deferred.resolve(JSON.parse(res));
        })
        return deferred.promise;
      }

      function getResults(route) {
        var deferred = $q.defer();
        WC.get(route,function(err, data, res) {
          if(err) deferred.reject(err);
          deferred.resolve(JSON.parse(res));
        })
        return deferred.promise;
      }

    };

  }
