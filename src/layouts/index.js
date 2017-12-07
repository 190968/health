import React from 'react'
import { Route, IndexLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import { Layout, Menu, Breadcrumb } from 'antd';


//import './index.scss'
//import './box.scss'

//import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';


//import LoginForm from '../routes/User/containers/loginContainer';
import LayoutHeader from './Header';
import { logoutUser } from '../routes/User/modules/user';



// add
import {asyncDash,  asyncLogin,asyncRegister,asyncLogout,asyncSettings/*,asyncPlan, asyncPlantore, asyncPlanbuilder, asyncPlantorePlan,  */} from 'routes';
import PrivateRoute from '../routes/privateRoute';

//const App = require('../components/App').default
const { Header, Content, Footer } = Layout;

export const Core = ({token, isLoading, children, logout, store,location}) =>  {
    // const ready = true//state.ready || false;
    //console.log(token);
    //console.log(isLoading);
    if (isLoading) {
        return ('Loading app');
    }
    return (
<<<<<<< HEAD
        <div style={{height:'100%'}}>
            <Header />
            <PrivateRoute exact path="/" component={asyncDash(store)} />
            <Route exact path="/settings" component={asyncSettings(store)} />
            <Route exact path="/login" component={asyncLogin(store)} />
            <Route exact path="/logout" component={asyncLogout(store)} />
            <Route exact path="/register" component={asyncRegister(store)} />
=======
        <div style={{height:'100%', display: 'flex',
            'min-height': '100vh',
            'flex-direction':'column'}}>
            <Header>
                <LayoutHeader />
            </Header>
            <Content style={{ padding: '50px 50px 0', flex: '1' }}>
                <PrivateRoute exact path="/" component={asyncDash(store)} />
                <Route exact path="/login" component={asyncLogin(store)} />
                <Route exact path="/logout" component={asyncLogout(store)} />
                <Route exact path="/register" component={asyncRegister(store)} />
            </Content>
            <Footer>
                Copyright © 2010-2017 Fitango Inc. All rights reserved
            </Footer>
>>>>>>> 72480aabc707468c4704c5573f776c606b8e18ce
        </div>
    )}

/*
            <Route exact path="/logout" component={asyncLogout(store)} />
            <PrivateRoute path="/planbuilder" component={asyncPlanbuilder(store)} />
            <PrivateRoute exact path="/plan/:upid" component={asyncPlan(store)} />
            <PrivateRoute exact path="/planstore" component={asyncPlantore(store)} />
            <PrivateRoute exact path="/planstore/plan/:id" component={asyncPlantorePlan(store)} />
            <PrivateRoute path="/settings" component={asyncSettings(store)} />*/
Core.propTypes = {
    token: PropTypes.string,
    //logout: PropTypes.func,
    //children: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    modalChildrens: PropTypes.array,
    hideModal: PropTypes.func
};

Core.defaultProps = {
    token: null,
    children: null,
    state: null,
    loading: false,
    logout: () => {console.log (1);},
};



const mapStateToProps = (state) => {
    //  console.log(state);
    return {
        token: state.user.token,
        isLoading: state.user.loading,
        state: state
    }
};



const mapDispatchToProps = (dispatch) => {
    return {
        logout: (info) => {
            console.log(111);
            dispatch(logoutUser(info));
        },
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Core));