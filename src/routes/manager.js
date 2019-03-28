//import React from "react";

/** loadable **/
import Loadable from '../components/Loadable';


/** Dash **/
export const asyncWorkflow = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "workflowChunk" */'../routes/Manager/containers/Workflow'),
            modules: ['../routes/Manager/containers/Workflow'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Workflow')],
        })
        //LoadSimple('Manager/containers/Workflow')
    );
}


export const asyncProfile = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "profileChunk" */'../routes/Manager/containers/Profile'),
            modules: ['../routes/Manager/containers/Profile'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Profile')],
        })
    );
}

export const asyncActionplans = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "actionplansChunk" */'../routes/Manager/components/Actionplans'),
            modules: ['../routes/Manager/components/Actionplans'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Actionplans')],
        })
    );
}

export const asyncPlanbuilder = () => {

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

export const asyncBuilder = () => {

    // return (
    //     Loadable({
    //         loader: () => import('../routes/Manager/containers/Planbuilder'),
    //         modules: ['../routes/Manager/containers/Planbuilder'],
    //         webpack: () => [require.resolveWeak('../routes/Manager/containers/Planbuilder')],
    //     })
    // );
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "builderChunk" */'../routes/Manager/components/Builder'),
            modules: ['../routes/Manager/components/Builder'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Builder')],
        })
    );
}

export const asyncConference = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "conferenceChunk" */'../routes/Conference/containers/View'),
            modules: ['../routesConference/containers/View'],
            webpack: () => [require.resolveWeak('../routes/Conference/containers/View')],
        })
    );
}

export const asyncPathways = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "pathwaysChunk" */'../routes/Manager/containers/Pathways'),
            modules: ['../routes/Manager/containers/Pathways'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Pathways')],
        })
    );
}

export const asyncStages = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "stagesChunk" */'../routes/Manager/components/Cancers/containers/Stages'),
            modules: ['../routes/Manager/components/Cancers/containers/Stages'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Cancers/containers/Stages')],
        })
    );
}





export const asyncPatients = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "patientsChunk" */'../routes/Manager/containers/Patients'),
            modules: ['../routes/Manager/containers/Patients'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Patients')],
        })
    );
}

export const asyncCohorts = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "cohortsChunk" */'../routes/Manager/components/Cohorts/router'),
            modules: ['../routes/Manager/components/Cohorts/router'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Cohorts/router')],
        })
    );
}

export const asyncScreenings = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "screeningsChunk" */'../routes/Manager/components/Screenings'),
            modules: ['../routes/Manager/components/Screenings'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Screenings')],
        })
    );
}

export const asyncCampaigns = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "campaignsChunk" */'../routes/Manager/components/Campaigns'),
            modules: ['../routes/Manager/components/Campaigns'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Campaigns')],
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
            loader: () => import(/* webpackChunkName: "networkManagersChunk" */'../routes/Manager/components/StaffMembers/containers/NetworkManagers'),
            modules: ['../routes/Manager/components/StaffMembers/containers/NetworkManagers'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/StaffMembers/containers/NetworkManagers')],
        })
    );
}
export const asyncSupervisors = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "supervisorsChunk" */'../routes/Manager/components/StaffMembers/containers/Supervisors'),
            modules: ['../routes/Manager/components/StaffMembers/containers/Supervisors'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/StaffMembers/containers/Supervisors')],
        })
    );
}
export const asyncCareManager = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "cmsChunk" */'../routes/Manager/components/StaffMembers/containers/CareManagers'),
            modules: ['../routes/Manager/components/StaffMembers/containers/CareManagers'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/StaffMembers/containers/CareManagers')],
        })
    );
}
export const asyncAnalysts = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "analystsChunk" */'../routes/Manager/components/StaffMembers/containers/Analysts'),
            modules: ['../routes/Manager/components/StaffMembers/containers/Analysts'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/StaffMembers/containers/Analysts')],
        })
    );
}
export const asyncSupportStaff = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "supportStaffChunk" */'../routes/Manager/components/StaffMembers/containers/SupportStaff'),
            modules: ['../routes/Manager/components/StaffMembers/containers/SupportStaff'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/StaffMembers/containers/SupportStaff')],
        })
    );
}
export const asyncProviders = () => {

    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "providersChunk" */'../routes/Manager/components/Providers'),
            modules: ['../routes/Manager/components/Providers'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Providers')],
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
            loader: () => import(/* webpackChunkName: "programsChunk" */'../routes/Manager/components/Programs'),
            modules: ['../routes/Manager/components/Programs'],
            webpack: () => [require.resolveWeak('../routes/Manager/components/Programs')],
        })
    );
}


