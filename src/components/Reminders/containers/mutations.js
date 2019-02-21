import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

const REMINDER_UPDATE_MUTATION = gql`
    mutation  reminderUpdateMutation($type: ReminderTypeEnum!, $userId: UID, $id: UID!, $inputs: [ReminderInput]) {
        updateReminders(id: $id, type:$type, inputs: $inputs, userId: $userId) {
            id
        }
    }
`;

// const GET_MEDICATION_QUERY = gql`
//     query getMedication($id: UID!, $date: Date!, $userId: UID!) {
//         patient (id: $userId)  {
//             id
//             getMedicationPlan {
//                 id
//                 medication (id: $id) {
//                     id
//                     reports(date:$date)  @connection(key: "medReport", filter: ["date"])   {
//                         ...MedicationReportInfo
//                     }
//                 }
//             }
//         }
//     }
//     ${MedicationReportInfoFragment}
// `;
 
export const withUpdateRemindersMutation = graphql(REMINDER_UPDATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateReminders: (inputs) => {
            const { reminderInfo, user } = ownProps;
		    const { type, id } = reminderInfo || {};
		    const { id:userId } = user || {};
            return mutate({
                variables: { type, id, userId, inputs: inputs.map(input => {
                    const {time} = input;
                    return {...input, time: moment.utc(time).format('HH:mm:ss')}
                })},
                // refetchQueries: [{
                //     query: GET_MEDICATION_QUERY,
                //     variables: {
                //         id: id,
                //         userId: userId,
                //         date:date
                //     },
                // }],
            });
        },
    }),
});


const REMINDER_DELETE_MUTATION = gql`
    mutation  reminderDeleteMutation($id: UID!) {
        deleteReminder(id: $id)
    }
`;
 
export const withDeleteReminderMutation = graphql(REMINDER_DELETE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        deleteReminder: () => {
            const  {reminder} = ownProps;
            const {id} = reminder || {};
            return mutate({
                variables: {id},
                // refetchQueries: [{
                //     query: GET_MEDICATION_QUERY,
                //     variables: {
                //         id: id,
                //         userId: userId,
                //         date:date
                //     },
                // }],
            });
        },
    }),
});
