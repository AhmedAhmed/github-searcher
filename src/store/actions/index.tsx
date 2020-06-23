import { 
  SEARCH_REPOS_REQUEST, 
  SEARCH_REPOS_RESPONSE,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_RESPONSE,
  SEARCH_CLEAR
} from '../constants';

export const reposRequest = () => ({type: SEARCH_REPOS_REQUEST, payload: {fetching: true}});
export const reposResponse = ({items}: any) => ({type: SEARCH_REPOS_RESPONSE, payload: {items}})

export const usersRequest = () => ({type: SEARCH_USERS_REQUEST, payload: {fetching: true}});
export const usersResponse = ({items}: any) => ({ type: SEARCH_USERS_RESPONSE, payload: {items} });

export const clearSearch = () => ({type: SEARCH_CLEAR, payload: {}});

const initHeaders: any = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Origin': ''
};

const API_URL = "https://api.github.com";

export const fetchRepos = (query: String) => async (dispatch: any) => {
  dispatch( reposRequest() );
  const response:any = await fetch(`${API_URL}/search/repositories?q=${query}`, {
    headers: initHeaders,
    method: 'GET'
  });
  const json:any = await response.json();

  dispatch( reposResponse(json) );
}

export const fetchUsers = (query: String) => async (dispatch: any) => {
  dispatch( reposRequest() );
  const response:any = await fetch(`${API_URL}/search/users?q=${query}`, {
    headers: initHeaders,
    method: 'GET'
  });
  const json:any = await response.json();
  dispatch( usersResponse(json) );
}