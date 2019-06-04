
import { combineReducers } from 'redux';
import { allProducts,
    allCategories,
    Categorizedproducts,
    searchedProducts,
 } from "./Products";

import { authedUser } from "./hpAuthedUser";
import { cart } from "./Cart";

export default combineReducers({
    allProducts,
    allCategories,
    Categorizedproducts,
    searchedProducts,
    authedUser,
    cart
})
