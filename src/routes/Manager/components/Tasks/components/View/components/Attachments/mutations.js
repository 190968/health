import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { TaskAttachmentInfoFragment } from '../../../../fragments';

export const UPDATE_TASK_ATTACHMENT_MUTATION = gql`
    mutation updateTask($id: UID!, $isApproved:Boolean!) {
        updateTaskAttachmentStatus(id:$id, isApproved: $isApproved) {
            ...TaskAttachmentInfo
        }
    }
    ${TaskAttachmentInfoFragment}
`;
export const withUpdateAttachmentMutation = graphql(UPDATE_TASK_ATTACHMENT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateTaskAttachment: (isApproved) => {
            return mutate({
                variables: { id: ownProps.attachment.id, isApproved },
            })
        },
    }),
});
