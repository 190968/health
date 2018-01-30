/**
 * Created by Павел on 29.01.2018.
 */

import React from 'react'
import { connect } from 'react-redux'


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */
import {compose} from 'react-apollo';
import Discussion from '../components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {withRouter} from "react-router-dom";

const DISCUSSION  = gql`
 query GET_DISCUSSION($id:ID) {

       discussion(id:$id) {
         id
         title
         text
         createdAt
         lastReplyAt
         category {
           id
           isJoined
           canJoin
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
const discussionReply = gql`
   mutation discussionReply($id:ID!,$parentMessageId:ID,$message:String!) {

  discussionReply(id:$id,parentMessageId:$parentMessageId,message:$message) {
         id
         text
    createdAt
    isImportant
    unread
       }
}

`;
const discussionDelete = gql`
  mutation discussionDelete($id:ID!) {

  discussionDelete(id:$id) {
         id
         title
    text
    createdAt
    lastReplyAt
    category {
      id
    }
    views
    replies {
      edges {
        id
      }
    }
       }
}
`;
const withQuery = graphql(DISCUSSION, {
    options: (ownProps) => {
        console.log(ownProps);
        return   {
            variables: {
                id: ownProps.match.params.id,
            },
            fetchPolicy: 'network-only'
        }},
    props: ({ ownProps, data }) => {
        console.log(data);
        if (!data.loading) {
            return {
                discussion: data.discussion,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
})(Discussion);

const withMutation = graphql(discussionReply, {
    props: ({ mutate }) => ({
        discussionReply: (input,id) => {
            return mutate({
                variables:  {
                    id: id,
                    message: input.text
                },
            })
        },
    }),
});
const withMutationDelete = graphql(discussionDelete, {
    props: ({ mutate }) => ({
        discussionDelete: (id) => {
            return mutate({
                variables:  {
                    id: id
                },
            })
        },
    }),
});
const WithMutations = compose(
    withMutation,
    withMutationDelete
);
const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (value) => {
        ownProps.discussionReply(value,ownProps.match.params.id).then(({data}) => {
        })
    },
    onClick: () => {
        ownProps.discussionDelete(ownProps.match.params.id).then(({data}) => {
            ownProps.history.push("/community/"+data.discussionDelete.category.id);
        })
    },
});

export default withRouter(WithMutations(connect(mapStateToProps, mapDispatchToProps)(withQuery)));