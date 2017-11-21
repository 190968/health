import React from "react";

/** loadable **/
import Loadable from '../components/Loadable';

/** Planstore **/
export const asyncPlantore = (store) => {
    return  (
        Loadable({
            loader: () => import('../routes/Planstore/components/PlanstoreLayout'),
            reducers: {
                'url': 'Planstore/modules/planstore',
                'key': 'planstore'
            }
        }, store)
    );
}

/** PlanstorePlan **/
export const asyncPlantorePlan = () => {
        return (
            Loadable(     {
                loader: () => import('../routes/Planstore/containers/PlanstorePlanLayout')
            })
        );
    }

/** Plan **/
export const asyncPlan = (store) => {
    return (
        Loadable(     {
            loader: () => import('../routes/Plan/containers/PlanLayout'),
            reducers: {
                'url': 'Plan/modules/plan',
                'key': 'plan'
            }
        }, store)
    );
}

/** Planbuilder **/
export const asyncPlanbuilder = (store, is_component) => {
    return (
        Loadable(     {
            loader: () => is_component ? import('../routes/Planbuilder/components/PlanbuilderLayout') : import('../routes/Planbuilder/containers/PlanbuilderLayout'),
            reducers: {
                'url': 'Planbuilder/modules/planbuilder',
                'key': 'planbuilder'
            }
        }, store)
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
/** Logout **/
export const asyncLogout = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/logoutContainer'),
            reducers: {
                'url': 'User/modules/user',
                'key': 'user'
            }
        }, store)
    );
}
/** Settings **/
export const asyncSettings = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/Settings/components/SettingsLayout')

        })
    );
}
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