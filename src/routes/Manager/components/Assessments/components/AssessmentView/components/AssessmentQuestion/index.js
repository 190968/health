import React from 'react';
import { TimeField } from '../../../../../../../../components/FormCustomFields';
import AssessmentChoice from './containers/AssessmentChoice';
import AssessmentInput from './containers/AssessmentInput';
import AssessmentSlider from './containers/AssessmentSlider';
import {Form, Button} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const AssessmentQuestion = props => {
    const {form,canReport=false, assessment, question, section, onChange, isCompleted, report, isFirstSection, isLastSection} = props;
    const {title, description, type, isNumeric, isOpenended, isMultiple, getAnswers=[]} = question || {};

    const {i, currentQuestion, isPastSection, goPreviousQuestion, goNextQuestion, goNextSection, goPreviousSection} = props;
   
    let field = '';
    
    const {getReportedValues} = report || {};
    // console.log(question);
    // console.log(getReportedValues);
    // find values
    const reports = getReportedValues || [];
    const questionReports = reports.filter(report => report.questionId === question.id);

    const defaultProps = {disabled:isCompleted || !canReport, onChangeReport:onChange, reports:questionReports};


    let {
        isAllMandatory,
        allowGoBack,
        showAllQuestions,
        showAllSections} = assessment;
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
    // show buttons is not dimmed and not completed and need to show by one question
    const canShowButtons = !questionIsDimmed && !isCompleted && !showAllQuestions && !showAllSections ;//isCurrentSection

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
    

    if (isFirstQuestion && !isFirstSection) {
        //prevText = 'Previous Section';
        onPrevClick = goPreviousSection;
        showPreviousButton = true;
    }

    let initialValue = null;
    let value = null;
    switch(type) {
        case 'yes_no':
        case 'list':
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
            console.log(initialValue, 'initialValue');
            field = <AssessmentChoice isMultiple={isMultiple} answers={getAnswers} {...defaultProps} />;
            break;
        case 'input':
            value = questionReports.map(report => report.value);
            initialValue = value[0] || null;
            // console.log(value);

            field = <AssessmentInput {...defaultProps} />
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
        console.log('No FIELD');
        return null;
    }
    // console.log(question, 'question');
    // console.log(initialValue, 'initialValue');
    const {getFieldDecorator} = form;
    return <div className={'relative'}>
        {questionIsDimmed && <div className={'dimmed-block'} />}

        <FormItem
        >
          {getFieldDecorator('field'+question.id, {
            initialValue,
            rules: [{ required: isAllMandatory, message: 'Please answer the question' }],
          })(
            field
          )}
        </FormItem>
        

        {(!questionIsDimmed && canReport && !showAllQuestions) && <div style={{textAlign:'right', marginTop:5}}>
       
            {showPreviousButton && <span className={'link bump-r grey'} onClick={onPrevClick}>{prevText}</span>}
            {showNextButton && <Button type={'primary'} onClick={onNextClick}>{nextText}</Button>}
       
       </div>}
    </div>
}

export default AssessmentQuestion;

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