import React from 'react'
import PrivateRoute from '../../../routes/privateRoute';
import {asyncWorkflow} from '../../../routes/manager';

export const ManagerRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute path="/workflow" component={asyncWorkflow(store)}/>
        </React.Fragment>
    )
}
