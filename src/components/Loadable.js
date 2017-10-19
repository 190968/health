import React from "react";
import L from 'react-loadable';
import { injectReducer } from '../store/reducers'


import LoadingPage from './LoadingPage';

const Loadable = (opts, store, reducer) => L({
    loading:  LoadingPage,
    render(loaded, props) {
        //console.log(store.getState('user'));
        //console.log(props);
        //console.log(this.props);
        let Component = loaded.default;

        if (store) {
            // add reducers
            const reducer = require('../routes/Planstore/modules/planstore').default
            /*  Add the reducer to the store on key */
            injectReducer(store, {key: 'planstore', reducer})
        }

        if (opts.reducers) {
            //console.log(opts.reducers);
            var url = opts.reducers.url;
            var key = opts.reducers.key || 'fitango';
            //const reducer = require('./modules/login').default
            const reducer = require('../routes/'+url).default
            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: key, reducer })
        }


        return <Component {...props}/>;
    },
    delay: 300,
        ...opts,
});




export default Loadable;//connect(mapStateToProps, mapDispatchToProps)(Loadable);