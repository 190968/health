// We only need to import the modules necessary for initial render
//import CoreLayout from '../layouts/PageLayout/PageLayout'
import CoreLayout from '../layouts'
import Home from './Home'
import CounterRoute from './Counter'
import UserRoute from './User'
import PlanstoreRoute from './Planstore'
import NotFound from './NotFound';

const PlanstorePlanRoute = require('./Planstore/planstore_route').default
const SettingsRoute = require('./Settings').default;

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [

    CounterRoute(store),
    UserRoute(store),
    PlanstoreRoute(store),
    PlanstorePlanRoute(store),
    SettingsRoute(store),



    NotFound(store),

  ],
  /*onEnter: () => {
    store.dispatch(fetchMenu()) // and network and user info
  },*/
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
