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


export const asyncProfile = (store) => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Profile'),
            modules: ['../routes/Manager/containers/Profile'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Profile')],
        })
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

export const asyncPathways = (store) => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Pathways'),
            modules: ['../routes/Manager/containers/Pathways'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Pathways')],
        })
    );
}

export const asyncStages = (store) => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Stages'),
            modules: ['../routes/Manager/containers/Stages'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Stages')],
        })
    );
}





export const asyncPatients = (store) => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Patients'),
            modules: ['../routes/Manager/containers/Patients'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Patients')],
        })
    );
}


export const asyncCancers = () => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Cancers'),
            modules: ['../routes/Manager/containers/Cancers'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Cancers')],
        })
    );
}


export const asyncChemotherapies = () => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Chemotherapies'),
            modules: ['../routes/Manager/containers/Chemotherapies'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Chemotherapies')],
        })
    );
}

export const asyncTumorboards = () => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/components/Tumorboard/containers/TumorboardsList'),
            modules: ['../routes/Manager/components/Tumorboard/containers/TumorboardsList'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Tumorboard/containers/TumorboardsList')],
        })
    );
}




