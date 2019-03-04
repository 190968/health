import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {NavLink, Route} from 'react-router-dom';
import LayoutHeader from '../../../../../../layouts/components/Header';
import LoadingPage from '../../../../../../components/LoadingPage';
import { LoadingBox } from '../../../../../../components/Loading';
import { formatDateToday, getSQLDateToday } from '../../../../../../components/Other/utils';
import { AssessementManager } from '../../../Assessments/containers/AssessmentManager';

const {Header, Content, Sider, Footer} = Layout;
const SubMenu = Menu.SubMenu;

const AssessmentBuilderLayout = props => {
    const {loading, ...otherProps} = props;
    const {location, assessment, match} = otherProps;
     console.log(props);
     
    if (loading && !assessment) {
        return <LoadingBox />
    }

   

    const {action = 'build'} = match.params;

   
    const {id, name} = assessment || {};

    let mainUrl = '/builder/assessment';
    if (id !== '') {
        mainUrl += '/'+id;
    }

    let menuItems = [];
    let selectedItem = action;
    let openItem = action;
    if (['body', 'settings', 'action'].includes(action)) {
        openItem = 'build';
        if (action === 'build') {
            selectedItem = 'settings';
        }
    }
    console.log(selectedItem);
    console.log(openItem);
    let children = [];
    if (id) {
        children = [
            {label: 'Settings', key: 'settings'},
            {label: 'Body', key: 'body'},
        ];
    }
    menuItems.push({
        label: <React.Fragment><Icon type="layout" /> <span>Build</span></React.Fragment>, key: 'build', children:children
    });


    if (id) {
        menuItems.push({
                label: <><Icon type="info-circle-o"/><span>Preview</span></>, key: 'preview'
            }
        );
        menuItems.push({
                label: <><Icon type="check-circle-o"/> <span>Publish</span></>, key: 'publish'
            }
        );
    }

    return <Layout>
        <Sider style={{
        overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}
        >


                <div className="logo" style={{padding: '19px 10px', color:'#fff',  'fontSize': '1.2em'}}>
                    <center>Assessment Builder</center>
                </div>
                <Menu theme="dark" /*onSelect={props.onMenuSelect}*/ defaultSelectedKeys={[selectedItem]} defaultOpenKeys={[openItem]}  mode="inline">
                    {menuItems.map((menu) => {
                        const {label, key, children=[]} = menu;
                        if (children.length > 0) {
                            return <SubMenu
                                key={key}
                                title={<span><span>{label}</span></span>}
                            >
                                {children.map(subMenu => {
                                    const {label:subLabel, key:subKey} = subMenu;
                                    return <Menu.Item key={subKey}><NavLink to={mainUrl+'/'+subKey}>{subLabel}</NavLink></Menu.Item>
                                })}
                            </SubMenu>
                        } else {
                            return <Menu.Item key={key}>
                                <NavLink to={mainUrl+'/'+key}>{label}</NavLink>
                            </Menu.Item>;
                        }
                    })}

                    <Menu.Divider />
                    <Menu.Item key="exit">
                        <NavLink to={'/assessments'}> <Icon type="poweroff" /> <span>Exit Builder</span></NavLink>
                    </Menu.Item>


                </Menu>


        </Sider>
        <Layout style={{ marginLeft: 200 }}>

            <div style={{height:'100%', display: 'flex',
                    'minHeight': '100vh',
                    'flexDirection':'column'}}>

                    <Header style={{background: '#fff', padding: 0}}>
                        <div style={{
                            height: 64,
                            background: '#fff',
                            position: 'relative'
                        }}>
                        <center><h3>{name}</h3></center>
                        </div>
                    </Header>
                    <Content >
                        <div style={{margin:'auto'}}>
                            <AssessementManager {...otherProps} />
                        </div>
                    </Content>
                    {/* <Footer>
                        <PatientFooter />
                    </Footer> */}
                </div>
        </Layout>
    </Layout>
}

export default AssessmentBuilderLayout;