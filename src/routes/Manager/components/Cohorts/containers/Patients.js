import CohortPatientsPure from '../components/Patients';
import { withCohortUsersQuery } from '../queries';
import { withTableRowSelection } from '../../../../../components/Tables/hocs';

export const CohortPatients = withCohortUsersQuery( withTableRowSelection(CohortPatientsPure));
export default CohortPatients;