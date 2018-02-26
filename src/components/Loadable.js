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

            //console.log(opts);
            //console.log(store.getState('user'));
            //console.log(loaded);
            //console.log(props);
            //console.log(initProps);
            const newProps = {...props, ...initProps}
            //console.log(this.props);
            let Component = loaded.default;

            //console.log(opts);
            //console.log(loaded);

            if (opts.reducers) {
                //console.log(opts.reducers);
                var url = opts.reducers.url;
                var key = opts.reducers.key || 'fitango';
                //console.log(url);
                if (typeof url === 'string') {
                    url = [url];
                }
                //console.log(url);
                url.map(path => {
                    //console.log(path);
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
            console.log(opts);
            //console.log(store.getState('user'));
            //console.log(loaded);
            //console.log(props);
            //console.log(initProps);
            const newProps = {...props, ...initProps}
            //console.log(this.props);
            let Component = loaded.default;

            //console.log(opts);
            //console.log(loaded);

            if (opts.reducers) {
                //console.log(opts.reducers);
                var url = opts.reducers.url;
                var key = opts.reducers.key || 'fitango';
                //console.log(url);
                if (typeof url === 'string') {
                    url = [url];
                }
                //console.log(url);
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

export function LoadSimple (url) {
    const load = '../routes/Manager/containers/Workflow';//'../routes/'+url;
    return (

        MyLoadable({
            loader: () => import(load),
            modules: [load],
            webpack: () => [require.resolveWeak(load)],
        })
    )
}
