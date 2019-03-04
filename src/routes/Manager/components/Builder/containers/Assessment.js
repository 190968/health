import Assessment from '../components/Assessment';
import { compose, withProps, withState, branch } from 'recompose';
import { withAssessmentQuery } from '../../Assessments/queries';
import { withSpinnerWhileLoading } from '../../../../../components/Modal';

const enhance = compose(
    withProps(props => {
        const {params} = props.match || {};
        const {id} = params || {};
        // match.params.id,
        if (id) {
            return {assessment: {id}}
        }
        return {};
    }),
    withAssessmentQuery,
    // withSpinnerWhileLoading,
    branch(props => {
        const {assessment, loading} = props;
        return !assessment && !loading;
    }, withState('assessment', 'setAssessment')),
    // withState('assessment', 'setAssessment', props => props.assessment),
);
export const AssessmentBuilder = enhance(Assessment);