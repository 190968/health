/**
 * Created by Павел on 31.01.2018.
 */
/**
 * Created by Павел on 29.01.2018.
 */

// import React from 'react'
import { connect } from 'react-redux'


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */
import {compose} from 'react-apollo';
import Discussion from '../index.js';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../../User/fragments.js';
import { withDiscussionReplyMutation } from '../mutations.js';


// import {MedicationPlan} from "../../PlansList/components/MedicationPlan/containers";
const DISCUSSION  = gql`
 query GET_DISCUSSION($id:UID) {
   user{
    id
    firstName
            thumbs {
                small
                large
                medium
            }
    fullName
  }
    discussion(id:$id) {
         id
         title
         text
         createdAt
         category {
           id
           isJoined
           canJoin
           name
         }
         attachments {
            id
            type
            label
            url
            size
         }
         author {
            ...UserInfo
         }
         views
         replies {
              totalCount
              edges {
                    id
                    text
                    date
                    createdAt
                    isImportant
                    unread
                    author {
                        ...UserInfo
                    }
                    replies {
                      totalCount
                      edges{
                            id
                            text
                            date
                            createdAt
                            isImportant
                            unread
                            author {
                                ...UserInfo
                            }
                      }
                  }    
              }
          }      
    }
}
${UserInfoFragment}
`;

const discussionDelete = gql`
  mutation discussionDelete($id:UID!) {

  discussionDelete(id:$id) 
}`;
const withQuery = graphql(DISCUSSION, {
    options: (ownProps) => {

        return   {   pollInterval: 20000,
            variables: {
                id: ownProps.match.params.id,
            },
            fetchPolicy: 'network-only'
        }},
    props: ({  data }) => {
        // console.log(data);
        if (!data.loading) {
            return {
                user:data.user,
                discussion: data.discussion,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
})(Discussion);


const withMutationDelete = graphql(discussionDelete, {
    props: ({ ownProps, mutate }) => ({
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
    withDiscussionReplyMutation,
    withMutationDelete
);
const mapStateToProps = (state) => {
    return {

    };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (value) => {
        return ownProps.discussionReply(value.text,ownProps.match.params.id);
    }
});
export default WithMutations(connect(mapStateToProps, mapDispatchToProps)(withQuery));