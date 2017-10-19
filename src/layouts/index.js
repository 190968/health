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


/** loadable **/
import Loadable from '../components/Loadable';
const asyncPlantore = (store) => {
    //console.log(store);
    return  (
        Loadable({
            loader: () => import('../routes/Planstore/components/PlanstoreLayout')
        }, store)
    );
}

const asyncPlantorePlan = () => {
     return (
         Loadable(     {
               loader: () => import('../routes/Planstore/containers/PlanstorePlanLayout')
            })
    );
}

const asyncLogin = (store) => {
    return (
        Loadable({
            loader: () => import('../routes/User/containers/LoginContainer'),
            reducers: {
                'url':'User/modules/login',
                'key': 'user'
            }
        }, store)
    );
}

const asyncSettings = (store) => {
    return (
        Loadable({
                loader: () => import('../routes/Settings/components/SettingsLayout')
        
        })
    );
}

// add
import PrivateRoute from '../routes/privateRoute';

export const PageLayout = ({token, children, logout, store}) =>  {
  // const ready = true//state.ready || false;
    //console.log(this);
  return (
    <div style={{height:'100%'}}>
      <Header />
      <Container>
          <Route exact path="/login" component={asyncLogin(store)} />
          <PrivateRoute exact path="/planstore" component={asyncPlantore(store)} />
          <PrivateRoute exact path="/planstore/plan/:pid" component={asyncPlantorePlan(store)} />
          <PrivateRoute  path="/settings" component={asyncSettings(store)} />
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
  // logout: () => {console.log (1);},
};



const mapStateToProps = (state) => {
  return {
    token: state.user.token,
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