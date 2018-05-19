import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


// UPDATE TUMORBOARD
const TUMORBOARD_ELEMENT_UPDATE_ORDER_MUTATION = gql`
    mutation TumorboardUpdateElementsOrder($id: UID!, $userId: UID!, $elementIds:[UID]!){
        tumorboardUpdateElementsOrder(id:$id, userId: $userId, elementIds:$elementIds)
    }
`;


export const withUpdateOrderMutation = graphql(TUMORBOARD_ELEMENT_UPDATE_ORDER_MUTATION, {
    props: ({ownProps:{tumorboard, userId}, mutate }) => ({
        updateOrder: (elementIds) => {
            return mutate({
                variables: { id: tumorboard.id, userId, elementIds},
                // refetchQueries: [{
                //     query: GET_CANCER_STAGES_QUERY,
                // }],
            });
        },
    }),
});