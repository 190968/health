import React from 'react'
import {Route} from 'react-router-dom'
import PrivateRoute from '../routes/privateRoute';


import {
    asyncDash,
    asyncPlan,
    asyncLogin,
    asyncRegister,
    asyncLogout,
    asyncSettings,
    asyncForgotPassword,
    asyncCalendar,
    asyncMessages,
} from '../routes';

export const BasicRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute exact path="/" component={asyncDash(store)}/>
            <Route exact path="/login" component={asyncLogin(store)}/>
            <Route exact path="/logout" component={asyncLogout(store)}/>
            <Route exact path="/register/:code?" component={asyncRegister(store)}/>
            <Route exact path="/password/reset" component={asyncForgotPassword(store)}/>
            <PrivateRoute path="/settings" component={asyncSettings(store)}/>
            <PrivateRoute path="/messages/:id?" component={asyncMessages(store)}/>
            <PrivateRoute path="/calendar" component={asyncCalendar(store)}/>
            <PrivateRoute path="/plan/:upid" component={asyncPlan(store)}/>
        </React.Fragment>
    )
}

