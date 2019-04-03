import PathwayBody from '../components/PathwayBody';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanElementPureFragment, PlanElementReportFragment} from "../../../../../../Plan/components/Plan/fragments";
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
            ...PlanElementReport
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
${PlanElementReportFragment}
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


const enhance = compose(
    withQuery,
    // withMutation
);
export default enhance(PathwayBody);