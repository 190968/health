import MedicationPlanPure from '../components/MedicationPlan';
import {compose,  defaultProps} from 'recompose';
import { graphql } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import { MedicationCardInfo } from '../components/MedicationPlan/components/Medication/components/fragments';
import { ifModuleExists, withActiveUserSimple } from '../../../components/App/app-context';
import { withDateState } from '../../../components/Other/dateHocs';
import { UserPlanOnlyFragment } from '../components/Plan/fragments';
import { withLayoutToggle } from '../../../components/Card/hocs';
// Query for grabbing everything for the dashboard items
export const GET_MEDICATION_PLAN_QUERY = gql`
    query GET_MEDICATION_PLAN ($userId: UID!, $date: Date)  {
            patient (id: $userId)  {
                id
                getMedicationPlan {
                    id
                    getUserPlan {
                        ...UserPlanOnly
                    }
                    isPersonal
                    canReport
                    canEdit
                    progress(date: $date) @connection(key: "medProgress", filter: ["date"]) 
                    medications {
                        ...MedicationCardInfo
                        timesPerDay
                        timesPerHour {
                            id
                            time
                            quantity
                        }
                    }
                    textBefore
                    textAfter
                }
            }
        }
    ${MedicationCardInfo}
    ${UserPlanOnlyFragment}
`;
//...MedicationsByType

const withQuery = graphql(
    GET_MEDICATION_PLAN_QUERY,
    {
        props: ({ data }) => {
            const {patient} = data;
            const {getMedicationPlan} = patient || {};
            return {
                medicationPlan: getMedicationPlan,
                loading: data.loading,

                loadDate(date) {
                    return data.refetch({
                        date: date,
                    });
                }
            }

        },
        options: (ownProps) => {
            const userId = ownProps.user.id;
            return {
                //skip: !ownProps.ready,
                variables: {
                    userId: userId,
                    date: ownProps.date,
                },
                //notifyOnNetworkStatusChange: true// adding loading placeholder
                //fetchPolicy: 'cache-and-network'//'cache-only'//'cache-and-network'
            }
        },
    }
);

const enhance = compose(
    ifModuleExists('meds', 'patient_meds', true, {settingRoles: ['patient']}),
    defaultProps({
        date: moment().format('YYYY-MM-DD')
    }),
    withDateState,
    withQuery,
    withActiveUserSimple,
    withLayoutToggle
    //withSpinnerWhileLoading,
    // withState('medicationType', 'setMedicationType', 'all'),
    //withState('medications', 'setMedications', props => props.date),
);

const MedicationPlan = enhance(MedicationPlanPure);
export default MedicationPlan;