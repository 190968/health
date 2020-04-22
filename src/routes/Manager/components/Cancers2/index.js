import React from 'react';
import List from './containers/List';
import {
    Route, Switch
  } from "react-router-dom";

export const Cancers2 = (props) => {
    return (
        <Switch>
            <Route component={List}/>
        </Switch>
    )
}
 

export default List;