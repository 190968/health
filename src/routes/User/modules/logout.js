/**
 * Created by Pavel on 04.12.2017.
 */

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export const logoutUserRequest = ({ email }) => ({
    type: LOGOUT_USER_REQUEST,
    email,
});

export const logoutUserSuccess = ({}) => ({
    type: LOGOUT_USER_SUCCESS,
    message: 'User logged in successfully!',
});

export const logoutUserError = ({ error }) => ({
    type: LOGOUT_USER_ERROR,
    message: error.message,
});

//const initialState={token: };


export const actions = {
   logoutUserRequest,
    logoutUserSuccess,
    logoutUserError
}
//console.log(1111);
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOGOUT_USER_REQUEST]    : (state, { type, ...payload }) => {
        //console.log(payload);
        return {
            ...initialState,
            loading: true,
            email: payload.email,
        };},
    [LOGOUT_USER_SUCCESS] : (state, { type, ...payload }) => {return {
        ...state,
        successMessage: payload.message,
        loading: false,
    };},
    [LOGOUT_USER_ERROR] : (state, { type, ...payload }) => {return {
        ...state,
        loading: false,
        errorMessage: payload.message,
    };}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    token: localStorage.getItem('token'),
    loading: false,
    username: null,
    errorMessage: null,
    alertMessage: null,
};
export default function logoutReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    //console.log(action);
    //action.payload = {};
    return handler ? handler(state, action) : state
}
