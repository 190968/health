
import { notification } from 'antd';



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
        }

        return null;
    });

    return nextElementId;
}

export const validateBrahms = props => {
    // console.log(props);
    const {rules=[], value, type, isAnswerBasedQuestion=false} = props;

    if (!rules) {
        return [];
    }
    const validatedRules = rules.filter(rule => {

        const {ruleType, ruleValue, ruleValueEnd, ruleValueId, ruleActionType} = rule;
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
        }
        const valueToCheck = isAnswerBasedQuestion ? ruleValueId : ruleValue; 
        
        // if (ruleActionType == 'goto') {
        //     if (type !== 'goto') {
        //         return false;
        //     } else {
        //         return ruleTypeValue === value;
        //     }
        // }
        //if (Array.isArray(value)) {
            // if the value is multiple, check as array

        //}
        //console.log(value);
        if (isAnswerBasedQuestion) {
            return valueToCheck === value;
        }
        // console.log(parseFloat(valueToCheck));
        // console.log(parseFloat(value));
        switch(ruleType) {
            case 'between':
                const valueFloat = parseFloat(valueToCheck);
                return valueFloat >= parseFloat(value) && valueFloat <= parseFloat(ruleValueEnd);
            case 'equal':
                return parseFloat(valueToCheck) === parseFloat(value);
            case 'less_than':
                return parseFloat(valueToCheck) > parseFloat(value);
            case 'less_eq_than':
                return parseFloat(valueToCheck) >= parseFloat(value);
            case 'more_than':
                return parseFloat(valueToCheck) < parseFloat(value);
            case 'more_eq_than':
                return parseFloat(valueToCheck) <= parseFloat(value);
        }
        return false;
    });

    // console.log(validatedRules, 'validatedRules');

    return validatedRules;
}

export const renderBrahms = props => {
    const {rules, value} = props;
}