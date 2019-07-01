import PlanElementBox from '../components/PlanElementBox';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import { compose,  withHandlers, branch } from 'recompose';
import { PlanElementFragment } from '../../../../Plan/fragments';
import { collectExecutedBrahms } from '../../../../../../../components/Brahms/utils';
import { prepareSkippedPlanElementsByNextId,  formatPlanGoToElement } from '../../../../../../../components/Plan/utils';
import { withPlanContext } from '../../../../../../../components/Plan/planContext';
import { prepareAttachmentsInput } from '../../../../../../../components/FormCustomFields/components/Attachments';

const PLAN_FIELD_REPORT_MUTATION = gql`
    mutation planFieldReport($id: UID!, $date: Date!, $input: PlanElementReportInput!, $upid: UID!) {
        planElementReportPayload(id:$id, upid: $upid, date: $date, input: $input) {
            planElement {
                ...PlanElementWithReports
            }
        }
    }
    ${PlanElementFragment}
`;


 const withPlanElementReportMutation = graphql(PLAN_FIELD_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        makeReport: (input) => {

            const {upid, element, date} = ownProps;
            const {id} = element || {};
           
            return mutate({
                variables: { upid, id, date, input},
            })
        },

    }),
});

// pathway

const PATHWAY_REPORT_MUTATION = gql`
    mutation PATHWAY_REPORT($userId: UID!, $id: UID!, $elementId: UID!, $input: PathwayElementReportInput!) {
        reportOnPathway(userId: $userId, id: $id, elementId: $elementId, input: $input) {
             id
            #  elements {
            #     ...PlanElement
            #     # reports (user_id: $userId) {
            #     #     ...PlanElementReport
            #     # }
            # }
        }
    }
   
`;
// ${PlanElementPureFragment}
// ${PlanElementReportFragment}


const withPathwayElementReportMutation = graphql(PATHWAY_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        makeReport: (input) => {

            const {plan, element, user} = ownProps;
            const {id} = plan || {};
            const {id:elementId} = element || {};
            const {id:userId} = user || {};
           
            return mutate({
                variables: { id, elementId, userId, input},
            })
        },

    }),
});


const enhancePathwayWithReport = compose(
    withPathwayElementReportMutation,
    withHandlers({
        onChange: props => (value) => {
            //console.log('made report');
            if (props.isBuilderMode || props.isPreviewMode) {
                return;
            }

            props.updateCurrentElement();
            const {plan, mode, element, elements} = props;
           // const hide = message.loading('Saving in progress..', 0);
            // console.log(value, 'value');
            props.makeReport({value}).then(() => {
                //hide();
                //message.success('Saved');

                // const valueToUse = value;
                props.checkOnBrahmsExecution(element, value);

                // const {id, isAnswerBasedElement, getBrahmsRules} = element || {};
                // const {nextElementId, elementRules} = collectExecutedBrahms({valueToUse, getBrahmsRules, isAnswerBasedElement})
                
                // let skippedByQuestions = {/*id:[]*/};
                // let skippedSeectionsByQuestions = {};
                // if (nextElementId) {
                //     const { elementsToSkip, sectionsByElementsToSkip } = prepareSkippedPlanElementsByNextId({ elements:plan.elements, currentId:id, nextId: nextElementId,  plan, mode })
                //     // console.log(elementsToSkip, 'elementsToSkip');
                //     skippedByQuestions = elementsToSkip;
                //     skippedSeectionsByQuestions = sectionsByElementsToSkip;
                // } else {
                //     skippedByQuestions[id] = [];
                //     skippedSeectionsByQuestions[id] = false;
                // }
                // // console.log(props);
                // // console.log(skippedByQuestions, 'skippedByQuestions');
                // props.updateSkippedElements(skippedByQuestions, skippedSeectionsByQuestions);

                // // add brahms rules
                // props.updateBrahmRules({ element, rules:elementRules });
            });
        }
    })
);

const enhancePlanWithReport = compose(
    withPlanElementReportMutation,
    withHandlers({
        onChange: props => (value) => {
            // console.log(props);
            if (props.isBuilderMode || props.isPreviewMode) {
                return;
            }
            const {plan, element, date} = props;
            const {type:planType} = plan;
            if (!date) {
                return;// plug for now
            }
            const hide = message.loading('Saving in progress..', 0);
            const input = preparePlanElementReportInput({element, value});
  
            props.makeReport(input).then(() => {
                hide();
                message.success('Saved');
                // pathays doesn't have go to elements 
                if (planType !== 'pathway') {

                    props.checkOnBrahmsExecution(element, value);
                    // const valueToUse = value;

                    // const {id, isAnswerBasedElement, getBrahmsRules} = element || {};
                    // const {nextElementId, elementRules} = collectExecutedBrahms({valueToUse, getBrahmsRules, isAnswerBasedElement})
                    
                    // let skippedByQuestions = {/*id:[]*/};
                    // let skippedSeectionsByQuestions = {};
                    // if (nextElementId) {
                    //     const { elementsToSkip, sectionsByElementsToSkip } = prepareSkippedPlanElementsByNextId({ elements, currentId:id, nextId: nextElementId,  plan, mode })
                    //     // console.log(elementsToSkip, 'elementsToSkip');
                    //     skippedByQuestions = elementsToSkip;
                    //     skippedSeectionsByQuestions = sectionsByElementsToSkip;
                    // } else {
                    //     skippedByQuestions[id] = [];
                    //     skippedSeectionsByQuestions[id] = false;
                    // }
                    // // console.log(props);
                    // // console.log(skippedByQuestions, 'skippedByQuestions');
                    // props.updateSkippedElements(skippedByQuestions, skippedSeectionsByQuestions);

                    // // add brahms rules
                    // props.updateBrahmRules({ element, rules:elementRules });
                }
                
            });
        }
    })
);
const enhanceWithReport = compose(
    branch(props => {
        const {plan} = props;
        const {type} = plan || {};
        return type === 'pathway';
    }, enhancePathwayWithReport, enhancePlanWithReport),
);

