/**
 * Created by Павел on 29.01.2018.
 */

import React from 'react'
import {connect} from 'react-redux'
import Discussions from '../components/CommunityDiscussions';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo} from 'react-apollo'
import {withRouter} from "react-router-dom";

const addDuscussion = gql`
mutation discussionCreate($categoryId:ID!,$subject:String!,$message:String!) {

       discussionCreate(categoryId:$categoryId,subject:$subject,message:$message) {
         id
         title
         text
         createdAt
         lastReplyAt
         category {
           id
         }
         views
        replies{
          totalCount
          edges{
            id
            text
            date
            createdAt
            isImportant
            unread
          }
        }      
       }
}

`;

const withMutation = graphql(addDuscussion, {
    props: ({ ownProps, mutate }) => ({
        addDuscussion: input => {
            return mutate({
                variables: { categoryId: ownProps.categoryId,subject: input.title,message: input.text} ,
            })
        },
    }),
});

const mapStateToProps = (state) => {

    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (values) => {
        ownProps.addDuscussion(values).then(({data}) => {
            ownProps.history.push('/discussion/'+data.discussionCreate.id);
        }).catch((error) => {
            console.log("FAIL!!!!"+error);
        });
    },
});

export default withRouter(withMutation(connect(mapStateToProps, mapDispatchToProps)(Discussions)));
