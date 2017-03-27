{
    "name": "WooCommerce Connection Service",
    "identifier": "woocommerceconnection",
    "description": {
        "es-ES": "",
        "en-US": ""
    },
    "documentation": {
        "es-ES": "services/woocommerceconnection/documentation/es_ES.md",
        "en-US": "services/woocommerceconnection/documentation/en_US.md"
    },
    "descriptionShort": {
        "es - ES": "",
        "en - US": ""
    },
    "type": "A",
    "version": "0.0.0",
    "author": "King of App",
    "category": [
        "payment"
    ],
    "price": 0,
    "subscription": true,
    "platforms": [
        "android",
        "ios",
        "windows"
    ],
    "files": [
      "services/woocommerceconnection/oauth/hmac-sha1.js",
      "services/woocommerceconnection/oauth/enc-base64-min.js",
      "services/woocommerceconnection/oauth/oauth1.0a.js",
      "services/woocommerceconnection/service.js",
      "services/woocommerceconnection/wcApi.js",
      "services/woocommerceconnection/wcConfig.js"
    ],
    "libs": [{
      "bower": {
        "oauth-signature": "^1.3.1"
      },
      "src": "bower_components/oauth-signature/dist/oauth-signature.js"
    }],
    "showOn": {
        "market": true
    },
    "requires": [],
    "deps": [
        "com.paypal.cordova.mobilesdk"
    ],
    "images": {
        "popover": "services/woocommerceconnection/images/banner.png",
        "banner": "services/woocommerceconnection/images/banner.png",
        "logo": "services/woocommerceconnection/images/logo.png",
        "list": "services/woocommerceconnection/images/list.png",
        "screenshots": [
            "services/woocommerceconnection/images/screenshot01.png"
        ]
    },
    "scope": {
      "url": "",
      "consumerKey" : "",
      "consumerSecretKey": ""
    },
    "config": [
      {
        "type": "input",
        "key": "url",
        "templateOptions": {
          "label": "URL",
          "required": true,
          "description": "Store URL"
        }
      },
      {
        "type": "input",
        "key": "consumerKey",
        "templateOptions": {
          "label": "Consumer Key",
          "required": true,
          "description": "Consumer Key"
        }
      },
      {
        "type": "input",
        "key": "consumerSecretKey",
        "templateOptions": {
          "label": "Consumer Secret Key",
          "required": true,
          "description": "Consumer Secret Key"
        }
      }
    ]
}
