import React from "react";

/** loadable **/
import Loadable from '../components/Loadable';






/** Dash **/
export const asyncDash = (store) => {
    // if current user is admin
    //console.log("123456789");
    //console.log(store.getState().network);
    if (1==1 && store.getState().network.curret_role == 'user') {// not working
        //console.log(1111);
        return (
            Loadable({
                loader: () => import('../routes/Dash/components/DashLayout'),
                reducers: {
                    'url': 'Dash/modules/dash',
                    'key': 'dashboard'
                }
            }, store)
        );
    }
    return (
        Loadable({
            loader: () => import('../routes/Dash/components/DashLayout')
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

export const asyncRegister= (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/registerContainer'),
            reducers: {
                'url': 'User/modules/register',
                'key': 'user_register'
            }
        }, store)
    );
}

export const asyncLogout= (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/logoutContainer'),
            reducers: {
                'url': 'User/modules/logout',
                'key': 'user_logout'
            }
        }, store)
    );
}

export const asyncSettings= (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Setting/containers/settingContainer'),
            /*reducers: {
                'url': 'Setting/modules/setting',
                'key': 'settings'
            }*/
        })
    );
}
export const asyncForgot= (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Forgot/containers/index'),
    /*reducers: {
     'url': 'Setting/modules/setting',
     'key': 'settings'
     }*/
})
    );
}