import AssessmentBodyPure from '../components/AssessmentBody';
import { branch, compose, withHandlers, withState, withStateHandlers, withProps } from 'recompose';
import { message, Form } from 'antd';
import Scroll from 'react-scroll';
import { withAssessmentReportMutation, withAssessmentCompleteMutation } from '../../../mutations';
import { checkBrahmsOnExecution, validateBrahms, getNextObjectFromRules } from '../../../../../../../components/Brahms/utils';



const enhance = compose(
    branch(props => {
        const { showAllSections, showAllQuestions } = props.assessment || {};
        return showAllSections && showAllQuestions;
    }, Form.create()),
    withStateHandlers((props) => {
        // prepare skipped questions and sections
        let skippedByQuestions = {};
        let skipSectionQuestion = {};
        let brahmRules = [];

        const { assessment, report } = props;
        const { getReportedValues = [] } = report || {};

        // IF we have reported values, check if we need to skip questions
        if (getReportedValues.length > 0) {
            const { getSections = [] } = assessment || {}
            // find reported questions IDs
            const reportedQuestions = getReportedValues.map(item => item.questionId);
            // map sections for answers
            getSections.map((section, si) => {
                const { getQuestions = [] } = section || {};
                // find reported questions
                const answeredQuestions = getQuestions.filter(question => reportedQuestions.includes(question.id));

                // loop reported questions to understand if we need to skip
                answeredQuestions.map((question, i) => {
                    const { id, getBrahmsRules = [], isAnswerBasedQuestion = false } = question || {};

                    // if we have reports go to rules
                    const questionReports = getReportedValues.filter(report => report.questionId === question.id);
                    let questionRules = [];
                    questionReports.map(questionReport => {
                        const { answerId, value } = questionReport || {};

                        const valueToUse = isAnswerBasedQuestion ? answerId : value;
                        // get brahm rules accodring the avalue
                        const rules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedQuestion });
                        // save rules if have for the question
                        if (rules.length > 0) {
                            questionRules = [...questionRules, ...rules];
                        }
                        // get goto brahm rules and execute
                        const goTorules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedQuestion, type: ['goto','stop'] });
                        if (goTorules.length > 0) {
                            // find next skipped item
                            const nextQuestionId = getNextObjectFromRules({ rules: goTorules });
                            // console.log(nextQuestionId, 'nextQuestionIdnextQuestionIdnextQuestionId');
                            const { questionsToSkip: goToquestionsToSkip, skipToSectionQuestion: goToskipToSectionQuestion } = prepareAssessmentskippedQuestionsByNextId({ getSections, currentQuestionId: id, nextQuestionId })
                            // save questions
                            skippedByQuestions[id] = goToquestionsToSkip;
                            skipSectionQuestion[id] = goToskipToSectionQuestion;
                        }
                        return null;
                    });

                    if (questionRules.length > 0) {
                        brahmRules.push({ question, rules: questionRules });
                    }
                });
            });
        }
        return {
            brahmRules,// brahms rules for the entire assessment
            skippedByQuestions,// skipped questions by question
            skipSectionQuestion,// skipped sections by question.
            // not sure this needed
            skippedQuestions: [],
            activeQuestionBySection: {},// active question for each section(to avoid zeroes)
        }
    },
        {
            setQuestionsToSkip: props => (newSkippedByQuestions, skipSectionQuestion, newSkippedQuestions) => {
                const { skippedQuestions, skippedByQuestions } = props;
                return {
                    skippedByQuestions: { ...skippedByQuestions, ...newSkippedByQuestions },
                    skipSectionQuestion,
                    skippedQuestions: [...skippedQuestions, ...newSkippedQuestions]
                }
            },
            setSkippedQuestions: props => (newSkippedQuestions) => {
                const { skippedQuestions } = props;
                return { skippedQuestions: [...skippedQuestions, ...newSkippedQuestions] };
            },
            updateBrahmRules: props => (newBrahms) => {
                const {question, rules} = newBrahms || {};
                const { brahmRules = [] } = props;
                // check if we have sush question
                const brahmIndex = brahmRules.findIndex(info => info.question.id === question.id);
                // if we have such question, then update it
                if (brahmIndex > -1) {
                    brahmRules[brahmIndex]['rules'] = rules;
                    return {
                        brahmRules
                    }
                } else {
                    if (rules.length  === 0) {
                        return {brahmRules}
                    }
                    return {
                        brahmRules: [...brahmRules, newBrahms]
                    }
                }
            }
        }
    ),
    withProps(props => {
        const { isBuilderMode=false,assessment, skippedByQuestions = [] } = props;
        const { getSections = [] } = assessment || {};
        // filter questions
        const sections = filterSectionsAndQuestions(getSections, skippedByQuestions, !isBuilderMode);
        return { sections };
    }),
    withState('currentSection', 'setCurrentSection', props => {
        const { sections = [] } = props || {}
        const { getReportedValues = [] } = props.report || {};
        let sectionIndex = 0;
        let doCheck = true;
        if (getReportedValues.length > 0) {
            sections.map((section, i) => {
                const { getQuestions = [] } = section || {};
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
            const {form} = props;
            console.log(props, 'goNextSection');
            // When we click next section, we should check what section and what question we should show after
            const next = props.currentSection + 1;
            if (form) {
                form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    props.setCurrentSection(next);
                });
            } else {
                props.setCurrentSection(next);
            }

        },
        goPreviousSection: props => () => {
            props.setCurrentSection(props.currentSection - 1);
        },
        handleGoTo: props => (currentQuestionId, nextQuestionId) => {
            // show next question.
            const { assessment } = props;
            // find skipped by question
            const { getSections = [] } = assessment || {}

            const { questionsToSkip: goToquestionsToSkip, skipToSectionQuestion: goToskipToSectionQuestion } = prepareAssessmentskippedQuestionsByNextId({ getSections, currentQuestionId, nextQuestionId })
            // save questions
            let skippedByQuestions = {};
            let skipSectionQuestion = {};
            skippedByQuestions[currentQuestionId] = goToquestionsToSkip;
            skipSectionQuestion[currentQuestionId] = goToskipToSectionQuestion;
            console.log(skipSectionQuestion, 'skipSectionQuestion');
            props.setQuestionsToSkip(skippedByQuestions, skipSectionQuestion, goToquestionsToSkip);
        }
    }),
    withAssessmentReportMutation,
    withAssessmentCompleteMutation,
    withHandlers({
        onChange: props => (question, input, callback) => {
            const { assessment, reportId } = props;
            // const hide = message.loading('Saving...');
            return props.onSubmit(question.id, input).then(({ data }) => {
                // hide();
                const { assessmentQuestionReportPayload } = data;
                const { assessmentUserReport, brahms = [] } = assessmentQuestionReportPayload || {};

                // do the brahms.
                if (brahms.length > 0) {
                    props.updateBrahmRules({ question, rules:brahms });
                    checkBrahmsOnExecution({ brahms, handleGoTo: (id) => props.handleGoTo(question.id, id), onlyGoTo: true });
                } else {
                    // reset
                    let skipByQuestion = {};
                    let skipSectionQuestion = {};
                    skipByQuestion[question.id] = [];

                    console.log(skipSectionQuestion, 'skipSectionQuestion');
                    props.setQuestionsToSkip(skipByQuestion, skipSectionQuestion, []);
                    props.updateBrahmRules({ question, rules:[] });
                }
                if (!reportId || reportId == '') {
                    props.setReportId(assessmentUserReport.id);
                }
                if (props.setReport) {
                    props.setReport(assessmentUserReport);
                }
                if (callback) {
                    callback();
                }
            });
        },
        completeAssessment: props => () => {
            const { canReport } = props;
            if (!canReport) {
                return;
            }
            const hide = message.loading('Completing...');
            props.onComplete().then(({ data }) => {
                // const { assessmentCompletePayload } = data;
                hide();
                message.success('Completed');
                // scroll to the block
                Scroll.scroller.scrollTo('completedBlock', {
                    duration: 1500,
                    delay: 100,
                    smooth: true,
                  });

                if (props.refetch) {
                    props.refetch();
                }
            });
        },
    }),


    withStateHandlers(props => {
        const {elements=[]} = props;
        const elementsLength = elements ? elements.length-1 : -1;
        return {currentSectionInOrder:0,currentQuestionInOrder:0}
    }, {
        setCurrentSectionQuestion: props => (sectionI, questionI) => {
            // console.log(sectionI, 'sectionI');
            // console.log(questionI, 'questionI');
            return {
                currentSectionInOrder:sectionI,
                currentQuestionInOrder:questionI,
            }
        },
        setCurrentSection: props => (sectionI) => {
            return {
                currentSectionInOrder:sectionI,
            }
        },
        increaseCurrentSection: props => (order) => {
            let {currentSectionInOrder} = props;

            if (order) {
                currentSectionInOrder = order;
            } else {
                currentSectionInOrder = currentSectionInOrder+1;
            }
            return {
                currentSectionInOrder
            }
        },
        increaseCurrentQuestion: props => (order) => {
            let {currentQuestionInOrder} = props;
            console.log(order, 'orderorder');
            if (order) {
                currentQuestionInOrder = order;
            } else {
                currentQuestionInOrder = currentQuestionInOrder+1;
            }
            return {
                currentQuestionInOrder
            }
        },
        decreaseCurrentQuestion: props => () => {
            const {currentQuestionInOrder} = props;
            return {
                currentQuestionInOrder:currentQuestionInOrder-1
            }
        }
    })
);
export const AssessmentBody = enhance(AssessmentBodyPure);
export default AssessmentBody;



