import React from 'react'
import PrivateRoute from '../../../routes/privateRoute';
import {asyncWorkflow, asyncActionplans, asyncPlanbuilder} from '../../../routes/manager';

export const ManagerRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute path="/workflow" component={asyncWorkflow(store)}/>
            <PrivateRoute path="/actionplans" component={asyncActionplans(store)}/>
        </React.Fragment>
    )
}
