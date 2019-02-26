import AssessementManagerPure from '../components/AssessmentsManager';

import {compose, withProps} from 'recompose';
 
import { withAssessmentQuery } from '../queries';
import { withModal } from '../../../../../components/Modal';
 
const enhance = compose(
    withAssessmentQuery,
    withProps(props => {
        return {
            modalWidth:800,
            modalFooter:false
        }
    }),
    withModal
)

export const AssessementManager = enhance(AssessementManagerPure);