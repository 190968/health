
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withTransitionQuery, TransitionInfoFragment } from './queries';
import {compose} from 'recompose';


const TRANSITION_UPDATE_MUTATION = gql`
    mutation TRANSITION_UPDATE($id: UID!, $input:UserTransitionInput!){
        updateTransition(id:$id, input:$input) {
            ...TransitionInfo
        }
    }
    ${TransitionInfoFragment}
`;


const withMutationEdit = graphql(TRANSITION_UPDATE_MUTATION, {
    props: ({ownProps:{transition}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({variables: { id: transition.id, input: input}});
        },
    }),
});
export const withUpdateTransitionMutation = compose(withTransitionQuery, withMutationEdit);


const CREATE_TRANSITION_MUTATION = gql`
    mutation createTransition($userId: UID!,$input:UserTransitionInput!){
        createTransition(userId:$userId, input:$input) {
            ...TransitionInfo
        }
    }
    ${TransitionInfoFragment}
`;

export const withCreateTransitionMutation = graphql(CREATE_TRANSITION_MUTATION, {
    props: ({mutate, ownProps}) => {
        return {
            onSubmit: (input) => {
                const {user={}} = ownProps;
                return mutate({
                    variables: {input, userId:user.id},
                });
            },
        }
    }
});



const DELETE_TRANSITION_MUTATION = gql`
    mutation DELETE_TRANSITION($id: UID!, $userId:UID!){
        deleteTransition(id:$id, userId:$userId)
    }
`;


export const withDeleteTransitionhMutation = graphql(DELETE_TRANSITION_MUTATION, {
    props: ({ownProps:{transition, user}, mutate }) => ({
        deleteTransition: () => {
            return mutate({variables: { id: transition.id, userId: user.id}});
        },
    }),
});
