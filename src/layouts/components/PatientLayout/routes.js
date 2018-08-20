import React from 'react'
import {BasicRoutes, CoreRoutes, CoreRoutesEnd} from '../../routes';
import PrivateRoute from '../../../routes/privateRoute';
import {
    Route, Switch
  } from "react-router-dom";
  
import {
    asyncPlanstore,
    asyncHealth,
    asyncCommynity,
    asyncHelp,
    asyncMotivation,
    asyncProfile,
    asyncLogin
} from '../../../routes';

export const PatientRoutes = ({store}) => {
    return 1;
    // return (
    //     <Switch>
    //         <BasicRoutes store={store} />
    //         <PrivateRoute path="/planstore" component={(store)}/>
    //         <PrivateRoute path="/" component={(store)}/>
    //         <PrivateRoute path="/" component={(store)}/>
    //         <PrivateRoute path="/" component={(store)}/>
    //         <PrivateRoute path="/" component={(store)}/>
    //         <PrivateRoute path="" component={(store)}/>
    //     </Switch>
    // )
}



export const PatientRoutesList = [
    ...CoreRoutes,
    {
      path: "/planstore",
      component: asyncPlanstore(),
    },
    {
        path: "/community",
        component: asyncCommynity(),
    },
    {
        path: "/health",
        component: asyncHealth(),
    },
    {
        path: "/help",
        component: asyncHelp(),
    },
    {
        path: "/motivation",
        component: asyncMotivation(),
    },
    {
        path: "/u/:uid",
        component: asyncProfile(),
    },
    ...CoreRoutesEnd
  ];
