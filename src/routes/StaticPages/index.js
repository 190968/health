import React from 'react';
import DemoEnd from './components/DemoEnd';
import {
    Route, Switch
  } from "react-router-dom";

const campaignRouter = (props) => {
    return (
        <Switch>
            <Route path="/static/demo/finish" component={DemoEnd}/>
        </Switch>
    )
}
 

export default campaignRouter;