import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { PlanElementPureFragment } from '../../../../routes/Plan/components/Plan/fragments';
import { withAddIntroMutation, withAddSectionMutation, withAddLessonMutation, withAddPathwayMutation } from '../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/mutations';
import {compose, branch } from 'recompose';
import { withPlanAddChildElementMutation } from '../../../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementChildrenList/containers/PlanElementChildrenManager';
import { PLAN_ELEMENT_CHILDREN_QUERY } from '../../../../routes/Plan/components/PlanLayout/components/PlanElement/containers/queries';
import { GET_PLAN_LESSON_ELEMENTS_QUERY, GET_PLAN_SECTION_ELEMENTS_QUERY } from '../../queries';
import { message } from 'antd';
// import { PathwayElementsFragment, PlanSectionElementsFragment, PlanLessonElementsFragment, PlanIntroElementsFragment } from '../../fragments';


const UpdatePlanElementsOrder_QUERY = gql`
    mutation updatePlanElementsOrder($planId: UID!, $mode: String!, $ids: [UID]! $lessonId: UID ) {
        updatePlanElementsOrder(planId:$planId, mode: $mode, ids: $ids, id:$lessonId)
    }
`;




// export const withDeleteAssessmentQuestionMutation = graphql(DELETE_ASSESSMENT_QUESTION_MUTATION, {
//     props: ({ownProps:{question, section}, mutate }) => ({
//         deleteAssessmentQuestion: () => {
//             return mutate({variables: { id: question.id, sectionId: section.id}});
//         },
//     }),
// });

// const withCreatePlanElementMutation = graphql(CREATE_ASSESSMENT_QUESTION_MUTATION, {
//     props: ({ownProps, mutate }) => ({
//         createAssessmentQuestion: (input) => {
//             const {assessment, afterSection, section} = ownProps;
//             return mutate({variables: {assessmentId:assessment.id, sectionId:section.id, input }});
//         },
//     }),
// });


export const UPDATE_PLANE_ELEMENT_MUTATION = gql`
    mutation updatePlanElement($id: UID!, $planId: UID!, $input:PlanBodyElementInput!) {
        updatePlanElement(id:$id, planId: $planId, input: $input) {
            planElement {
            ...PlanElement
            }
        }
    }
    ${PlanElementPureFragment}
`;
 


export const withUpdatePlanElementMutation = graphql(UPDATE_PLANE_ELEMENT_MUTATION, {
    props: ({ownProps, mutate }) => ({
        updateElement: (input) => {
            const {plan, element} = ownProps;
            return mutate({variables: {planId:plan.id, id: element.id, input}});
        },
    }),
});


const addMutations = compose(
    branch(props => props.mode === 'pathway', withAddPathwayMutation),
    branch(props => props.mode === 'lesson', withAddLessonMutation),
    branch(props => props.mode === 'section', withAddSectionMutation),
    branch(props => props.mode === 'introduction', withAddIntroMutation),
);



// const CreatePlanElementChild_MUTATION = gql`
//     mutation addChildElement($parentId: UID!, $parentValue: UID!, $planId: UID!, $type:PlanElementEnum!,$input:PlanBodyElementInput!) {
//         addPlanChildElement(planId: $planId, type:$type, parentId: $parentId, parentOptionId:$parentValue, input: $input) {
//             ...PlanElement
//         }
//     }
//     ${PlanElementPureFragment}
// `;

// const withCreatePlanElementChildMutation = graphql(CreatePlanElementChild_MUTATION, {
//     props: ({ ownProps, mutate }) => ({
//         addChildElement: (input, type) => {
//             const {order=null} = ownProps;
//             const inputOrder = {...input, order};
//             return mutate({
//                 variables: {planId:ownProps.plan.id, type:type, parentId:ownProps.parentId, parentValue:ownProps.parentValue, input:inputOrder},
//                 refetchQueries: [{
//                     query: PLAN_ELEMENT_CHILDREN_QUERY,
//                     variables: {id:ownProps.parentId, planId:ownProps.plan.id, elementValue:ownProps.parentValue}
//                 }]
//             })
//         },
//     }),
// });

// if this is a child - then add children
const withAddMutation = compose(
    branch(props => props.parentId && props.parentId !== '', withPlanAddChildElementMutation, addMutations),
);

