import PathwayContentPure from '../components/PathwayContent';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose} from 'recompose';
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

const withQuery = graphql(GET_USER_PATHWAY_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                userId: ownProps.user.id,
            },
        }
    },
    props: ({ data }) => {
        const userPathway =  data.getUserPathway || {};
        const {pathway} = userPathway || {};
        if (data.getUserPathway || !data.loading) {
            return {
                userPathway: userPathway,
                pathway,
                //pathwayId: data.getUserPathway.pathway.id,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
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
    withQuery,
    withMutation,
    withJoinMutation
);

const PathwayContent = enhance(PathwayContentPure);
export default PathwayContent;