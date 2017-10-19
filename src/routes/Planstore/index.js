import { injectReducer } from '../../store/reducers'

const PlanstorePlanRoute = require('./planstore_route').default

export default (store) =>(
{
  path : 'planstore',
  childRoutes : [
    PlanstorePlanRoute(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      const Planstore = require('./components/PlanstoreLayout').default
      //  console.log(Counter);
      const reducer = require('./modules/planstore').default

      /*  Add the reducer to the store on key */
      injectReducer(store, { key: 'planstore', reducer })
      /*  Return getComponent   */
      cb(null, Planstore)
    /* Webpack named bundle   */
    }, 'planstore')
  }
})
