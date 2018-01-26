/**
 * Created by Павел on 27.01.2018.
 */

import React, { PropTypes } from 'react';
import { Card,Form,AutoComplete ,Input } from 'antd';
import apolloClient from '../../../../../../../../clients/apolloClient';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import '../../../../../../style.css';
import {
    withRouter
} from 'react-router-dom'

class Plan extends React.PureComponent{

    constructor(props) {
        super(props);

    }


    onChange = (value) => {

        //console.log(value);
        if (!this.props.loading)
            this.props.loadMoreEntries(value)
    };

    onSelect(value) {
        // redirect to the proper category
        //console.log(this.props);
        this.props.history.push('/community/'+value)
    }



    render(){

        return(
            <Card
            title="RELATED ACTIONPLANS"
            >
               pasha
            </Card>
        );
    }

}

const WrappedPlan = Form.create()(Plan);
export default withApollo(withRouter(WrappedPlan));
