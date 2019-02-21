import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { BiometricCardInfoFragment } from './fragments';

// Query for grabbing everything for the dashboard items
export const GET_BIOMETRIC_TRACKER_QUERY = gql`
    query GET_BIOMETRIC_PLAN_TRACKER ($userId: UID!, $id: UID!, $date: Date)  {
        patient (id: $userId)  {
            id
            getBiometricPlan {
                id
                getTracker (id: $id) {
                    ...BiometricCardInfo
                    isValidOnDate (date: $date)
                }
                getUserPlan {
                    id
                }
            }
        }
    }


    ${BiometricCardInfoFragment}
`;

export const withBiometricTrackerQuery = graphql(GET_BIOMETRIC_TRACKER_QUERY, {
	props: ({ ownProps, data }) => {
		if (!data.loading) {
			return {
				tracker: data.patient.getBiometricPlan.getTracker,
				loading: data.loading,
 
			};
		} else {
			return { loading: data.loading };
		}
	},
	options: (ownProps) => {
        console.log(ownProps);
        const {tracker, user, date} = ownProps;
        const {id:userId} = user;
        const {id} = tracker;
        return {
            variables: {
                userId,
                date,
                id
            },
            fetchPolicy: 'network-only'
        }
    }
});