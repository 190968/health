import PathwayContentPure from '../components/PathwayContent';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, withState} from 'recompose';
import { withSpinnerWhileLoading } from '../../../../../../../components/Modal';
export const GET_USER_PATHWAY_QUERY  = gql`
 query GET_USER_PATHWAY ($userId: UID!) {
  getUserPathway (userId: $userId) {
        id
        pathway {
            id
            title
            version
            cancer {
                id
                title
            }
        }
  }
}
`;

export const withUserPathwayQuery = graphql(GET_USER_PATHWAY_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                userId: ownProps.user.id,
            },
        }
    },
    props: ({ data }) => {
        const {refetch} = data;
        const userPathway = data.getUserPathway || {};
        const {pathway} = userPathway || {};
        return {
            userPathway,
            pathway,
            refetch,
            loading: data.loading
        }
    },
});





const LeavePathwayMutation = gql`
    mutation LeavePathway($userId: UID!, $id:UID!){
        leavePathway(userId:$userId, id:$id)
    }
`;



const withMutation = graphql(LeavePathwayMutation, {
    props: ({ ownProps, mutate }) => ({
        leavePathway: (id) => {
            return mutate({
                variables: { userId: ownProps.user.id, id: id}
            })
        },

    }),
});

//


const JOIN_PATHWAY_MUTATION = gql`
    mutation JoinPathway($userId: UID!, $id:UID!){
        joinPathway(userId:$userId, id:$id) {
            id
            pathway {
                id
                title
                version
                cancer {
                    id
                    title
                }
            }
        }
    }
`;



const withJoinMutation = graphql(JOIN_PATHWAY_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        joinPathway: (pathway) => {
            const {id} = pathway;
            return mutate({
                variables: { userId: ownProps.user.id, id}
            })
        },

    }),
});

const enhance = compose(
    withUserPathwayQuery,
    withSpinnerWhileLoading,
    withState('userPathway', 'setUserPathway', props => props.userPathway),
    withMutation,
    withJoinMutation
);

const PathwayContent = enhance(PathwayContentPure);
export default PathwayContent;


// const GET_USER_PATHWAY_BY_ID_QUERY  = gql`
//  query GET_USER_PATHWAY_BY_ID ($id: UID!) {
//   getPathway (id: $id) {
//         id
//         title
//         version
//         cancer {
//             id
//             title
//         }
//   }
// }
// `;

// export const withUserPathwayByIdQuery = graphql(GET_USER_PATHWAY_BY_ID_QUERY, {
//     options: (ownProps) => {
//         return {
//             variables: {
//                 id: ownProps.pathway.id,
//             },
//         }
//     },
//     props: ({ data }) => {
//         const {pathway} = data || {};
//             return {
//                 pathway,
//                 loading: data.loading
//             }
//     },
// });
