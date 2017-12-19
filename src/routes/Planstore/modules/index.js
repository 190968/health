import { fromJS } from 'immutable';


const getFilters = () => dispatch =>
    dispatch({
        type: 'GET_FILTERS',
        url: '/regions/current/filters',
    });

export const SET_FILTERS = 'SET_FILTERS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';


export const setFilters = (filters) => {
    return {
        type: SET_FILTERS,
        filters
    }
};

export const clearFilters = (filters) => {
    return {
        type: CLEAR_FILTERS,
        filters
    }
};

export const actions = {
    setFilters,
    clearFilters,
};

const ACTION_HANDLERS = {
    SET_FILTERS: (state, {filters}) => {
        //onsole.log(filters);
        return state.updateIn(['activeFilters'], function (value) {
            return value.merge(filters);
        });
    },
    CLEAR_FILTERS: (state) => {
        let nextState = state.set('activeFilters', fromJS({}));
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
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};

