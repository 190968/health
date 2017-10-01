import { injectReducer } from '../../store/reducers'


export default (store) =>(
  {
    path : 'planstore/plan/:pid',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
      // console.log(111111);
      /*  Webpack - use 'require.ensure' to create a split point
          and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
            dependencies for bundling   */

        const PlanstorePlan = require('./containers/PlanstorePlanLayout').default
          //console.log(PlanstorePlan);
        //const reducer = require('./modules/planstore').default

        /*  Add the reducer to the store on key */
        //injectReducer(store, { key: 'planstore_plan', reducer })
        /*  Return getComponent   */
        cb(null, PlanstorePlan)
        /* Webpack named bundle   */
      }, 'planstore')
    }
  })
