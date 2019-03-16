import React from 'react'
import {NavLink, Switch} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import {BasicRoutes} from '../../../../routes';
import {ManagerRoutes} from '../../routes';
import RightMenu from '../../../../components/Header/containers/RightMenu';
import Logo from '../Basic/logo';
// import './index.less';
import ChangeProvider from '../../../Header/components/RightMenu/containers/ChangeProvider';
const {Sider, Header, Content, Footer} = Layout;

const AdvocatesLayout = (props) => {
    const {loading, user, store, location, match, currentNetwork, isProviderLevel, isUserRole} = props;
    //console.log(location);
//   console.log(match);
    const {id, tab = 'dashboard', subtab} = match.params;

    let selectedItem = subtab || tab;
    let openItem = tab;

    switch(tab) {
        case 'cohorts':
        // openItem = 'patients';
        // if (subtab === 'view') {
        // }
        selectedItem = tab;
        break;
        case 'patients':
        // if (!subtab) {
        //     selectedItem = 'active';
        // }
        break;
    }
    if (tab === 'patients') {
       
    }
    // console.log(selectedItem, 'selectedItem');
    // console.log(openItem, 'openItem');
    console.log(tab);
    console.log(subtab);

    let mainUrl = '/builder/ap';
    if (id !== '') {
        mainUrl += '/'+id;
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            {/* <PrivateRoute path="/pb" component={asyncPlanbuilder(store)}/> */}
            <Header className={'main-header'} style={{background: '#fff', padding: 0, zIndex:1}}>
                <div style={{
                    height: 64,
                    padding: '8px 12px 0 0',
                    background: '#fff',
                    position: 'relative',
                    boxShadow:' 0 1px 4px rgba(0,21,41,.08)'
                }}>
                    <div className="logo" style={{marginTop: '-9px', marginLeft:5, float:'left'}}>
                        <Logo />
                    </div>
                     <div style={{marginTop: '-9px', marginLeft:25, float:'left'}}><ChangeProvider /></div>
                    <RightMenu/>
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    breakpoint="lg"
                    theme="dark"
                >

                    <Menu theme="dark" selectedKeys={[selectedItem]} defaultOpenKeys={[openItem]} mode="inline">

                        <Menu.Item key="dashboard">
                            <NavLink to="/"> <Icon type="dashboard"/><span>Dashboard</span></NavLink>
                        </Menu.Item>

                        <Menu.Item key="patients">
                            <NavLink to="/patients"> <Icon type="team" /><span>Patients</span></NavLink>
                        </Menu.Item>
                         
                        <Menu.Item key="actionplans">
                            <NavLink to="/actionplans"><Icon type="project" /><span>ActionPlans</span></NavLink>
                        </Menu.Item>
                             
                    </Menu>
                </Sider>


                <Content className="manager" style={{minHeight: '100vh'}}>
                    <ManagerRoutes store={store}/>

                    <Footer style={{textAlign: 'center', color: '#ccc', background: 'transparent'}}>
                        Copyright © 2010-2018 Fitango Inc. All rights reserved
                    </Footer>
                </Content>

            </Layout>
        </Layout>
    )
}

export default AdvocatesLayout;
