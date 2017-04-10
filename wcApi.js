angular
  .module('woocommerce.api', [])
  .service('wcApi', wcApi);

  wcApi.$inject = ['$q', '$http'];

  function wcApi($q, $http) {
    return function(endpoint){

        var WC = new WooCommerceAPI.WooCommerceAPI({
                url: endpoint.url,
                consumerKey: endpoint.consumerKey,
                consumerSecret: endpoint.consumerSecretKey
        });

        return {
          getProducts         : getProducts,
          getProductById      : getProductById,
          getProductReviews   : getProductReviews,
          getProductByCategory: getProductByCategory,
          getProductByTag     : getProductByTag,
          getProductAttributes: getProductAttributes,
          getOrder            : getOrder,
          createOrder         : createOrder
        }

      function getProducts() {
        route = "products";
        return getResults(route);
      }

      function getProductById(productId) {
        route = "products/" + productId;
        return getResults(route);
      }

      function getProductReviews(productId) {
        route = "products/"+ productId +"/reviews";
        return getResults(route);
      }

      // slug category
      function getProductByCategory(category) {
        route = "products?";
        return getResults(route + '?filter[category]=' + category);
      }

      function getProductByTag(tag) {
        route = "products?";
        return getResults(route + '?filter[tag]=' + tag);
      }

      function getProductAttributes(productId) {
        route = "products/attributes/"+ productId;
        return getResults(route);
      }


      function getOrder(orderId) {
        route = "orders/" + orderId;
        return getResults(route);
      }

      function createOrder(orderItem) {
        route = "orders";
        return postOrder(route, orderItem);
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
