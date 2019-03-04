import SelectAssessmentQuestionPure from '../components/SelectAssessmentQuestion';
import {compose, branch, withProps} from 'recompose';
import { withAssessmentQuery } from '../../../../../routes/Manager/components/Assessments/queries';

const enhance = compose(
    branch(props => {
        const {getAssessmentInfo=false} = props;
        return getAssessmentInfo;
    }, withAssessmentQuery)
);
export const SelectAssessmentQuestion = enhance(SelectAssessmentQuestionPure);