import AssessmentSectionPure from '../components/AssessmentSection';
import {compose, branch, withState, withHandlers} from 'recompose';
import {Form} from 'antd';

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
    withHandlers({
        goNextQuestion: props => (question) => {
            const nextQuestion = props.currentQuestion+1;
            const {skippedByQuestions={}, skipSectionQuestion, sections=[]} = props;
            const {id} = question;
            // check if we have 
            const skippedQuestions = skippedByQuestions[id] || [];
            const nextSectionQuestion = skipSectionQuestion[id] || false;
            //console.log(nextSectionQuestion, 'NNNNNnextSectionQuestion');
            props.setSkippedQuestions(skippedQuestions);
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
                })
                props.setCurrentSection(nextSectionIndex);
                props.setCurrentQuestion(nextQuestionIndex);
            } else {
                props.setCurrentQuestion(nextQuestion);
            }
            
           
            
        },
        goPreviousQuestion: props => (question) => {
            props.setCurrentQuestion(props.currentQuestion-1);
        }
    })
);
const AssessmentSection = enhance(AssessmentSectionPure);
export default AssessmentSection;