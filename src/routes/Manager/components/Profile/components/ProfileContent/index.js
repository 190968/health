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
                params: {user: user}
            },
            {
                path: mainUrl + "/tumorboard",
                component: Tumorboard,
                params: {user: user}
            },
            {
                path: mainUrl + "/overview",
                component: Overview,
                params: {user: user}
            },
            {
                path: mainUrl + "/details",
                component: Details,
                params: {user: user}
            },
            {
                path: mainUrl + "/qms",
                component: QualMeasures,
                params: {user: user}
            },
            {
                path: mainUrl + "/cohorts",
                component: Cohorts,
                params: {user: user}
            },
            {
                path: mainUrl + "/stakeholders/providers",
                component: Providers,
                params: {user: user}
            },
            {
                path: mainUrl + "/stakeholders/family",
                component: Family,
                params: {user: user}
            },
            {
                path: mainUrl + "/stakeholders/team",
                component: Team,
                params: {user: user}
            },
            {
                path: mainUrl,
                component: Dashboard,
                params: {user: user}
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
