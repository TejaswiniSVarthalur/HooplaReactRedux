import { GET_ALL_PRODUCTS, 
    GET_All_CATEGORIES,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_BY_SEARCH } from "../actions/Products";

//Returns all products
export function allProducts(state ={products:[]}, action){
   switch (action.type){
       case GET_ALL_PRODUCTS:
           if(action.isError){
               return {products :[],isError : action.isError}
           }else{
               return { 
                   isError:"",
                   products: [...action.products]
               }
           }
       default : 
           return state    
   }
}

//Returns all Categories
export function allCategories(state={categories:[]}, action) {
   switch(action.type){
       case GET_All_CATEGORIES:
           if(action.isError){
               return {categories :[],isError : action.isError}
           }else{
               return {
                   isError:"",
                   categories: [...action.categories]
               }
           }
       default : 
           return state    
   }
}

//Return selected categorized products
export function Categorizedproducts( state={ products :[]},action){
   switch(action.type){
       case GET_PRODUCTS_BY_CATEGORY: 
           if(action.isError){
               return {products :[],isError : action.isError}
           }else{
               return {
                   isError:"",
                   products: [...action.products]
               }
           }
       case 'UNSET_CATGEORIZED_PRODUCTS':
           return {products : []}  
        default :
               return state   
   }
} 

//Return searched Products
export function searchedProducts(state={ products :[]},action) {
   switch(action.type){
       case GET_PRODUCTS_BY_SEARCH: 
           if(action.isError){
               return {products :[],isError : action.isError}
           }else{
               return {
                   isError:"",
                   products: [...action.products]
               }
           }
       case 'UNSET_SEARCHED_PRODUCTS':
           return {products : []}  
        default :
               return state   
   }
}