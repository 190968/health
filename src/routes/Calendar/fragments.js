import gql from 'graphql-tag';
import { UserInfoFragment } from '../User/fragments';


export const CalendarEventInfoFragment = gql`
        fragment CalendarEventInfo on CalendarEvent {
            id
            title
            dateTime
            date
            time
            duration
            type
            typeTxt
            message
            participants {
                ...UserInfo
            }
        }
        ${UserInfoFragment}
`;