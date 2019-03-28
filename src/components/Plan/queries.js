
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
// import {branch, compose} from 'recompose';
import { PathwayCardFragment, PlanElementPureFragment, PlanElementFragment } from '../../routes/Plan/components/Plan/fragments';
import { PlanLessonElementsFragment, PlanSectionElementsFragment } from './components/Builder/mutations';

const GET_PATHWAY_MAIN_QUERY = gql`    
    query GET_PATHWAY($id: UID!) {
        getPathway (id: $id) {
            ...PathwayCardInfo
        }
    }
    ${PathwayCardFragment}
`;

export const withPathwayMainQuery = graphql(
    GET_PATHWAY_MAIN_QUERY,
    {
        skip: (props) =>  {
            const {id} = props.plan || {};
            return !id;
        },
        options: (ownProps) => {
            const {plan} = ownProps;
            const {id} = plan || {};
            return {
                variables: {
                    id,
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getPathway} = data || {};
            return {
                plan: getPathway,
                loading: data.loading,
            }
        },
    }
);



export const GET_PLAN_LESSON_ELEMENTS_QUERY = gql`    
    query GET_PLAN_LESSON_ELEMENTS($id: UID!, $lessonId: UID!) {
        getPlan (id: $id) {
            id
            getLesson(id:$lessonId) {
                id
                elements {
                    ...PlanElement,
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;


export const GET_PLAN_SECTION_ELEMENTS_QUERY = gql`    
    query GET_PLAN_ACTIVITY_ELEMENTS($id: UID!, $activityId: UID!) {
        getPlan (id: $id) {
            id
            getActivity(id:$activityId) {
                id
                elements {
                    ...PlanElement,
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;