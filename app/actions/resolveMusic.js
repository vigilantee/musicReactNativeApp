import { MUSIC_AUTH_TOKEN, MUSIC_API_BASE, MUSIC_RESOLVE, MUSIC_RESOLVE_SUFFIX } from '../constants';

getSearchResultsDataValue = (data) => {
  return{
    type: GET_SEARCH_RESULT_SUCCESS_MUSIC_RESOLVE,
    data: data
  }
}

export default resolveMusic = (id='5a92249624a0f505728b98bb') => {
    apiUrl = `${MUSIC_API_BASE}${MUSIC_RESOLVE}${id}${MUSIC_RESOLVE_SUFFIX}`
    user_token = MUSIC_AUTH_TOKEN
  return(dispatch) => {
    fetch(apiUrl, { 
      method: 'GET', 
      headers: {
          'Authorization': MUSIC_AUTH_TOKEN
        }, 
      }).then((response) =>{ if(response.status==200){return response.json()}else return []})
      .then((responseJson) => {
        console.log('search result is ++++++++++++++++.....', responseJson.data)
        dispatch(getSearchResultsDataValue(responseJson.data, query))
      });
  }
}