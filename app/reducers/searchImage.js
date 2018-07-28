import { GET_SEARCH_RESULT, GET_SEARCH_RESULT_SUCCESS, GET_SEARCH_RESULT_ERROR, EMPTY_STORE } from '../constants';

const initialState = {
    isFetching: false,
    error: false,
    searchResults: [],
    currentPage: 1,
    allSearchResults: [],
    urlList: [],
    query: 'coffee'
}

export default searchImageReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_RESULT:
            return{
                ...state,
                isFetching: true,
                error: false,
                searchResults: [],
                urlList: []
            }
        case GET_SEARCH_RESULT_SUCCESS:
            let appendedResults = state.allSearchResults;
            let imageUrlList = [];
            if(state.allSearchResults.length > 0 && action.query == state.query)
                Array.prototype.push.apply(appendedResults, action.data);
            else
                appendedResults = action.data;
            appendedResults.map((obj)=>{
                imageUrlList.push(obj.assets.preview.url)
            })
            return{
                ...state,
                isFetching: false,
                error: false,
                allSearchResults: appendedResults,
                searchResults: [],
                currentPage: action.data.nextPage,
                urlList: imageUrlList,
                query: action.query
            }
        case GET_SEARCH_RESULT_ERROR:
            return{
                ...state,
                error: true,
                isFetching: false,
            }
        case EMPTY_STORE:
            return initialState;
        default:
            return state;
    }
}