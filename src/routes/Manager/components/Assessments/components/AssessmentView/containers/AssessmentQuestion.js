import AssessmentQuestionPure from '../components/AssessmentQuestion';
import {Form} from 'antd';
import {compose, withHandlers, branch, withState, withProps} from 'recompose';
import { prepareAssessmentSkippedQuestions, prepareAssessmentskippedQuestionsByNextId } from './AssessmentBody';
import { validateBrahms, getNextObjectFromRules } from '../../../../../../../components/Brahms/utils';

const enhance = compose(
    branch(props => {
        const {showAllQuestions} = props.assessment || {};
        // console.log(props.assessment);
        return !showAllQuestions;
    }, Form.create()),
    withProps(props => {
        const {question, report, form} = props;
        const {getBrahmsRules=[]} = question || {};
        const fieldChanged = form.isFieldTouched('question['+question.id+']');

        const {getReportedValues} = report || {};
    // console.log(question);
    // console.log(getReportedValues);
    // find values
        const questionReports = getReportedValues && getReportedValues.filter(report => report.questionId === question.id);

        // console.log(props, 'propspropspropspropsprops');
        // console.log(questionReports, 'questionReports');
        // if we have brahms, then we should save info, run brahms, then execute.
        const haveBrahms = getBrahmsRules && getBrahmsRules.length > 0;// && (questionReports.length === 0 || fieldChanged);
        // console.log(haveBrahms);
        return {
            haveBrahms,
            haveBrahmsAndToExecute:haveBrahms,
            questionReports
        }
    }),
    withState('checkBrahmsBeforeReport', 'setCheckBrahmsBeforeReport', props => {
        const {question, report, questionReports=[]} = props;
        const {getReportedValues} = report || {};
    
        return props.haveBrahmsAndToExecute && questionReports.length === 0;
    }),
    withState('tmpReport', 'keepTmpReport'),
    withHandlers({
        validateQuestionOnBrahms: props => value => {
            const {question} = props;
            let {question:questionReport} = value;
            // console.log(value);
            const {id, getBrahmsRules=[], isAnswerBasedQuestion} = question || {};

            let valueToUse = questionReport[question.id] || {};
            // const { answerId, value } = questionReport || {};
            // let goTorules = [];
            let rules = [];
            let questionRules = [];

            if (Array.isArray(valueToUse)) {
                for (var key in valueToUse) {
                    const valueToUseFromArray = valueToUse[key];
                    //
                    rules = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedQuestion });
                    if (rules.length > 0) {
                        questionRules = [...questionRules, ...rules];
                    }
                    // // goto
                    // const goTorulesFromArray = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedQuestion, type: ['goto','stop'] });
                    // if (goTorulesFromArray.length > 0) {
                    //     goTorules = [...goTorules, ...goTorulesFromArray];
                    // }
                    }
            } else {
                rules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedQuestion });
                // save brahms
                if (rules.length > 0) {
                    questionRules = [...questionRules, ...rules];
                }
                // goto
                // goTorules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedQuestion, type: ['goto','stop'] });
            }
            

            props.updateBrahmRules({ question, rules:questionRules });
            // cancel check
            props.setCheckBrahmsBeforeReport(false);
        },
        ifValidateOnBrahms: props => (forButton) => {
            const {question, checkBrahmsBeforeReport, form, haveBrahms} = props;
            const isFieldChanged = form.isFieldTouched('question['+question.id+']');
            // const {id, getBrahmsRules=[], isAnswerBasedQuestion} = question || {};
            // props.ifValidateOnBrahms()
            if (forButton) {
                return checkBrahmsBeforeReport && haveBrahms;
            }
            return checkBrahmsBeforeReport && haveBrahms;// || (isFieldChanged && haveBrahms);
        }
    }),
    withHandlers({
        // Submit the question
        onChange: props => (reports) => {
            let callback;
            const {isPreviewMode, isBuilderMode, i, question, section:questionSection, assessment, canReport=false} = props;
            const {getSections, showAllSections, showAllQuestions} = assessment || {};
            // let showAllQuestions = true;
            if (!showAllQuestions) {
                // if we show by question, keep this callback and report later
                props.keepTmpReport(reports);
                // return;
                props.setCheckBrahmsBeforeReport(true);
            }

            // console.log(reports, 'reports');
            // return ;
            // DIsable if it view mode or preview
            if (!canReport || isPreviewMode || !showAllQuestions || isBuilderMode) {
                if (isPreviewMode || !showAllQuestions) {
                    // execute brahms
                    const {id, getBrahmsRules=[], isAnswerBasedQuestion} = question || {};
                    let skippedByQuestions = {};
                    let skipSectionQuestion = {};
                    let questionRules = [];
                    skippedByQuestions[id] = [];
                    skipSectionQuestion[id] = false;

                    const reportss = [reports];
                    reportss.map(questionReport => {
                        const { answerId, value } = questionReport || {};

                        let goTorules = [];
                        let rules = [];
                        const valueToUse = isAnswerBasedQuestion ? answerId : value;

                        if (Array.isArray(valueToUse)) {
                            for (var key in valueToUse) {
                                const valueToUseFromArray = valueToUse[key];
                                //
                                rules = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedQuestion });
                                if (rules.length > 0) {
                                    questionRules = [...questionRules, ...rules];
                                }
                                // goto
                                const goTorulesFromArray = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedQuestion, type: ['goto','stop'] });
                                if (goTorulesFromArray.length > 0) {
                                    goTorules = [...goTorules, ...goTorulesFromArray];
                                }
                              }
                        } else {
                            rules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedQuestion });
                            // save brahms
                            if (rules.length > 0) {
                                questionRules = [...questionRules, ...rules];
                            }
                            // goto
                            goTorules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedQuestion, type: ['goto','stop'] });
                        }
                        
                        
                        
                        if (goTorules.length > 0) {
                            // find answer
                            // find next skipped item
                            const nextQuestionId = getNextObjectFromRules({ rules: goTorules });
                            const { questionsToSkip: goToquestionsToSkip, skipToSectionQuestion: goToskipToSectionQuestion } = prepareAssessmentskippedQuestionsByNextId({ getSections, currentQuestionId: id, nextQuestionId })
                            skippedByQuestions[id] = goToquestionsToSkip;
                            skipSectionQuestion[id] = goToskipToSectionQuestion;
                        }
                    });

                    // console.log(skipSectionQuestion, 'skipSectionQuestion');
                    props.setQuestionsToSkip(skippedByQuestions, skipSectionQuestion, []);
                    // show brahms in preview and when show all questions
                    if (isPreviewMode || showAllQuestions) {
                        props.updateBrahmRules({ question, rules:questionRules });
                    }
                    // update state
                }
                return;
            }
            // do not execute if by question. if by question - next question makes the save.
            if (!showAllQuestions) {
                return;
            }
            let finalReports = reports;
            const {type} = question || {};
            if (type === 'time') {
                const {value:reportValue} = reports;
                finalReports = {time:reportValue};
            }
            // console.log(props, 'reportsreportsreportsreports'); 
            // console.log(reports, 'reportsreportsreportsreports'); 
            // console.log(finalReports, 'reportsreportsreportsreports'); 
            props.onChange(question, finalReports, callback);
        },
        /**
         * Go next question. We need to pass the questions and section ID to open
         */
        goNextQuestion: props => () => {
            const {form, assessment, question, canReport, haveBrahmsAndToExecute} = props;
            const {showAllQuestions} = assessment || {};
            const {getBrahmsRules=[]} = question || {};
            // if we have brahms, then we should save info, run brahms, then execute.
            // const haveBrahms = getBrahmsRules && getBrahmsRules.length > 0;
            
            // let showAllQuestions = true;
            // check if we have brahms
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                if (props.ifValidateOnBrahms()) {
                    props.validateQuestionOnBrahms(values);
                } else {
                    // console.log(showAllQuestions, 'NEXT Question')
                    // console.log(values, 'values')
                    if (canReport && !showAllQuestions && form.isFieldsTouched()) {
                        // run the callback if all is good, and then go next question
                        let {tmpReport} = props;
                        if (!tmpReport) {
                            const {isAnswerBasedQuestion} = question || {};
                            const {question:questionTmp} = values;

                            tmpReport = questionTmp[question.id] || {};
                            // const valueToUse = isAnswerBasedQuestion ? answerId : value;
                            if (isAnswerBasedQuestion) {
                                tmpReport = {answerId:tmpReport};
                            } else {
                                tmpReport = {value:tmpReport};
                            }
                            
                        }
                        // console.log(tmpReport);
                        props.onChange(question, tmpReport).then(() => {

                            // if (haveBrahmsAndToExecute) {
                            //     // ecxecute brahms
                            //     console.log('execute brahms first');
                            //     console.log(props);
                            //     return;
                            // }
                            props.goNextQuestion(question);
                        });
                    } else {
                        props.goNextQuestion(question);
                    }
                }
                
            });
        },
        goNextSection: props => (input) => {
            const {form, assessment, canReport} = props;
            const {showAllQuestions} = assessment || {};
            // let showAllQuestions = true;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                if (props.ifValidateOnBrahms()) {
                    props.validateQuestionOnBrahms(values);
                } else {
                    // console.log(form.isFieldsTouched());
                    // console.log(showAllQuestions, 'NEXT SECTION')
                    if (canReport && !showAllQuestions && form.isFieldsTouched()) {
                        // run the callback if all is good, and then go next section
                        // run the callback if all is good, and then go next question
                        const {question, tmpReport} = props;
                        const callback = () => {
                            // console.log(tmpReport, 'kkkkkkkkkkkkkkkkkk')
                            props.goNextSection(input);
                        };
                        props.onChange(question, tmpReport, callback);//.then();
                    } else {
                        props.goNextSection(input);
                    }
                }
            });
        },
        completeAssessment: props => (input) => {
            const {form, assessment, canReport} = props;
            const {showAllQuestions} = assessment || {};
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }

                if (props.ifValidateOnBrahms()) {
                    props.validateQuestionOnBrahms(values);
                } else {
                    if (canReport && !showAllQuestions) {
                        // run the callback if all is good, and then go next section
                        // run the callback if all is good, and then go next question
                        const {question, tmpReport} = props;
                        if (tmpReport) {
                            const callback = () => {
                                // console.log(tmpReport, 'kkkkkkkkkkkkkkkkkk')
                                props.completeAssessment(input);
                            };
                            props.onChange(question, tmpReport, callback);//.then();
                        } else {
                            props.completeAssessment(input);
                        }
                    } else {
                        props.completeAssessment(input);
                    }
                }
            });
        },
        /**
         * Go Previous question. We need to pass the questions and section ID to open
         */
        goPreviousQuestion: props => () => {
            const {question} = props;

            props.goPreviousQuestion(question);
        },
        formatGoToElement: props => elementId => {

            return formatAssessmentGoToElement(elementId, props);
            
        },
        setCurrentQuestionInSection: props => () => {
            const {i} = props;
            props.setCurrentQuestionInSection(i)
        }
    })
);
const AssessmentQuestion = enhance(AssessmentQuestionPure);
export default AssessmentQuestion;

export const formatAssessmentGoToElement = (elementId, props) => {
    const {assessment} = props;
    const {getSections=[]} = assessment || {};
    let elementObj = {};
    const section = getSections.find(section => {
        const {getQuestions=[]} = section;

        const question = getQuestions.find(q => q.id === elementId);
        if (question) {
            elementObj = question;
            return true;
        }
        return false;
    })
    // console.log(section);
    // console.log(elementObj);
    const {title:sectionTitle} = section || {};
    const {title} = elementObj || {};

    return sectionTitle ? sectionTitle+' / '+title : title;
}