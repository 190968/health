import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { withCurrentUser } from '../queries/user';

const PrivateRoute = ({state, currentUser={}, component: Component, ...rest }) => {
    //console.log(rest);
    const {path} = rest;
    const {token=''} = currentUser;
    return <Route {...rest} render={props => (
        token !== '' ? (
            <Component {...props}/>
        ) : (
            path != '/login' ? <Redirect to={{
                     pathname: '/login',
                     state: {from: props.location}
                 }}/> : 
                <div>Redirect to login</div>
        )
    )}/>
}

 

export default withCurrentUser(PrivateRoute);