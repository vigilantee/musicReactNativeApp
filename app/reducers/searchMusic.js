import { GET_SEARCH_RESULT_MUSIC, GET_SEARCH_RESULT_SUCCESS_MUSIC_RESOLVE, GET_SEARCH_RESULT_SUCCESS_MUSIC, GET_SEARCH_RESULT_ERROR_MUSIC, EMPTY_STORE } from '../constants';

const initialState = {
    isFetching: false,
    error: false,
    allSearchResults: [],
    query: 'raat+di+gedi',
    urlList: [],
    labelList: [],
    titleList: [],
    idList: []
}

export default searchMusicReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_RESULT_MUSIC:
            return{
                ...state,
                isFetching: true,
                error: false,
                urlList: [],
                labelList: [],
                titleList: [],
                idList: []
            }
        case GET_SEARCH_RESULT_SUCCESS_MUSIC:
            console.log('ye reducer hai .....data aa gyaa bhai.....', action.data);
            const labelListImg = [];
            const titleList = [];
            const listID = [];
            action.data.map((obj)=>{
                if(obj.label!=null && obj.filename!=null)
                {
                    labelListImg.push(obj.label);
                    titleList.push(obj.filename);
                }
                else if(obj.filename!=null)
                {
                    labelListImg.push('default');
                    titleList.push(obj.filename);
                }
                else
                {
                    titleList.push('No title Available')
                }
                listID.push(obj._id);
            })
            return{
                ...state,
                isFetching: false,
                error: false,
                allSearchResults: action.data,
                query: action.query,
                labelList: labelListImg,
                titleList: titleList,
                idList: listID
            }
        case GET_SEARCH_RESULT_ERROR_MUSIC:
            return{
                ...state,
                error: true,
                isFetching: false,
            }
        case GET_SEARCH_RESULT_SUCCESS_MUSIC_RESOLVE:
            console.log('data is ->>>>>>>>>>>>>>........', action.data);
            let appendedResults = state.urlList;
            let songUrlList = [];
            if(state.urlList.length > 0)
                Array.prototype.push.apply(appendedResults, action.data);
            else
                appendedResults = action.data;
            appendedResults.map((url)=>songUrlList.push(url))
        case EMPTY_STORE:
            return initialState;
        default:
            return state;
    }
}