import AnswersList from '../components/AnswersList';
import { compose, withStateHandlers, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({
        onChange: props => (answers) => {
            console.log(answers, 'QuestionAnswers to send');
            if (props.onChange) {
                props.onChange(answers);
            }
        }
    }),
    withStateHandlers( props => {
        const {value=[]} = props;
        console.log(value, 'answersvalue');
        return {answers:value};
    }, {
        updateAnswers: (state, props) => (answer) => {
            let {answers=[]} = state;
            answers = [...answers, answer];
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
        updateAnswer: (state, props) => (answer, index) => {
            let {answers=[]} = state;

            const {id} = answer || {};
            console.log(answer);
            console.log(index, 'index');
            console.log(answers);
            if (id) {
                // find answer
                const answerExisted = answers.find(a => a.id ===id);
                const answerIndex = answers.findIndex(a => a.id ===id);
                answers[answerIndex] = {...answerExisted, ...answer};
            } else if (index >= 0) {
                answers[index] = answer;
            }
            console.log(answers);
            props.onChange(answers);
            return {
                answers
            }
        },
        deleteAnswer: (state, props) => (answer, index) => {
            let {answers=[]} = state;

            const {id} = answer || {};
            
            if (id) {
                answers = answers.filter(a => a.id !== id);
            } else if (index >= 0) {
                answers = answers.filter((a,i) => i !== index);
            }
            props.onChange(answers);
            return {
                answers
            }
        },
    })
);
export const AssessmentQuestionAnswersListManager = enhance(AnswersList);