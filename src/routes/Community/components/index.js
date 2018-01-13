/**
 * Created by Pavel on 13.01.2018.
 */


import React from 'react';
import Loadable from '../../../components/Loadable';
import { Route ,Link} from 'react-router-dom'
import {Breadcrumb ,Row } from 'antd';
let Crumb = [];
const AsyncCommunity = () => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/view.js'),
})
    );
}

 const AsyncCategory = () => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/mainCategories.js')
})
    );
}

// Crumb.push(
//     <Breadcrumb.Item><Link to={"/community/"+id}>{name}</Link></Breadcrumb.Item>
// )


export const CommunityLayout = ({loading, loadMoreEntries}) => (
    <div>
        <Row>
            <Breadcrumb separator=">">
                <Breadcrumb.Item><Link to="/community">Community</Link></Breadcrumb.Item>

            </Breadcrumb>
        </Row>
        <Route exact path='/community' component={AsyncCategory()} />
        <Route exact path="/community/:id" component={AsyncCommunity()} />
    </div>
)
//
CommunityLayout.propTypes = {

}


export default CommunityLayout
