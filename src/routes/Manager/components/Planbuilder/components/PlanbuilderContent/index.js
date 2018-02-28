import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom';
import {Layout, Menu, Steps, Icon} from 'antd';
import BuildHeader from '../../containers/BuildHeader';
import BuildBody from '../../containers/BuildBody';
import {Loading} from "../../../../../../components/Loading";




const Preview = () => <h3>Preview</h3>;
const Publish = () => <h3>Publish</h3>;

const Build = (props) => {
    console.log(props);
    const { routes, plan } = props;
    return (<Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>);
};


const RouteWithSubRoutes = route => {
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



class PlanbuilderContent extends React.Component{

    onMenuSelect = (e) => {
        console.log(e);
    }
    render() {
        const {match, location, plan, loading} = this.props;

        if (loading) {
            return <Loading/>
        }
        /*console.log(props);
        console.log(location);
        console.log(plan);*/

        const {id, tab = 'build', subtab = 'header'} = match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;


        let mainUrl = '/pb';
        if (id !== '') {
            mainUrl += '/' + id;
        }

        //console.log(tab);
        //console.log(subtab);

        const routes = [

            {
                path: mainUrl + "/preview",
                component: Preview
            },
            {
                path: mainUrl + "/publish",
                component: Publish
            },
            {
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
            }


        ];



        return (

            <Switch>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}  />)}
            </Switch>

        )
    }
}

export default PlanbuilderContent;
