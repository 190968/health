
import { compose, withStateHandlers } from 'recompose';
import { validateBrahms, getNextObjectFromRules } from '../Brahms/utils';
import { formatPlanElementByTitle } from '../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementSelect';

export const getPlanElementLabelFromElement = (element, props={}) => {
    const {itemInfo:item={}, type, typeText} = element || {};
    const {itemType = type} = element || {};
    let {isBuilderMode=false, isPreviewMode=false, showType=true} = props;
    const isBuilderNotPreviewMode = !isPreviewMode && isBuilderMode;
    let fieldTitle = '';
    console.log(type);
    let prefix = itemType !== 'media' ? formatPlanElementByTitle({type}) : '';
    console.log(prefix, 'prefix');
    console.log(element, item);
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
            if (showType || isBuilderNotPreviewMode) {
                fieldTitle = 'Instruction';
            }
            break;
        case 'clinical_note':
            fieldTitle = item.title || '';
            break;
        case 'line':
            if (showType || isBuilderNotPreviewMode) {
                fieldTitle = 'Line';
            }
            break;
        case 'instruction_tipbox':
            if (showType || isBuilderNotPreviewMode) {
                fieldTitle = 'Tipbox';
            }
            break;
        case 'link':;
            fieldTitle = item.label;
            break;
        case 'media':
            const {mediaType, label} = item;
            fieldTitle = label;
            prefix = formatPlanElementByTitle({type:mediaType});
            break;
        case 'treatment':
            fieldTitle = item.title;
            break;
        case 'diagnosis':
            if (showType|| isBuilderNotPreviewMode) {
                fieldTitle = 'Diagnosis';
            }
            break;
        case 'cancer_stage':
            if (showType|| isBuilderNotPreviewMode) {
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
    console.log(showType, 'showType');
    console.log(isBuilderMode, 'isBuilderMode');
    if (showType && isBuilderMode) {
        fieldTitle = prefix+(fieldTitle !== '' ? ' – ' : '')+ fieldTitle;
    }
    console.log(fieldTitle, 'fieldTitle');
    return fieldTitle;
}


const PLAN_ELEMENT_TYPES_BRAHMS = [
    // 'measurement_input',

        'options',
        'choice_input',
        'checklist',
        'radio_input',
        'dropdown',
        'condition',
        //'decision',
        'scale_input',
        'scale'
];
export const planElementCanHaveBrahms = ({element}) => {
    const {type} = element || {};
    // console.log(element);
    // console.log(PLAN_ELEMENT_TYPES_BRAHMS.includes(type), 'canhavebrahms');
    return PLAN_ELEMENT_TYPES_BRAHMS.includes(type);
}









export const withPlanElementSkippedElements = compose(
    // // withSpinnerWhileLoading,
    withStateHandlers(props => {
        console.log(props, 'propspropspropsprops');
        const {items=[], mode} = props;// sections or lessons
        let getReportedValues = [];
        let skippedElementsByRef = {};
        let skippedSectionsByEl = {};
        let brahmRules = [];
        let rules = [];


        if (mode === 'section') {
            // items.map()
        }
        // now check if we need to skip elements according to our reported elements
        // if we have report
        if (mode === 'section') {


            items.map((section, si) => {
                const { id:sectionId, elements = [] } = section;

                elements.map((question, i) => {
                    const { id, getBrahmsRules = [], reports=[], isAnswerBasedElement = false } = question || {};
                   
            //         // if we have reports go to rules
                    const questionReports = reports || [];//getReportedValues.filter(report => report.questionId === question.id);
                    let questionRules = [];
                    console.log(questionReports);
                    questionReports.map(questionReport => {
                        const { answerId, value } = questionReport || {};
                        let goTorules = [];



                        if (Array.isArray(value)) {
                            for (var key in value) {
                                const valueToUseFromArray = value[key];
                                //
                                rules = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedElement });
                                if (rules.length > 0) {
                                    questionRules = [...questionRules, ...rules];
                                }
                                // goto
                                const goTorulesFromArray = validateBrahms({ rules: getBrahmsRules, value: valueToUseFromArray, isAnswerBasedElement, type: ['goto','stop'] });
                                if (goTorulesFromArray.length > 0) {
                                    goTorules = [...goTorules, ...goTorulesFromArray];
                                }
                                }
                        } else {
                            rules = validateBrahms({ rules: getBrahmsRules, value: value, isAnswerBasedElement });
                            // save brahms
                            if (rules.length > 0) {
                                questionRules = [...questionRules, ...rules];
                            }
                            // goto
                            goTorules = validateBrahms({ rules: getBrahmsRules, value: value, isAnswerBasedElement, type: ['goto','stop'] });
                        }
                        
            
                       
                        // const goTorules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedElement, type: ['goto','stop'] });
                        
                        if (goTorules.length > 0) {
                            // find next skipped item
                            const nextId = getNextObjectFromRules({ rules: goTorules });
                            const { elementsToSkip} = prepareSkippedPlanElementsByNextId({ elements, currentId: id, nextId })
                            console.log(elementsToSkip);
                            console.log(skippedElementsByRef);
                            // save questions
                            skippedElementsByRef =  elementsToSkip;
                        }
                        return null;
                    });

                    if (questionRules.length > 0) {
                        brahmRules.push({ question, rules: questionRules });
                    }
                });

        
            //     // if as same as start section, we need for checking what sections to skip
            //     const isSameAsStart = sectionId === startSection;
            //     getQuestions.map((question, questionI) => {
            //         // if this is the current question - start to collect skipped questions
            //         // if we need to end the collection
            //         if (doCollection && question.id === nextQuestionId) {
            //             doCollection = false;
            //             if (!isSameAsStart) {
            //                 skipToSectionQuestion = { sectionI: si, nextSectionId: section.id, questionI, nextQuestionId };
            //             }
            //         }
        
            //         if (doCollection) {
            //             // start to collect skipped questions
            //             //
            //             questionsToSkip.push(question.id);
            //         }
            //         // start with next question
            //         if (question.id === currentQuestionId) {
            //             doCollection = true;
            //             startSection = sectionId;
            //         }
            //     })
            });
            // find reported questions IDs
            // const reportedQuestions = getReportedValues.map(item => item.questionId);
            // map sections for answers
            
        }
        console.log(skippedElementsByRef);
        console.log(brahmRules);
        return {
            brahmRules,
            // elements,
            skippedElementsByRef,
            skippedSectionsByEl
        };
    }, {
        updateSkippedElements: props => (newSkippedElementsByRef, newSkippedSectionsByEl) => {
            const {skippedElementsByRef, skippedSectionsByEl} = props;
            return {
                skippedElementsByRef: {...skippedElementsByRef, ...newSkippedElementsByRef},
                skippedSectionsByEl: {...skippedSectionsByEl, ...newSkippedSectionsByEl}
            }
        },
        updateBrahmRules: props => (newBrahms) => {
            const {element, rules} = newBrahms || {};
            const { brahmRules = [] } = props;
            // check if we have sush question
            const brahmIndex = brahmRules.findIndex(info => info.element.id === element.id);
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
    })
);
export const prepareSkippedPlanElementsByNextId = (props) => {
    //  console.log(props);
    const { elements, currentId, nextId, plan, mode } = props;
    // find current and next Question
    let doCollection = false;
    let questionsToSkip = [];
    let skipToSectionQuestion = false;

    const {type} = plan || {};
    if (type === 'ap') {
        const {lessons, activities} = plan || {};
        let items = mode === 'lesson' ? lessons : activities;


        let startSection;
        items.map((section, si) => {
            const { id:sectionId, elements = [] } = section;

            // if as same as start section, we need for checking what sections to skip
            const isSameAsStart = sectionId === startSection;
            if (elements) {
                elements.map((question, questionI) => {
                    // if this is the current question - start to collect skipped questions
                    // if we need to end the collection
                    if (doCollection && question.id === nextId) {
                        doCollection = false;
                        if (!isSameAsStart) {
                            skipToSectionQuestion = { sectionI: si, nextSectionId: section.id, questionI, nextId };
                        }
                    }

                    if (doCollection) {
                        // start to collect skipped questions
                        //
                        questionsToSkip.push(question.id);
                    }
                    // start with next question
                    if (question.id === currentId) {
                        doCollection = true;
                        startSection = sectionId;
                    }
                })
            }
        })

        let elementsToSkip = {};
        let sectionsByElementsToSkip = {};
        elementsToSkip[currentId] = questionsToSkip;
        sectionsByElementsToSkip[currentId] = skipToSectionQuestion;
        console.log(sectionsByElementsToSkip, 'sectionsByElementsToSkip');
        return { elementsToSkip, sectionsByElementsToSkip, questionsToSkip };






    } else {
        console.log(props);
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
        return { elementsToSkip, sectionsByElementsToSkip: {} };
    }

}

