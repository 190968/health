/**
 * Created by Pavel on 13.01.2018.
 */


import React from 'react';
import Loadable from '../../../components/Loadable';
import { Route ,Link} from 'react-router-dom'
import {Breadcrumb ,Row } from 'antd';
let Crumb = [];
const AsyncCategoryView = () => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/view.js'),
})
    );
}

 const AsyncCategoryDash = () => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/mainCategories.js')
})
    );
}

// const AsyncMyCommunity = () => {
//     return (
//         Loadable({
//             loader: () => import('../../../routes/Community/containers/myCommunities.js')
// })
//     );
// }

// Crumb.push(
//     <Breadcrumb.Item><Link to={"/community/"+id}>{name}</Link></Breadcrumb.Item>
// )

class CommunityLayout extends React.Component {

    constructor(props){
        super(props);
    }


    render() {
        const {loading, loadMoreEntries} = this.props;

        return (<div>
            {/*<Row style={{marginBottom: 10}}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to="/community">Community</Link></Breadcrumb.Item>
                </Breadcrumb>
            </Row>*/}
            <Route exact path='/community' component={AsyncCategoryDash()}/>
            {/*<Route exact path='/community' component={AsyncMyCommunity()} />*/}
            <Route exact path="/community/:id" component={AsyncCategoryView()}/>
        </div>)
    }
}

export default CommunityLayout
