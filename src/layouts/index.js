
import { Route, IndexLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import ReactPlaceholder from 'react-placeholder';
import { Spin,Modal,Button } from 'antd';
import VerifyPhone from '../routes/User/containers/verifyPhoneContainer';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import LayoutHeader from './Header';


// add Routes
import {asyncDash,  asyncLogin, asyncRegister, asyncLogout, asyncSettings, asyncForgotPassword, asyncPlanstore,asyncVerifyPhone,asyncVerifyPhoneConfirm/*,asyncPlan,asyncPlanbuilder, asyncPlantorePlan,  */} from 'routes';

import PrivateRoute from '../routes/privateRoute';

//const App = require('../components/App').default
const { Header, Content, Footer } = Layout;

export const Core = ({loading, user, store, location}) =>  {
//console.log(store);

    if (loading) {
        return (
            <div style={{height:'100%', width:'100%',overflow: 'auto', display: 'flex',top: '50%', position: 'absolute',
                'minHeight': '100vh',
                'flexDirection':'column'}}>
          <Spin />
                </div>
        );
    }

    if(user.info.id && !user.info.phoneConfirmed){
        return(
            <VerifyPhone  />
        )
    }




    return (

        <div style={{height:'100%', display: 'flex',
            'minHeight': '100vh',
            'flexDirection':'column'}}>



            <Header>
                <LayoutHeader loading={loading} location={location} />
            </Header>
            <Content style={{ padding: '20px 50px', flex: '1' }}>
                <PrivateRoute exact path="/" component={asyncDash(store)} />
                <Route exact path="/login" component={asyncLogin(store)} />
                <Route exact path="/logout" component={asyncLogout(store)} />
                <Route exact path="/register/:code?" component={asyncRegister(store)} />

                <PrivateRoute path="/settings" component={asyncSettings(store)} />
                <PrivateRoute path="/planstore" component={asyncPlanstore(store)} />

            </Content>
            <Footer>
                Copyright © 2010-2017 Fitango Inc. All rights reserved
            </Footer>

        </div>
    )}

/*
            <Route exact path="/logout" components={asyncLogout(store)} />
            <PrivateRoute path="/planbuilder" components={asyncPlanbuilder(store)} />
            <PrivateRoute exact path="/plan/:upid" components={asyncPlan(store)} />
            <PrivateRoute exact path="/planstore" components={asyncPlantore(store)} />
            <PrivateRoute exact path="/planstore/plan/:id" components={asyncPlantorePlan(store)} />
            <PrivateRoute path="/settings" components={asyncSettings(store)} />*/
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
    user: null,
    loading: false,
};



const mapStateToProps = (state) => {
     //console.log(state);
    return {
        loading: state.network.loading,
        token: state.user.token,
        user: state.user
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