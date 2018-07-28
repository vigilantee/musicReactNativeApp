import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, EMPTY_STORE } from '../constants';

const initialState = {
    isLoggingIn: false,
    error: false,
    token: ''
}

export default loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                error: false,
                isLoggingIn: true
            }
        case LOGIN_SUCCESS:
            console.log('ye aaya token...', action.token)
            return{
                ...state,
                isLoggingIn: false,
                error: false,
                token: action.token
            }
        case LOGIN_ERROR:
            return{
                ...state,
                error: true,
                isLoggingIn: false,
            }
        case EMPTY_STORE:
            return initialState;
        default:
            return state;
    }
}