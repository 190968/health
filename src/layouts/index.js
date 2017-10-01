import React from 'react'
import { IndexLink, Link } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './index.scss'
import './box.scss'

import { Container, Row, Col } from 'reactstrap';



import LoginForm from '../routes/User/containers/loginContainer';
import Header from './PageLayout/Header';
import { logoutUser } from '../routes/User/modules/user';



const App = require('../components/App').default

export const PageLayout = ({token, children, logout}) =>  {
  //onsole.log(loading);
  // const ready = true//state.ready || false;
  return (
    <div style={{height:'100%'}}>
      <Header />
      <Container>
        <main>
          {!token ? (
            <div id="logout">
              <h2>You are not authenticated!</h2>
              <div>
                <LoginForm/>
                <Link to="/signup">Don't have an account? Register here! </Link>
              </div>

            </div>
          ) : (
            <div id="auth">
              {children}
            </div>
          )}
        </main>
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
  children: PropTypes.node.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);

