/**
 * Created by Павел on 27.01.2018.
 */

import React, { PropTypes } from 'react';
import { Card,Form,List  } from 'antd';
import apolloClient from '../../../../../../../../clients/apolloClient';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PlanWidget from '../../../../../../../Plan/components/Plan';
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
    const {plans,loading}= this.props;
        return(
            <Card
            title="Related Actionplan"
            >
                {plans.length > 0 ? <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4}}
                    dataSource={plans}
                    renderItem={product => (
                        <List.Item key={product.id}>
                            <PlanWidget info={product} key={product.id}/>
                        </List.Item>
                    )}
                /> : <Card style={{textAlign:'center'}}>No ActionPlans Found</Card>}
            </Card>
        );
    }

}

const WrappedPlan = Form.create()(Plan);
export default withApollo(withRouter(WrappedPlan));
