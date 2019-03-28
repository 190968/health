import Calendar from '../components/Calendar';
import { compose, branch,  withHandlers ,  withState, mapProps} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withActiveUser } from '../../../components/App/app-context';
import { CalendarEventInfoFragment } from '../fragments';



// Query for grabbing everything for the dashboard items
export const USER_CALENDAR_QUERY = gql`
    query GET_USER_CALENDAR ($userId: UID!)  {
        user (id:$userId) {
            id
            getCalendarEvents {
                ...CalendarEventInfo
            }
        }
    }
    ${CalendarEventInfoFragment}
`;
const withQuery = graphql(
    USER_CALENDAR_QUERY,
    {
        props: ({ ownProps, data }) => {
            const {user={}, loading, refetch} = data;
            const {getCalendarEvents=[]} = user;
            return {
                events: getCalendarEvents,
                loading,
                refetch:refetch,
                handleChangeType(types) {
                    console.log(types);
                    return data.refetch({
                        types
                    });
                }
            }
        },
        options: (ownProps) => ({
            variables: {
                userId:ownProps.user.id,
            },
            //fetchPolicy:  'cache-only'
        }),
    }
);


const withActiveUserProps = compose(
    withActiveUser,
    mapProps(props => {
        const {currentUser, ...otherProps} = props;
        // convert active user to ordinary user
        return {...otherProps, user:currentUser};
    })
);
const enhance = compose(
    branch(props => !props.user, withActiveUserProps),
    withQuery
    // withState('showAdd', 'setShowAdd', false),
    // withHandlers({
    //     toggleAdd: props => () => {
    //         props.setShowAdd(!props.showAdd);
    //     }
    // })
);

export default enhance(Calendar);