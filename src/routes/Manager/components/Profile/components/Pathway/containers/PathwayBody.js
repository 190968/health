import PathwayBody from '../components/PathwayBody';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanElementPureFragment} from "../../../../../../Plan/components/Plan/fragments";
import { compose } from 'recompose';


export const GET_USER_PATHWAY_WITH_REPORTS_QUERY  = gql`
 query GET_USER_PATHWAY_WITH_REPORTS ($userId: UID!) {
    getUserPathway (userId: $userId) {
        id
        pathway {
            id
            elements {
                ...PlanElement
                reports {
                    id
                    value
                    date
                }
            }
        }
  }
}
${PlanElementPureFragment}
`;

const GET_PATHWAY_QUERY  = gql`
 query GET_PATHWAY ($id: UID!, $userId: UID!) {
  getPathway (id:$id) {
    id
    title
    elements {
        ...PlanElement
        reports (user_id: $userId) {
            id
            value
            date
        }
    }
    cancer {
        id
        stage {
            id
            letters
            rules {
                id
                stage 
                options {
                    id
                    letter
                    name
                }
            }
        }
    }
  }
}
${PlanElementPureFragment}
`;

const withQuery = graphql(GET_PATHWAY_QUERY, {
    options: (ownProps) => {
        const {pathway, user} = ownProps;
        const {id} = pathway || {};
        const {id:userId} = user || {};
        return {
            variables: {
                id,
                userId
            },
        }
    },
    props: ({ data }) => {
        return {
            pathway: data.getPathway || {},
            loading: data.loading
        }
    },
});


const PATHWAY_REPORT_MUTATION = gql`
    mutation PATHWAY_REPORT($userId: UID!, $id: UID!) {
        reportOnPathway(userId: $userId, id: $id) {
             id
        }
    }
`;


export const withPathwayElementReportMutation = graphql(PATHWAY_REPORT_MUTATION, {
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

const enhance = compose(
    withQuery,
    // withMutation
);
export default enhance(PathwayBody);