
import { Switch, Route, IndexLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import ReactPlaceholder from 'react-placeholder';
import { Spin,Modal,Button } from 'antd';
import VerifyPhone from '../routes/User/containers/verifyPhoneContainer';
import { Layout, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import LayoutHeader from './components/Header';



import {asyncDash, asyncPlan,  asyncLogin, asyncRegister, asyncLogout, asyncSettings, asyncForgotPassword, asyncPlanstore,asyncHealth,asyncVerifyPhone,asyncVerifyPhoneConfirm,asyncCommynity, asyncCalendar, asyncMessages, asyncHelp/*,asyncDiscussion,asyncPlan,asyncPlanbuilder, asyncPlantorePlan,  */} from 'routes';


import PrivateRoute from '../routes/privateRoute';
import IdleTimer from 'react-idle-timer';

//const App = require('../components/App').default
const { Header, Content, Footer } = Layout;

export const CoreLayout = ({loading, user, store, location}) =>  {






    return (

        <div style={{height:'100%', display: 'flex',
            'minHeight': '100vh',
            'flexDirection':'column'}}>



            <Header>
                <LayoutHeader loading={loading} location={location}  />
            </Header>
            <Content style={{ padding: '20px 50px', flex: '1' }}>
                <PrivateRoute exact path="/" component={asyncDash(store)} />
                <Route exact path="/login" component={asyncLogin(store)} />
                <Route exact path="/logout" component={asyncLogout(store)} />
                <Route exact path="/register/:code?" component={asyncRegister(store)} />
                <Route exact path="/password/reset" component={asyncForgotPassword(store)} />
                <PrivateRoute path="/settings" component={asyncSettings(store)} />
                <PrivateRoute path="/planstore" component={asyncPlanstore(store)} />
                <PrivateRoute path="/messages" component={asyncMessages(store)} />
                <PrivateRoute path="/community" component={asyncCommynity(store)} />
                <PrivateRoute path="/calendar" component={asyncCalendar(store)} />
                <PrivateRoute path="/health" component={asyncHealth(store)} />
                <PrivateRoute path="/help" component={asyncHelp(store)} />
                <PrivateRoute  path="/plan/:upid" component={asyncPlan(store)} />
            </Content>
            <Footer>
                Copyright © 2010-2017 Fitango Inc. All rights reserved
            </Footer>

        </div>
    )}

class Core extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isIddle: false } ;
        this._onActive = this._onActive.bind(this);
        this._onIdle = this._onIdle.bind(this);
        this._onLogout = this._onLogout.bind(this);
    };
    static propTypes = {
        token: PropTypes.string,
        //logout: PropTypes.func,
        //children: PropTypes.node.isRequired,
        loading: PropTypes.bool,
        modalChildrens: PropTypes.array,
        hideModal: PropTypes.func
    };

    static defaultProps = {
        token: null,
        children: null,
        user: null,
        loading: false,
    };

    _onLogout() {
        console.log( this.props);
        //this.props.history.push('/logout');
    };
    _onActive() {
        this.setState({isIddle:false});
    };
    _onIdle() {
        this.setState({isIddle:true});
    };


    render() {

        const {loading, user, store, location} = this.props;

        if (loading) {
            return (
                <div style={{height:'100%', width:'100%',overflow: 'auto', display: 'flex',top: '50%', position: 'absolute',
                    'minHeight': '100vh',
                    'flexDirection':'column'}}>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                </div>
            );
        }

        if(user.info.id && !user.info.phoneConfirmed){
            return(
                <VerifyPhone  />
            )
        }

        return (

            <React.Fragment>
                {this.state.isIddle ? <Modal title="No Activity" visible={true}
                                             onCancel={this._onLogout}
                                             onOk={this._onActive} okText="Continue" cancelText="Logout"
                    >
                        You've been inactive. Would you like to continue or logout
                    </Modal> :

                    ( user.info.id ?
                    <IdleTimer
                        ref="idleTimer"
                        element={document}
                        idleAction={this._onIdle}
                        timeout={300000}
                        format="MM-DD-YYYY HH:MM:ss.SSS">
                        <CoreLayout {...this.props} />
                    </IdleTimer> : <CoreLayout {...this.props} />)
                }
            </React.Fragment>)
    }
}



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


export  default withRouter(connect(mapStateToProps, mapDispatchToProps)(Core));