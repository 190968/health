import React from "react";

/** loadable **/
import Loadable from '../components/Loadable';






/** Dash **/
export const asyncDash = (store) => {
    // if current user is admin
    //console.log("123456789");
    //console.log(store.getState().network);
    /*if (1==1 && store.getState().network.curret_role == 'user') {// not working
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
    }*/
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

export const asyncForgotPassword= (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/forgotPasswordContainer')
        })
    );
}



export const asyncSettings= (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/components/Settings/components'),
        })
    );
}

export const asyncPlanstore = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Planstore/components'),
            reducers: {
                'url': 'Planstore/modules',
                'key': 'planstore'
            }
        }, store)
    );
}
export const asyncVerifyPhone = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/verifyPhoneContainer'),
            reducers: {
        'url': 'User/modules/verifyPhone',
            'key': 'verifyPhone'
    }
}, store)
    );
}
export const asyncVerifyPhoneConfirm = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/verifyPhoneConfirmContainer'),
            reducers: {
        'url': 'User/modules/verifyPhone',
            'key': 'verifyPhone'
    }
}, store)
    );
}

export const asyncCommynity = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Community/containers/myCategories')
})
    );
}

export const asyncCommynityID = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Categories/containers/Communities')
})
    );
}