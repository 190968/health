import { fromJS } from 'immutable';




export const LOAD_PLAN_DETAILS = 'LOAD_PLAN_DETAILS';
export const SET_PB_STEP = 'SET_PB_STEP';

// ------------------------------------
// Actions
// ------------------------------------
export const updatePlan = (plan) => {
    return {
        type: LOAD_PLAN_DETAILS,
        plan
    }
};
export const setStep = (step) => {
    return {
        type: SET_PB_STEP,
        step
    }
};



export const actions = {
    updatePlan,
    setStep
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOAD_PLAN_DETAILS]    : (state, {plan}) => {
        const nextState = state.set('plan', plan);
        return nextState;
    },
    [SET_PB_STEP]    : (state, {step}) => {
        const nextState = state.set('step', step);
        return nextState;
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
    plan: {},
    step:1
});

export default (state = fromJS(initialState), action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};