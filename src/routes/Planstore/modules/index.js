import { fromJS } from 'immutable';


const getFilters = () => dispatch =>
    dispatch({
        type: 'GET_FILTERS',
        url: '/regions/current/filters',
    });

export const SET_FILTERS = 'SET_FILTERS';


export const setFilters = (filters) => {
    return {
        type: SET_FILTERS,
        filters
    }
};



const clearFilters = m => (dispatch) => {
    if(window && window.innerWidth > 1024) {
        window.scrollTo(0, 143);
    } else {
        window.scrollTo(0, 56);
    }
   return {
        type: 'CLEAR_FILTERS',
        m,
    };
};


export const actions = {
    setFilters,
    clearFilters,
};

const ACTION_HANDLERS = {
    SET_FILTERS: (state, {filters}) => {
        return state.updateIn(['activeFilters'], function (value) {
            return value.merge(filters);
        });
    },
    CLEAR_FILTERS: (state, action) => {
        let nextState;
        if(action.m) {
            const activeFilters = state.get('activeFilters').toJS();
            delete activeFilters[action.m.id][action.m.value];
            nextState = state.set('activeFilters', fromJS(activeFilters));
        } else {
            nextState = state.set('activeFilters', fromJS({}));
        }
        return nextState;
    }
};

const initialState = fromJS({
    filters: {},
    plans: {},
    activeFilters: {},
    openFilterId: '',
    sort: 'popular',
    avatarSize:1,
    page:1
});

export default (state = fromJS(initialState), action) => {
   // console.log(action," action")
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};

