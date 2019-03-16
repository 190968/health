import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, Route } from 'react-router-dom';
import LayoutHeader from '../../../../../../layouts/components/Header';
import LoadingPage from '../../../../../../components/LoadingPage';
import { BuilderSkeleton } from '../Skeleton';
import { formatDateToday, getSQLDateToday } from '../../../../../../components/Other/utils';
import { AssessementManager } from '../../../Assessments/containers/AssessmentManager';

const { Header, Content, Sider, Footer } = Layout;
const SubMenu = Menu.SubMenu;

const BuilderLayout = props => {
    const { logo, header, menu, children:content} = props;
    const { mainUrl, exitUrl, menuItems=[], selectedItem, openItem } = menu;

    return <Layout>
        <Sider style={{
            // overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}
            collapsible
            breakpoint="lg"
        >
            <div className="logo" style={{ padding: '19px 10px', color: '#fff', 'fontSize': '1.2em' }}>
                {logo}
            </div>
            <Menu theme="dark"  defaultSelectedKeys={[selectedItem]} defaultOpenKeys={[openItem]} mode="inline">
                {menuItems.map((menu) => {
                    const { label, key, children = [], disabled=false } = menu;
                    if (children.length > 0) {
                        return <SubMenu
                            key={key}
                            title={<span><span>{label}</span></span>}
                            disabled={disabled}
                        >
                            {children.map(subMenu => {
                                const { label: subLabel, key: subKey, disabled=false } = subMenu;
                                return <Menu.Item key={subKey} disabled={disabled} ><NavLink to={mainUrl + '/' + subKey}>{subLabel}</NavLink></Menu.Item>
                            })}
                        </SubMenu>
                    } else {
                        return <Menu.Item key={key} disabled={disabled}>
                            <NavLink to={mainUrl + '/' + key}>{label}</NavLink>
                        </Menu.Item>;
                    }
                })}

                <Menu.Divider />
                <Menu.Item key="exit">
                    <NavLink to={exitUrl}> <Icon type="poweroff" /> <span>Exit Builder</span></NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <div style={{
                height: '100%', display: 'flex',
                'minHeight': '100vh',
                'flexDirection': 'column'
            }}>

                <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{
                        height: 64,
                        background: '#fff',
                        position: 'relative'
                    }}>
                        <center><h3>{header}</h3></center>
                    </div>
                </Header>
                <Content >
                    <div style={{ margin: 'auto' }}>
                        {content}
                    </div>
                </Content>
                {/* <Footer>
                        <PatientFooter />
                    </Footer> */}
            </div>
        </Layout>
    </Layout>
}

export default BuilderLayout;