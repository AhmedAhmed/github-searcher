import { 
  GISTS_REQUEST,
  GISTS_RESPONSE,
  SEARCH_CLEAR
} from '../constants';

export const gistsRequest = () => ({type: GISTS_REQUEST, payload: {fetching: true}});
export const gistsResponse = (data: any) => ({type: GISTS_RESPONSE, payload: {data}});

export const clearSearch = () => ({type: SEARCH_CLEAR, payload: {}});

const initHeaders: any = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Origin': ''
};

const API_URL = "https://api.github.com";

export const fetchGists = (query: String) => async (dispatch: any) => {
  dispatch(gistsRequest());
  const response:any = await fetch(`${API_URL}/users/${query}/gists?page=1&per_page=10`, {
    headers: initHeaders,
    method: 'GET'
  });
  const json:any = await response.json();
  console.log(json);
  dispatch(gistsResponse(json));
}
