import React from "react";
import { Route, Switch } from "react-router-dom";





import Loadable from '../components/Loadable';



const asyncPlantore = (store) => {
    //console.log(store);
    return  (
        Loadable({
            loader: () => import('./Planstore/components/PlanstoreLayout')
        }, store)
    );
}

export default (store) => (// (store) {
    <Switch>
      <Route
          path="/planstore"
          component={asyncPlantore(store)}
      />
    </Switch>
)
;