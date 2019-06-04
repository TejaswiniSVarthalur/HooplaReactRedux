import { VIEW_CART,REMOVE_PRODUCT_FROM_CART } from "../actions/Cart";

//Returns all carts
export function cart( state ={ data:[],isError:''}, action){
    switch (action.type) {
        case VIEW_CART:
            if(action.isError){
                return {data :[],isError : action.isError}
            }else{
                return { 
                    isError:"",
                    data: [...action.cartData]
                }
            }
        default:
            return state
    }
}

//Remove from cart
export function removeFromCart(state ={successMessage :'',errorMessage:'' }, action) {
    switch (action.type) {
        case REMOVE_PRODUCT_FROM_CART:
            return {
                successMessage :action.successMessage,
                errorMessage:action.errorMessage
             }
        default:
            return state
    }
}