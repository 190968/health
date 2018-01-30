/**
 * Created by Павел on 29.01.2018.
 */

import React from 'react'
import { connect } from 'react-redux'


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import Discussion from '../components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


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
const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (value) => {
       // console.log(value);
        ownProps.discussionReply(value,ownProps.match.params.id).then(({data}) => {
console.log(data,"------------ pam")
        })
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(withQuery));