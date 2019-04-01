import PathwaySelect from '../components/PathwaySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PATHWAYS_QUERY  = gql`
 query GET_PATHWAYS ($status: PlanStatusEnum) {
  getPathways(status:$status) {
    edges {
        id
        title
    }
  }
}
`;

const withQuery = graphql(GET_PATHWAYS_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                status: "published"
            },
            fetchPolicy: 'network-only'
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            const {edges} = data.getPathways;
            return {
                pathways: edges,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});



const JoinPathwayMutation = gql`
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



const withMutation = graphql(JoinPathwayMutation, {
    props: ({ ownProps, mutate }) => ({
        joinPathway: (id) => {
            return mutate({
                variables: { userId: ownProps.user.id, id: id}
            })
        },

    }),
});


export default withQuery(withMutation(PathwaySelect));