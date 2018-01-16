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
            render(loaded, props)
    {
        console.log(props);
        let View = loaded.default;
        return <View props={props}  handleBreadcrumbChange = {this.handleBreadcrumbChange} />;
    }
        })
    );
}

 const AsyncCategoryDash = (props) => {
    return (
     Loadable({
         loader: () => import('../../../routes/Community/containers/mainCategories.js'),

     }, undefined, props
 )
    );
}


class CommunityLayout extends React.Component {

    constructor(props){
        super(props);
        this.handleBreadcrumbChange = this.handleBreadcrumbChange.bind(this);
        this.state = {breadcrumbitem: ''};
    }

    handleBreadcrumbChange(breadcrumbitem) {
        console.log(breadcrumbitem,"-------breadcrumbitem-------");
        this.setState({ breadcrumbitem});
    }

    render() {
        const {loading, loadMoreEntries} = this.props;

        return (<div>
            <Row style={{marginBottom: 10}}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to="/community">Community</Link></Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Route exact path='/community' component={AsyncCategoryDash({handleBreadcrumbChange:this.handleBreadcrumbChange})} />
            <Route exact path="/community/:id" component={AsyncCategoryView()}/>
        </div>)
    }
}

export default CommunityLayout
