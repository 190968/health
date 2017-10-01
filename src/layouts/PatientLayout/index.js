import React from 'react'
import { IndexLink, Link } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import LoginForm from '../../routes/User/containers/loginContainer';
import Header from './Header';
import { logoutUser } from '../../routes/User/modules/user';

import { Container, Row, Col } from 'reactstrap';

const App = require('../../components/App').default


import Header from 'containers/Header';
import Footer from 'components/Footer';
import MDSpinner from 'react-md-spinner';


export const PageLayout = ({token, children, logout}) =>  {
    //onsole.log(loading);
    // const ready = true//state.ready || false;
    return (
        <div style={{height:'100%'}}>
            <Container>
                <Header />
            </Container>
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
        /*
      <div className='container text-center'>
          <div className='container text-center'>header</div>
        <h1>React Redux Starter Kit</h1>
        <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
        {' · '}
        <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
        <div className='page-layout__viewport'>
          {children}
        </div>
      </div>*/
    )}
PageLayout.propTypes = {
    token: PropTypes.string,
    //logout: PropTypes.func,
    children: PropTypes.node,
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

