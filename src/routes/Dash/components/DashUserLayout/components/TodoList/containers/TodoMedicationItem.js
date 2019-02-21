import TodoMedicationItem from '../components/TodoMedicationItem'
import { graphql } from 'react-apollo';
import { ifModuleExists } from '../../../../../../../components/App/app-context';
import { GET_MEDICATION_PLAN_QUERY } from '../../../../../../Plan/containers/MedicationPlan';



const TodoMedicationItemWithQuery = graphql(
    GET_MEDICATION_PLAN_QUERY,
    {
        props: ({  data }) => {
            if (!data.loading) {
                return {
                    medicationPlan: data.medicationPlan,
                    progress: data.medicationPlan.progress,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading}
            }
        },
        options: (ownProps) => ({
            skip: !ownProps.ready,
            variables: {
                userId:ownProps.userId,
                date:ownProps.date,
            },
            fetchPolicy:  'cache-only'
        }),
    }
)(TodoMedicationItem);

export default ifModuleExists('meds', 'patient_meds', true)(TodoMedicationItemWithQuery);