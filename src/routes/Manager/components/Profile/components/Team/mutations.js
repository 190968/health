
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_CARETEAM_MUTATION = gql`
    mutation UPDATE_CARETEAM($userId:UID!, $ids: [UID]!) {
        updatePatientCareTeam(userId: $userId, ids: $ids)  
    }
`;

export const withUpdateCareTeamMutation = graphql(UPDATE_CARETEAM_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateCareTeam: (ids) => {
            return mutate({
                variables: { userId: ownProps.user.id, ids},
            })
        },
    }),
});
