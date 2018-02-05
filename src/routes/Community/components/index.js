
import React from 'react';
import Loadable from '../../../components/Loadable';
import Breadcrumbs from '../components/Breadcrumbs';
import {Breadcrumb,Alert ,Row } from 'antd';
import { Router, Route, Link } from 'react-router-dom';

let Crumb = [];

const AsyncCategoryView = (props) => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/view.js'),
            modules: ['../../../routes/Community/containers/view.js'],
        webpack: () => [require.resolveWeak('../../../routes/Community/containers/view.js')],
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
const AsyncCommynityDiscussion = (props) => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/discussions.js')
}, undefined, props)
    );
}

class CommunityLayout extends React.Component {

    constructor(props){
        super(props);
        this.state = {breadcrumbitems: []};
        this.handleBreadcrumbChange = this.handleBreadcrumbChange.bind(this);
        this.getBreadcrumbs = this.getBreadcrumbs.bind(this);
    }

    handleBreadcrumbChange(breadcrumbitems) {
        //console.log(breadcrumbitems,"-------breadcrumbitem-------");

        //this.setState({breadcrumbitems: breadcrumbitems});
    }

    getBreadcrumbs() {
        return this.state.breadcrumbitems;
    }

    render() {
        const {loading, loadMoreEntries} = this.props;

        return (
            <div>
                <Row style={{marginBottom: 10}}>
                    <Breadcrumbs breadcrubsHandle={this.getBreadcrumbs}  />
                </Row>
                <Route exact path='/community' component={AsyncCategoryDash()} />
                <Route exact path="/community/discussion/:id" component={AsyncCommynityDiscussion({handleBreadcrumbChange:this.handleBreadcrumbChange})} />
                <Route exact path="/community/:id" component={AsyncCategoryView({handleBreadcrumbChange:this.handleBreadcrumbChange})}/>
            </div>


        )
    }
}

export default CommunityLayout
