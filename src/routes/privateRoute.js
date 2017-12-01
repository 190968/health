import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

var token = localStorage.getItem('token');
//console.log( this.props.store);
const PrivateRoute = ({state, component: Component, ...rest }) => (

    <Route {...rest} render={props => (
       token !='' ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
    }}/>
        )
    )}/>
)

const mapStateToProps = (state,ownProps) => {

    console.log("---"+state.user.token);
    return {
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);