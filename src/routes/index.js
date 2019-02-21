//import React from "react";

/** loadable **/
import Loadable from '../components/Loadable';


/** Dash **/
export const asyncDash = (props) => {
    // if current user is admin

    /*if (1==1 && store.getState().network.curret_role == 'user') {// not working

        return (
            Loadable({
                loader: () => import('../routes/Dash/components/DashLayout'),
                reducers: {
                    'url': 'Dash/modules/dash',
                    'key': 'dashboard'
                }
            })
        );
    }*/
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "dashChunk" */'../routes/Dash/containers/DashLayout'),
            modules: ['../routes/Dash/containers/DashLayout'],
            webpack: () => [require.resolveWeak('../routes/Dash/containers/DashLayout')],
        }, props)
    );
}

/** Login **/
export const asyncLogin = (props) => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "loginChunk" */'../routes/User/containers/loginContainer'),
            modules: ['../routes/User/containers/loginContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/loginContainer')],
            reducers: {
                'url': 'User/modules/login',
                'key': 'user_login'
            }
        }, props)
    );
}

export const asyncRegister = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "registerChunk" */'../routes/User/containers/registerContainer'),
            modules: ['../routes/User/containers/registerContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/registerContainer')],
            reducers: {
                'url': 'User/modules/register',
                'key': 'user_register'
            }
        })
    );
}

export const asyncLogout = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "logoutChunk" */'../routes/User/containers/logoutContainer'),
            modules: ['../routes/User/containers/logoutContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/logoutContainer')],
            reducers: {
                'url': 'User/modules/logout',
                'key': 'user_logout'
            }
        })
    );
}

export const asyncForgotPassword = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "forgotPasswordChunk" */'../routes/User/containers/forgotPasswordContainer'),
            modules: ['../routes/User/containers/forgotPasswordContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/forgotPasswordContainer')],
        })
    );
}
export const asyncRepository = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "categorySelectChunk" */'../components/Autosuggest/containers/CategorySelect'),
            modules: ['../components/Autosuggest/containers/CategorySelect'],
            webpack: () => [require.resolveWeak('../components/Autosuggest/containers/CategorySelect')],
        })
    );
}


export const asyncSettings = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "settingsChunk" */'../routes/User/components/Settings/components'),
            modules: ['../routes/User/components/Settings/components'],
            webpack: () => [require.resolveWeak('../routes/User/components/Settings/components')],
        })
    );
}

export const asyncPlanstore = (store) => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "planstoreChunk" */'../routes/Planstore/components'),
            modules: ['../routes/Planstore/components'],
            webpack: () => [require.resolveWeak('../routes/Planstore/components')],
            reducers: {
                'url': 'Planstore/modules',
                'key': 'planstore'
            }
        })
    );
}
export const asyncVerifyPhone = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "phoneVerifyChunk" */'../routes/User/containers/verifyPhoneContainer'),
            modules: ['../routes/User/containers/verifyPhoneContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/verifyPhoneContainer')],
            reducers: {
                'url': 'User/modules/verifyPhone',
                'key': 'verifyPhone'
            }
        })
    );
}
export const asyncVerifyPhoneConfirm = (store) => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "phoneVerifyFonfirmChunk" */'../routes/User/containers/verifyPhoneConfirmContainer'),
            modules: ['../routes/User/containers/verifyPhoneConfirmContainer'],
            webpack: () => [require.resolveWeak('../routes/User/containers/verifyPhoneConfirmContainer')],
            reducers: {
                'url': 'User/modules/verifyPhone',
                'key': 'verifyPhone'
            }
        })
    );
}

export const asyncMessages = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "messagesChunk" */'../routes/Messages'),
            modules: ['../routes/Messages'],
            webpack: () => [require.resolveWeak('../routes/Messages')],
        })
    );
}

export const asyncHealth = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "healthChunk" */'../routes/Health/components'),
            modules: ['../routes/Health/components'],
            webpack: () => [require.resolveWeak('../routes/Health/components')],
        })
    );
}

export const asyncHelp = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "helpChunk" */'../routes/Help/containers'),
            modules: ['../routes/Help/containers'],
            webpack: () => [require.resolveWeak('../routes/Help/containers')],
        })
    );
}





export const asyncCommynity = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "communityChunk" */'../routes/Community/components'),
            modules: ['../routes/Community/components'],
            webpack: () => [require.resolveWeak('../routes/Community/components')],
        })
    );
}

export const asyncMotivation = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "motivationChunk" */'../routes/User/containers/motivationContainer.js'),
            modules: ['../routes/User/containers/motivationContainer.js'],
        webpack: () => [require.resolveWeak('../routes/User/containers/motivationContainer.js')],
})
    );
}

export const asyncProfile = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "profileChunk" */'../routes/User/containers/profileContainer.js'),
            modules: ['../routes/User/containers/profileContainer.js'],
        webpack: () => [require.resolveWeak('../routes/User/containers/profileContainer.js')],
})
    );
}
// export const asyncDiscussion = (store) => {
//     return (
//         Loadable({
//             loader: () => import('../routes/Discussion/containers'),
//             modules: ['../routes/Discussion/containers'],
//         webpack: () => [require.resolveWeak('../routes/Discussion/containers')],
// })
//     );
// }

export const asyncCalendar = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "calendarChunk" */'../routes/Calendar/containers/Calendar'),
            modules: ['../routes/Calendar/containers/Calendar'],
            webpack: () => [require.resolveWeak('../routes/Calendar/containers/Calendar')],
        })
    );
}


export const asyncPlan = (store) => {
    return (
        Loadable({
                loader: () => import(/* webpackChunkName: "planChunk" */'../routes/Plan/containers/PlanLayout'),
            modules: ['../routes/PlansList/containers/PlanLayout'],
            webpack: () => [require.resolveWeak('../routes/Plan/containers/PlanLayout')],
                reducers: {
                    'url': 'PlansList/modules/plan',
                    'key': 'plan'
                }
            }
        ))
}

export const asyncStatic = (store) => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "staticPagesChunk" */'../routes/StaticPages'),
            modules: ['../routes/StaticPages'],
            webpack: () => [require.resolveWeak('../routes/StaticPages')],
        })
    );
}


