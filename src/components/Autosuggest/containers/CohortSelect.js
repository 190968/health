import CohortSelectPure from '../components/CohortSelect';
import { withCohortsQuery } from '../../../routes/Manager/components/Cohorts/queries';

export const CohortSelect = withCohortsQuery(CohortSelectPure);
export default CohortSelect;