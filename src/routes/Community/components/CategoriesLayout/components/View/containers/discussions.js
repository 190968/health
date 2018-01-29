/**
 * Created by Павел on 29.01.2018.
 */

import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'react-apollo';
import {message} from 'antd';

import Discussions from '../components/CommunityDiscussions';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const addDuscussion = gql`
mutation CATEGORY_JOIN ($id:ID!,$uid:ID){
    categoryJoin(id:$id,uid:$uid)
  }

`;

const withMutation = graphql(addDuscussion, {
    props: ({ mutate }) => ({
        addDuscussion: input => {
            return mutate({
                variables: { input: {email: input.email, password: input.password} },
            })
        },
    }),
});

const mapStateToProps = (state) => {

    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (values) => {
        // ownProps.addDuscussion(id).then(({data}) => {
            console.log("addDuscussion"+values.title,values.text);
        // })
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Discussions));
