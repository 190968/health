import { combineReducers } from 'redux'
import locationReducer from './location'
import userReducer from 'routes/User/modules/user';
import networkReducer from 'routes/Network/modules/network';
//import planstoreReducer from '../routes/Planstore/modules/planstore';
//import apolloClient from '../apolloClient';



export const makeRootReducer = (asyncReducers) => {
    // console.log(1);
    var reducers = combineReducers({
        location: locationReducer,
        user: userReducer,
        network: networkReducer,
        //planstore: planstoreReducer,
        ...asyncReducers
    })
    return reducers
}

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

    store.asyncReducers[key] = reducer

    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
