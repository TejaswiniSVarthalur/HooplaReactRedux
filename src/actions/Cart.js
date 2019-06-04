import { addToCart, viewCart, removeFromCart } from "../utils/api";

export const VIEW_CART = 'VIEW_CART'
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART"

//Add to cart
export function handleAddtoCart(dispatch,userCartData) {
    return addToCart(userCartData).then( response => {
        handleViewCart(dispatch,userCartData.uId);
    }).catch(error => {
        dispatch(viewCartObj(null,error.message))
    })
}

//View the cart
export function viewCartObj(cartData,isError) {
    return{
        type: VIEW_CART,
        cartData,
        isError
    }
}

export function handleViewCart(dispatch,uId) {
    return viewCart(uId).then( cartData => {
        dispatch(viewCartObj(cartData,null))
    }).catch( error => {
        dispatch(viewCartObj(null,error.message))
    })
}

export function handleEmptyCart(disptach) {
    disptach(viewCartObj([],null))
}

//Remove a product from cart
export function removeFromCartObj(successMessage,errorMessage) {
    return{
        type: REMOVE_PRODUCT_FROM_CART,
        successMessage,
        errorMessage
    }
}

export function handleRemoveFromCart(dispatch,userCartObj) {
    console.log('action',userCartObj)
    return removeFromCart(userCartObj).then( response =>{
        dispatch(removeFromCartObj(response,''))
    }).catch(err =>{
        dispatch(removeFromCartObj('',err.message))
    })
}