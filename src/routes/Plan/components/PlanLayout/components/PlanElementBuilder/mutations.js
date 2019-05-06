import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, branch} from 'recompose';

//import PlanElementFormFields from '../components/PlanElementManager';
import {PlanElementPureFragment} from "../../../Plan/fragments";
import {PLAN_ELEMENT_CHILDREN_QUERY} from "../PlanElement/containers/queries";


export const UpdateElementMutation = gql`
    mutation updatePlanElement($id: UID!, $planId: UID!, $input:PlanBodyElementInput!) {
        updatePlanElement(id:$id, planId: $planId, input: $input) {
            ...PlanElement
        }
    }
    ${PlanElementPureFragment}
`;
export const withMutation = graphql(UpdateElementMutation, {
    props: ({ ownProps, mutate }) => {
        return {
        updateElement: (input) => {
            return mutate({
                variables: {planId:ownProps.plan.id, id: ownProps.id, input:input},
            })
        }}
    },
});




/**
 * Queries for getting a list of lessons, etc.
 */


const PLAN_PLAN_LESSONS_QUERY = gql`
    query GET_PLAN_LESSONS ($id: UID!) {
        plan (id: $id) {
            id
            lessons {
                id
                title
                elements {
                    ...PlanElement,
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;

const PLAN_PLAN_ACTIVITIES_QUERY = gql`
    query GET_PLAN_ACTIVITIES ($id: UID!) {
        plan (id: $id) {
            id
            activities {
                id
                title
                elements {
                    ...PlanElement,
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;

const PLAN_PLAN_INTRO_QUERY = gql`
    query GET_PLAN_INTRO ($id: UID!) {
        plan (id: $id) {
            id
            intro {
                ...PlanElement,
            }
        }
    }
    ${PlanElementPureFragment}
`;

const PATHWAY_ELEMENTS_QUERY = gql`
    query GET_PATHWAY_ELEMENTS ($id: UID!) {
        getPathway (id: $id) {
            id
            elements {
                ...PlanElement,
            }
        }
    }
    ${PlanElementPureFragment}
`;


export const AddLessonElementMutation = gql`
    mutation addLessonElement($planId: UID!, $type:PlanElementEnum!, $lessonId: UID!, $input:PlanBodyElementInput!) {
        addLessonElement(planId: $planId, type:$type, lessonId: $lessonId, input: $input) {
            plan {
                id
                lessons {
                    id
                    title
                    elements {
                        ...PlanElement
                    }
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddLessonMutation = graphql(AddLessonElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addLessonElement: (input, type) => {
            const {order=null, lesson} = ownProps;
            const {id:lessonId} = lesson || {};
            const inputOrder = {...input, order};
            return mutate({
                variables: {planId:ownProps.plan.id, type:type, lessonId, input:inputOrder},
            })
        },
    }),
});

export const AddSectionElementMutation = gql`
    mutation addActivityElement($planId: UID!, $type:PlanElementEnum!, $activityId: UID!, $input:PlanBodyElementInput!) {
        addActivityElement(planId: $planId, type:$type, activityId: $activityId, input: $input) {
            plan {
                id
                activities {
                    id
                    title
                    elements {
                        ...PlanElement
                    }
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddSectionMutation = graphql(AddSectionElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addActivityElement: (input, type) => {
            const {order=null, section} = ownProps;
            const inputOrder = {...input, order};
            const {id:sectionId} = section || {};
            return mutate({
                variables: {planId:ownProps.plan.id, type:type, activityId:sectionId, input:inputOrder},
                // refetchQueries: [{
                //     query: PLAN_PLAN_ACTIVITIES_QUERY,
                //     variables: {id:ownProps.plan.id}
                // }],
            })
        },
    }),
});

export const AddIntroElementMutation = gql`
    mutation addIntroElement($planId: UID!, $type:PlanElementEnum!, $input:PlanBodyElementInput!) {
        addIntroductionElement(planId: $planId, type:$type, input: $input) {
            id
            intro {
                ...PlanElement
            }
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddIntroMutation = graphql(AddIntroElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addIntroElement: (input, type) => {
            const {order=null} = ownProps;
            const inputOrder = {...input, order};
            return mutate({
                variables: {planId:ownProps.plan.id, type:type, input:inputOrder},
                // refetchQueries: [{
                //     query: PLAN_PLAN_INTRO_QUERY,
                //     variables: {id:ownProps.plan.id}
                // }],
            })
        },
    }),
});

// the right one!
export const AddPathwayElementMutation = gql`
    mutation addPathwayElement($planId: UID!, $type:PlanElementEnum!, $input:PlanBodyElementInput!) {
        addPathwayElement(planId: $planId, type:$type, input: $input) {
            id
            elements {
                ...PlanElement
            }
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddPathwayMutation = graphql(AddPathwayElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addPathwayElement: (input, type) => {
            const {order=null} = ownProps;
            const inputOrder = {...input, order};
            return mutate({
                variables: {planId:ownProps.plan.id, type:type, input:inputOrder},
                refetchQueries: [{
                    query: PATHWAY_ELEMENTS_QUERY,
                    variables: {id:ownProps.plan.id}
                }],
            })
        },
    }),
});