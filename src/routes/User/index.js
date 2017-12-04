import { injectReducer } from '../../store/reducers'
import { combineReducers } from 'redux'


export default (store) => ({
  path : 'login',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    console.log(store.user);
      console.log(nextState);
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Login = require('./containers/loginContainer').default
      const reducer = require('./modules/login').default

       /* const CombReducers = combineReducers({
            login: reducer,
            user: reducer_user
        })*/
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'login', reducer })
       // console.log(store);


       // const Login1 = require('./containers/userContainer').default
      //const user_reducer = require('./modules/user').default
      //injectReducer(store, { key: 'user', reducer:user_reducer })
      //console.log(store);
      /*  Return getComponent   */
      cb(null, Login)

    /* Webpack named bundle   */
    }, 'login')
  }
},
    {
        path : 'logout',
        /*  Async getComponent is only invoked when route matches   */
        getComponent (nextState, cb) {
            //console.log(store.user);
            // console.log(nextState);
            /*  Webpack - use 'require.ensure' to create a split point
                and embed an async module loader (jsonp) when bundling   */
            require.ensure([], (require) => {
                /*  Webpack - use require callback to define
                    dependencies for bundling   */
                const Login = require('./containers/logoutContainer').default
                // const Login1 = require('./containers/userContainer').default
                const user_reducer = require('./modules/user').default
                injectReducer(store, { key: 'user', reducer:user_reducer })
                //console.log(store);
                /*  Return getComponent   */
                cb(null, Login)

                /* Webpack named bundle   */
            }, 'login')
        }
    },
    {
        path : 'register',
        /*  Async getComponent is only invoked when route matches   */
        getComponent (nextState, cb) {
            //console.log(store.user);
            console.log(nextState);
            /*  Webpack - use 'require.ensure' to create a split point
             and embed an async module loader (jsonp) when bundling   */
            require.ensure([], (require) => {
                /*  Webpack - use require callback to define
                 dependencies for bundling   */
                const Login = require('./containers/loginContainer').default
                const reducer = require('./modules/login').default

                /* const CombReducers = combineReducers({
                 login: reducer,
                 user: reducer_user
                 })*/
                /*  Add the reducer to the store on key 'counter'  */
                injectReducer(store, { key: 'register', reducer })
                // console.log(store);


                // const Login1 = require('./containers/userContainer').default
                //const user_reducer = require('./modules/user').default
                //injectReducer(store, { key: 'user', reducer:user_reducer })
                //console.log(store);
                /*  Return getComponent   */
                cb(null, Login)
                /* Webpack named bundle   */
            }, 'login')
        }
    }
)
