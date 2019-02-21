import AssessmentSliderPure from '../components/AssessmentSlider';
import {withHandlers} from 'recompose';

const enhance = withHandlers({
    onChange: props => (i) => {
        const {onChangeReport,onChange, answers=[]} = props;
        const answer = answers[i] || {};
        const reports = {answerId: answer.id};
        onChange(answer.id);
        onChangeReport(reports);
    }
});

const AssessmentSlider = enhance(AssessmentSliderPure);
export default AssessmentSlider;