export const withCreateOrUpdatePlanElement = branch(props => props.element, withUpdatePlanElementMutation, withAddMutation);

export const PathwayElementsFragment =  gql`
   fragment PathwayElements on Pathway {
        id
        elements {
            ...PlanElement,
        }
   }
    ${PlanElementPureFragment}
 `;
export const PlanLessonElementsFragment =  gql`
   fragment PlanLessonElements on PlanBodyLesson {
        id
        elements {
            ...PlanElement,
        }
   }
    ${PlanElementPureFragment}
 `;
export const PlanSectionElementsFragment =  gql`
   fragment PlanActivityElements on PlanBodyActivity {
        id
        elements {
            ...PlanElement,
        }
   }
    ${PlanElementPureFragment}
 `;

export const PlanIntroElementsFragment =  gql`
   fragment PlanIntroElements on Plan {
        id
        intro {
            ...PlanElement,
        }
   }
    ${PlanElementPureFragment}
 `;

export const withUpdatePlanElementsOrderMutation = graphql(UpdatePlanElementsOrder_QUERY, {
    props: ({ownProps, mutate}) => ({
        updateElementsOrder: (ids, elements) => {
            console.log(ownProps);
            const {item, plan, mode} = ownProps;
            const {id=null} = item || {};
            const {id:planId} = plan || {};
            return mutate({
                variables: {planId, mode, ids, id},
                optimisticResponse: {
                    __typename: "Mutation",
                    updatePlanElementsOrder: {
                        updatePlanElementsOrder: true,
                    }
                },
                update: (client, { data: { planElementReport } }) => {
                    const {mode, plan} = ownProps;
                    console.log(elements, mode);
                    if (mode === 'pathway') {
                        // if it's pathway - remov
                        let pathway = client.readFragment({
                            id: 'Pathway:'+planId, // `id` is any id that could be returned by `dataIdFromObject`.
                            fragment: PathwayElementsFragment,
                            fragmentName: "PathwayElements",
                        });

                        const newPathway = {
                            ...pathway,
                            elements: elements,
                            __typename:'Pathway'
                        }
                        console.log(pathway);
                        console.log(newPathway);
                        client.writeFragment({
                            id: 'Pathway:'+planId, // `id` is any id that could be returned by `dataIdFromObject`.
                            fragment: PathwayElementsFragment,
                            fragmentName: "PathwayElements",
                            data: {
                                ...pathway,
                                elements: elements,
                                __typename:'Pathway'
                            },
                        });
                    } else if (mode === 'lesson') {
                        const lessonId = id;
                        // if it's pathway - remov
                        let pathway = client.readFragment({
                            id: 'PlanBodyLesson:'+lessonId, // `id` is any id that could be returned by `dataIdFromObject`.
                            fragment: PlanLessonElementsFragment,
                            fragmentName: "PlanLessonElements",
                        });


                        client.writeFragment({
                            id: 'PlanBodyLesson:'+lessonId, // `id` is any id that could be returned by `dataIdFromObject`.
                            fragment: PlanLessonElementsFragment,
                            fragmentName: "PlanLessonElements",
                            data: {
                                ...pathway,
                                elements: elements,
                                __typename:'PlanBodyLesson'
                            },
                        });
                    } else if (mode === 'section') {
                        const sectionId = id;
                        // if it's pathway - remov
                        let pathway = client.readFragment({
                            id: 'PlanBodyActivity:'+sectionId, // `id` is any id that could be returned by `dataIdFromObject`.
                            fragment: PlanSectionElementsFragment,
                            fragmentName: "PlanActivityElements",
                        });


                        client.writeFragment({
                            id: 'PlanBodyActivity:'+sectionId, // `id` is any id that could be returned by `dataIdFromObject`.
                            fragment: PlanSectionElementsFragment,
                            fragmentName: "PlanActivityElements",
                            data: {
                                ...pathway,
                                elements: elements,
                                __typename:'PlanBodyActivity'
                            },
                        });
                    } else if (mode == 'introduction') {
                            console.log(elements);
                            // if it's pathway - remov
                            let pathway = client.readFragment({
                                id: 'Plan:'+planId, // `id` is any id that could be returned by `dataIdFromObject`.
                                fragment: PlanIntroElementsFragment,
                                fragmentName: "PlanIntroElements",
                            });
                            console.log(pathway);


                            client.writeFragment({
                                id: 'Plan:'+planId, // `id` is any id that could be returned by `dataIdFromObject`.
                                fragment: PlanIntroElementsFragment,
                                fragmentName: "PlanIntroElements",
                                data: {
                                    ...pathway,
                                    intro: elements,
                                    __typename:'Plan'
                                },
                            });
                    }
                },
            });
        },

    }),
});




