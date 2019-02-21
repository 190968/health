import React from 'react';
import CohortsPure from '../../containers/Cohorts';
import CohortView from './containers/View';
import {
    Route, Switch
  } from "react-router-dom";

const CohortsRouter = (props) => {
    return (
        <Switch>
            <Route path="/cohorts/view/:id/:tab?" component={CohortsPure}/>
            <Route component={CohortsPure}/>
        </Switch>
    )
}
 

export default CohortsRouter;