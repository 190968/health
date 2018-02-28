import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom';
import {Layout, Menu, Steps, Icon} from 'antd';
import BuildHeader from './containers/BuildHeader';
import BuildBody from './containers/BuildBody';
import PlanbuilderContent from './components/PlanbuilderContent';
import {Loading} from "../../../../components/Loading";
const {Sider, Header, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;
const Step = Steps.Step;




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



const PlanbuilderLayout = (props) => {

    const {match, location, plan, loading} = props;

    if (loading) {
       // return <Loading />
    }
    /*console.log(props);
    console.log(location);
    console.log(plan);*/

    const {id, tab = 'build', subtab = 'header'} = match.params;

    const selectedItem = subtab || tab;
    const openItem = tab;


    let mainUrl = '/pb';
    if (id !== '') {
        mainUrl += '/'+id;
    }


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider

                collapsible
                breakpoint="lg"
            >
                <div className="logo" style={{margin: 16, color:'#fff'}}>
                    <center>PlanBuilder</center>
                </div>
                <Menu theme="dark" onSelect={this.onMenuSelect} defaultSelectedKeys={[selectedItem]} defaultOpenKeys={[openItem]} mode="inline">

                    <SubMenu
                        key="build"
                        title={<span><span>Build</span></span>}
                    >
                        <Menu.Item key="header"><NavLink to={mainUrl+'/build/header'}>Header</NavLink></Menu.Item>
                        <Menu.Item key="body"><NavLink to={mainUrl+'/build/body'}>Body</NavLink></Menu.Item>
                        <Menu.Item key="options"><NavLink to={mainUrl+'/build/options'}>Options</NavLink></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="preview">
                        <NavLink to={mainUrl+'/preview'}>Preview</NavLink>
                    </Menu.Item>
                    <Menu.Item key="publish">
                        <NavLink to={mainUrl+'/publish'}>Publish</NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <PlanbuilderContent {...props} />
                <Footer style={{textAlign: 'center', background: 'transparent'}}>
                    Copyright © 2010-2017 Fitango Inc. All rights reserved
                </Footer>
            </Layout>
        </Layout>
    )
}

export default PlanbuilderLayout;
