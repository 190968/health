

export const getPlanElementLabelFromElement = (element, props={}) => {
    const {itemInfo:item={}, type, typeText} = element || {};
    const {itemType = type} = element || {};
    const {isBuilderMode=false, showType=true} = props;
    let fieldTitle = '';
    //console.log(element, item);
    switch(itemType) {
        default: break;
        case 'measurement_input':
            fieldTitle = item.label;
            break;
        case 'choice_input':
        case 'checklist':
            fieldTitle = item.label;
            break;
        case 'radio_input':
            fieldTitle = item.label;
            break;
        case 'text_input':
            fieldTitle = item.label;
            break;
        case 'dropdown_input':
        case 'condition':
            fieldTitle = item.label;
            break;
        case 'decision':
            fieldTitle = item.label;
            break;
        case 'scale_input':
            fieldTitle = item.label;
            break;
        case 'file_input':
            fieldTitle = item.label;
            break;
        case 'exam_input':
            fieldTitle = item.name;
            break;
        case 'instruction':
        case 'instruction_embed':
            if (showType) {
                fieldTitle = 'Instruction';
            }
            break;
        case 'clinical_note':
            fieldTitle = item.title || '';
            break;
        case 'line':
            if (showType) {
                fieldTitle = 'Line';
            }
            break;
        case 'instruction_tipbox':
            if (showType) {
                fieldTitle = 'Tipbox';
            }
            break;
        case 'link':;
            fieldTitle = item.label;
            break;
        case 'media':
            fieldTitle = item.label;
            break;
        case 'treatment':
            fieldTitle = item.title;
            break;
        case 'diagnosis':
        if (showType) {
            fieldTitle = 'Diagnosis';
        }
            break;
        case 'cancer_stage':
        if (showType) {
            fieldTitle = 'Stage';
        }
            break;
        case 'alias':
            fieldTitle = item.label || '';
            break;
        case 'ap':
            fieldTitle = item.title;
            break;

    }
    if (showType && isBuilderMode) {
        fieldTitle = typeText+(fieldTitle !== '' ? ' – ' : '')+ fieldTitle;
    }

    return fieldTitle;
}







export const prepareSkippedPlanElementsByNextId = (props) => {
    //  console.log(props);
    const { elements, currentId, nextId } = props;
    // find current and next Question
    let doCollection = false;
    let questionsToSkip = [];
   
    elements.map((question, questionI) => {
        // if this is the current question - start to collect skipped questions
        // if we need to end the collection
        if (doCollection && question.id === nextId) {
            doCollection = false;
        }

        if (doCollection) {
            // start to collect skipped questions
            questionsToSkip.push(question.id);
        }
        // start with next question
        if (question.id === currentId) {
            doCollection = true;
        }
    });

    let elementsToSkip = {};
    elementsToSkip[currentId] = questionsToSkip;
    return { elementsToSkip };

}

export const filterSkippedPlanElements = (elements, skippedElementsByRef) => {
    let skippedElements = [];
    console.log(elements);
    console.log(skippedElementsByRef);
    // convert skipped by question into skipped question
    for (var qid in skippedElementsByRef) {
        const skippedByElement = skippedElementsByRef[qid];
        skippedElements = [...skippedElements, ...skippedByElement];
    }
    const newElements = elements.filter(({id}) => !skippedElements.includes(id))
    return newElements;
}


// export const handleOnClickPlanbrahms = props => {
//     const {valueToUse, getBrahmsRules, isAnswerBasedQuestion} = props;
//     let {skippedElementsByRef} = props;
//     let rules = [];
//     let goTorules = [];
//     // if this is an array, then do the loop
//     if (Array.isArray(valueToUse)) {
//         for (var key in valueToUse) {
//             const valueToUseFromArray = valueToUse[key];
//             //
//             rules = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedQuestion });
//             if (rules.length > 0) {
//                 questionRules = [...questionRules, ...rules];
//             }
//             // goto
//             const goTorulesFromArray = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedQuestion, type: ['goto','stop'] });
//             if (goTorulesFromArray.length > 0) {
//                 goTorules = [...goTorules, ...goTorulesFromArray];
//             }
//         }
//     } else {
//         rules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedQuestion });
//         // save brahms
//         if (rules.length > 0) {
//             questionRules = [...questionRules, ...rules];
//         }
//         // goto
//         goTorules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedQuestion, type: ['goto','stop'] });
//     }

//     if (goTorules.length > 0) {
//         // find answer
//         // find next skipped item
//         const nextQuestionId = getNextObjectFromRules({ rules: goTorules });
//         const { questionsToSkip: goToquestionsToSkip, skipToSectionQuestion: goToskipToSectionQuestion } = prepare({ getSections, currentQuestionId: id, nextQuestionId })
//         skippedByQuestions[id] = goToquestionsToSkip;
//         skipSectionQuestion[id] = goToskipToSectionQuestion;
//     }

//     return {skippedElementsByRef}
// }