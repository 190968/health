/**
 * Created by Павел on 29.01.2018.
 */

//import React from 'react'
import {connect} from 'react-redux'
import Discussions from '../components/Discussions';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from "react-router-dom";
import { UserInfoFragment } from '../../../../../../User/fragments';
import { compose, withHandlers } from 'recompose';
import { prepareAttachmentsInput } from '../../../../../../../components/FormCustomFields/components/Attachments';




const GET_CATEGORY_DISCUSSIONS_QUERY = gql`
query GET_CATEGORY_DISCUSSIONS($id:UID) {
    category(id:$id) {
        id
        discussions {
            id
            title
            text
            createdAt
            lastReply {
                id
                date
                text
                author {
                    ...UserInfo
                }
            }
            author {
                ...UserInfo
            }
            views
            replies {
                totalCount
            }
        }
    }
}
${UserInfoFragment}
`;
 
const withCategoryDiscussionsQuery = graphql(GET_CATEGORY_DISCUSSIONS_QUERY, {

    options: (ownProps) => {
        const {category} = ownProps;
        const {id} = category || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only'
        }
    },
    props: ({ownProps, data}) => {

        const {discussions} = data.category || {};
            return {
                discussions,
                loading: data.loading
            }
    }
});


const addDuscussion = gql`
mutation discussionCreate($categoryId:UID!,$subject:String!,$message:String!, $attachments: [FileAttachmentInput]) {

       discussionCreate(categoryId:$categoryId,subject:$subject,message:$message, attachments:$attachments) {
         id
         title
         text
         createdAt
         
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
                variables: { categoryId: ownProps.category.id,subject: input.title,message: input.text, attachments: input.attachments} ,
            })
        },
    }),
});
 

const enhance = compose(
    withRouter,
    withCategoryDiscussionsQuery,
    withMutation,
    withHandlers({
        onSubmit: props => values => {
            console.log(values);
            const input = prepareDiscusionInput(values);
            console.log(input);
            props.addDuscussion(input).then(({data}) => {
                props.history.push('discussion/'+data.discussionCreate.id);
            }).catch((error) => {
    
            });
        }
    })
);
export const CategoryDiscusionsList = enhance(Discussions);
export default CategoryDiscusionsList;

const prepareDiscusionInput = values => {
    const {attachments, ...otherProps} = values;
    return {...otherProps, attachments: prepareAttachmentsInput(attachments)}
}
