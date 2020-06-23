import {combineReducers} from "redux";
import isEmpty from 'lodash/isEmpty';

import { 
  SEARCH_REPOS_REQUEST,
  SEARCH_REPOS_RESPONSE,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_RESPONSE,
  SEARCH_CLEAR
} from '../constants';

const initialState : Array<any> = [];

const data = ( state : any = initialState, action: any ) : Array<any> => {
  switch(action.type){
    case SEARCH_REPOS_REQUEST:
      state = {fetching: action.payload.fetching};
      break;
    case SEARCH_REPOS_RESPONSE:
      state = isEmpty(action.payload.items)?[]:action.payload.items;
      break;
    case SEARCH_USERS_REQUEST:
      state = {fetching: action.payload.fetching};
      break;
    case SEARCH_USERS_RESPONSE:
      state = isEmpty(action.payload.items)?[]:action.payload.items;
      break;
    case SEARCH_CLEAR:
      state = [];
      break;
  }

  return state;
}

export default combineReducers({
  data
});
