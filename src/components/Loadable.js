import React from "react";
import Loadable from 'react-loadable';
import { injectReducer } from '../store/reducers'


import LoadingPage from './LoadingPage';

export default function MyLoadable (opts, store, initProps) {
    return Loadable(Object.assign({
        loading: LoadingPage,
        render(loaded, props) {

            //let Component = loaded.default;
            //return <Component {...props}/>;


            const newProps = {...props, ...initProps}

            let Component = loaded.default;



            if (opts.reducers) {

                var url = opts.reducers.url;
                var key = opts.reducers.key || 'fitango';

                if (typeof url === 'string') {
                    url = [url];
                }

                url.map(path => {

                    //const reducer = require('./modules/login').default
                    //const reducer = require('../routes/'+path).default;
                   // injectReducer(store, { key: key, reducer })
                });

            }


            return <Component {...newProps}/>;
        },
        delay: 300,
        //timeout: 10,
    }, opts));
    /*return Loadable({
        loading:  LoadingPage,
        modules: ['../routes/User/containers/loginContainer'],
        webpack: () => [require.resolveWeak('../routes/User/containers/loginContainer')],
        render(loaded, props) {

            const newProps = {...props, ...initProps}


            if (opts.reducers) {

                var url = opts.reducers.url;
                var key = opts.reducers.key || 'fitango';

                if (typeof url === 'string') {
                    url = [url];
                }

                url.map(path => {
                    //const reducer = require('./modules/login').default
                    const reducer = require('../routes/'+path).default
                    injectReducer(store, { key: key, reducer })
                })

            }


            return <Component {...newProps}/>;
        },
        delay: 300,
        ...opts,
    });*/
}
