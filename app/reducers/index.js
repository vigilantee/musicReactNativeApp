import { combineReducers } from "redux";
import searchImage from './searchImage';
import login from './login';
import searchMusic from './searchMusic';

const reducers = combineReducers({
    searchImage: searchImage,
    login: login,
    searchMusic: searchMusic
})

export default rootReducer = ( state, action ) => {
    return reducers(state, action);
}