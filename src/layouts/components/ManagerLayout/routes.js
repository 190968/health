import React from 'react'
import PrivateRoute from '../../../routes/privateRoute';
import {asyncWorkflow, asyncActionplans, asyncProfile, asyncPatients, asyncPathways, asyncStages, asyncCancers, asyncChemotherapies, asyncTumorboards} from '../../../routes/manager';

export const ManagerRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute path="/u/:id/:tab?/:subtab?" component={asyncProfile(store)}/>
            <PrivateRoute path="/workflow" component={asyncWorkflow(store)}/>
            <PrivateRoute path="/patients" component={asyncPatients(store)}/>
            <PrivateRoute path="/actionplans" component={asyncActionplans(store)}/>
            <PrivateRoute path="/pathways" component={asyncPathways(store)}/>
            <PrivateRoute path="/tumorboards" component={asyncTumorboards(store)}/>
            <PrivateRoute path="/stages" component={asyncStages(store)}/>
            <PrivateRoute path="/cancers" component={asyncCancers(store)}/>
            <PrivateRoute path="/chemotherapies" component={asyncChemotherapies(store)}/>
        </React.Fragment>
    )
}
