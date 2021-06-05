import {combineReducers} from "redux";

import { 
  GISTS_REQUEST,
  GISTS_RESPONSE,
  SEARCH_CLEAR
} from '../constants';

const initialState : Array<any> = [];

const data = ( state : any = initialState, action: any ) : Array<any> => {
  switch(action.type){
    case GISTS_REQUEST:
      state = {fetching: action.payload.fetching};
      break;
    case GISTS_RESPONSE:
      state = {fetching: false, items: action.payload.data};
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
