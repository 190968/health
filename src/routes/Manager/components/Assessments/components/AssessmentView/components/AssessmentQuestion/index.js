import React from 'react';
import { TimeField } from '../../../../../../../../components/FormCustomFields';
import AssessmentChoice from './containers/AssessmentChoice';
import AssessmentInput from './containers/AssessmentInput';
import AssessmentSlider from './containers/AssessmentSlider';
import {Form, Button, Alert} from 'antd';
import moment from 'moment';
import { BrahmOutputItem, BrahmsOutputs, BrahmOutputWidget, BrahmsElementOutput } from '../../../../../../../../components/Brahms/components/View/components/Output';
import BrahmsAsField, { BrahmsRulesView } from '../../../../../../../../components/Brahms/components/Manager/components/Field';
// import { TrackerInput } from '../../../../../../../Plan/components/Tracker';

const FormItem = Form.Item;

const AssessmentQuestion = props => {
    const {isPreviewMode=false, isBuilderMode=false, form,canReport=false, assessment, question, section, onChange, isCompleted, report, isFirstSection, isLastSection, brahmRules} = props;
    const {title, description, type, isNumeric, numberAsPrefix=false, isMultiple, getAnswers=[], getBrahmsRules=[]} = question || {};

    const {i, currentQuestion, isPastSection, goPreviousQuestion, goNextQuestion, goNextSection, goPreviousSection} = props;
   
    let field = '';
    
    const {getReportedValues} = report || {};
    // console.log(question);
    // console.log(getReportedValues);
    // find values
    const reports = getReportedValues || [];
    const questionReports = reports.filter(report => report.questionId === question.id);
    // get brahms for this questions
    const {rules:brahms} = brahmRules.find(report => report.question.id === question.id) || {};
    // console.log(question, 'question');
    // console.log(brahmRules, 'brahmRules');
    // console.log(brahms, 'brahms');
    // console.log(props, 'propspropspropspropsprops');
    let defaultProps = {numberAsPrefix, disabled: ((isCompleted || !canReport) && !isPreviewMode), onChangeReport:onChange, reports:questionReports};


    let {
        isAllMandatory,
        allowGoBack,
        showAllQuestions,
        showAllSections, 
        showBrahms,
        showValidAnswer } = assessment;
        if (isCompleted) {
            showAllQuestions = true;
            showAllSections = true;
        }

    const {getQuestions = []} = section;

    const totalQuestions = getQuestions.length;
    const isLastQuestion = totalQuestions === i+1;
    const isFirstQuestion = i === 0;
    const isPastQuestion = currentQuestion > i;
    const questionIsDimmed = !showAllQuestions && (isPastQuestion || isPastSection);
    // show buttons is not dimmed and not completed and need to show by one question or this is a preview
    const canShowButtons = !questionIsDimmed && !isCompleted && !showAllQuestions && !showAllSections ;//isCurrentSection
    // console.log(canShowButtons);
    const showNextButton = canShowButtons;// && !showAllSections;// && (!showAllQuestions);// || (!showAllSections && isLastQuestion);
    let showPreviousButton = canShowButtons && (allowGoBack && !isFirstQuestion);//!showAllSections && showAllQuestions && !showFinishButton;// || (!showAllSections && isLastQuestion);
    let nextText = 'Next Question';
    let onNextClick = goNextQuestion;
    let prevText = 'Previous Question';
    let onPrevClick = goPreviousQuestion;
    if (isLastQuestion && !isLastSection) {
        nextText = 'Next Section';
        onNextClick = goNextSection;
    } else if (isLastQuestion && isLastSection) {
        nextText = 'Finish';
        onNextClick = props.completeAssessment;
    }

    const {getFieldDecorator, getFieldValue} = form;
    

    if (isFirstQuestion && !isFirstSection && allowGoBack) {
        //prevText = 'Previous Section';
        onPrevClick = goPreviousSection;
        showPreviousButton = true;
    }

    let showQuestionValidAnswer = (showValidAnswer === 'question' || (isCompleted && showValidAnswer === 'summary'));
    // console.log(isCompleted);
    // console.log(showValidAnswer);
    // console.log(showQuestionValidAnswer);
    defaultProps.showCorrect = showQuestionValidAnswer;
    let initialValue = null;
    let value = null;
    switch(type) {
        case 'yes_no':
        case 'list':
        case 'radio':
            if (isMultiple) {
                value = questionReports.map(report => report.answerId);
                value = value || [];
                // if it's multiple, check use checkboxes
                initialValue = value;
            } else {
                value = questionReports.map(report => report.answerId);
                value = value[0] || '';
                initialValue = value;
            }
            // console.log(initialValue, 'initialValue');
            field = <AssessmentChoice isMultiple={isMultiple} answers={getAnswers} {...defaultProps} />;
            break;
        case 'tracker':
            const {getTracker} = question;
            value = questionReports.map(report => report.value);
            initialValue = value[0] || null;

            field = <AssessmentInput {...defaultProps} isTracker tracker={getTracker} />
            break;
        case 'input':
        case 'number':
            value = questionReports.map(report => report.value);
            initialValue = value[0] || null;
            // console.log(questionReports, 'questionReports');
            // console.log(value);
            // console.log(initialValue, 'initialValue');

            field = <AssessmentInput {...defaultProps} isNumber={type === 'number'} />
            break;
        case 'time':
            value = questionReports.map(report => report.value);
            initialValue = value[0] || null;
            initialValue = initialValue && moment(initialValue);

            field = <AssessmentInput isTime  {...defaultProps} />
            break;
        case 'dropdown':
            value = questionReports.map(report => report.answerId);
            value = value[0] || null;
            initialValue = value;
            field = <AssessmentChoice isDropdown answers={getAnswers} {...defaultProps} />;
            break;
        case 'range':
            value = questionReports.map(report => report.answerId);
            value = value[0] || null;
            initialValue = value;
            field = <AssessmentSlider answers={getAnswers} {...defaultProps} />
            break;
    }
    if (field == '') {
        console.log(props, 'NO FIELD!');
        return null;
    }
    if (showQuestionValidAnswer) {
        // check if we have report
        // console.log(initialValue, 'initialValue');
        // console.log(getFieldValue('question['+question.id+']'));
       
        // let haveReport = false;
        // if (isPreviewMode) {
        //     let reportFromForm =  getFieldValue('question['+question.id+']');
        //     console.log(reportFromForm, 'reportFromForm');
        //     showQuestionValidAnswer = reportFromForm && ((isMultiple && Array.isArray(reportFromForm) && reportFromForm.length > 0) || (!isMultiple));
        // } else {
        //     showQuestionValidAnswer = questionReports.length > 0;
        //     //  = haveReport;// && questionReports.length > 0;
        // }
       
        // console.log(reportFromForm);
        // console.log(haveReport);
        // console.log(showQuestionValidAnswer);
    }
    const showBottomButtons = (!questionIsDimmed && (canReport || isPreviewMode) && !showAllQuestions);
    // console.log(isPreviewMode, 'question');
    // console.log(showAllQuestions, 'question');
    // console.log(showBottomButtons, 'question');
    //  console.log(initialValue, 'initialValue');
   
    return <div className={'relative'}>


        <div className={'relative'}>
        {questionIsDimmed && <div className={'dimmed-block'} />}

        <FormItem
        style={{marginBottom:0}}
        >
          {getFieldDecorator('question['+question.id+']', {
            initialValue,
            rules: [{ required: isAllMandatory, message: 'Please answer the question' }],
          })(
            field
          )}
           </FormItem>
        </div>
        {(!isPreviewMode && isBuilderMode && getBrahmsRules && getBrahmsRules.length > 0) && <BrahmsRulesView rules={getBrahmsRules} renderRule={questionBrahmItem} possibleOptions={getAnswers} formatGoToElement={props.formatGoToElement} />}
            {((showBrahms === 'question' || showBrahms === 'both') && brahms && brahms.length > 0) && <BrahmsElementOutput rules={brahms} /> }
        
        {/* {showQuestionValidAnswer && <AssessmentQuestionValidAnswers answers={getAnswers} />} */}

        
        {showBottomButtons && <div style={{textAlign:'right', marginTop:5}}>
       
            {showPreviousButton && <span className={'link bump-r grey'} onClick={onPrevClick}>{prevText}</span>}
            {showNextButton && <Button type={'primary'} onClick={onNextClick}>{nextText}</Button>}
       
       </div>}
    </div>
}

