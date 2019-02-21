import AppointmentsPure from '../components/Appointments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ifModuleExists } from '../../../components/App/app-context';
import { CalendarEventInfoFragment } from '../fragments';


// Query for grabbing everything for the dashboard items
export const USER_APPOINTMENTS_QUERY = gql`
    query GET_USER_APPOINTMENTS ($userId: UID!, $mode: String, $cursors: CursorInput)  {
        user (id:$userId) {
            id
            getCalendarEvents (mode: $mode, cursors:$cursors) {
                ...CalendarEventInfo
            }
        }
    }
    ${CalendarEventInfoFragment}
`;
const withQuery = graphql(
    USER_APPOINTMENTS_QUERY,
    {
        props: ({ ownProps, data }) => {
            const {user={}, loading, refetch} = data;
            const {getCalendarEvents=[]} = user || {};
            return {
                events: getCalendarEvents,
                totalCount: getCalendarEvents.length,
                loading,
                refetch
            }
        },
        options: (ownProps) => ({
            variables: {
                userId:ownProps.user.id,
                mode: 'upcoming',
                cursors: {first:3}
            },
            //fetchPolicy:  'cache-only'
        }),
    }
);

const UserAppointments = ifModuleExists('calendar')(withQuery(AppointmentsPure));

export default UserAppointments;