export const prepareAssessmentskippedQuestionsByNextId = (props) => {
    //  console.log(props, 'assessment props');
    const { getSections=[], currentQuestionId, nextQuestionId } = props;
    // find current and next Question
    let doCollection = false;
    let questionsToSkip = [];
    let skipToSectionQuestion = false;
    let isSameSection = false;
    let startSection;
    getSections.map((section, si) => {
        const { id:sectionId, getQuestions = [] } = section;

        // if as same as start section, we need for checking what sections to skip
        const isSameAsStart = sectionId === startSection;
        getQuestions.map((question, questionI) => {
            // if this is the current question - start to collect skipped questions
            // if we need to end the collection
            if (doCollection && question.id === nextQuestionId) {
                doCollection = false;
                if (!isSameAsStart) {
                    skipToSectionQuestion = { sectionI: si, nextSectionId: section.id, questionI, nextQuestionId };
                }
            }

            if (doCollection) {
                // start to collect skipped questions
                //
                questionsToSkip.push(question.id);
            }
            // start with next question
            if (question.id === currentQuestionId) {
                doCollection = true;
                startSection = sectionId;
            }
        })
    })

    let skipByQuestion = {};
    let skipSectionQuestion = {};
    skipByQuestion[currentQuestionId] = questionsToSkip;
    skipSectionQuestion[currentQuestionId] = skipToSectionQuestion;
    console.log( { skipByQuestion, skipSectionQuestion, questionsToSkip }, 'SKIPP INFO');
    return { skipByQuestion, skipSectionQuestion, questionsToSkip };

}
/**
 * Prepare skipped questions
 *
 */
