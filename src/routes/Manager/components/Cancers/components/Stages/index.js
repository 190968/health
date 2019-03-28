import React from 'react';
import List from './containers/List';
import {
    Route, Switch
  } from "react-router-dom";

const CancerStageRouter = (props) => {
    return (
        <Switch>
            <Route component={List}/>
        </Switch>
    )
}
 

export default CancerStageRouter;