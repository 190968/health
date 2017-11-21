import React from 'react'
import { IndexLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './index.scss'
import './box.scss'

import { Container, Row, Col } from 'reactstrap';



import LoginForm from '../routes/User/containers/loginContainer';
import Header from './PageLayout/Header';
import { logoutUser } from '../routes/User/modules/user';


const App = require('../components/App').default
import { Route } from "react-router-dom";



// add
import {asyncPlan, asyncPlantore, asyncDash, asyncLogin, asyncLogout, asyncPlanbuilder, asyncPlantorePlan, asyncSettings } from '../routes';
import PrivateRoute from '../routes/privateRoute';

export const PageLayout = ({token, isLoading, children, logout, store,location}) =>  {
  // const ready = true//state.ready || false;
    if (isLoading) {
        return ('Loading app');
    }
    //console.log(this.props);
  return (
    <div style={{height:'100%'}}>
      <Header />
      <Container>
          <PrivateRoute exact path="/" component={asyncDash(store)} />
          <Route exact path="/login" component={asyncLogin(store)} />
          <Route exact path="/logout" component={asyncLogout(store)} />
          <PrivateRoute path="/planbuilder" component={asyncPlanbuilder(store)} />
          <PrivateRoute exact path="/plan/:upid" component={asyncPlan(store)} />
          <PrivateRoute exact path="/planstore" component={asyncPlantore(store)} />
          <PrivateRoute exact path="/planstore/plan/:id" component={asyncPlantorePlan(store)} />
          <PrivateRoute path="/settings" component={asyncSettings(store)} />
      </Container>
      <footer className="footer">
        <div className="container">
          <span className="text-muted">Place sticky footer content here.</span>
        </div>
      </footer>
    </div>
  )}
PageLayout.propTypes = {
  token: PropTypes.string,
  //logout: PropTypes.func,
  //children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  modalChildrens: PropTypes.array,
  hideModal: PropTypes.func
};

PageLayout.defaultProps = {
  token: null,
  children: null,
  state: null,
    isLoading: false,
  // logout: () => {console.log (1);},
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
    //logout: (info) => {dispatch(logoutUser(info))},
  }
};

import { withRouter } from 'react-router-dom';
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageLayout));