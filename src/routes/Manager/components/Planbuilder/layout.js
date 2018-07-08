import React from 'react'
import {NavLink, Switch, Route} from 'react-router-dom';
import Planbuilder from '../../containers/Planbuilder';

const PlanbuilderLayout = ({loading, user, store, location}) => {
    return (
            <Switch>
                <Route path="/pb/type/:type" component={Planbuilder}/>
                <Route path="/pb/:id?/:tab?/:subtab?" component={Planbuilder}/>
            </Switch>
    )
}

export default PlanbuilderLayout;
