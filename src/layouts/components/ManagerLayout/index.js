import React from 'react'
import {Switch, Route} from 'react-router-dom';
import {asyncPlanbuilder, asyncBuilder} from '../../../routes/manager';

 import BasicLayout from './containers/Basic';
import { asyncAssessment } from '../../../routes';


const ManagerLayout = ({loading, user, store, location}) => {
    return (
            <Switch>
                <Route path="/builder" component={asyncBuilder(store)}/>
                <Route path="/pb" component={asyncPlanbuilder(store)}/>
                <Route path="/assessment/:id?" component={asyncAssessment}/>
                <Route path="/:tab?/:subtab?" component={BasicLayout} />
            </Switch>
    )
}

export default ManagerLayout;
