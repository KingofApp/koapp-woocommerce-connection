angular
  .module('woocommerce.config', [])
  .service('wcConfig', wcConfig);

  // endpointConfig {
  //   url,
  //   consumerKey,
  //   consumerSecretKey
  // }

  function wcConfig() {
    return (function(){

      var endpointConfig = endpointConfig;

      return function(){
        return {
          createOauth     : createOauth,
          getOauthData    : getOauthData,
          getUrl          : getUrl
        }
      };

      oauth.getTimeStamp = function() {
        return Math.round((new Date()).getTime() / 1000.0);
      };

      oauth.getNonce = function(lenght) {
        var text     = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < lenght; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      };

      function getUrl(endpointConfig) {
        return endpointConfig.url;
      }

      function getOauthData(endpointConfig) {
        var oauth       = createOauth(endpointConfig);
        var oauth_data  = { oauth_consumer_key    : oauth.consumer.key,
                            oauth_nonce           : oauth.getNonce(5),
                            oauth_signature_method: oauth.signature_method,
                            oauth_timestamp       : oauth.getTimeStamp(),
                            oauth_version         : '1.0'
                          };
        return oauth_data;
      }

      function createOauth(endpointConfig) {
        return OAuth({
          consumer: {
              key   : endpointConfig.consumerKey,
              secret: endpointConfig.consumerSecretKey
          },
          signature_method: 'HMAC-SHA1',
          hash_function: function(base_string, key) {
              return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
              // return crypto.createHmac('sha1', key).update(base_string).digest('base64');
          }
        });
      }
    }());
  }
