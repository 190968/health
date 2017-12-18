import { fromJS } from 'immutable';
//import { actionCreators as productsActionCreators } from 'redux/reducers/products';




const getFilters = () => dispatch =>
    dispatch({
        type: 'GET_FILTERS',
        url: '/regions/current/filters',
    });

export const setFilters = c => (dispatch) => {
    console.log("setFilters");
    dispatch({
        type: 'SET_FILTERS',
        c,
    });
};

const clearFilters = m => (dispatch) => {
    if(window && window.innerWidth > 1024) {
        window.scrollTo(0, 143);
    } else {
        window.scrollTo(0, 56);
    }
    dispatch({
        type: 'CLEAR_FILTERS',
        m,
    });
};

export const setSort = v => (dispatch) => {
    //console.log(1111);
    dispatch({
        type: 'SET_SORT',
        value: v,
    });

    //return dispatch(productsActionCreators.getProducts({ filters: true }));
};

const toggleFilterIsOpen = filterId => (dispatch, getState) => {
    const openFilterId = getState().catalogRoute.get('openFilterId');
    dispatch({
        type: 'TOGGLE_FILTER_IS_OPEN',
        filterId: openFilterId === filterId ? '' : filterId,
    });
};

export const actionCreators = {
    getFilters,
    setFilters,
    clearFilters,
    setSort,
    toggleFilterIsOpen,
};

const ACTION_HANDLERS = {
    GET_FILTERS_SUCCESS: (state, action) => {
        console.log(state,"--> modules/")
        const filters = {};
        Object.values(action.responseJSON.data).forEach((el) => {
            filters[el.id] = { id: el.id, name: el.name, items: {} };
            if(el.fields.length > 1) {
                filters[el.id].blocks = [];
                el.fields.forEach((field, i) => {
                    filters[el.id].blocks.push({ items: [] });
                    field.items.forEach((item) => {
                        filters[el.id].blocks[i].items.push(`${ item.value }` || item.code);
                        filters[el.id].items[`${ item.value }` || item.code] = item;
                    });
                });
            } else {
                console.log(el.fields[0],"555555555555555555555555555555555555")
                el.fields[0].items.forEach((item) => {
                    filters[el.id].items[`${ item.value }` || item.code] = item;
                });
            }
        });
        const nextState = state.set('filters', fromJS(filters));
        return nextState;
    },
    SET_FILTERS: (state, action) => {
        const nextState = state.set('activeFilters', fromJS(action.c));
        return nextState;
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
    },
    TOGGLE_FILTER_IS_OPEN: (state, action) => {
        const nextState = state.set('openFilterId', action.filterId);
        return nextState;
    },
    SET_SORT: (state, action) => {
        const nextState = state.set('avatarSize', action.value);
        return nextState;
    },
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
