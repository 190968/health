import React from 'react';
import List from './containers/List';
import {
    Route, Switch
  } from "react-router-dom";

const ProgramRouter = (props) => {
    return (
        <Switch>
            <Route component={List}/>
        </Switch>
    )
}
 

export default ProgramRouter;