const enhanceFakeReport =  withHandlers({
    onChange: props => (value) => {
        // console.log('fake report');
        const {element, elements, isPreviewMode, plan, mode} = props;
        // execute
        if (!isPreviewMode) {
            return;
        }
        props.updateCurrentElement();
        // const valueToUse = value;

        props.checkOnBrahmsExecution(element, value);
        // const {id, isAnswerBasedElement, getBrahmsRules} = element || {};
        // const {nextElementId, elementRules} = collectExecutedBrahms({valueToUse, getBrahmsRules, isAnswerBasedElement})
        
        // let skippedByQuestions = {/*id:[]*/};
        // let skippedSeectionsByQuestions = {};
        // if (nextElementId) {
        //     const { elementsToSkip, sectionsByElementsToSkip } = prepareSkippedPlanElementsByNextId({ elements, currentId:id, nextId: nextElementId,  plan, mode })
        //     // console.log(elementsToSkip, 'elementsToSkip');
        //     skippedByQuestions = elementsToSkip;
        //     skippedSeectionsByQuestions = sectionsByElementsToSkip;
        // } else {
        //     skippedByQuestions[id] = [];
        //     skippedSeectionsByQuestions[id] = false;
        // }
        // // console.log(props);
        // // console.log(skippedByQuestions, 'skippedByQuestions');
        // props.updateSkippedElements(skippedByQuestions, skippedSeectionsByQuestions);

        // // add brahms rules
        // if (isPreviewMode) {
        //     props.updateBrahmRules({ element, rules:elementRules });
        // }
         
    },
    formatGoToElement: props => elementId => {
        return formatPlanGoToElement(elementId, props);
    },
})


const checkOnBrahmsExecutionEnhancer = withHandlers({
    checkOnBrahmsExecution: props => (element, valueToUse) => {
        const {element:mainLevelElement, planElements:elements, plan, mode} = props;
        // from aps
        // const  = value;
        // console.log(props, 'PPProps');
        // console.log(elements, 'elementselementselements');
        // console.log(element, 'element');

        const {id, isAnswerBasedElement, getBrahmsRules} = element || {};
        const {nextElementId, elementRules} = collectExecutedBrahms({valueToUse, getBrahmsRules, isAnswerBasedElement})
        // console.log(nextElementId, 'nextElementId');
        let skippedByQuestions = {/*id:[]*/};
        let skippedSeectionsByQuestions = {};
        if (nextElementId) {
            const { elementsToSkip, sectionsByElementsToSkip } = prepareSkippedPlanElementsByNextId({ elements, currentId:id, nextId: nextElementId, mainLevelElement, plan, mode })
            // console.log(elementsToSkip, 'elementsToSkip');
            skippedByQuestions = elementsToSkip;
            skippedSeectionsByQuestions = sectionsByElementsToSkip;
        } else {
            const {id:mainLevelElementId} = mainLevelElement;
            if (mainLevelElementId !== id) {
                // we need to use main level element
                skippedByQuestions[mainLevelElementId] = [];
                skippedSeectionsByQuestions[mainLevelElementId] = false;
            } else {
                skippedByQuestions[id] = [];
                skippedSeectionsByQuestions[id] = false;
            }
            
        }
        // console.log(props);
        // console.log(skippedByQuestions, 'skippedByQuestions');
        props.updateSkippedElements(skippedByQuestions, skippedSeectionsByQuestions);

        // add brahms rules
        props.updateBrahmRules({ element, rules:elementRules });
        // // add brahms rules
        // if (isPreviewMode) {
        //     props.updateBrahmRules({ element, rules:elementRules });
        // }
    }
});

const enhance = compose(
    withHandlers({
        updateCurrentElement: props => () => {
            const {i} = props;
            // if (isBuilderMode && !isPreviewMode) {
                if (props.updateCurrentElement) {
                    props.updateCurrentElement(i);
                }
            // }
        }
    }),
    withPlanContext,
    // checkOnBrahmsExecutionEnhancer,
    branch(props => {
        const {checkOnBrahmsExecution} = props;
        // console.log(checkOnBrahmsExecution, 'checkOnBrahmsExecutioncheckOnBrahmsExecutioncheckOnBrahmsExecution');
        return !checkOnBrahmsExecution;
    }, checkOnBrahmsExecutionEnhancer),
    branch( props => {
        const {isBuilderMode, isPreviewMode} = props;
        // const canReport = false;
        return !isBuilderMode && !isPreviewMode;// && canReport;
    }, enhanceWithReport, enhanceFakeReport),
    
)

export default enhance(PlanElementBox);

const preparePlanElementReportInput = props => {
    // console.log(props, 'planelementreport props');
    const {element, value} = props;
    const {itemType} = element || {};
    let input = {};

    switch(itemType) {
        case 'file_input':
                input.attachments = prepareAttachmentsInput(value);
            break;
        default:
                input.value = value;
            break;
    }

   
    return input;
}