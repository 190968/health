import CalendarTypesSelectorPure from '../components/CalendarTypesSelector';


import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


export const CALENDAR_EVENT_TYPES_QUERY = gql`
    query GET_CALENDAR_EVENT_TYPE {
        eventTypes: __type(name: "CalendarTypeEnum") {
            name
            enumValues {
              name
              description
            }
        }
    }
`;

const withQuery = graphql(
    CALENDAR_EVENT_TYPES_QUERY,
    {
        props: ({ownProps, data}) => {
            const {loading, eventTypes} = data;
            const {enumValues=[]} = eventTypes || {};
            return {loading, eventTypes: enumValues};
        },
    }
)

export default withQuery(CalendarTypesSelectorPure);