import PlanSectionsPure from '../components/PlanSections';
// import { withPlanElementSkippedElements } from '../../../containers/PlanBody';
import { compose, withProps, defaultProps } from 'recompose';
import { withPlanElementSkippedElements } from '../../../../../../../components/Plan/utils';

const enhance = compose(
    defaultProps({
        mode:'section'
    }),
    withPlanElementSkippedElements
)


export const PlanSections = enhance(PlanSectionsPure);