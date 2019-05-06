import AssessmentSectionPure from '../components/AssessmentSection';
import {compose, branch, withState, withHandlers, withStateHandlers} from 'recompose';
import {Form, message} from 'antd';
import {
    arrayMove,
  } from 'react-sortable-hoc';
import { withUpdateAssessmentQuestionsOrderMutation } from '../../../../../../../components/Assessment/mutations';
import { withToggleState } from '../../../../../../../components/Modal';
const enhance = compose(
    branch(props => {
        const {showAllSections, showAllQuestions} = props.assessment || {};
        return !showAllSections && showAllQuestions;
    }, Form.create()),
    withState('currentQuestion', 'setCurrentQuestion', props => {
        // find the last answered question
        const { getQuestions=[]} = props.section || {};
        const { getReportedValues=[]} = props.report || {};
        // find reported questions
        // const totalQuestions = getQuestions.length;
        const reportedQuestions = getReportedValues.map(item => item.questionId);
        // find answered sections questions
        const answeredQuestions = getQuestions.filter(question => reportedQuestions.includes(question.id));
        const totalAnswered = answeredQuestions.length;
        // if all questions reported
         
        // if we have answered questions
        if (totalAnswered > 0) {
            // find last
            const lastAnsweredQuestion = answeredQuestions[totalAnswered-1];
            const lastIndex = getQuestions.findIndex(q => q.id == lastAnsweredQuestion.id);
            const nextIndex = lastIndex;
            return nextIndex;
        }
        
        return 0;
    }),
    withUpdateAssessmentQuestionsOrderMutation,
    withHandlers({
        goNextQuestion: props => (question) => {
            const nextQuestion = props.currentQuestion+1;
            const {skippedByQuestions={}, skipSectionQuestion, sections=[]} = props;
            const {id} = question;
            // check if we have 
            const skippedQuestions = skippedByQuestions[id] || [];
            const nextSectionQuestion = skipSectionQuestion[id] || false;
            // console.log(props, 'props');
            // console.log(nextQuestion, 'nextQuestion');
            // console.log(skippedByQuestions, 'skippedByQuestions');
            // console.log(skippedQuestions, 'skippedQuestions');
            props.setSkippedQuestions(skippedQuestions);
            // console.log(skippedQuestions);
            // console.log(skippedQuestions);
            // console.log(nextQuestion, 'nextQuestion');
            // console.log(skipSectionQuestion, 'skipSectionQuestion');
           
            if (nextSectionQuestion) {
                const {sectionI, nextSectionId, questionI, nextQuestionId} = nextSectionQuestion;
                // find question ID

                let nextSectionIndex = sectionI;
                let nextQuestionIndex = questionI;

                sections.map((section, i) => {
                    if (section.id == nextSectionId) {
                        // update section I
                        nextSectionIndex = i;
                        const {getQuestions=[]} = section;
                        nextQuestionIndex = getQuestions.findIndex(question => question.id === nextQuestionId);
                    }
                });
                // console.log(props );
                // console.log(question );
                // console.log(nextSectionQuestion, 'nextSectionQuestion' );
                // console.log(nextSectionIndex, 'nextSectionIndex');
                // console.log(nextQuestionIndex, 'nextQuestionIndex');
                props.setCurrentSection(nextSectionIndex);
                props.setCurrentQuestion(nextQuestionIndex);
            } else {
                props.setCurrentQuestion(nextQuestion);
            }
        },
        goPreviousQuestion: props => (question) => {
            props.setCurrentQuestion(props.currentQuestion-1);
        },
        handleUpdateQuestionOrder : props => ({oldIndex, newIndex}) => {
            const {section} = props;
            const {getQuestions=[]} = section || {};

            const options = getQuestions.map(q => q.id);
            //console.log(arrayMove(options, oldIndex, newIndex));
            const newOptions = arrayMove(options, oldIndex, newIndex);
            // console.log(newOptions);
            const hide = message.loading('Saving...');
            props.updateAssessmentQuestionOrder(newOptions).then(() => {
                message.success('Order has been updated');
                hide();
            });
        },
        setCurrentQuestionInSection: props => (questionI) => {
            const {i} = props;
            props.setCurrentSectionQuestion(i, questionI);
        }
    }),
    withStateHandlers(props => ({openBrahms:false}), {
        toggleBrahms: props => () => {
            return {openBrahms: !props.openBrahms}
        },
    })
);
const AssessmentSection = enhance(AssessmentSectionPure);
export default AssessmentSection;