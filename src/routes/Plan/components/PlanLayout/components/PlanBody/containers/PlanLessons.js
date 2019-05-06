import PlanLessonsPure from '../components/PlanLessons';
import { compose, withProps, defaultProps } from 'recompose';
import { withPlanElementSkippedElements } from '../../../../../../../components/Plan/utils';

const enhance = compose(
    defaultProps({
        mode:'lesson'
    }),
    withPlanElementSkippedElements
)


export const PlanLessons = enhance(PlanLessonsPure);