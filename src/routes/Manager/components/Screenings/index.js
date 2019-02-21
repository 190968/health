import React from 'react';
import ScreeningsList from './containers/List';
// import ScreeningsView from './containers/View';
import {
    Route, Switch
  } from "react-router-dom";

const ScreeningsRouter = (props) => {
    return (
        <Switch>
            {/* <Route path="/screenings/view/:id" component={ScreeningsView}/> */}
            <Route component={ScreeningsList}/>
        </Switch>
    )
}
 

export default ScreeningsRouter;