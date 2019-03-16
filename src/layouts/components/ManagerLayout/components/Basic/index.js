import React from 'react'
import {NavLink, Switch} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import {BasicRoutes} from '../../../../routes';
import {ManagerRoutes} from '../../routes';
import RightMenu from '../../../../components/Header/containers/RightMenu';
import PrivateRoute from '../../../../../routes/privateRoute';
import {asyncPlanbuilder} from '../../../../../routes/manager';
import {CohortsSubMenu} from './containers/CohortsSubMenu';
import Logo from './logo';
import './index.less';
import ChangeProvider from '../../../Header/components/RightMenu/containers/ChangeProvider';
import { withActiveNetwork, withActiveUser } from '../../../../../components/App/app-context';
const {Sider, Header, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

const BasicLayout = (props) => {
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
            <Header className={'main-header'} style={{background: '#fff', padding: 0, zIndex:2}}>
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

                        <SubMenu
                            key="staff"
                            title={<span><Icon type="team" /><span>Staff</span></span>}
                        >
                            {isUserRole('manager') && <Menu.Item key="admins"><NavLink to="/staff/admins">Managers</NavLink></Menu.Item>}
                            <Menu.Item key="supervisors"><NavLink to="/staff/supervisors">Supervisors</NavLink></Menu.Item>
                            <Menu.Item key="ncms"><NavLink to="/staff/ncm">Care Managers</NavLink></Menu.Item>
                            <Menu.Item key="analysts"><NavLink to="/staff/analysts">Analysts</NavLink></Menu.Item>
                            <Menu.Item key="employers"><NavLink to="/staff/employers">Support Staff</NavLink></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="patients">
                            <NavLink to="/patients"> <Icon type="solution" /><span>Patients</span></NavLink>
                        </Menu.Item>
                        {/* <SubMenu
                            key="patients"
                            title={<span><Icon type="team"/><span>Patients</span></span>}
                        >
                            <Menu.Item key="active"><NavLink to="/patients"> Active</NavLink></Menu.Item>

                            // { <CohortsSubMenu key={'cohorts' } title="Cohorts"  /> }
                            // { <SubMenu key="cohorts" title="Cohorts">
                            //     <Menu.Item key="cohorts/create"><NavLink to="/cohorts/create"> Create</NavLink></Menu.Item>
                            //     <Menu.Item key="cohorts/list"><NavLink to="/cohorts/list"> List</NavLink></Menu.Item>
                            // </SubMenu> }
                            
                        </SubMenu> */}
                        <Menu.Item key="cohorts">
                            <NavLink to="/cohorts"> <Icon type="cluster" /><span>Cohorts</span></NavLink>
                        </Menu.Item>
                        <Menu.Item key="screenings">
                            <NavLink to="/screenings"> <Icon type="interation" /><span>Screenings</span></NavLink>
                        </Menu.Item>
                        <Menu.Item key="campaigns">
                            <NavLink to="/campaigns"> <Icon type="fork" /><span>Campaigns</span></NavLink>
                        </Menu.Item>
                        {!isProviderLevel && <Menu.Item key="providers">
                            <NavLink to="/providers"> <Icon type="share-alt" /><span>Providers</span></NavLink>
                        </Menu.Item>}

                        <Menu.Item key="programs">
                            <NavLink to="/programs"> <Icon type="laptop" /><span>Programs</span></NavLink>
                        </Menu.Item>

                        <SubMenu
                            key="other"
                            title={<span><Icon type="appstore"/><span>Other</span></span>}
                        >
                            {/* <Menu.Item key="workflow"><NavLink to="/workflow">Workflow</NavLink></Menu.Item> */}
                            <Menu.Item key="actionplans"><NavLink to="/actionplans">ActionPlans</NavLink></Menu.Item>
                            <Menu.Item key="pathways"><NavLink to="/pathways">Pathways</NavLink></Menu.Item>
                            <Menu.Item key="tumorboards"><NavLink to="/tumorboards">Tumor Boards</NavLink></Menu.Item>
                            {isUserRole('manager') && <SubMenu key="manage" title="Manage">
                                <Menu.Item key="stages"><NavLink to="/stages">Stages</NavLink></Menu.Item>
                                <Menu.Item key="cancers"><NavLink to="/cancers">Cancers</NavLink></Menu.Item>
                                <Menu.Item key="chemotherapies"><NavLink to="/chemotherapies">Chemotherapies</NavLink></Menu.Item>
                                <Menu.Item key="payers"><NavLink to="/payers">Payers</NavLink></Menu.Item>
                                <Menu.Item key="doctors"><NavLink to="/doctors">Doctors</NavLink></Menu.Item>
                            </SubMenu>}
                            <Menu.Item key="assessments"><NavLink to="/assessments">Assessments</NavLink></Menu.Item>
                            <Menu.Item key="checklists" disabled><NavLink to="/checklists">Checklists</NavLink></Menu.Item>
                            <Menu.Item key="protocols" disabled><NavLink to="/protocols">Protocols</NavLink></Menu.Item>
                            <SubMenu key="dme" title="DME" disabled>
                                <SubMenu key="dme/orders" title="Orders">
                                    <Menu.Item key="dme/orders/all"><NavLink to="/dme/orders/all">All</NavLink></Menu.Item>
                                    <Menu.Item key="dme/orders/new"><NavLink to="/dme/orders/new">New</NavLink></Menu.Item>
                                    <Menu.Item key="dme/orders/supplied"><NavLink to="/dme/orders/supplied">Supplied</NavLink></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="dme/worklist"><NavLink to="/dme/worklist">Worklist</NavLink></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="claims" disabled><NavLink to="/claims">Claims</NavLink></Menu.Item>
                            <Menu.Item key="clinicaltrials"><NavLink to="/clinicaltrials">Clinical Trials</NavLink></Menu.Item>

                        </SubMenu>
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

export default BasicLayout;
