import React from 'react'
import {NavLink, Switch, Route} from 'react-router-dom';
import {AssessmentBuilder} from './containers/Assessment';

const BuilderLayout = ({loading, user, store, location}) => {
    return (
            <Switch>
                <Route path="/builder/assessment/:id?/:action?" component={AssessmentBuilder}/>
            </Switch>
    )
}

export default BuilderLayout;
