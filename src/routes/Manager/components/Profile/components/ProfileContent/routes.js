import React from 'react'
/** loadable **/
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
export const asyncProfileHealth = Loadable({
    loader: () => import(/* webpackChunkName: "asyncProfileHealthChunk" */'../Health'),
    modules: ['../Health'],
    webpack: () => [require.resolveWeak('../Health')],
})
export const asyncProfileCalendar = Loadable({
    loader: () => import(/* webpackChunkName: "asyncProfileCalendarChunk" */'../Calendar'),
    modules: ['../Calendar'],
    webpack: () => [require.resolveWeak('../Calendar')],
})



export const asyncProfileTimeline = Loadable({
    loader: () => import(/* webpackChunkName: "profileTimelineChunk" */'../../containers/TimelineLayout'),
    modules: ['../../.containers/TimelineLayout'],
    webpack: () => [require.resolveWeak('../../containers/TimelineLayout')],
})

export const asyncProfilePlans = Loadable({
    loader: () => import(/* webpackChunkName: "profilePlansChunk" */'./components/Plans'),
    modules: ['./components/Plans'],
    webpack: () => [require.resolveWeak('./components/Plans')],
})


export const asyncProfileAlerts = Loadable({
    loader: () => import(/* webpackChunkName: "profileAlertsChunk" */'../../containers/Alerts'),
    modules: ['../../containers/Alerts'],
    webpack: () => [require.resolveWeak('../../containers/Alerts')],
})