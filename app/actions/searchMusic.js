import { GET_SEARCH_RESULT_MUSIC, GET_SEARCH_RESULT_SUCCESS_MUSIC,GET_SEARCH_RESULT_ERROR_MUSIC, MUSIC_AUTH_TOKEN, MUSIC_API_BASE, MUSIC_SEARCH } from '../constants';
// import resolveMusic from './resolveMusic';
getSearchResultsData = () => {
  return{
    type: GET_SEARCH_RESULT_MUSIC
  }
}

getSearchResultsDataValue = (data, query) => {
  return{
    type: GET_SEARCH_RESULT_SUCCESS_MUSIC,
    data: data,
    query: query
  }
}

getSearchResultsDataFailure = () => {
  return{
    type: GET_SEARCH_RESULT_ERROR_MUSIC
  }
}


export default getSearchResultsFromAPI = (query="raat di gedi") => {
    const replaced = query.split(' ').join('+');
    apiUrl = `${MUSIC_API_BASE}${MUSIC_SEARCH}${replaced}`
    user_token = MUSIC_AUTH_TOKEN
  return(dispatch) => {
    dispatch(getSearchResultsData())
    fetch(apiUrl, { 
      method: 'GET', 
      headers: {
          'Authorization': MUSIC_AUTH_TOKEN,
          'Content-Type': 'application/json'
        }, 
      }).then((response) =>{ if(response.status==200){return response.json()}else return []})
      .then((responseJson) => {
        console.log('search result is ***---***---*----', responseJson.data)
        dispatch(getSearchResultsDataValue(responseJson.data, query))
        responseJson.data.map((obj) => {
          // resolveMusic(obj._id)
          console.log('>>>>>>>>>>>>>>>>>', obj._id)
        })
      })
      .catch((error) => {
        dispatch(getSearchResultsDataFailure())
      });
  }
}