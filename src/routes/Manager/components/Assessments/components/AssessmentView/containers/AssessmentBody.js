import AssessmentBodyPure from '../components/AssessmentBody';
import {branch, compose, withHandlers, withState, withStateHandlers, withProps} from 'recompose';
import {message, Form} from 'antd';
import { withAssessmentReportMutation, withAssessmentCompleteMutation } from '../../../mutations';



const enhance = compose(
    branch(props => {
        const {showAllSections, showAllQuestions} = props.assessment || {};
        return showAllSections && showAllQuestions;
    }, Form.create()),
    withStateHandlers((props) => {
            let skippedByQuestions = {};
            let skipSectionQuestion = {};
            const {assessment, report} = props;
            // find skipped by question
            const {getSections=[]} = assessment || {}
            const { getReportedValues=[]} = report || {};
            // if we have reported values, check if we need to skip questions
            if (getReportedValues.length > 0) {
                // find reported questions
                const reportedQuestions = getReportedValues.map(item => item.questionId);

                getSections.map((section, si) => {
                    const { getQuestions=[]} = section || {};

                    // find reported questions
                    const answeredQuestions = getQuestions.filter(question => reportedQuestions.includes(question.id));// can also add question.type == 'yes_no'
                    
                    // loop reported questions to understand if we need to skip
                    answeredQuestions.map((question, i) => {
                        const {id, type} = question || {};
                        if (type == 'yes_no') {
                             // find report for this question
                            const questionReport = getReportedValues.find(report => report.questionId === question.id);

                            const {getAnswers=[]} = question || {};
                            const {answerId} = questionReport || {};
                            // find answer
                            const answer = getAnswers.find(answer => answer.id === answerId);
                            // const answer = getAnswers.find(answer => answer.idForReported === answerId);
                            console.log(questionReport, 'questionReport');
                            console.log(answer, 'answer');
                            // prepare skipped questions
                            let {questionsToSkip, skipToSectionQuestion} = prepareAssessmentSkippedQuestions({i, answer, sections:getSections ,section, question, report:questionReport});
        
                            skippedByQuestions[id] = questionsToSkip;
                            skipSectionQuestion[id] = skipToSectionQuestion;
                        }
                    });
                });
            }
            // console.log(skippedByQuestions, 'skippedByQuestions');
            return {
                skippedByQuestions,
                skippedQuestions: [],
                skipSectionQuestion,
                activeQuestionBySection: {},// active question for each section(to avoid zeroes)
            }
        },
        {
            setQuestionsToSkip: props => (newSkippedByQuestions, skipSectionQuestion, newSkippedQuestions) => {
                const {skippedQuestions, skippedByQuestions} = props;
                //console.log({...skippedByQuestions, ...newSkippedByQuestions}, 'newSkippedByQuestions');
                return {
                    skippedByQuestions: {...skippedByQuestions, ...newSkippedByQuestions},
                    skipSectionQuestion,
                    skippedQuestions: [...skippedQuestions, ...newSkippedQuestions]
                }
            },
            setSkippedQuestions: props => (newSkippedQuestions) => {
                const {skippedQuestions} = props;
                return {skippedQuestions: [...skippedQuestions, ...newSkippedQuestions]};
            },
        }
    ),
    withProps(props => {
        const {assessment, skippedByQuestions=[]} = props;
        const {getSections=[]} = assessment || {};
        // filter questions
        const sections = filterSectionsAndQuestions(getSections, skippedByQuestions, true);
        // console.log(getSections, 'Initial sections');
        // console.log(sections, 'Final sections');
        return {sections};
    }),
    withState('currentSection', 'setCurrentSection', props => {
        const {sections=[]} = props || {}
        const { getReportedValues=[]} = props.report || {};
        let sectionIndex = 0;
        let doCheck = true;
        if (getReportedValues.length > 0) {
            sections.map((section, i) => {
                const { getQuestions=[]} = section || {};
                // find reported questions
                const reportedQuestions = getReportedValues.map(item => item.questionId);
                // find answered sections questions
                const answeredQuestions = getQuestions.filter(question => reportedQuestions.includes(question.id));
                const totalAnswered = answeredQuestions.length;
                // if all questions reported
                const allReported = getQuestions.length === totalAnswered;
                if (!allReported && doCheck) {
                    sectionIndex = i
                    doCheck = false;
                    //break;
                }
                return null;
            });
        }
        return sectionIndex;
    }),
    withHandlers({
        goNextSection: props => () => {
            // When we click next section, we should check what section and what question we should show after
            const next = props.currentSection+1;
            props.setCurrentSection(next);
        },
        goPreviousSection: props => () => {
            props.setCurrentSection(props.currentSection-1);
        }
    }),
    withAssessmentReportMutation,
    withAssessmentCompleteMutation,
    withHandlers({
        onChange: props => (questionId, input, callback) => {
            const {reportId} = props;

            props.onSubmit(questionId, input).then(({data}) => {
                const {assessmentReport} = data;
                if (!reportId || reportId == '') {
                    props.setReportId(assessmentReport.id);
                }
                if (props.setReport) {
                    props.setReport(assessmentReport);
                }
                if (callback) {
                    callback();
                }
            });
        },
        completeAssessment: props => () => {
            const {canReport} = props;
            if (!canReport) {
                return;
            }
            const hide = message.loading('Completing...');
            props.onComplete().then(({data}) => {
                hide();
                message.success('Completed');
                if (props.refetch) {
                    props.refetch();
                }
            });
        },
    }),
);
const AssessmentBody = enhance(AssessmentBodyPure);
export default AssessmentBody;