export const prepareAssessmentSkippedQuestions = ({ i, answer, report: questionReport, question = {}, sections = [], section: questionSection }) => {
    const { id } = question || {};

    const { nextQuestionId } = answer || {};// next question to go
    let questionsToSkip = [];
    let skipToSectionQuestion = false;
    const isFinish = nextQuestionId === '';
    // if we have next question or finish we can continue
    if (nextQuestionId || isFinish) {
        // if to start collect questions
        let doCollection = false;
        sections.map((section, si) => {
            const { getQuestions = [] } = section;

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
                    skipToSectionQuestion = { sectionI: si, nextSectionId: section.id, questionI, nextQuestionId };
                }
            }
            return section;
        });
    }
    return { questionsToSkip, skipToSectionQuestion };
}

/**
 * Filter questions to exclude skipped questions
 */
const filterSectionsAndQuestions = (sections, skippedByQuestions, hideEmptySections = false) => {
    let skippedQuestions = [];
    // convert skipped by question into skipped question
    for (var qid in skippedByQuestions) {
        const skippedByQuestion = skippedByQuestions[qid];
        skippedQuestions = [...skippedQuestions, ...skippedByQuestion];
    }
    let newSections = sections.map((section, i) => {
        const { getQuestions = [] } = section || {};
        // find skipped questions
        // first check if we have  question that started skip in this section. if yes - then
        const newQuestions = getQuestions.filter(question => !skippedQuestions.includes(question.id));

        return { ...section, getQuestions: newQuestions };
    });

    // if we need to hide empty sections (should be false for builder)
    if (hideEmptySections) {
        newSections = newSections.filter(section => section.getQuestions.length > 0);
    }

    return newSections;
}