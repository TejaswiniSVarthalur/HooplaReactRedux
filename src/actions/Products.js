import { 
    getAllProducts,
    getAllCategories,
    getProductsByCategory, 
    getSearchedProducts} from "../utils/api";

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_All_CATEGORIES = 'GET_All_CATEGORIES'
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'
export const GET_PRODUCTS_BY_SEARCH = 'GET_PRODUCTS_BY_SEARCH'

//Get Products
export function getProducts( products, isError){
    return {
        type: GET_ALL_PRODUCTS,
        products,
        isError
    }
}

export function handleGetProducts(dispatch) {
    return getAllProducts().then( products => {
        dispatch(getProducts(products))
    }).catch( e => {
        dispatch(getProducts(null, e.message))
    })
}

//Get Categories
export function getCategories(categories,isError){
    return{
        type: GET_All_CATEGORIES,
        categories,
        isError
    }
}

export function handleGetCategories(dispatch){
    return getAllCategories().then( categories => {
        dispatch(getCategories(categories,null))
    }).catch( e=>{
        dispatch(getCategories(null,e.message))
    })
}

//Get products of selected category
export function productsByCategory(products,isError){
    return {
        type : GET_PRODUCTS_BY_CATEGORY,
        products,
        isError
    }
}

export function handleProductsByCategory(dispatch,category){
    return getProductsByCategory(category).then( products => {
        dispatch(productsByCategory(products,null))
    }).catch(e=>{
        dispatch(productsByCategory(null,e.message))
    })
}


//Get the products by seach keyword
export function getProductsSearched(products,isError){
    return {
        type : GET_PRODUCTS_BY_SEARCH,
        products,
        isError
    }
}

export function handleGetProductsSearched(dispatch,productName){
    return getSearchedProducts(productName).then( products => {
        dispatch(getProductsSearched(products,null))
    }).catch( e=> {
        dispatch(getProductsSearched(null,e.message))
    })
}