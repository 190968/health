import PlanElementBox from '../components/PlanElementBox';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import { compose,  withHandlers, branch } from 'recompose';
import { PlanElementFragment } from '../../../../Plan/fragments';
import { collectExecutedBrahms } from '../../../../../../../components/Brahms/utils';
import { prepareSkippedPlanElementsByNextId, getPlanElementLabelFromElement } from '../../../../../../../components/Plan/utils';

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


export const PlanElementWithMutation = graphql(PLAN_FIELD_REPORT_MUTATION, {
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

const enhanceWithReport = compose(
    PlanElementWithMutation,
    withHandlers({
        onChange: props => (value) => {
            if (props.isBuilderMode || props.isPreviewMode) {
                return;
            }
            const {upid, element, date} = props;
            if (!date) {
                return;// plug for now
            }
            const hide = message.loading('Saving in progress..', 0);
  
            props.makeReport(value).then(() => {
                hide();
                message.success('Saved');
            });
        }
    })
);

const enhanceFakeReport =  withHandlers({
    onChange: props => (value) => {
        
        const {element, elements, isPreviewMode} = props;
        // execute
        if (!isPreviewMode) {
            return;
        }

        const valueToUse = value;

        const {id, isAnswerBasedElement, getBrahmsRules} = element || {};
        const {nextElementId, elementRules} = collectExecutedBrahms({valueToUse, getBrahmsRules, isAnswerBasedElement})
        
        let skippedByQuestions = {/*id:[]*/};
        if (nextElementId) {
            const { elementsToSkip } = prepareSkippedPlanElementsByNextId({ elements, currentId:id, nextId: nextElementId })
            // console.log(elementsToSkip, 'elementsToSkip');
            skippedByQuestions = elementsToSkip;
        } else {
            skippedByQuestions[id] = [];
        }
        console.log(skippedByQuestions, 'skippedByQuestions');
        props.updateSkippedElements(skippedByQuestions);

        // add brahms rules
        if (isPreviewMode) {
            props.updateBrahmRules({ element, rules:elementRules });
        }
         
    },
    formatGoToElement: props => elementId => {
        const {plan} = props;
        const {elements} = plan || {};

        const element = elements.find(q => q.id === elementId);
        // console.log(elements);
        // console.log(elementId);
        // console.log(element);
        // if (question) {
        //     elementObj = question;
        //     return true;
        // }
        // return false;
        // console.log(element);

        // const {title:sectionTitle} = section || {};
        // const {title} = elementObj || {};
        return getPlanElementLabelFromElement(element);
    },
})

const enhance = compose(
    branch( props => {
        const {isBuilderMode, isPreviewMode} = props;
        const canReport = false;
        return !isBuilderMode && !isPreviewMode && canReport;
    }, enhanceWithReport, enhanceFakeReport)

)

export default enhance(PlanElementBox);
