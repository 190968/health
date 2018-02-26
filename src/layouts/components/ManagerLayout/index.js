import React from 'react'
import {NavLink} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import {BasicRoutes} from '../../routes';
import {ManagerRoutes} from './routes';
import RightMenu from '../../components/Header/containers/RightMenu';

const {Sider, Header, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

const ManagerLayout = ({loading, user, store, location}) => {
    return (

        <Layout style={{minHeight: '100vh'}}>
            <Sider
                collapsible
                breakpoint="lg"
            >
                <div className="logo" style={{margin: 16}}><a href="/static/myapp/"><img className="logo"
                                                                                         style={{width: '100%'}}
                                                                                         src="https://s3.amazonaws.com/moteevate-transloadit/82/ee3ba0f06a11e7a10a058d47b7a018/7b2fa890f06a11e78c255fe07671d9a1.png?AWSAccessKeyId=AKIAJIPDSQFP4EHPKEDQ&amp;Expires=1519210764&amp;Signature=whtbGLILBKalPKHd0ufwLswU9hI%3D"/></a>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline">

                    <Menu.Item key="dashboard">
                        <NavLink to="/"> <Icon type="dashboard"/> Dashboard</NavLink>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user"/><span>Staff</span></span>}
                    >
                        <Menu.Item key="3">Network Managers</Menu.Item>
                        <Menu.Item key="4">Supervisors</Menu.Item>
                        <Menu.Item key="5">Care Managers</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="team"/><span>Patients</span></span>}
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="providers"
                        title={<span><Icon type="team"/><span>Providers</span></span>}
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="programs"
                        title={<span><Icon type="team"/><span>Programs</span></span>}
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="other"
                        title={<span><Icon type="team"/><span>Other</span></span>}
                    >
                        <Menu.Item key="61"><NavLink to="/workflow">Workflow</NavLink></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background: '#fff', padding: 0}}>
                    <div style={{
                        height: 64,
                        padding: ' 8px 12px 0 0',
                        background: '#fff',
                        position: 'relative'
                    }}>
                        <RightMenu/>
                    </div>
                </Header>
                <Content style={{margin: '16px'}}>
                    <BasicRoutes store={store}/>
                    <ManagerRoutes store={store}/>
                </Content>
                <Footer style={{textAlign: 'center', background: 'transparent'}}>
                    Copyright © 2010-2017 Fitango Inc. All rights reserved
                </Footer>
            </Layout>
        </Layout>
    )
}

export default ManagerLayout;
