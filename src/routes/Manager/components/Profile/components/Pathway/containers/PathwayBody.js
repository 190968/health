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
 query GET_PATHWAY ($id: UID!) {
  getPathway (id:$id) {
    id
    title
    elements {
        ...PlanElement
        reports {
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
        return {
            variables: {
                id: ownProps.pathway.id,
            },
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                pathway: data.getPathway,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});


// const PATHWAY_REPORT_MUTATION = gql`
//  mutation PATHWAY_REPORT($userId: UID, $parentId: UID, $tagId: UID!, $tagType: String!, $message: String!, $attachments: [Json]) {
//         reportOnPathway(userId: $userId, parentId: $parentId, tagId: $tagId, tagType: $tagType, message: $message, attachments:$attachments) {
//              id
//         }
//     }
// `;


// const withMutation = graphql(PATHWAY_REPORT_MUTATION, {
//     props: ({mutate}) => ({
//         sendMessage: ({userId, tagId, tagType, message, parentId, attachments}) => {
//             return mutate({
//                 variables: {userId, tagId, tagType, message, parentId, attachments},
//                 refetchQueries: [{
//                     query: GET_COMMENTS_LIST,
//                     variables: {tagId, tagType, parentId},
//                 }],
//             })
//         },
//     }),
// });

const enhance = compose(
    withQuery,
    // withMutation
);
export default enhance(PathwayBody);