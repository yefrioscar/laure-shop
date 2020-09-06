/**
 * Handle add to cart success and update store
 */
export const addToBagSuccess = (product) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: product
  }
}

/**
 * Handle error on adding product to cart
 */
export const addToBagError = (error) => {
  console.log('Error adding product to cart', error);
  return {
    type: ADD_TO_CART_ERROR,
  }
}

/**
 * Async add product to cart
 */
export const addToBag = (productId, quantity, selectedOption) => (dispatch) => commerce.cart.add(productId, quantity, selectedOption)
  .then(product => dispatch(addToBagSuccess(product)))
  .catch(error => dispatch(addToBagError(error)));