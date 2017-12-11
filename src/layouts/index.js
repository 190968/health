
import { Route, IndexLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import {Redirect} from 'react-router-dom'
// import VerifyPhone from '../routes/User/components/VerifyPhone';
import VerifyPhone from '../routes/User/containers/verifyPhoneContainer';
import { Layout } from 'antd';



import { withRouter } from 'react-router-dom';


import LayoutHeader from './Header';



// add Routes
import {asyncDash,  asyncLogin, asyncRegister, asyncLogout, asyncSettings, asyncForgotPassword, asyncPlanstore,asyncVerifyPhone,asyncVerifyPhoneConfirm/*,asyncPlan,asyncPlanbuilder, asyncPlantorePlan,  */} from 'routes';

import PrivateRoute from '../routes/privateRoute';

//const App = require('../components/App').default
const { Header, Content, Footer } = Layout;

export const Core = ({token, loading, state, store, location}) =>  {
    // const ready = true//state.ready || false;
    //console.log(token);
    if (loading) {
        return ('Loading app');
    }

    if(!state.user.info.phoneConfirmed){
        return(
            <VerifyPhone/>
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
                <Route exact path="/register" component={asyncRegister(store)} />
                <Route exact path="/verifyPhone" component={asyncVerifyPhone(store)} />
                <Route exact path="/verifyPhoneConfirm" component={asyncVerifyPhoneConfirm(store)} />
                <Route path="/password/reset/:code?" component={asyncForgotPassword(store)} />

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