import History from '../components/History';
import { compose, withProps } from 'recompose';
import { withUserAssessmentHistoryQuery } from '../queries';
import { withDrawer } from '../../../../../components/Modal';

const enhance = compose(
    withUserAssessmentHistoryQuery,
    withProps(props => {
        const {assessment} = props.userAssessment || {};
        const {name} = assessment;
        return {modalTitle: name}
    }),
    withDrawer
)
export const AssessmentHistory = enhance(History);