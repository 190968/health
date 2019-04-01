import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, Route } from 'react-router-dom';
import LayoutHeader from '../../../../../../layouts/components/Header';
import LoadingPage from '../../../../../../components/LoadingPage';
import { BuilderSkeleton } from '../Skeleton';
import { formatDateToday, getSQLDateToday } from '../../../../../../components/Other/utils';
import { AssessementManager } from '../../../Assessments/containers/AssessmentManager';
import BuilderLayout from '../Layout';
import PlanbuilderContent from '../../../Planbuilder/components/PlanbuilderContent';

const { Header, Content, Sider, Footer } = Layout;
const SubMenu = Menu.SubMenu;

const ActionPlanBuilderLayout = props => {
    const { loading, ...otherProps } = props;
    const { location, plan, match } = otherProps;

    if (loading && !plan) {
        return <BuilderSkeleton />
    }

    const { action = 'build' } = match.params;
    const { id, title } = plan || {};

    let mainUrl = '/builder/ap';
    if (id && id !== '') {
        mainUrl += '/' + id;
    }

    let menuItems = [];
    let selectedItem = action;
    let openItem = action;
    if (['body', 'header', 'build'].includes(action)) {
        openItem = 'build';
        if (action === 'build') {
            selectedItem = 'header';
        }
    }
    // console.log(selectedItem);
    // console.log(openItem);
    let children = [];
    const disabled = !id || id === '';
    // if (id) {
        children = [
            { label: 'Settings', key: 'header', disabled },
            { label: 'Body', key: 'body', disabled },
            {label: 'Options', key: 'options', disabled:true}
        ];
    menuItems.push({
        label: <React.Fragment><Icon type="layout" /> <span>Build</span></React.Fragment>, key: 'build', children: children
    });


    // if (id) {
        menuItems.push({
            label: <><Icon type="eye" /><span>Preview</span></>, key: 'preview',
            disabled
        }
        );
        menuItems.push({
            label: <><Icon type="check-circle-o" /> <span>Publish</span></>, key: 'publish',
            disabled
        }
        );
    // }

    const menu = {
        mainUrl, exitUrl:'/actionplans', menuItems, selectedItem, openItem
    }

    return <BuilderLayout logo={<center>ActionPlan Builder</center>} header={title} menu={menu} >
        <PlanbuilderContent {...props} routes={menuItems} mainUrl={mainUrl}  />
    </BuilderLayout>
}

export default ActionPlanBuilderLayout;







// const PlanbuilderLayout = (props) => {

//     const {match, location, plan={}, loading} = props;
//     //console.log(loading);
//     if (loading) {
//        // return <LoadingPage/>;
//     }
//     let {type} = props;
//     //console.log(match);
//     const {id, tab = 'build', type:typefromUrl = 'ap'} = match.params;
//     let {subtab = ''} = match.params;
//     if (tab === 'build' && subtab === '') {
//         subtab = 'header';
//     }

//     const selectedItem = subtab || tab;
//     const openItem = tab;
//     console.log(plan, 'Plan');
//     type = plan && plan.id ? type : typefromUrl;


//     let mainUrl = '/pb';
//     if (id !== '') {
//         mainUrl += '/'+id;
//     }

//     let menuItems = [];
//     let exitURL = '/';
//     let builderTitle = <React.Fragment><span style={{'fontWeight': 'bold'}}>PlanBuilder</span>{String.fromCharCode( "8482" )}</React.Fragment>;
//     let children = [
//         {label: 'Header', key: 'header'},
//     ];

//     switch(type) {
//         case 'ap':
//             exitURL = '/actionplans';

//             if (plan.id) {
//                 children = [
//                     {label: 'Header', key: 'header'},
//                     {label: 'Body', key: 'body'},
//                     {label: 'Options', key: 'options'}
//                 ];
//             }
//             menuItems.push({
//                 label: <React.Fragment><Icon type="layout" /> <span>Build</span></React.Fragment>, key: 'build', children:children
//             });
//         break;
//         case 'pathway':
//             exitURL = '/pathways';

//             if (plan.id) {
//                 children = [
//                     {label: 'Header', key: 'header'},
//                     {label: 'Body', key: 'body'},
//                 ];
//             }

//             menuItems.push({
//                 label: <React.Fragment><Icon type="layout" /> <span>Build</span></React.Fragment>, key: 'build', children: children
//             });
//             builderTitle = <React.Fragment><span style={{'fontWeight': 'bold'}}>PathwayBuilder</span>{String.fromCharCode( "8482" )}</React.Fragment>;
//             break;
//     }

//     if (plan.id) {
//         menuItems.push({
//                 label: <React.Fragment><Icon type="info-circle-o"/><span>Preview</span></React.Fragment>, key: 'preview'
//             }
//         );
//         menuItems.push({
//                 label: <React.Fragment><Icon type="check-circle-o"/> <span>Publish</span></React.Fragment>, key: 'publish'
//             }
//         );
//     }

//     //console.log(openItem);
//     //console.log(selectedItem);

//     return (
//         <Layout style={{minHeight: '100vh'}}>
//             <Sider

//                 collapsible
//                 breakpoint="lg"
//             >
//                 <div className="logo" style={{padding: '19px 10px', color:'#fff',  'fontSize': '1.2em'}}>
//                     <center>{builderTitle}</center>
//                 </div>
//                 <Menu theme="dark" onSelect={props.onMenuSelect} defaultSelectedKeys={[selectedItem]} defaultOpenKeys={[openItem]} mode="inline">

//                     {menuItems.map((menu) => {
//                         const {label, key, children=[]} = menu;
//                         if (children.length > 0) {
//                             return <SubMenu
//                                 key={key}
//                                 title={<span><span>{label}</span></span>}
//                             >
//                                 {children.map(subMenu => {
//                                     const {label:subLabel, key:subKey} = subMenu;
//                                     return <Menu.Item key={subKey}><NavLink to={mainUrl+'/'+key+'/'+subKey}>{subLabel}</NavLink></Menu.Item>
//                                 })}
//                             </SubMenu>
//                         } else {
//                             return <Menu.Item key={key}>
//                                 <NavLink to={mainUrl+'/'+key}>{label}</NavLink>
//                             </Menu.Item>;
//                         }
//                     })}

//                     <Menu.Divider />
//                     <Menu.Item key="exit">
//                         <NavLink to={exitURL}> <Icon type="poweroff" /> <span>Exit Builder</span></NavLink>
//                     </Menu.Item>


//                 </Menu>
//             </Sider>
//             <Layout>
//                 {plan.title != '' && <Header style={{background: '#fff', padding: 0}}>
//                     <div style={{
//                         height: 64,
//                         background: '#fff',
//                         position: 'relative'
//                     }}>
//                     <center><h3>{plan.title}</h3></center>
//                     </div>
//                 </Header>}
//                 <Content style={{padding:24}}>
                
//                 </Content>
//                 <Footer style={{textAlign: 'center', background: 'transparent'}}>
//                     Copyright © 2010-2018 Fitango Inc. All rights reserved
//                 </Footer>
//             </Layout>
//         </Layout>
//     )
// }