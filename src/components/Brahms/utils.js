
import { notification } from 'antd';
import { formatTimeForField } from '../Other/utils';



export const checkBrahmsOnExecution = props => {
    const {brahms=[], handleGoTo, onlyGoTo=false} = props;
    // console.log(props);
    brahms.map(rule => {
        const {ruleActionType, ruleAction} = rule;
        if (onlyGoTo && ruleActionType !== 'goto') {
            return false;
        }
        // console.log(ruleActionType, 'BRAHM RULE');
        switch(ruleActionType) {
            case 'output':
                const {message} = ruleAction || {};
                notification.open({
                    message: message,
                    // description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                });
                break;
            case 'ap':
                // suggest to assign aps.
                const {plans} = ruleAction || {};
                break;
            case 'goto':
                const {goToElementId} = ruleAction || {};
                if (goToElementId && handleGoTo) {
                    handleGoTo(goToElementId);
                }
                break;
        }

        return null;
    })
}

export const getNextObjectFromRules = props => {
    let nextElementId = null;
    const {rules=[]} = props;
    // console.log(props);
    rules.map(rule => {
        const {ruleActionType, ruleAction} = rule;
        // console.log(ruleActionType, 'BRAHM RULE');
        switch(ruleActionType) {
            case 'goto':
                const {goToElementId} = ruleAction || {};
                nextElementId = goToElementId;
                break;
            case 'stop':
                nextElementId = -1;;
                break;
        }

        return null;
    });

    return nextElementId;
}

export const validateBrahms = props => {
     console.log(props, 'validateBrahms');
    const {isAnswerBasedElement=false} = props;
    const {rules=[], value, type, isAnswerBasedQuestion=isAnswerBasedElement} = props;

    if (!rules) {
        return [];
    }
    let reportedValue = parseFloat(value);
    const validatedRules = rules.filter(rule => {

        const {ruleType, ruleValue, ruleElementType, ruleValueEnd, ruleValueId, ruleActionType} = rule;
        if (type) {
            if (Array.isArray(type)) {
                if (!type.includes(ruleActionType)) {
                    return false;
                }
            } else {
                if (ruleActionType !== type) {
                    return false;
                }
            }
        } else if (ruleActionType == 'goto') {
            return false;
        } else if (ruleActionType == 'stop') {
            return false;
        }
        let valueToCheck;// = isAnswerBasedQuestion ? ruleValueId : ruleValue; 
        
       
        // console.log(isAnswerBasedQuestion);
        // if this is answer based, then just to compare if equal
        if (ruleElementType === 'optionId') {
            return ruleValueId === value;
        }
        // console.log(ruleType);
        // console.log(parseFloat(valueToCheck));
        // console.log(parseFloat(value));
        // console.log(parseFloat(ruleValueEnd));
        let valueStartFloat;
        let valueEndFloat;
        switch(ruleElementType) {
            case 'time':
                // if it's time, then convert to unix
                // initial
                if (value) {
                    const timeInitialObject = formatTimeForField(value, {isUTC:true});
                    reportedValue = timeInitialObject.unix();
                } else {
                    reportedValue = null;
                }

                const timeObject = formatTimeForField(ruleValue);
                valueStartFloat = timeObject.unix();

                if (ruleValueEnd) {
                    const timeEndObject = formatTimeForField(ruleValueEnd);
                    valueEndFloat = timeEndObject.unix();
                }
                break;
            default:
                // valueToCheck = ruleValue;
                valueStartFloat = parseFloat(ruleValue);
                valueEndFloat = ruleValueEnd && parseFloat(ruleValueEnd);
                break;

        }
        
        
        console.log(valueStartFloat);
        // console.log(ruleType);
        console.log(reportedValue);

        switch(ruleType) {
            case 'between':
                
                // console.log(valueEndFloat);
                // console.log(valueFloat >= parseFloat(value) && valueFloat <= parseFloat(ruleValueEnd));
                return reportedValue >= valueStartFloat && reportedValue <= valueEndFloat;
            case 'equal':
                return valueStartFloat === reportedValue;
            case 'less_than':
                return valueStartFloat > reportedValue;
            case 'less_eq_than':
                return valueStartFloat >= reportedValue;
            case 'more_than':
                return valueStartFloat < reportedValue;
            case 'more_eq_than':
                return valueStartFloat <= reportedValue
        }
        return false;
    });

    // console.log(validatedRules, 'validatedRules');

    return validatedRules;
}

export const renderBrahms = props => {
    const {rules, value} = props;
}



export const collectExecutedBrahms = props => {
    const {valueToUse, getBrahmsRules, isAnswerBasedElement} = props;
    let {skippedElementsByRef, elementRules:questionRules=[]} = props;
    let rules = [];
    let goToRules = [];
    let nextQuestionId;
    // if this is an array, then do the loop
    if (Array.isArray(valueToUse)) {
        for (var key in valueToUse) {
            const valueToUseFromArray = valueToUse[key];
            //
            rules = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedElement });
            if (rules.length > 0) {
                questionRules = [...questionRules, ...rules];
            }
            // goto
            const goTorulesFromArray = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedElement, type: ['goto','stop'] });
            if (goTorulesFromArray.length > 0) {
                goToRules = [...goToRules, ...goTorulesFromArray];
            }
        }
    } else {
        rules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedElement });
        // save brahms
        if (rules.length > 0) {
            questionRules = [...questionRules, ...rules];
        }
        // goto
        goToRules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedElement, type: ['goto','stop'] });
    }

    if (goToRules.length > 0) {
        // find answer
        // find next skipped item
        nextQuestionId = getNextObjectFromRules({ rules: goToRules });
        // const { questionsToSkip: goToquestionsToSkip, skipToSectionQuestion: goToskipToSectionQuestion } = prepare({ getSections, currentQuestionId: id, nextQuestionId })
        // skippedByQuestions[id] = goToquestionsToSkip;
        // skipSectionQuestion[id] = goToskipToSectionQuestion;
    }
    // console.log(skippedElementsByRef);
    // console.log(questionRules);
    return {skippedElementsByRef, elementRules:questionRules, nextElementId:nextQuestionId}
}