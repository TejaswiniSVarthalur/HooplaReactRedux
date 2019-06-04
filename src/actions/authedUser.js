import { hpLogin } from '../utils/api'
import { hpRegister } from '../utils/api'

import { handleViewCart, handleEmptyCart } from "./Cart";

export const SET_HP_AUTHED_USER = 'SET_HP_AUTHED_USER';
export const UNSET_HP_AUTHED_USER = 'UNSET_HP_AUTHED_USER';

export const HP_REGISTER = 'HP_REGISTER';

export function setHPAuthedUser (hpAuthedUser,isError) {
  return {
    type: SET_HP_AUTHED_USER,
    hpAuthedUser,
    isError,
  }
}

export function addHPUser (hpAddedUser,isError) {
  return {
    type: HP_REGISTER,
    hpAddedUser,
    isError,
  }
}

export function unSetHPAuthedUser () {
  return {
    type: UNSET_HP_AUTHED_USER,
  }
}
export function handleSetHPAuthedUser(dispatch, loginData) { 
  return hpLogin(loginData).then( (hpAuthedUser) => {
        dispatch(setHPAuthedUser(hpAuthedUser,null))
        handleViewCart(dispatch,hpAuthedUser[0].userId)
      }
    )
    .catch(err => {
      dispatch(setHPAuthedUser(null, err.message))
    })
}

export function handleunSetHPAuthedUser(dispatch) { 
  dispatch(unSetHPAuthedUser())
  handleEmptyCart(dispatch)
}

export function handleRegisteredUser(dispatch, registerData) { 
  return hpRegister(registerData).then( (hpAddedUser) => {
      dispatch(addHPUser(hpAddedUser))
      console.log(hpAddedUser)
      handleViewCart(dispatch,hpAddedUser.userId)
    }
  ).catch(err => {    
    dispatch(addHPUser(null, err.message))
  })
}