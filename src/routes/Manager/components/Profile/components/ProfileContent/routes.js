import React from 'react'
import PrivateRoute from '../../../../../../routes/privateRoute';
/** loadable **/
import Details from '../../containers/Details';
import { Loadable } from '../../../../../../components/Loadable';
//


/** Dash **/
export const asyncProfileDashboard = Loadable({
    loader: () => import(/* webpackChunkName: "profileDashChunk" */'../Dashboard'),
    modules: ['../Dashboard'],
    webpack: () => [require.resolveWeak('../Dashboard')],
})

export const asyncProfileDetails = Loadable({
    loader: () => import(/* webpackChunkName: "profileDetailsChunk" */'../Details'),
    modules: ['../Details'],
    webpack: () => [require.resolveWeak('../Details')],
})

export const asyncProfileTimeline = Loadable({
    loader: () => import(/* webpackChunkName: "profileTimelineChunk" */'../Pathway'),
    modules: ['../Pathway'],
    webpack: () => [require.resolveWeak('../Pathway')],
})

export const asyncProfilePlans = Loadable({
    loader: () => import(/* webpackChunkName: "profilePlansChunk" */'./components/Plans'),
    modules: ['./components/Plans'],
    webpack: () => [require.resolveWeak('./components/Plans')],
})


export const asyncProfileAlerts = Loadable({
    loader: () => import(/* webpackChunkName: "profilePlansChunk" */'./components/Plans'),
    modules: ['./components/Plans'],
    webpack: () => [require.resolveWeak('./components/Plans')],
})