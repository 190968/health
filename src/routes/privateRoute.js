import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { withCurrentUser } from '../queries/user';

const PrivateRoute = ({state, currentUser:{token}, component: Component, ...rest }) => {
    return <Route {...rest} render={props => (
        token !== '' ? (
            <Component {...props}/>
        ) : (
        //<div>Redirect to login</div>
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
}

 

export default withCurrentUser(PrivateRoute);