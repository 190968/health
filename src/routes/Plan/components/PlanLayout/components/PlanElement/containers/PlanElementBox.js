import PlanElementBox from '../components/PlanElementBox';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import { compose,  withHandlers, branch } from 'recompose';
import { PlanElementFragment, PlanElementPureFragment, PlanElementReportFragment } from '../../../../Plan/fragments';
import { collectExecutedBrahms } from '../../../../../../../components/Brahms/utils';
import { prepareSkippedPlanElementsByNextId, getPlanElementLabelFromElement, formatPlanGoToElement } from '../../../../../../../components/Plan/utils';

const PLAN_FIELD_REPORT_MUTATION = gql`
    mutation planFieldReport($id: UID!, $date: Date!, $input: [String]!, $upid: UID!) {
        planElementReportPayload(id:$id, upid: $upid, date: $date, value: $input) {
            planElement {
                ...PlanElementWithReports
            }
        }
    }
    ${PlanElementFragment}
`;


 const withPlanElementReportMutation = graphql(PLAN_FIELD_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        makeReport: ( input) => {

            const {upid, element, date} = ownProps;
            const {id} = element;
           
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
             elements {
                ...PlanElement
                reports (user_id: $userId) {
                    ...PlanElementReport
                }
            }
        }
    }
    ${PlanElementPureFragment}
    ${PlanElementReportFragment}
`;


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
            if (props.isBuilderMode || props.isPreviewMode) {
                return;
            }
            
            const hide = message.loading('Saving in progress..', 0);
  
            props.makeReport({optionId:value}).then(() => {
                hide();
                message.success('Saved');
            });
        }
    })
);

const enhancePlanWithReport = compose(
    withPlanElementReportMutation,
    withHandlers({
        onChange: props => (value) => {
            console.log(props);
            if (props.isBuilderMode || props.isPreviewMode) {
                return;
            }
            const {plan, mode, element, elements, date} = props;
            const {type:planType} = plan;
            if (!date) {
                return;// plug for now
            }
            const hide = message.loading('Saving in progress..', 0);
  
            props.makeReport(value).then(() => {
                hide();
                message.success('Saved');


                // pathays doesn't have go to elements 
                if (planType !== 'pathway') {
                    const valueToUse = value;

                    const {id, isAnswerBasedElement, getBrahmsRules} = element || {};
                    const {nextElementId, elementRules} = collectExecutedBrahms({valueToUse, getBrahmsRules, isAnswerBasedElement})
                    
                    let skippedByQuestions = {/*id:[]*/};
                    let skippedSeectionsByQuestions = {};
                    if (nextElementId) {
                        const { elementsToSkip, sectionsByElementsToSkip } = prepareSkippedPlanElementsByNextId({ elements, currentId:id, nextId: nextElementId,  plan, mode })
                        // console.log(elementsToSkip, 'elementsToSkip');
                        skippedByQuestions = elementsToSkip;
                        skippedSeectionsByQuestions = sectionsByElementsToSkip;
                    } else {
                        skippedByQuestions[id] = [];
                        skippedSeectionsByQuestions[id] = false;
                    }
                    // console.log(props);
                    // console.log(skippedByQuestions, 'skippedByQuestions');
                    props.updateSkippedElements(skippedByQuestions, skippedSeectionsByQuestions);

                    // add brahms rules
                    props.updateBrahmRules({ element, rules:elementRules });
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
        console.log('fake report');
        const {element, elements, isPreviewMode, plan, mode} = props;
        // execute
        if (!isPreviewMode) {
            return;
        }

        const valueToUse = value;

        const {id, isAnswerBasedElement, getBrahmsRules} = element || {};
        const {nextElementId, elementRules} = collectExecutedBrahms({valueToUse, getBrahmsRules, isAnswerBasedElement})
        
        let skippedByQuestions = {/*id:[]*/};
        let skippedSeectionsByQuestions = {};
        if (nextElementId) {
            const { elementsToSkip, sectionsByElementsToSkip } = prepareSkippedPlanElementsByNextId({ elements, currentId:id, nextId: nextElementId,  plan, mode })
            // console.log(elementsToSkip, 'elementsToSkip');
            skippedByQuestions = elementsToSkip;
            skippedSeectionsByQuestions = sectionsByElementsToSkip;
        } else {
            skippedByQuestions[id] = [];
            skippedSeectionsByQuestions[id] = false;
        }
        // console.log(props);
        // console.log(skippedByQuestions, 'skippedByQuestions');
        props.updateSkippedElements(skippedByQuestions, skippedSeectionsByQuestions);

        // add brahms rules
        if (isPreviewMode) {
            props.updateBrahmRules({ element, rules:elementRules });
        }
         
    },
    formatGoToElement: props => elementId => {
        return formatPlanGoToElement(elementId, props);
    },
})

const enhance = compose(
    branch( props => {
        const {isBuilderMode, isPreviewMode} = props;
        // const canReport = false;
        return !isBuilderMode && !isPreviewMode;// && canReport;
    }, enhanceWithReport, enhanceFakeReport)

)

export default enhance(PlanElementBox);
