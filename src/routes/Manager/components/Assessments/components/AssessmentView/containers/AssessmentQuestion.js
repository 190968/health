import AssessmentQuestionPure from '../components/AssessmentQuestion';
import {Form} from 'antd';
import {compose, withHandlers, branch} from 'recompose';
import { prepareAssessmentSkippedQuestions } from './AssessmentBody';

const enhance = compose(
    branch(props => {
        const {showAllQuestions} = props.assessment || {};
        return !showAllQuestions;
    }, Form.create()),
    withHandlers({
        onChange: props => (reports) => {
            let callback;
            const {i, question, section:questionSection, assessment, canReport=false} = props;

            if (!canReport) {
                return;
            }
            const {id, type, getAnswers=[]} = question || {};
            const inputs = reports;//.map(report => ({questionId:id, ...report}));
            // console.log(inputs, 'inputs');
            if (type === 'yes_no') {
                // if yes - no, then check on redirect to another section/question;
                // If we have nextQuestionId, then we should skipp all questions from current one to the question ID
                if (reports.length === 1) {
                    var report = reports[0];
                    const {answerId} = report;
                    const {getSections} = assessment;
                    const {getAnswers=[]} = question;
                    const answer = getAnswers.find(answer => answer.id === answerId);
                    // find answer for this QUESTION
                     

                    let {questionsToSkip, skipToSectionQuestion} = prepareAssessmentSkippedQuestions({i, answer, sections:getSections, section:questionSection, question, report});
                    let skipByQuestion = {};
                    let skipSectionQuestion = {};
                    skipByQuestion[id] = questionsToSkip;
                    skipSectionQuestion[id] = skipToSectionQuestion;
 
                    props.setQuestionsToSkip(skipByQuestion, skipSectionQuestion, questionsToSkip);
                }
            }
            props.onChange(question, inputs, callback);
        },
        /**
         * Go next question. We need to pass the questions and section ID to open
         */
        goNextQuestion: props => () => {
            const {form, question} = props;

            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                props.goNextQuestion(question);
            });
        },
        goNextSection: props => (input) => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                props.goNextSection(input);
            });
        },
        completeAssessment: props => (input) => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                props.completeAssessment(input);
            });
        },
        /**
         * Go Previous question. We need to pass the questions and section ID to open
         */
        goPreviousQuestion: props => () => {
            const {question} = props;

            props.goPreviousQuestion(question);
        }
    })
);
const AssessmentQuestion = enhance(AssessmentQuestionPure);
export default AssessmentQuestion;