const pathwayFragment =  gql`
   fragment PathwayElements on Pathway {
        id
        elements {
            ...PlanElement,
        }
   }
    ${PlanElementPureFragment}
 `;

const planElementChildrenFragment =  gql`
   fragment PlanBodyElements on PlanBodyElement {
        id
        childrenElements {
            id
        }
   }
    ${PlanElementPureFragment}
 `;



const deletePlanElement = gql`
    mutation deletePlanElement($id: UID!, $planId: UID!) {
        deletePlanElement(id:$id, planId: $planId)
    }
`;
export const withDeletePlanElementMutation = graphql(deletePlanElement, {
    props: ({ ownProps, mutate }) => ({
        deletePlanElement: () => {
             const {plan, element, parentId, parentValue, mode} = ownProps;
             const {id:planId} = plan || {};
             const {id} = element || {};
             let refetchQueries = [];
             console.log(ownProps);
             if (parentId) {
                 console.log(ownProps);
                refetchQueries.push({
                    query: PLAN_ELEMENT_CHILDREN_QUERY,
                    variables: {id:parentId, planId, elementValue:parentValue}
                });
            }
            switch(mode) {
                case 'lesson':
                refetchQueries.push({
                    query: GET_PLAN_LESSON_ELEMENTS_QUERY,
                    variables: {id:planId, lessonId:ownProps.lessonId}
                });
                break;
                case 'activity':
                refetchQueries.push({
                    query: GET_PLAN_SECTION_ELEMENTS_QUERY,
                    variables: {id:planId, activityId:ownProps.sectionId}
                });
                
                break;
            }
            // console.log(ownProps);

            const hide = message.loading('Deleting...');
            return mutate({
                variables: { planId, id},

                refetchQueries,

                update: (client, { data: { planElementReport } }) => {
                    const {mode, plan, parentId} = ownProps;
                    hide();
                    // console.log(parentId);
                    if (parentId) {
                        // update element
                        let pathway = client.readFragment({
                            id: 'PlanBodyElement:' + parentId, // `id` is any id that could be returned by `dataIdFromObject`.
                            fragment: planElementChildrenFragment,
                            fragmentName: "PlanBodyElements",
                        });

                        console.log(pathway);
                        // let {childrenElements:elements} = pathway;
                        // elements = elements.filter(element => element.id !== id);
                        // elements = elements.length > 0 ? elements : [];
                        //
                        // client.writeFragment({
                        //     id: 'PlanBodyElement:' + parentId, // `id` is any id that could be returned by `dataIdFromObject`.
                        //     fragment: planElementChildrenFragment,
                        //     fragmentName: "PlanBodyElements",
                        //     data: {
                        //         ...pathway,
                        //         childrenElements: elements,
                        //         __typename: 'PlanBodyElement'
                        //     },
                        // });

                    } else {
                        if (mode === 'pathway') {
                            // if it's pathway - remov
                            let pathway = client.readFragment({
                                id: 'Pathway:' + plan.id, // `id` is any id that could be returned by `dataIdFromObject`.
                                fragment: pathwayFragment,
                                fragmentName: "PathwayElements",
                            });

                            let {elements} = pathway;
                            elements = elements.filter(element => element.id !== id);
                            elements = elements.length > 0 ? elements : [];

                            client.writeFragment({
                                id: 'Pathway:' + plan.id, // `id` is any id that could be returned by `dataIdFromObject`.
                                fragment: pathwayFragment,
                                fragmentName: "PathwayElements",
                                data: {
                                    ...pathway,
                                    elements: elements,
                                    __typename: 'Pathway'
                                },
                            });
                        } else {

                        }
                    }
                },
            })
        },

    }),
});
