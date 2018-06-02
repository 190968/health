import React from 'react'
import {Route, Switch} from 'react-router-dom';
import {Loading} from "../../../../../../components/Loading";


import Pathway from '../../containers/Pathway';
import Tumorboard from '../../containers/Tumorboard';
import Dashboard from '../../components/Overview';




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
