import Pathway from '../components/Pathway';
import { compose, withProps, withState, branch } from 'recompose';
// import { withAssessmentQuery } from '../../Assessments/queries';
import { withSpinnerWhileLoading } from '../../../../../components/Modal';
import { withPathwayMainQuery } from '../../../../../components/Plan/queries';

const enhance = compose(
    withProps(props => {
        const {params} = props.match || {};
        const {id} = params || {};
        // match.params.id,
        if (id) {
            return {plan: {id}}
        }
        return {};
    }),
    withPathwayMainQuery,
    branch(props => {
        const {plan, loading} = props;
        return !plan && !loading;
    }, withState('plan', 'setPlan')),
);
export const PathwayBuilder = enhance(Pathway);