import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ElementTrackerFragment, ElementTrackerReportFragment } from '../../../Plan/components/Plan/fragments';

export const GET_USER_VITALS_QUERY = gql`
query GET_USER_VITALS ($userId: UID!) {
    patient (id: $userId) {
        id
        getVitals {
          ...TrackerElement
          getLastReport (userId:$userId) {
            ...TrackerReportFields
            
            datetime
          }
        }
    }
}
${ElementTrackerFragment}
${ElementTrackerReportFragment }
`;

export const withUserVitalsQuery = graphql(
GET_USER_VITALS_QUERY,
{
    options: (ownProps) => ({
        variables: {
            userId: ownProps.user.id,
        }
    }),
    props: ({data}) => {
        console.log(data,'data');
        if (!data.loading) {
            const {patient} = data;
            const {getVitals=[]} = patient || {};
            return {
                vitals: getVitals,
                totalCount: getVitals.length,
                loading: data.loading,
            }
        } else {
            return {loading: data.loading}
        }
    },
}
);