angular
  .module('king.services.woocommerceconnection', [])
  .run(woocommerceconnectionService);

  woocommerceconnectionService.$inject = ['$q', 'configService', '$http'];
  function woocommerceconnectionService($q, configService, $http) {
    var scope        = configService.services.woocommerceconnection.scope;
    console.log('[V] Loading WooCommerceConnection service...');

    var route          = '';
    var request        = {  url     : scope.url + 'wc-api/v3/',
                            method  : 'GET'
                         };
    var isAmpersand    = false;
    var orderList      = {};
    var oauth          = OAuth({
                            consumer: {
                                key   : scope.consumerKey,
                                secret: scope.consumerSecretKey
                            },
                            signature_method: 'HMAC-SHA1',
                            hash_function: function(base_string, key) {
                                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
                            }
                          });
    var oauth_data     = {  oauth_consumer_key    : oauth.consumer.key,
                            oauth_nonce           : oauth.getNonce(5),
                            oauth_signature_method: oauth.signature_method,
                            oauth_timestamp       : oauth.getTimeStamp()
                          };
                              
    return {
      getProducts         : getProducts,
      getProductById      : getProductById,
      getProductReviews   : getProductReviews,
      getProductByCategory: getProductByCategory,
      getProductByTag     : getProductByTag,
      getProductAttributes: getProductAttributes,
      getOrder            : getOrder
    };

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

    oauth.getTimeStamp = function() {
      return Math.round((new Date()).getTime() / 1000.0);
    }

    oauth.getNonce = function(lenght) {
        var text     = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < lenght; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    function getEncodedUrl(route, order) {
      var paramsStr                = oauth.getParameterString(request, oauth_data);
      var requestUrl               = request.url + route;
      requestUrl                   = (isAmpersand) ? requestUrl + '&' : requestUrl + '?';
      var encodedUrl               = requestUrl + paramsStr;
      return encodedUrl;
    }

  }
