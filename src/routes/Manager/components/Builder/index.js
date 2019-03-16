import React from 'react'
import {NavLink, Switch, Route} from 'react-router-dom';
import {AssessmentBuilder} from './containers/Assessment';
import {PathwayBuilder} from './containers/Pathway';
import {ActionPlanBuilder} from './containers/ActionPlan';

const BuilderLayout = ({loading, user, store, location}) => {
    return (
            <Switch>
                <Route path="/builder/assessment/:id?/:action?" component={AssessmentBuilder}/>
                <Route path="/builder/pathway/:id?/:action?" component={PathwayBuilder}/>
                <Route path="/builder/ap/:id?/:action?" component={ActionPlanBuilder}/>
            </Switch>
    )
}

export default BuilderLayout;
