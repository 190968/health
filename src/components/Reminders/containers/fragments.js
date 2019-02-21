import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const ReminderInfoFragment = gql`
fragment ReminderInfo on Reminder {
    id
    startDate
    endDate
    time
    sendSms
    sendEmail
    sendNotification
    sendMobile
}
`;