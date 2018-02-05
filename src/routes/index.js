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
            loader: () => import('../routes/Dash/containers/DashLayout'),
            modules: ['../routes/Dash/containers/DashLayout'],
            webpack: () => [require.resolveWeak('../routes/Dash/containers/DashLayout')],
        })
    );
}

/** Login **/
export const asyncLogin = (store) => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "loginChunk" */'../routes/User/containers/loginContainer'),
            modules: ['../routes/User/containers/loginContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/loginContainer')],
            reducers: {
                'url': 'User/modules/login',
                'key': 'user_login'
            }
        }, store)
    );
}

export const asyncRegister = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/registerContainer'),
            modules: ['../routes/User/containers/registerContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/registerContainer')],
            reducers: {
                'url': 'User/modules/register',
                'key': 'user_register'
            }
        }, store)
    );
}

export const asyncLogout = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/logoutContainer'),
            modules: ['../routes/User/containers/logoutContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/logoutContainer')],
            reducers: {
                'url': 'User/modules/logout',
                'key': 'user_logout'
            }
        }, store)
    );
}

export const asyncForgotPassword = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/forgotPasswordContainer'),
            modules: ['../routes/User/containers/forgotPasswordContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/forgotPasswordContainer')],
        })
    );
}


export const asyncSettings = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/components/Settings/components'),
            modules: ['../routes/User/components/Settings/components'],
            webpack: () => [require.resolveWeak('../routes/User/components/Settings/components')],
        })
    );
}

export const asyncPlanstore = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Planstore/components'),
            modules: ['../routes/Planstore/components'],
            webpack: () => [require.resolveWeak('../routes/Planstore/components')],
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
            modules: ['../routes/User/containers/verifyPhoneContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/verifyPhoneContainer')],
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
            modules: ['../routes/User/containers/verifyPhoneConfirmContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/verifyPhoneConfirmContainer')],
            reducers: {
                'url': 'User/modules/verifyPhone',
                'key': 'verifyPhone'
            }
        }, store)
    );
}

export const asyncMessages = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Messages/components'),
            modules: ['../routes/Messages/components'],
            webpack: () => [require.resolveWeak('../routes/Messages/components')],
        })
    );
}


export const asyncCommynity = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Community/components'),
            modules: ['../routes/Community/components'],
            webpack: () => [require.resolveWeak('../routes/Community/components')],
        })
    );
}
// export const asyncDiscussion = (store) => {
//     return (
//         Loadable({
//             loader: () => import('../routes/Discussion/containers'),
//             modules: ['../routes/CommunityDiscussions/containers'],
//         webpack: () => [require.resolveWeak('../routes/CommunityDiscussions/containers')],
// })
//     );
// }

export const asyncCalendar = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Calendar/components'),
            modules: ['../routes/Calendar/components'],
            webpack: () => [require.resolveWeak('../routes/Calendar/components')],
        })
    );
}


export const asyncPlan = (store) => {
    return (
        Loadable({
                loader: () => import('../routes/Plan/containers/PlanLayout'),
            modules: ['../routes/Plan/containers/PlanLayout'],
            webpack: () => [require.resolveWeak('../routes/Plan/containers/PlanLayout')],
                reducers: {
                    'url': 'Plan/modules/plan',
                    'key': 'plan'
                }
            }, store
        ))
}
