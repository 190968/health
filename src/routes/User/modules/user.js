export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const LOGOUT_USER = 'LOGOUT_USER';

// ------------------------------------
// Actions
// ------------------------------------
export const setUserToken = ({token}) => {
    localStorage.setItem('token', token);
    return {
        type: SET_USER_TOKEN,
        token: token
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
        token: ''
    };
};

export const actions = {
    setUserToken,
    logoutUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_USER_TOKEN]    : (state, action) => {
        console.log(action);
        //console.log(payload);
        return {
            ...initialState,
            loading: true,
            token: action.token,
        };},
    [LOGOUT_USER] : (state, action) => {return {
        ...state,
        successMessage: action.message,
        loading: false,
        token: ''
    };},
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    token: localStorage.getItem('token')
};
export default function userReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
   // console.log(handler);
    //console.log(state);
    //action.payload = {};
    return handler ? handler(state, action) : state
}
