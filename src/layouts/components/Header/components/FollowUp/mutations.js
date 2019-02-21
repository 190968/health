
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const ACCEPT_FOLLOWUP_MUTATION = gql`
    mutation ACCEPT_FOLLOWUP($id: UID!){
        acceptFollowUp(id:$id) {
            id
            isAccepted
        }
    }
`;
 
const SNOOZE_FOLLOWUP_MUTATION = gql`
    mutation SNOOZE_FOLLOWUP($id: UID!, $date: Date, $time: Time, $period: String!){
        snoozeFollowUp(id:$id, date: $date, time: $time, period: $period) {
            id
            dateTime
            isAccepted
        }
    }
`;

export const withAcceptFollowUpMutation = graphql(ACCEPT_FOLLOWUP_MUTATION, {
    props: ({ownProps:{followUp}, mutate }) => ({
        acceptFollowUp: () => {
            return mutate({variables: { id: followUp.id}});
        },
    }),
});
 
export const withSnoozeFollowUpMutation = graphql(SNOOZE_FOLLOWUP_MUTATION, {
    props: ({ownProps:{followUp}, mutate }) => ({
        snoozeFollowUp: (input) => {
            return mutate({variables: { id: followUp.id, ...input}});
        },
    }),
});