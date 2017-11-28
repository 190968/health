import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({token, component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        1===1 /*|| token != '' /*fakeAuth.isAuthenticated*/ ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

const mapStateToProps = (state) => {
    console.log(state);
    return {
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);