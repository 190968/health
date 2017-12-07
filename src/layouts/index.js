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

export const Core = ({token, loading, children, logout, store,location}) =>  {
    // const ready = true//state.ready || false;
    //console.log(token);
    //console.log(loading);
    if (loading) {
        return ('Loading app');
    }
    return (
        <div style={{height:'100%', display: 'flex',
            'minHeight': '100vh',
            'flexDirection':'column'}}>
            <Header>
                <LayoutHeader loading={loading} />
            </Header>
            <Content style={{ padding: '20px 50px', flex: '1' }}>
                <PrivateRoute exact path="/" component={asyncDash(store)} />
                <Route exact path="/login" component={asyncLogin(store)} />
                <Route exact path="/logout" component={asyncLogout(store)} />
                <Route exact path="/register" component={asyncRegister(store)} />
                <Route exact path="/settings" component={asyncSettings(store)} />
            </Content>
            <Footer>
                Copyright © 2010-2017 Fitango Inc. All rights reserved
            </Footer>
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
        loading: state.network.loading,
        token: state.user.token,
        state: state
    }
};




const mapDispatchToProps = (dispatch) => {
    //console.log(1);
    return {
        /*increment: (info) => {dispatch(increment(info))},
        doubleAsync*/
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Core));