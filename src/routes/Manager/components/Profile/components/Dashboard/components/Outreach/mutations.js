
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withOutreachQuery, OutreachInfoFragment } from './queries';
import {compose} from 'recompose';

const UPDATE_OUTREACH_MUTATION = gql`
    mutation UPDATE_OUTREACH($id: UID!, $input:UserCommunicationInput!){
        updateOutreach(id:$id, input:$input) {
            ...OutreachInfo
        }
    }
    ${OutreachInfoFragment}
`;


const withUpdateOutreachMutation = graphql(UPDATE_OUTREACH_MUTATION, {
    props: ({ownProps:{outreach}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({variables: { id: outreach.id, input: input}});
        },
    }),
});
export const withUpdateMutationAndQuery = compose(withUpdateOutreachMutation, withOutreachQuery);


const CREATE_OUTREACH_MUTATION = gql`
    mutation createOutreach($userId: UID!, $input:UserCommunicationInput!){
        createOutreach(userId:$userId, input:$input) {
            ...OutreachInfo
        }
    }
    ${OutreachInfoFragment}
`;

export const withCreateOutreachMutation = graphql(CREATE_OUTREACH_MUTATION, {
    props: ({mutate, ownProps}) => {
        return {
            onSubmit: (input) => {
                const {user} = ownProps;
                const {id:userId} = user || {};
                return mutate({
                    variables: {input, userId}
                });
            },
        }
    }
});


const DELETE_OUTREACH_MUTATION = gql`
    mutation DELETE_OUTREACH($id: UID!, $userId:UID!){
        deleteOutreach(id:$id, userId:$userId)
    }
`;


export const withDeleteOutreachMutation = graphql(DELETE_OUTREACH_MUTATION, {
    props: ({ownProps:{outreach, user}, mutate }) => ({
        deleteOutreach: () => {
            return mutate({variables: { id: outreach.id, userId: user.id}});
        },
    }),
});
