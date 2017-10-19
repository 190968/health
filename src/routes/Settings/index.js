import { injectReducer } from '../../store/reducers'

export default (store) =>(
{
    path : 'settings',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
                dependencies for bundling   */
            const SettingsLayout = require('./components/SettingsLayout').default
            //const reducer = require('./modules/planstore').default

            /*  Add the reducer to the store on key */
            //injectReducer(store, { key: 'settings', reducer })
            /*  Return getComponent   */
            cb(null, SettingsLayout)
            /* Webpack named bundle   */
        }, 'settings')
    }
})
