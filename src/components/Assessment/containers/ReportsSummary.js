import ReportsSummary from '../components/ReportsSummary';
import { compose, withProps } from 'recompose';
import { withAssessmentReportsSummaryQuery } from '../queries';
import { withDrawer } from '../../Modal';
// import { withDrawer } from '../../../../../components/Modal';

const enhance = compose(
    withAssessmentReportsSummaryQuery,
    // withUserAssessmentHistoryQuery,
    withProps(props => {
        const {name} = props.assessment || {};
        return {modalTitle: name, modalWidth:900}
    }),
    withDrawer
)
export const AssessmentReportsSummary = enhance(ReportsSummary);