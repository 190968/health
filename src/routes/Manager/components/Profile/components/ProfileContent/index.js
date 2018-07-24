import React from 'react'
import {Route, Switch} from 'react-router-dom';
import {Loading} from "../../../../../../components/Loading";

import {Stakeholders} from "./components/Stakeholders/index";
import {compose, withHandlers} from 'recompose';
import CancerTreatment from '../Dashboard/containers/CancerTreatment';
import {asyncProfileDetails, asyncProfileTimeline, asyncProfilePlans, asyncProfileAlerts, asyncProfileDashboard} from './routes';

const RouteWithSubRoutes = route => {
    //console.log(route);
    return (
        <Route
            path={route.path}
            //component={route.component()}
            render={props => {
                //eturn route.component();
                // pass the sub-routes down to keep nesting
                console.log(props);
                return (<route.component {...props} {...route.params} routes={route.routes}/>)
            }}
        />)
};

const ProfileContentPure = props => {

        const {match,loading, user, handleSubTab} = props;

        if (loading) {
            return <Loading/>
        }

        const {id, tab = '', subtab = ''} = match.params;

        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/' + id;
        }
        const defaultParams = {user, mainUrl, handleSubTab, match};

        const routes = [
            {
                path: mainUrl + "/timeline",
                component: asyncProfileTimeline,
                params: defaultParams
            },
            {
                path: mainUrl + "/details",
                component: asyncProfileDetails,
                params: defaultParams
            },
            {
                path: mainUrl + "/plans",
                component: asyncProfilePlans,
                params: defaultParams
            },
            {
                path: mainUrl + "/alerts",
                component: asyncProfileAlerts,
                params: defaultParams
            },
            {
                path: mainUrl + "/stakeholders",
                component: Stakeholders,
                params: defaultParams
            },
            {
                path: mainUrl + "/treatmentOptions",
                component: CancerTreatment,
                params: defaultParams
            },
            {
                path: mainUrl,
                component: asyncProfileDashboard,
                params: defaultParams
            },
            /*{
                path: mainUrl,
                component: Build,
                routes: [
                    {
                        path: mainUrl + "/build/header",
                        component: BuildHeader,
                        params: {plan: plan}
                    },
                    {
                        path: mainUrl + "/build/body",
                        component: BuildBody,
                        params: {plan: plan}
                    },
                    {
                        path: mainUrl,
                        component: BuildHeader,
                        params: {plan: plan}
                    },
                ]
            }*/
        ];



        return (
            <Switch>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}  />)}
            </Switch>

        )
}

const enhance = withHandlers({
    handleSubTab: props => subtab => {
        const {id, tab} = props.match.params;

        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/'+id;
        }

        props.history.replace(mainUrl+'/'+tab+'/'+subtab);

    }
});
export default enhance(ProfileContentPure);
