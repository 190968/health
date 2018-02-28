//import React from "react";

/** loadable **/
import Loadable from '../components/Loadable';


/** Dash **/
export const asyncWorkflow = (store) => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Workflow'),
            modules: ['../routes/Manager/containers/Workflow'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Workflow')],
        })
        //LoadSimple('Manager/containers/Workflow')
    );
}

export const asyncActionplans = (store) => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Actionplans'),
            modules: ['../routes/Manager/containers/Actionplans'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Actionplans')],
        })
    );
}

export const asyncPlanbuilder = (store) => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Planbuilder'),
            modules: ['../routes/Manager/containers/Planbuilder'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Planbuilder')],
        })
    );
}