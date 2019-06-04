// import axios from '../../node_modules/axios/dist/axios.min';
import axios from 'axios';

const productBackendUrl = "http://localhost:3500"

const usersBackendURL = "http://localhost:4000";

const cartBackendURL = 'http://localhost:4500';

                                              //Product API calls

//Retrieving all Products
export function getAllProducts(){
    return axios.get(productBackendUrl+'/getAllProduct').then( response =>{
        return response.data
    }).catch( error =>{
        let err = new Error();
        if (error.response) {
          err.message = error.response.data.message;
          err.status = error.status;
        } else {
          err.message = 'Server Error, Please try later';
          err.status = 500
        }
        throw err;
    })
}

//Retrieving all categories of products
export function getAllCategories(){
  return axios.get(productBackendUrl+'/getAllCategories').then( response =>{
      return response.data
  }).catch( error =>{
    let err = new Error();
    if (error.response) {
      err.message = error.response.data.message;
      err.status = error.status;
    } else {
      err.message = 'Server Error, Please try later';
      err.status = 500
    }
    throw err;
})
}

//Retrieving products by category selected
export function getProductsByCategory(category){
  return axios.get(productBackendUrl+'/getProductByCategory?category='+ category).then( response => {
    return response.data
  }).catch( error =>{
    let err = new Error();
    if (error.response) {
      err.message = error.response.data.message;
      err.status = error.status;
    } else {
      err.message = 'Server Error, Please try later';
      err.status = 500
    }
    throw err;
})
}

//Retrieve the products searched
export function getSearchedProducts(productName) {
  return axios.get(productBackendUrl + '/getProductByName?pName=' + productName).then(response => {
    return response.data
  }).catch(error => {
    let err = new Error();
    if (error.response) {
      err.message = error.response.data.message;
      err.status = error.status;
    } else {
      err.message = 'Server Error, Please try later';
      err.status = 500
    }
    throw err;
  })
}
                                          //USER API calls
//To login the user
 export function hpLogin(loginData) {
  return axios.post(usersBackendURL+'/login', loginData).then(response => {
      return response.data;
    }).catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
        err.status = error.status;
      } else {
        err.message = 'Server Error, Please try later';
        err.status = 500
      }
      throw err;
    })
}

//To register the user
export function hpRegister(registerData) {
  return axios.post(usersBackendURL+'/register', registerData).then(response => {
      return response.data;
    }).catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
        err.status = error.status;
      } else {
        err.message = 'Server Error, Please try later';
        err.status = 500
      }
      throw err;
    })
}

                                         //Cart API calls
//Add to cart
export function addToCart(userCartData) {
  return axios.post(cartBackendURL + '/addToCart', userCartData).then(response => {
    return response.data
  }).catch(error => {
    let err = new Error();
    if (error.response) {
      err.message = error.response.data.message;
      err.status = error.status;
    } else {
      err.message = 'Server Error, Please try later';
      err.status = 500
    }
    throw err;
  })
}     

//View cart
export function viewCart(uId) {
  return axios.get(cartBackendURL + '/viewCart?uId=' + uId).then(response => {
    return response.data
  }).catch( error => {
    let err = new Error();
    if (error.response) {
      err.message = error.response.data.message;
      err.status = error.status;
    } else {
      err.message = 'Server Error, Please try later';
      err.status = 500
    }
    throw err;
  })
}

//Remove product from cart
export function removeFromCart(userCartObj) {
    return axios.delete(cartBackendURL + '/removeFromCart', userCartObj).then( response=>{
      return response.data.message
    }).catch( error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
        err.status = error.status;
      } else {
        err.message = 'Server Error, Please try later';
        err.status = 500
      }
      throw err;
    })
}