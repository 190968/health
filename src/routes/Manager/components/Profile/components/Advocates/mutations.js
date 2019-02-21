
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { GET_USER_FAMILY_QUERY } from '../../containers/Family';
import { AdvocateFragment } from './fragments';
import { withAdvocateQuery } from './queries';
import {compose} from 'recompose';

const CREATE_ADVOCATE_MUTATION = gql`
    mutation CREATE_ADVOCATE($userId:UID!, $input: AdvocateInput!) {
        createPatientAdvocate(userId: $userId, input: $input) {
            id
        }
    }
`;

export const withAddAdvocateMutation = graphql(CREATE_ADVOCATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        createAdvocate: (input) => {
            return mutate({
                variables: { userId: ownProps.user.id, input},
            })
        },
    }),
});



const UPDATE_ADVOCATE_MUTATION = gql`
    mutation UPDATE_ADVOCATE($userId:UID!, $id: UID!, $input: AdvocateInput!) {
        updatePatientAdvocate(userId: $userId, id:$id, input: $input) {
            ...Advocate
        }
    }
    ${AdvocateFragment}
`;

const withUpdateMutation = graphql(UPDATE_ADVOCATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateAdvocate: (input) => {
            const {user, advocate} = ownProps || {};
            return mutate({
                variables: { userId: user.id, id:advocate.id, input},
            })
        },
    }),
});


export const withUpdateAdvocateMutation = compose(withAdvocateQuery, withUpdateMutation);

const DELETE_ADVOCATE_MUTATION = gql`
    mutation DELETE_ADVOCATE_MEMBER($userId:UID!, $id: UID!) {
        deletePatientAdvocate(userId: $userId, id: $id)
    }
`;

export const withDeleteAdvocateMutation = graphql(DELETE_ADVOCATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        deleteAdvocate: () => {
            const {familyMember} = ownProps;
            const {id} = familyMember || {};
            return mutate({
                variables: { userId: ownProps.user.id, id},
                // refetchQueries: [
                //     {query: GET_USER_FAMILY_QUERY, variables: {userId:ownProps.user.id}}
                // ]
            })
        },
    }),
});
