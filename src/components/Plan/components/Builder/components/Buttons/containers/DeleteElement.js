import DeleteElementPure  from '../components/DeleteElement';
import {compose} from 'recompose';
import { withDeletePlanElementMutation } from '../../../mutations';

const enhance = compose(
    withDeletePlanElementMutation
);
export const PlanElementDeleteButton = enhance(DeleteElementPure);