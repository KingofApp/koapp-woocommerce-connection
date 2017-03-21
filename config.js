{
name: "WooCommerce Connection Service",
identifier: "woocommerceconnection",
description: {
es-ES: "",
en-US: ""
},
documentation: {
es-ES: "services/woocommerceconnection/documentation/es_ES.md",
en-US: "services/woocommerceconnection/documentation/en_US.md"
},
descriptionShort: {
es-ES: "",
en-US: ""
},
type: "A",
version: "0.0.0",
author: "King of App",
category: [
"payment"
],
price: 0,
subscription: true,
platforms: [
"android",
"ios",
"windows"
],
showOn: {
market: true
},
events: {
provide: [
"payment"
]
},
requires: [ ],
deps: [
"com.paypal.cordova.mobilesdk"
],
vendor: {
},
images: {
popover: "services/woocommerceconnection/images/banner.png",
banner: "services/woocommerceconnection/images/banner.png",
logo: "services/woocommerceconnection/images/logo.png",
list: "services/woocommerceconnection/images/list.png",
screenshots: [
"services/woocommerceconnection/images/screenshot01.png"
]
},
scope: {
clientId: "",
sandboxClientId: "",
brandName: "",
brandEmail: "",
agreementUrl: "http://mypage.com/agreement",
policyUrl: "http://mypage.com/policy",
sandbox: true,
acceptCreditCards: true,
preferences: {
country: {
us: 1,
es: 1
},
currency: {
EUR: 1,
USD: 0.8
},
basePriority: 1
}
},
config: [
{
type: "input",
key: "clientId",
templateOptions: {
label: "client ID",
required: true,
description: "Paypal client ID"
}
},
{
type: "input",
key: "sandboxClientId",
templateOptions: {
label: "sandboxClientId",
required: true,
description: "Paypal sandbox client ID (only if sandbox is true)"
}
},
{
type: "input",
key: "brandName",
templateOptions: {
label: "brandName",
required: true,
description: "Name of your brand"
}
},
{
type: "input",
key: "brandEmail",
templateOptions: {
type: "email",
label: "brandEmail",
required: true,
description: "Email of your brand"
}
},
{
type: "input",
key: "agreementUrl",
templateOptions: {
description: "URL of your company's user agreement, which will be offered to the user when requesting consent via a PayPalFuturePaymentViewController.",
pattern: "(https?://)([/\w.()-]*).*",
required: true,
label: "Agreement url"
}
},
{
type: "input",
key: "policyUrl",
templateOptions: {
description: "URL of your company's privacy policy, which will be offered to the user when requesting consent via a PayPalFuturePaymentViewController.",
pattern: "(https?://)([/\w.()-]*).*",
required: true,
label: "Policy url"
}
},
{
type: "checkbox",
key: "sandbox",
templateOptions: {
label: "Check to use sandbox mode (only in dev environment)"
}
},
{
type: "checkbox",
key: "acceptCreditCards",
templateOptions: {
label: "The SDK will support both payment types, PayPal or credit card"
}
}
]
}