export const filterSkippedPlanElements = (elements, skippedElementsByRef) => {
    let skippedElements = [];
    // console.log(elements);
    // console.log(skippedElementsByRef);
    // convert skipped by question into skipped question
    for (var qid in skippedElementsByRef) {
        const skippedByElement = skippedElementsByRef[qid];
        skippedElements = [...skippedElements, ...skippedByElement];
    }
    const newElements = elements.filter(({id}) => !skippedElements.includes(id))
    return newElements;
}

export const filterSkippedPlanSections = (sections,skippedElementsByRef, hideEmptySections = false) => {
    let skippedQuestions = [];
    // convert skipped by question into skipped question
    for (var qid in skippedElementsByRef) {
        const skippedByQuestion = skippedElementsByRef[qid];
        skippedQuestions = [...skippedQuestions, ...skippedByQuestion];
    }
    let newSections = sections.map((section, i) => {
        const { elements = [] } = section || {};
        // find skipped questions
        // first check if we have  question that started skip in this section. if yes - then
        const newQuestions = elements && elements.filter(question => !skippedQuestions.includes(question.id));

        return { ...section, elements: newQuestions };
    });
    // console.log(newSections);
    // console.log(hideEmptySections);
    // if we need to hide empty sections (should be false for builder)
    if (hideEmptySections && newSections) {
        newSections = newSections.filter(section => section.elements && section.elements.length > 0);
    }
    // console.log(newSections);
    return newSections;
}


export const formatPlanGoToElement = (elementId, props) => {
    const {plan, mode} = props;
    const {elements, type} = plan || {};
    let element;
    if (type === 'ap') {
        const {lessons, activities} = plan || {};
        let items = mode === 'lesson' ? lessons : activities;
        let elementObj = {};
        // work with sections
        const section = items.find(s => {
            const {id, elements:els} = s;
            //console.log(els);
            // console.log(els.find(q => q.id === elementId));
            //return els && els.find(q => q.id === elementId);

            const question = els && els.find(q => q.id === elementId);
                if (question) {
                    elementObj = question;
                    return true;
                }
                return false;
            });

            const {title:sectionTitle} = section || {};
            const title = getPlanElementLabelFromElement(elementObj);
        
            return sectionTitle ? sectionTitle+' / '+title : title;

    } else {
        element = elements.find(q => q.id === elementId);
        return getPlanElementLabelFromElement(element);
    }
    
    
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