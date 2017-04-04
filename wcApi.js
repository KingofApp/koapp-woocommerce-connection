angular
  .module('woocommerce.api', [])
  .service('wcApi', wcApi);

  wcApi.$inject = ['$q', '$http', 'wcConfig'];

  function wcApi($q, $http, wcConfig) {
    return function(endpoint){

        var config   = wcConfig(endpoint);

        var oauth_data        = config.getOauthData(endpoint);
        var oauth             = config.createOauth(endpoint);
        var url               = config.getUrl(endpoint);
        var isAmpersand       = false;
        var route             = "";
        var request           = {  url    : url + 'wc-api/v3/',
          method  : 'GET'
        };

        return {
          getProducts         : getProducts,
          getProductById      : getProductById,
          getProductReviews   : getProductReviews,
          getProductByCategory: getProductByCategory,
          getProductByTag     : getProductByTag,
          getProductAttributes: getProductAttributes,
          getOrder            : getOrder
        }


      function getProducts() {
        route       = "products";
        var results = getResults(route);
        return results;
      }

      function getProductById(productId) {
        route       = "products/" + productId;
        var results = getResults(route);
        return results;
      }

      function getProductReviews(productId) {
        route       = "products/"+ productId +"/reviews";
        var results = getResults(route);
        return results;
      }

      // slug category
      function getProductByCategory(category) {
        route       = "products?";
        isAmpersand = true;
        oauth_data['filter[category]'] = category;
        var results = getResults(route);
        return results;
      }

      function getProductByTag(tag) {
        route       = "products?";
        isAmpersand = true;
        oauth_data['filter[tag]'] = tag;
        var results = getResults(route);
        return results;
      }

      function getProductAttributes(productId) {
        route       = "products/attributes/"+ productId;
        var results = getResults(route);
        return results;
      }

      function createOrder(orderItem) {
        route          = "orders";
        request.method = "POST";
        var results    = postOrder(route, orderItem);
        return results;
      }

      function getOrder(orderId) {
        route       = "orders/" + orderId;
        var results = getResults(route);
        return results;
      }

      function getResults(route, isAmpersand) {
        var deferred               = $q.defer();
        var url                    = request.url + route;
        oauth_data.oauth_signature = oauthSignature.generate(request.method, url, oauth_data, oauth.consumer.secret, '', { encodeSignature: true});
        var encodedUrl             = getEncodedUrl(route);
        $http({
          method    : request.method,
          url       : encodedUrl,
          headers   : {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then(function(objS){
          deferred.resolve(objS);
        })
        .catch(function(objE){
          deferred.reject(objE);
        });
        return deferred.promise;
      }


      function getEncodedUrl(route, order) {
        var paramsStr                = oauth.getParameterString(request, oauth_data);
        var requestUrl               = request.url + route;
        requestUrl                   = (isAmpersand) ? requestUrl + '&' : requestUrl + '?';
        var encodedUrl               = requestUrl + paramsStr;
        return encodedUrl;
      }


    };

  }
