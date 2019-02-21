import React from 'react';
import {Layout, Icon, Dropdown, Menu} from 'antd';
import LayoutHeader from '../../components/Header';
import {CoreRoutes, UseRoutes} from '../../routes';
import {withHandlers} from 'recompose';
import {PatientRoutesList} from './routes';
import {Switch} from 'react-router-dom'
import { withActiveNetwork } from '../../../components/App/app-context';
const {Header, Content, Footer} = Layout;

const PatientLayout = ({loading, location}) =>  {
    //console.log('Loaded Patient layout');
    console.log(location);
    const {pathname} = location;
    if (pathname === '/logout') {
        return <UseRoutes routes={CoreRoutes} />;
    }
    
    return (
        <React.Fragment>
            <div style={{height:'100%', display: 'flex',
                'minHeight': '100vh',
                'flexDirection':'column'}}>

                <Header style={{background:'#fff'}}>
                    <LayoutHeader loading={loading} location={location} patientLayout  />
                </Header>
                <Content className={'userside'}>
                    <UseRoutes routes={PatientRoutesList} />
                </Content>
                <Footer>
                    <PatientFooter />
                </Footer>
            </div>
        </React.Fragment>
    )}

export default PatientLayout;



const PatientFooter = withActiveNetwork(withHandlers({
    handleMenuClick: props => (e) => {
        props.setLanguage(e.key);
    }
})(props => {
    const {handleMenuClick} = props;


const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={'en'}>
        English
      </Menu.Item>
      <Menu.Item key={'ru'}>
        Russian
      </Menu.Item>
    </Menu>
  );
    return <div>
         Copyright © 2010-2018 Fitango Inc. All rights reserved

        <Dropdown overlay={menu}>
            <Icon type="global" theme="outlined" style={{color: '#ccc', float:'right'}} />
        </Dropdown>
    </div>
}));

