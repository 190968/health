import React from 'react'
import {Route, Switch} from 'react-router-dom';
import {Loading} from "../../../../../../components/Loading";


import Pathway from '../../containers/Pathway';
import Tumorboard from '../../containers/Tumorboard';
import Dashboard from '../../components/Dashboard';
import Overview from '../../components/Overview';
import Providers from '../../containers/Providers';
import Family from '../../containers/Family';
import Team from '../../containers/Team';
import QualMeasures from '../../containers/QualMeasures';
import Cohorts from '../../containers/Cohorts';
import Details from '../../containers/Details';
import Alerts from '../../containers/Alerts';
import Health from '../../components/Health';
import ActionPlans from '../../components/Dashboard/containers/ActionPlans';
import {Stakeholders} from "./components/Stakeholders/index";
import Plans from "./components/Plans";


const RouteWithSubRoutes = route => {
    //console.log(route);
    return (
        <Route
            path={route.path}

            render={props => {
                // pass the sub-routes down to keep nesting
                //console.log(props);
                return (<route.component {...props} {...route.params} routes={route.routes}/>)
            }}
        />)
};

class ProfileContent extends React.Component{

    onMenuSelect = (e) => {
        console.log(e);
    }
    render() {
        const {match,loading, user} = this.props;

        if (loading) {
            return <Loading/>
        }

        const {id, tab = '', subtab = ''} = match.params;

        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/' + id;
        }

        const routes = [
            {
                path: mainUrl + "/timeline",
                component: Pathway,
                params: {user: user, mainUrl}
            },
            {
                path: mainUrl + "/details",
                component: Details,
                params: {user: user, mainUrl}
            },
            {
                path: mainUrl + "/plans",
                component: Plans,
                params: {user: user, mainUrl}
            },
            {
                path: mainUrl + "/stakeholders",
                component: Stakeholders,
                params: {user: user, mainUrl}
            },
            {
                path: mainUrl,
                component: Dashboard,
                params: {user: user, mainUrl}
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
}

export default ProfileContent;