/**
 * Prepare skipped questions
 *
 */
export const prepareAssessmentSkippedQuestions = ({i,answer, report:questionReport, question={}, sections=[], section:questionSection}) => {
    const {id} = question || {};
    
    const {nextQuestionId} = answer || {};// next question to go
    let questionsToSkip = [];
    let skipToSectionQuestion = false;
    const isFinish = nextQuestionId === '';
    // if we have next question or finish we can continue
    if (nextQuestionId || isFinish) {
        // if to start collect questions
        let doCollection = false;
        sections.map((section, si) => {
            const {getQuestions=[]} = section;

            // if this is the same question, then start to collect from this place
            const isSameSection = section.id === questionSection.id;
            if (isSameSection) {
                doCollection = true;
            }
            // console.log(section, 'section');
            // console.log(question, 'question');
            // console.log(doCollection, 'doCollection');
            // console.log(nextQuestionId, 'nextQuestionId');
            if (doCollection) {
                let questions = [];
                let questionI = 0;
                let startSkipQuestion = false;
                let questionInTheSection = false;
                if (isFinish) {
                    if (!isSameSection) {
                        questions = getQuestions;
                    } else {
                        // console.log(isSameSection, 'isSameSection');
                        // console.log(getQuestions, 'questions');
                        // console.log(question, 'question');

                        // If we finish, then skip all futher questions
                        questions = getQuestions.filter((question, qi) => {
                            // start collecting starting from the current_question+1
                            if (question.id === id) {
                                // console.log('skip', id);
                                startSkipQuestion = true;
                                return false;
                            }
                            // console.log('prepareSKIP');
                            // do not skip question if we don't have to
                            if (!startSkipQuestion) {
                                // console.log('skip', question);
                                return false;
                            }
                            // console.log(qi, 'qi');
                            // console.log(i, 'i');
                            // console.log(isSameSection, 'isSameSection');
                            // slip questions if this is not the same and have bigger index or from other futer section
                            return question.id !== id && (isSameSection && qi > i || !isSameSection);
                        });
                    }
                   
                    // console.log(questions, 'questions');
                    // console.log(answer, 'answer');
                    questionInTheSection = false;
                } else {
                    // next options: all starts with current section.
                    /**
                     * 1. s1q1 -> s1q5, s1q2-q4 are hidden.  all in same section. start with current, finish with
                     * 2. s1q5 -> s1q7 - s1q6 is hidden
                     * 3. s1q6 -> s3q1 -> entire s2 is hidden
                     */
                    // find index of the next question
                     questionI = getQuestions.findIndex(question => question.id === nextQuestionId);
                     // if have the next question in this section
                    questionInTheSection = questionI >= 0;
                    //  const questio 
                    // if next question ID is in this section
                    // possible situations
                    // if (isSameSection && questionInTheSection) {
                    //     console.log('SAME QUESTION, SAME SECTION');
                    // } else if (!isSameSection && questionInTheSection) {
                    //     console.log('SAME QUESTION, NOT SAME SECTION');
                    // } else if (!isSameSection && !questionInTheSection) {
                    //     console.log('NOT SAME QUESTION, NOT SAME SECTION');
                    // }

                    if (!isSameSection && !questionInTheSection) {
                        // if the question is not in this section and we are not in the same section - skipp the entire section
                        questions = getQuestions;
                    } else {
                        questions = getQuestions.filter((question, qi) => {
                            // start collecting starting from the current_question+1
                            if (question.id === id) {
                                startSkipQuestion = true;
                                return false;
                            }

                            // do not skip question if we don't have to
                            if (!startSkipQuestion) {
                                return false;
                            }
                            
                            if (questionInTheSection) {   
                                // If next question in this section, skip
                                return question.id !== id && qi < questionI;
                            }
                           
                            // slip questions if this is not the same and have bigger index or from other futer section
                            return question.id !== id && (isSameSection && qi > i || !isSameSection);// && qi <= questionI;
                        });
                    }
                }
                
                // if we have questions to skipp, merge them
                if (questions.length > 0) {
                    questionsToSkip = [...questionsToSkip, ...questions.map(question => question.id)];
                }
                // if next question in this section, then stop collecting
                if (questionInTheSection) {
                    doCollection = false;
                    skipToSectionQuestion = {sectionI:si, nextSectionId:section.id, questionI, nextQuestionId};
                }
            }
            return section;
        });
    }
    return {questionsToSkip, skipToSectionQuestion};
}

/**
 * Filter questions to exclude skipped questions
 */
const filterSectionsAndQuestions = (sections, skippedByQuestions, hideEmptySections=false) => {
    let skippedQuestions = [];
    // convert skipped by question into skipped question
    for (var qid in skippedByQuestions) {
        const skippedByQuestion = skippedByQuestions[qid];
        skippedQuestions = [...skippedQuestions, ...skippedByQuestion];
    }
    let newSections = sections.map((section, i) => {
        const { getQuestions=[]} = section || {};
        // find skipped questions
        // first check if we have  question that started skip in this section. if yes - then
        const newQuestions = getQuestions.filter(question => !skippedQuestions.includes(question.id));

        return {...section, getQuestions: newQuestions};
    });

    // if we need to hide empty sections (should be false for builder)
    if (hideEmptySections) {
        newSections = newSections.filter(section => section.getQuestions.length > 0);
    }

    return newSections;
}