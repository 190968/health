import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PATHWAY_DELETE_MUTATION = gql`
    mutation PathwayDeleteMutation($id: UID!) {
        pathwayDelete(id: $id)
    }
`;
 
export const withDeletePathwayMutation = graphql(PATHWAY_DELETE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        deletePathway: () => {
            const  {pathway} = ownProps;
            const {id} = pathway || {};
            return mutate({
                variables: {id},
            });
        },
    }),
});
