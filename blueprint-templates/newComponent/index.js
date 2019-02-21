import React from 'react';
import List from './containers/List';
import {
    Route, Switch
  } from "react-router-dom";

const {{ $moduleName }}Router = (props) => {
    return (
        <Switch>
            <Route component={List}/>
        </Switch>
    )
}
 

export default {{$moduleName}}Router;