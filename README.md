# Koapp Woocommerce Connection v1.1.0

This library is used for communicating a Woocommerce Shop from Wordpress with the koapp Woocommerce modules.

## Retrieve data from the Store

```
getProducts()                     // Returns the 10 last products from the store
getMoreProducts(offset)           // Returns 10 products starting from a given index
getProductById(id)                // Returns a product with the given id
getProductReviews(id)             // Returns reviews from the product with the given id
getProductByCategory(category)    // Returns products with the given category
getProductByTag(tag)              // Returns products with the given tag
getProductAttributes(attributes)  // Returns prodcuts with the given attributes
getOrder(id)                      // Returns an order with the given id
createOrder(orderItem)            // Creates an order with the given orderItems
```
## Cart management

```
getCart()              // Returns cart from localStorage
addCartItem(item)      // Stores an item in the localStorage cart
editCart(id, quantity) // Edits quantity from the product with the given id an updates the localStorage cart
deleteCartItem(id)     // Deletes the product with the given id from the localStorage cart
resetCart()            // Resets cart from localStorage
```
