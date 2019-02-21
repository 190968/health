import React from 'react'
import {Switch, Route} from 'react-router-dom';
import {asyncPlanbuilder} from '../../../routes/manager';

 import BasicLayout from './containers/Basic';


const ManagerLayout = ({loading, user, store, location}) => {
    return (
            <Switch>
                <Route path="/pb" component={asyncPlanbuilder(store)}/>
                <Route path="/:tab?/:subtab?" component={BasicLayout} />
            </Switch>
    )
}

export default ManagerLayout;
