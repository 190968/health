import AnswersList from '../components/AnswersList';
import { compose, withStateHandlers, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({
        onChange: props => (answers) => {
            console.log(answers);
            if (props.onChange) {
                props.onChange(answers);
            }
        }
    }),
    withStateHandlers( props => {
        const {question} = props;
        const {getAnswers=[]} = question || {};
        return {answers:getAnswers};
    }, {
        updateAnswers: (state, props) => (answer) => {
            let {answers=[]} = state;
            answers = [...answers, answer];
            console.log(answers);
            props.onChange(answers);
            return {
                answers
            }
        },
        appendAnswer: (state, props) => () => {
            let {answers=[]} = state;
            answers = [...answers, {}];
            props.onChange(answers);
            return {
                answers
            }
        },
    })
);
export const AssessmentQuestionAnswersListManager = enhance(AnswersList);