import PathwayBody from '../components/PathwayBody';
import {PlanElementPureFragment} from "../../../../Plan/components/Plan/fragments";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withStateHandlers } from 'recompose';
import { withSpinnerWhileLoading } from '../../../../../components/Modal';
import { validateBrahms, getNextObjectFromRules } from '../../../../../components/Brahms/utils';
import { prepareSkippedPlanElementsByNextId } from '../../../../../components/Plan/utils';




const PB_PLAN_BODY_QUERY = gql`
    query PB_PATHWAY_BODY ($id: UID!) {
        getPathway (id: $id) {
            id
            elements {
                ...PlanElement,
            }
        }
    }
    ${PlanElementPureFragment}
`;


const injectPathwayBodyQuery = graphql(
    PB_PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    id: ownProps.plan.id,
                }}
        },
        props: ({ data }) => {
            if (data.getPathway && !data.loading) {
                const pathway = data.getPathway;
                return {
                    loading: data.loading,
                    planId: pathway.id,
                    elements: pathway.elements,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);

const enhance = compose(
    injectPathwayBodyQuery,
    withSpinnerWhileLoading,
    withStateHandlers(props => {
        const {elements=[],  plan, mode} = props;
        const getReportedValues = [];
        let skippedElementsByRef = {};
        let brahmRules = [];
        // now check if we need to skip elements according to our reported elements
        // if we have report
        if (getReportedValues.length > 0) {
            // find reported questions IDs
            // const reportedQuestions = getReportedValues.map(item => item.questionId);
            // map sections for answers
            elements.map((question, i) => {
                    const { id, getBrahmsRules = [], isAnswerBasedElement = false } = question || {};
                   
                    // if we have reports go to rules
                    const questionReports = getReportedValues.filter(report => report.questionId === question.id);
                    let questionRules = [];
                    questionReports.map(questionReport => {
                        const { answerId, value } = questionReport || {};

                        const valueToUse = isAnswerBasedElement ? answerId : value;
                        // get brahm rules accodring the avalue
                        const rules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedElement });
                        // save rules if have for the question
                        if (rules.length > 0) {
                            questionRules = [...questionRules, ...rules];
                        }
                        // get goto brahm rules and execute
                        const goTorules = validateBrahms({ rules: getBrahmsRules, value: valueToUse, isAnswerBasedElement, type: ['goto','stop'] });
                        if (goTorules.length > 0) {
                            // find next skipped item
                            const nextId = getNextObjectFromRules({ rules: goTorules });
                            const { elementsToSkip} = prepareSkippedPlanElementsByNextId({ elements, currentId: id, nextId,  plan, mode })
                            // save questions
                            skippedElementsByRef[id] = elementsToSkip;
                        }
                        return null;
                    });

                    if (questionRules.length > 0) {
                        brahmRules.push({ question, rules: questionRules });
                    }
                });
        }

        return {
            brahmRules,
            elements,
            skippedElementsByRef:{}
        };
    }, {
        updateSkippedElements: props => (newSkippedElementsByRef) => {
            const {skippedElementsByRef} = props;
            return {
                skippedElementsByRef: {...skippedElementsByRef, ...newSkippedElementsByRef}
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

export default enhance(PathwayBody);
