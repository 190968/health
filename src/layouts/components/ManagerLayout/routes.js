import React from 'react';
import {BasicRoutes, CoreRoutes, CoreRoutesEnd} from '../../routes';
import PrivateRoute from '../../../routes/privateRoute';
import {asyncProfile, asyncWorkflow, asyncActionplans, asyncPrograms,asyncPatients, asyncPathways, asyncStages, asyncCancers, asyncChemotherapies, asyncTumorboards, asyncClinicalTrials,asyncNetworkManager,asyncSupervisors,asyncCareManager,asyncAnalysts,asyncSupportStaff,asyncProviders,asyncPayers,asyncDoctors,asyncAssessments} from '../../../routes/manager';
import {asyncLogin} from '../../../routes';
import {
    Route, Switch
  } from "react-router-dom";

export const ManagerRoutes = ({store}) => {
    return (
        <React.Fragment>
            <BasicRoutes store={store}/>
            <PrivateRoute path="/u/:id/:tab?/:subtab?" component={asyncProfile(store)}/>
            <PrivateRoute path="/workflow" component={asyncWorkflow(store)}/>
            <PrivateRoute path="/patients" component={asyncPatients(store)}/>
            <PrivateRoute path="/actionplans" component={asyncActionplans(store)}/>
            <PrivateRoute path="/pathways" component={asyncPathways(store)}/>
            <PrivateRoute path="/tumorboards" component={asyncTumorboards(store)}/>
            <PrivateRoute path="/stages" component={asyncStages(store)}/>
            <PrivateRoute path="/cancers" component={asyncCancers(store)}/>
            <PrivateRoute path="/chemotherapies" component={asyncChemotherapies(store)}/>
            <PrivateRoute path="/clinicaltrials" component={asyncClinicalTrials(store)}/>
            <PrivateRoute path="/staff/admins" component={asyncNetworkManager(store)}/>
            <PrivateRoute path="/staff/supervisors" component={asyncSupervisors(store)}/>
            <PrivateRoute path="/staff/ncm" component={asyncCareManager(store)}/>
            <PrivateRoute path="/staff/analysts" component={asyncAnalysts(store)}/>
            <PrivateRoute path="/staff/employers" component={asyncSupportStaff(store)}/>
            <PrivateRoute path="/providers" component={asyncProviders(store)}/>
            <PrivateRoute path="/payers" component={asyncPayers(store)}/>
            <PrivateRoute path="/doctors" component={asyncDoctors(store)}/>
            <PrivateRoute path="/assessments" component={asyncAssessments(store)}/>
            <PrivateRoute path="/programs" component={asyncPrograms(store)}/>
        </React.Fragment>
    )
}



const ManagerRoutesList = [
    ...CoreRoutes,
    {
      path: "/patients",
      component: asyncPatients()
    },
    ...CoreRoutesEnd
  ];
