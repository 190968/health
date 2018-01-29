/**
 * Created by Павел on 29.01.2018.
 */

import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'react-apollo';
import {message} from 'antd';
import { Redirect} from 'react-router-dom'
import Discussions from '../components/CommunityDiscussions';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

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
    props: ({ mutate }) => ({
        addDuscussion: input => {
            return mutate({
                variables: { categoryId: 492,subject: input.title,message: input.text} ,
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
            console.log("addDuscussion"+data.discussionCreate.id);
            return  <Redirect to={{
                pathname: '/discussion/'+data.discussionCreate.id
            }} />;
        })
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Discussions));
