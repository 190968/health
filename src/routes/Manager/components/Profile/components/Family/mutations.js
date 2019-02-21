
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { GET_USER_FAMILY_QUERY } from '../../containers/Family';
import { FamilyMemberInfoFragment } from './fragments';
import { withFamilyMemberQuery } from './queries';
import {compose} from 'recompose';

const CREATE_FAMILY_MUTATION = gql`
    mutation CREATE_FAMILY($userId:UID!, $input: FamilyMemberInput!) {
        createFamilyMember(userId: $userId, input: $input) {
            id
        }
    }
`;

export const withAddFamilyMutation = graphql(CREATE_FAMILY_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        createFamilyMember: (input) => {
            return mutate({
                variables: { userId: ownProps.user.id, input},
                refetchQueries: [
                    {query: GET_USER_FAMILY_QUERY, variables: {userId:ownProps.user.id}}
                ]
            })
        },
    }),
});



const UPDATE_FAMILY_MUTATION = gql`
    mutation UPDATE_FAMILY($userId:UID!, $id: UID!, $input: FamilyMemberInput!) {
        updateFamilyMember(userId: $userId, id:$id, input: $input) {
            ...FamilyMemberInfo
        }
    }
    ${FamilyMemberInfoFragment}
`;

const withUpdateMutation = graphql(UPDATE_FAMILY_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateFamilyMember: (input) => {
            const {user, familyMember} = ownProps || {};
            return mutate({
                variables: { userId: user.id, id:familyMember.id, input},
            })
        },
    }),
});


export const withUpdateFamilyMutation = compose(withFamilyMemberQuery, withUpdateMutation);

const DELETE_FAMILY_MUTATION = gql`
    mutation DELETE_FAMILY_MEMBER($userId:UID!, $id: UID!) {
        deleteFamilyMember(userId: $userId, id: $id)
    }
`;

export const withDeleteFamilyMutation = graphql(DELETE_FAMILY_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        deleteFamilyMember: () => {
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
