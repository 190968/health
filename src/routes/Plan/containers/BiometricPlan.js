import BiometricPlanPure from '../components/BiometricPlan';
import { compose, withHandlers, withState, defaultProps } from 'recompose';
import { graphql } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import { ifModuleExists, withActiveUserSimple } from '../../../components/App/app-context';
import { BiometricCardInfoFragment } from '../components/BiometricPlan/fragments.js';
import { withDateState } from '../../../components/Other/dateHocs';
import {  UserPlanOnlyFragment } from '../components/Plan/fragments';
// Query for grabbing everything for the dashboard items
export const GET_BIOMETRIC_PLAN_QUERY = gql`
    query GET_BIOMETRIC_PLAN ($userId: UID!, $date: Date)  {
        patient (id: $userId)  {
            id
            getBiometricPlan {
                id
				canReport
				canEdit
                getUserPlan {
					...UserPlanOnly
                }
                isPersonal
				canReport
                columns {
                    id
                    name
                }
                trackers (date: $date)  @connection(key: "trackers", filter: ["date"]) {
                    ...BiometricCardInfo
                }
                startDate
                endDate
                progress(date: $date)
            }
        }
    }

	${UserPlanOnlyFragment}
    ${BiometricCardInfoFragment}
`;

const withQuery = graphql(GET_BIOMETRIC_PLAN_QUERY, {
	props: ({ ownProps, data }) => {
		const {patient} = data;
		const {getBiometricPlan} = patient || {};
			
		return {
			biometricPlan: getBiometricPlan,
			loading: data.loading,

			loadDate(date) {
				return data.refetch({
					date: date
				});
			}
		};
	},
	options: (ownProps) => ({
		//skip: !ownProps.ready,
		variables: {
			userId: ownProps.user.id,
			date: ownProps.date
		},
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true
		//notifyOnNetworkStatusChange: true// adding loading placeholder
	})
});

const enhance = compose(
	ifModuleExists('trackers', 'patient_trackers', true, { settingRoles: [ 'patient' ] }),
    defaultProps({
        date: moment().format('YYYY-MM-DD')
	}),
	withDateState,
	withQuery,
	withActiveUserSimple
);

export const BiometricPlan = enhance(BiometricPlanPure);
export default BiometricPlan;
