//import React from "react";

/** loadable **/
import Loadable from '../components/Loadable';


/** Dash **/
export const asyncWorkflow = (store) => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "workflowChunk" */'../routes/Manager/containers/Workflow'),
            modules: ['../routes/Manager/containers/Workflow'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Workflow')],
        })
        //LoadSimple('Manager/containers/Workflow')
    );
}


export const asyncProfile = (store) => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "profileChunk" */'../routes/Manager/containers/Profile'),
            modules: ['../routes/Manager/containers/Profile'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Profile')],
        })
    );
}

export const asyncActionplans = (store) => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "actionplansChunk" */'../routes/Manager/containers/Actionplans'),
            modules: ['../routes/Manager/containers/Actionplans'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Actionplans')],
        })
    );
}

export const asyncPlanbuilder = (store) => {

    // return (
    //     Loadable({
    //         loader: () => import('../routes/Manager/containers/Planbuilder'),
    //         modules: ['../routes/Manager/containers/Planbuilder'],
    //         webpack: () => [require.resolveWeak('../routes/Manager/containers/Planbuilder')],
    //     })
    // );
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "planbuilderChunk" */'../routes/Manager/components/Planbuilder/layout'),
            modules: ['../routes/Manager/components/Planbuilder/layout'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Planbuilder/layout')],
        })
    );
}


export const asyncConference = (store) => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "conferenceChunk" */'../routes/Conference/containers/View'),
            modules: ['../routesConference/containers/View'],
            webpack: () => [require.resolveWeak('../routes/Conference/containers/View')],
        })
    );
}

export const asyncPathways = (store) => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "pathwaysChunk" */'../routes/Manager/containers/Pathways'),
            modules: ['../routes/Manager/containers/Pathways'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Pathways')],
        })
    );
}

export const asyncStages = (store) => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "stagesChunk" */'../routes/Manager/containers/Stages'),
            modules: ['../routes/Manager/containers/Stages'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Stages')],
        })
    );
}





export const asyncPatients = (store) => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "patientsChunk" */'../routes/Manager/containers/Patients'),
            modules: ['../routes/Manager/containers/Patients'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Patients')],
        })
    );
}


export const asyncCancers = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "cancersChunk" */'../routes/Manager/containers/Cancers'),
            modules: ['../routes/Manager/containers/Cancers'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Cancers')],
        })
    );
}


export const asyncChemotherapies = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "chemotherapyChunk" */'../routes/Manager/containers/Chemotherapies'),
            modules: ['../routes/Manager/containers/Chemotherapies'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Chemotherapies')],
        })
    );
}

export const asyncTumorboards = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "tumorboardsChunk" */'../routes/Manager/components/Tumorboard/containers/TumorboardsList'),
            modules: ['../routes/Manager/components/Tumorboard/containers/TumorboardsList'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Tumorboard/containers/TumorboardsList')],
        })
    );
}

export const asyncClinicalTrials = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "clinicaltrialsChunk" */'../routes/Manager/components/ClinicalTrials/containers/ClinicalTrialsList'),
            modules: ['../routes/Manager/components/ClinicalTrials/containers/ClinicalTrialsList'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/ClinicalTrials/containers/ClinicalTrialsList')],
        })
    );
}

export const asyncNetworkManager = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "networkManagersChunk" */'../routes/Manager/containers/NetworkManager'),
            modules: ['../routes/Manager/containers/NetworkManager'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/NetworkManager')],
        })
    );
}
export const asyncSupervisors = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "supervisorsChunk" */'../routes/Manager/containers/Supervisors'),
            modules: ['../routes/Manager/containers/Supervisors'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Supervisors')],
        })
    );
}
export const asyncCareManager = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "cmsChunk" */'../routes/Manager/containers/CareManager'),
            modules: ['../routes/Manager/containers/CareManager'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/CareManager')],
        })
    );
}
export const asyncAnalysts = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "analystChunk" */'../routes/Manager/containers/Analysts'),
            modules: ['../routes/Manager/containers/Analysts'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Analysts')],
        })
    );
}
export const asyncSupportStaff = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "supportStaffChunk" */'../routes/Manager/containers/SupportStaff'),
            modules: ['../routes/Manager/containers/SupportStaff'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/SupportStaff')],
        })
    );
}
export const asyncProviders = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "providersChunk" */'../routes/Manager/containers/Providers'),
            modules: ['../routes/Manager/containers/Providers'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Providers')],
        })
    );
}
export const asyncPayers = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "payersChunk" */'../routes/Manager/containers/Payers'),
            modules: ['../routes/Manager/containers/Payers'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Payers')],
        })
    );
}

export const asyncDoctors = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "doctorsChunk" */'../routes/Manager/containers/Doctors'),
            modules: ['../routes/Manager/containers/Doctors'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Doctors')],
        })
    );
}
export const asyncAssessments = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "assessmentsChunk" */'../routes/Manager/containers/Assessments'),
            modules: ['../routes/Manager/containers/Assessments'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Assessments')],
        })
    );
}

export const asyncPrograms = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "programsChunk" */'../routes/Manager/containers/Programs'),
            modules: ['../routes/Manager/containers/Programs'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Programs')],
        })
    );
}


