/**
* REDUCERS related to authenticated users
*/
import {
  SET_HP_AUTHED_USER,
  UNSET_HP_AUTHED_USER,
  HP_REGISTER
} from '../actions/authedUser'

export function authedUser(state = {data:[],isError:''}, action) {
  switch (action.type) {
    case SET_HP_AUTHED_USER:
      if (action.isError) {
        return {
          data:[],
          isError: action.isError,
        }
      }
      return {
        data:[...action.hpAuthedUser],
        isError:''
      }

    case UNSET_HP_AUTHED_USER:
      return {data:[],isError:''}

    case HP_REGISTER:
      if (action.isError) {
        return {
          data:[],
          isError: action.isError,
        }
      }
      return {
        data:[{...action.hpAddedUser}],
        isError:''
      }
    default:
      return state
  }
}