import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    MUSIC_API_BASE,
    MUSIC_SIGNIN
} from '../constants';

loginStarted = () => {
    console.log('start ho gya....login....');
    return {
        type: LOGIN
    }
}

loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        token: token
    }
}

loginFailure = () => {
    return {
        type: LOGIN_ERROR
    }
}


export default login = () => {
    apiUrl = `${MUSIC_API_BASE}${MUSIC_SIGNIN}`
    var details = {
        'username': 'navneet@nativebyte.in',
        'password': '123456'
    };
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(formBody)
    return (dispatch) => {
        dispatch(loginStarted())
        fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then((response) => {
                console.log('response is .....', response);
                if (response.status == 200) {
                    return response.json()
                } else return []
            })
            .then((responseJson) => {
                dispatch(loginSuccess(responseJson.data))
            })
            .catch((error) => {
                dispatch(loginFailure())
            });
    }
}