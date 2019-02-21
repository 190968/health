

import React from 'react';
import Loadable from '../../../components/Loadable';
import { Route } from 'react-router-dom'

const AsyncIndex = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "planstoreChunk" */'../containers/PlanstoreLayout.js'),
        })
    );
}


const AsyncView = () => {
    return (
        Loadable({
            loader: () => import(/* webpackChunkName: "planstoreViewChunk" */'../../../routes/Planstore/containers/view.js'),
        })
    );
}

export const PlanstoreLayout = ({plans, loading, loadMoreEntries}) => (
    <div>
        <Route exact path='/planstore' component={AsyncIndex()} />
        <Route exact path='/planstore/plan/:id' component={AsyncView()} />
    </div>
)

export default PlanstoreLayout
