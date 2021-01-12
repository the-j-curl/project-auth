import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    login: {
        accessToken: null,
        userId: 0,
    }
};

export const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setAccessToken: (state, action) => {
            const { accessToken } = action.payload
            console.log('This is the payload:', action.payload)
            console.log(`This is the accessToken: ${accessToken}`)
            state.login.accessToken = accessToken
        },
        setUserId: (state, action) => {
            const { userId } = action.payload
            console.log(`This is the payload: ${action.payload}`)
            console.log(`This is the userId: ${userId}`)
            state.login.userId = userId
        }
    }
})

export const login = (name, password) => {
    const LOGIN_URL = 'http://localhost:8080/sessions';
    return (dispatch) => {
        fetch(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json'},
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            } throw 'An error occured, check your credentials'
        })
        .then(json => {
            dispatch(
                user.actions.setAccessToken({
                    accessToken: json.accessToken,
                })
            );
            dispatch(user.actions.setUserId({ userId: json.userId}));
        })
        .catch(err => {
            console.log(err)
        })
    }
}