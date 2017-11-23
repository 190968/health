import React from "react";

/** loadable **/
import Loadable from '../components/Loadable';






/** Dash **/
export const asyncDash = (store) => {
    // if current user is admin
    //console.log(store.getState().network);
    if (1==1 || store.getState().network.curret_role == 'user') {// not working
        //console.log(1111);
        return (
            Loadable({
                loader: () => import('../routes/Dash/containers/DashLayout'),
                reducers: {
                    'url': 'Dash/modules/dash',
                    'key': 'dashboard'
                }
            }, store)
        );
    }
    return (
        Loadable({
            loader: () => import('../routes/Dash/containers/DashLayout')
        })
    );
}

/** Login **/
export const asyncLogin = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/loginContainer'),
            reducers: {
                'url': 'User/modules/login',
                'key': 'user_login'
            }
        }, store)
    );
}