export default AssessmentQuestion;

export const AssessmentQuestionValidAnswers = props => {
    const {answers=[], sections=[]} = props;
    let answersValid = [];
    if (sections.length > 0) {
        sections.map(s => {
            const {getQuestions=[]} = s;
            getQuestions.map(q => {
                const {getAnswers=[]} = q;
                answersValid += getAnswers;
            })
        });
        answersValid = answersValid.filter(a =>a.isValidAnswer);
    } else {
        // find proper answers
        answersValid = answers.filter(a =>a.isValidAnswer);
    }
    if (answersValid.length > 0) {
        return <Alert
        message="Valid Answers:"
        description={answersValid.map(a => (<div key={a.id}>{a.label}</div>))}
        type="success"
        showIcon
    />;
    }
    return null;
}

const questionBrahmItem = props => {
    console.log(props);
    return <div>111</div>;
}
 
// const validateQuestion = (rule, value, callback) => {
//     const {message, type, isMultiple} = rule;
//     console.log(value);
//     if (!value) {
//         callback(message);
//     } else {
//         let valueFormatted = null;
//         switch(type) {
//             case 'yes_no':
//             case 'list':
//                 if (isMultiple) {
                    
//                 } else {
                
//                 }
//                 break;
//             case 'input':
//                 const inputValue = value[0] || {};
//                 valueFormatted = inputValue.value || null;
//                 break;
//             case 'time':
                
//                 break;
//             case 'dropdown':
                
//                 break;
//             case 'range':

//                 break;
//             }
//         if (!valueFormatted) {
//             callback(message);
//         }
//     }
//     callback()
// }