
export const LOAD_NETWORK_DETAILS = 'LOAD_NETWORK_DETAILS';

// ------------------------------------
// Actions
// ------------------------------------
export const loadNetwork = (network) => {
    return {
        type: LOAD_NETWORK_DETAILS,
        network
    }
};


export const actions = {
    loadNetwork,
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
            modules:network.modules,
        };
    },

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    loading: false,
    info: {id:null},
    id: null,
    name: null,
    roles: null,
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
