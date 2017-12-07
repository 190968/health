
export const LOAD_NETWORK_DETAILS = 'LOAD_NETWORK_DETAILS';
export const SET_CURRENT_ROLE = 'SET_CURRENT_ROLE';

// ------------------------------------
// Actions
// ------------------------------------
export const loadNetwork = (network) => {
    return {
        type: LOAD_NETWORK_DETAILS,
        network
    }
};

export const setCurrentRole = (role) => {
    return {
        type: SET_CURRENT_ROLE,
        role
    }
};



export const actions = {
    loadNetwork,
    setCurrentRole
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOAD_NETWORK_DETAILS]    : (state, {network}) => {
        // load network with apollo
        //console.log(payload);
        return {
        ...initialState,
            id:network.id,
            name:network.name,
            logo:network.logo,
            modules:network.modules,
            loading:false,
        };
    },
    [SET_CURRENT_ROLE]    : (state, {role}) => {
        // load network with apollo
        //console.log(payload);
        return {
            ...state,
            current_role:role,
        };
    },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    loading: true,
    info: {id:null},
    id: null,
    name: null,
    logo: null,
    roles: null,
    current_role: null,
    modules: null,
    errorMessage: null,
    alertMessage: null,
};
export default function networkReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    //action.payload = {};
    //console.log('action',action);
    return handler ? handler(state, action) : state
}
