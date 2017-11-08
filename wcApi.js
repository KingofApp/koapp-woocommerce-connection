(function() {
  angular
    .module('woocommerce.api', [])
    .service('wcApi', wcApi);

  wcApi.$inject = ['$q', '$http'];

  function wcApi($q, $http) {
    return function(endpoint) {
      var WC = (endpoint.url) ? new WooCommerceAPI.WooCommerceAPI({
              url: endpoint.url,
              consumerKey: endpoint.consumerKey,
              consumerSecret: endpoint.consumerSecretKey
      }) : {};

      return {
        getProducts               : getProducts,
        getMoreProducts           : getMoreProducts,
        getProductById            : getProductById,
        getProductReviews         : getProductReviews,
        getProductByCategory      : getProductByCategory,
        getMoreProductsByCategory : getMoreProductsByCategory,
        getProductByTag           : getProductByTag,
        getProductAttributes      : getProductAttributes,
        getCategories             : getCategories,
        getProductBySearch        : getProductBySearch,
        getOrder                  : getOrder,
        createOrder               : createOrder,
        getFavoriteProducts       : getFavoriteProducts
      }

      function getFavoriteProducts(collection) {
        const deferred   = $q.defer();
        // this long name of index in function favorite, it prevent be set by a stranger a value by error
        // const index      = 'KOAPP_STORAGE_WOOCOMMERCE_FAVORITE_INDEX';
        // const storage    = localStorage[index];
        // const storage    = localStorage[index];
        // const isJSON     = /^\[/.test(storage) && /\]$/.test(storage);
        // const collection = JSON.parse(isJSON ? storage : "[]");

        const response = collection
          .map(id => {
            return getProductById(id)
              .then(value => value.product)
              .catch(deferred.reject);
          });

        // return promise with the same structure of getProducts, for improve the api
        return $q.all(response).then(values => ({
          products: values
        }));
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

      function getMoreProductsByCategory(category, offset) {
        return getResults("products?filter[category]=" + category + "&filter[offset]=" + offset);
      }

      function getProductByTag(tag) {
        return getResults('products?filter[tag]=' + tag);
      }

      function getProductAttributes(productId) {
        return getResults("products/attributes/"+ productId);
      }

      function getCategories() {
        return getResults("products/categories?filter[offset]=10");
      }

      function getProductBySearch(q) {
        return getResults('products?filter[q]=' + q);
      }

      function getOrder(orderId) {
        return getResults("orders/" + orderId);
      }

      function createOrder(orderItem) {
        return postOrder("orders", orderItem);
      }

      function postOrder(route, orderItem) {
        var deferred = $q.defer();
        var order = {"order" : orderItem };
        WC.post(route, order, function(err, data, res) {
          // if(err) deferred.reject(err);
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
}());
