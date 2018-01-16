/**
 * Created by Pavel on 13.01.2018.
 */


import React from 'react';
import Loadable from '../../../components/Loadable';
import { Route ,Link} from 'react-router-dom'
import {Breadcrumb ,Row } from 'antd';
let Crumb = [];
const AsyncCategoryView = (props) => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/view.js'),

        },undefined, props)
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
        if(this.state.breadcrumbitem) {
            Crumb.push(
                <Breadcrumb.Item><Link to="/community">{this.state.breadcrumbitem}</Link></Breadcrumb.Item>
            )
        }
        return (<div>
            <Row style={{marginBottom: 10}}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to="/community">Community</Link></Breadcrumb.Item>
                    {Crumb}
                </Breadcrumb>
            </Row>
            <Route exact path='/community' component={AsyncCategoryDash()} />
            <Route exact path="/community/:id" component={AsyncCategoryView({handleBreadcrumbChange:this.handleBreadcrumbChange})}/>
        </div>)
    }
}

export default CommunityLayout
